"use server";

import { Resend } from "resend";
import { formatDateRangeLine } from "@/lib/format-date-range";
import {
  isQualifiedLead,
  validateInquiry,
  type InquiryFieldErrors,
  type InquiryParsed,
} from "@/lib/inquiry-validate";

/** Used only when INQUIRY_TO_EMAIL is unset (e.g. missing Vercel env). */
const DEFAULT_INQUIRY_TO_EMAIL =
  "jcpl-07@hotmail.com,triplewrentals@gmail.com";

const CAMPSITE_LABELS: Record<string, string> = {
  premium: "COTA Premium RV site",
  "lot-n": "COTA Lot N (dry camping)",
  other: "Another campground near Austin",
  none: "No campsite yet",
};

const PASS_LABELS: Record<string, string> = {
  purchased: "Campsite pass purchased",
  purchasing: "Buying the pass now",
  "not-yet": "Pass not purchased yet",
};

const POWER_LABELS: Record<string, string> = {
  hookups: "Site has hookups",
  generator: "Needs generator plan (no hookups)",
  "not-sure": "Not sure about power yet",
};

const SLEEPING_LABELS: Record<string, string> = {
  "real-beds": "Real bed for every adult",
  mixed: "Couples + flexible for kids",
  flexible: "Whatever fits the group",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-2000": "Under $2,000 total",
  "2000-3500": "$2,000-$3,500 total",
  "3500-5000": "$3,500-$5,000 total",
  "5000-plus": "$5,000+ total",
  "not-sure": "Budget not set yet",
};

const CONTACT_LABELS: Record<string, string> = {
  call: "Call",
  text: "Text",
  email: "Email",
};

function line(label: string, value: string | undefined | null): string {
  return value ? `${label}: ${value}` : "";
}

function buildOwnerEmailBody(data: InquiryParsed, qualified: boolean): string {
  const datesLine = formatDateRangeLine(data.arrivalDate, data.departureDate);
  const groupLine =
    data.groupTotal != null
      ? `${data.groupTotal} guests${
          data.adults != null || data.kids != null
            ? ` (${data.adults ?? "?"} adults, ${data.kids ?? "?"} kids)`
            : ""
        }`
      : "";

  const lines = [
    qualified
      ? "QUALIFIED F1 2026 availability request (site + dates + group + contact)"
      : "F1 2026 availability request",
    "",
    "CAMPSITE",
    line("Campsite", CAMPSITE_LABELS[data.campsite] ?? data.campsite),
    line("Pass status", data.passStatus ? PASS_LABELS[data.passStatus] : ""),
    line("Site number", data.siteNumber),
    line("Dates", datesLine),
    "",
    "GROUP & RV FIT",
    line("Group", groupLine),
    line("Sleeping", data.sleeping ? SLEEPING_LABELS[data.sleeping] : ""),
    line("Power", data.power ? POWER_LABELS[data.power] : ""),
    line("Budget", data.budget ? BUDGET_LABELS[data.budget] : ""),
    line("Notes", data.message),
    "",
    "CONTACT",
    line("Name", data.fullName),
    line("Phone", data.phone),
    line("Email", data.email),
    line("Prefers", data.contactMethod ? CONTACT_LABELS[data.contactMethod] : ""),
    line("Lead source", data.source),
    "",
    "Next: verify site compatibility, delivery access and unit fit before quoting.",
    "- Sent from the Triple W F1 landing page",
  ];
  return lines.filter((l) => l !== "").join("\n");
}

export type InquiryState = {
  ok: boolean;
  qualified?: boolean;
  message?: string;
  errors?: InquiryFieldErrors;
  values?: Record<string, unknown>;
};

const FAIL_MESSAGE =
  "Something went wrong on our end. Please call or text us at (972) 965-6901 and we'll take care of you.";

/**
 * Radio groups are submitted twice: a state-driven hidden mirror (JS on) and
 * the named radios themselves (JS off). Take the last non-empty occurrence.
 */
function pickField(formData: FormData, name: string): string {
  const values = formData
    .getAll(name)
    .filter((v): v is string => typeof v === "string" && v !== "");
  return values.length > 0 ? values[values.length - 1] : "";
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const raw: Record<string, unknown> = {
    campsite: pickField(formData, "campsite"),
    passStatus: pickField(formData, "passStatus"),
    siteNumber: formData.get("siteNumber"),
    arrivalDate: formData.get("arrivalDate"),
    departureDate: formData.get("departureDate"),
    groupTotal: formData.get("groupTotal"),
    adults: formData.get("adults"),
    kids: formData.get("kids"),
    sleeping: pickField(formData, "sleeping"),
    power: pickField(formData, "power"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contactMethod: pickField(formData, "contactMethod"),
    source: formData.get("source"),
    website: formData.get("website"),
  };

  const values: Record<string, unknown> = { ...raw };
  delete values.website;

  const parsed = validateInquiry(raw);

  if (!parsed.ok) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.errors,
      values,
    };
  }

  const data = parsed.data;

  // Honeypot: pretend success, send nothing.
  if (data.website && data.website.length > 0) {
    return { ok: true, qualified: false, values: { ...values, phone: data.phone } };
  }

  const qualified = isQualifiedLead(data);

  const toList = (process.env.INQUIRY_TO_EMAIL?.trim() || DEFAULT_INQUIRY_TO_EMAIL)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || toList.length === 0) {
    console.error("Inquiry email misconfigured: missing RESEND_API_KEY or recipients");
    return { ok: false, message: FAIL_MESSAGE, values };
  }

  const resend = new Resend(apiKey);

  try {
    const ownerEmail = await resend.emails.send({
      from: `Triple W Inquiry <${fromEmail}>`,
      to: toList,
      replyTo: data.email,
      subject: `${qualified ? "[QUALIFIED] " : ""}F1 2026 request from ${data.fullName} (${
        CAMPSITE_LABELS[data.campsite] ?? data.campsite
      })`,
      text: buildOwnerEmailBody(data, qualified),
    });

    if (ownerEmail.error) {
      console.error("Resend owner email error:", ownerEmail.error);
      return { ok: false, message: FAIL_MESSAGE, values };
    }
  } catch (err) {
    console.error("Resend owner email exception:", err);
    return { ok: false, message: FAIL_MESSAGE, values };
  }

  const hasVerifiedDomain = !fromEmail.endsWith("@resend.dev");
  if (hasVerifiedDomain) {
    const datesLine = formatDateRangeLine(data.arrivalDate, data.departureDate);
    try {
      await resend.emails.send({
        from: `Triple W Rentals <${fromEmail}>`,
        to: data.email,
        replyTo: toList[0],
        subject: "Your COTA race-weekend request: next steps",
        text: `
Hi ${data.fullName.split(" ")[0]},

Got your request for race weekend (${datesLine}).

Here's what happens next:
1. We check which units fit your site and group.
2. We verify delivery access and the setup/pickup windows for your exact spot.
3. We ${data.contactMethod === "email" ? "email" : data.contactMethod === "text" ? "text" : "call"} you back with an itemized weekend quote, usually within two hours during business hours.

Helpful to have ready: your campsite confirmation or pass details, and your site number if it's assigned.

Heads up: the RV rental doesn't include your COTA campsite or race tickets. Those stay with COTA.

Need us sooner? Call or text (972) 965-6901.

- Weston & the Triple W team
  Tyler, Texas
`.trim(),
      });
    } catch (err) {
      console.error("Resend auto-reply exception:", err);
    }
  }

  return {
    ok: true,
    qualified,
    values: {
      campsite: data.campsite,
      passStatus: data.passStatus,
      siteNumber: data.siteNumber,
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      groupTotal: data.groupTotal != null ? String(data.groupTotal) : "",
      adults: data.adults != null ? String(data.adults) : "",
      kids: data.kids != null ? String(data.kids) : "",
      sleeping: data.sleeping,
      power: data.power,
      budget: data.budget,
      message: data.message,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      contactMethod: data.contactMethod,
      source: data.source ?? "",
    },
  };
}
