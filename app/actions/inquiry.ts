"use server";

import { Resend } from "resend";
import { formatDateRangeLine, formatStaySummary } from "@/lib/format-date-range";
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
  coordinated: "Coordinated placement through Triple W",
  own: "Customer already has a campsite",
  // Legacy values from the previous form version (no longer emitted by the UI).
  premium: "Customer already has a campsite (legacy: premium)",
  "lot-n": "Customer already has a campsite (legacy: lot-n)",
  other: "Customer already has a campsite (legacy: other)",
  none: "No campsite yet (legacy)",
};

const POWER_NOTE: Record<string, string> = {
  coordinated: "Confirm utilities for the assigned placement (hookups vs generator plan)",
  own: "Customer's own site: confirm hookups, dimensions and access with them",
  premium: "Customer's own site: confirm hookups, dimensions and access with them",
  "lot-n": "Customer's own site: confirm hookups, dimensions and access with them",
  other: "Customer's own site: confirm hookups, dimensions and access with them",
  none: "No campsite yet: nurture lead",
};

const BEDS_LABELS: Record<string, string> = {
  "1": "1 real bed",
  "2": "2 real beds",
  "3": "3 real beds",
  "4": "4 real beds",
  "5": "5 real beds",
  "6-plus": "6 or more real beds",
  "not-sure": "Not sure how many real beds",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-1000": "Under $1,000 total",
  "1000-2500": "$1,000 to $2,500 total",
  "2500-5000": "$2,500 to $5,000 total",
  "5000-plus": "$5,000+ total",
  "not-sure": "Budget not set yet",
};

const ADD_ON_LABELS: Record<string, string> = {
  "wifi-starlink": "Wi-Fi Starlink (paid add-on, quote the price)",
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
  const groupLine = `${data.adults} adults, ${data.kids} kids (${data.adults + data.kids} total)`;

  const lines = [
    qualified
      ? "QUALIFIED COTA 2026 availability request (dates + group + contact)"
      : "COTA 2026 availability request",
    "",
    "CAMPSITE",
    line("Placement", CAMPSITE_LABELS[data.campsite] ?? data.campsite),
    line("Site number", data.siteNumber),
    line("Dates", datesLine),
    line("Power", POWER_NOTE[data.campsite]),
    "",
    "GROUP & RV FIT",
    line("Group", groupLine),
    line("Real beds wanted", data.beds ? BEDS_LABELS[data.beds] : ""),
    line("Budget", data.budget ? BUDGET_LABELS[data.budget] : ""),
    line(
      "Add-ons",
      data.addOns.length > 0 ? data.addOns.map((a) => ADD_ON_LABELS[a] ?? a).join(", ") : ""
    ),
    line("Notes", data.message),
    "",
    "CONTACT",
    line("Name", data.fullName),
    line("Phone", data.phone),
    line("Email", data.email),
    line("Prefers", data.contactMethod ? CONTACT_LABELS[data.contactMethod] : ""),
    line("Lead source", data.source),
    "",
    "Next: confirm the campsite, unit fit and delivery access before quoting.",
    "Sent from the Triple W F1 landing page",
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
    siteNumber: formData.get("siteNumber"),
    arrivalDate: formData.get("arrivalDate"),
    departureDate: formData.get("departureDate"),
    adults: formData.get("adults"),
    kids: formData.get("kids"),
    beds: formData.get("beds"),
    budget: formData.get("budget"),
    addOns: formData.getAll("addOns"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contactMethod: pickField(formData, "contactMethod"),
    message: formData.get("message"),
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
    const staySummary = formatStaySummary(data.arrivalDate, data.departureDate);
    try {
      await resend.emails.send({
        from: `Triple W Rentals <${fromEmail}>`,
        to: data.email,
        replyTo: toList[0],
        subject: "Your COTA race-weekend request: next steps",
        text: `
Hi ${data.fullName.split(" ")[0]},

Got your request for race weekend. ${staySummary}.

${data.addOns.includes("wifi-starlink") ? "Noted: you asked about Wi-Fi (Starlink). It's a paid add-on and the price will be in your quote.\n\n" : ""}Here's what happens next:
1. We check which units fit your group and confirm your campsite.
2. We confirm we can get the rig on your site and lock the setup and pickup windows.
3. We ${data.contactMethod === "email" ? "email" : data.contactMethod === "text" ? "text" : "call"} you back with an itemized weekend quote, usually within two hours during business hours or first thing the next morning.

Heads up: race tickets are sold separately. The RV and your campsite are confirmed in writing before any payment.

Need us sooner? Call or text (972) 965-6901.

- Westin & the Triple W team
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
      siteNumber: data.siteNumber,
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      adults: String(data.adults),
      kids: String(data.kids),
      beds: data.beds,
      budget: data.budget,
      addOns: data.addOns,
      message: data.message,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      contactMethod: data.contactMethod,
      source: data.source ?? "",
    },
  };
}
