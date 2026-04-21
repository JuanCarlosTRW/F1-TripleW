"use server";

import { Resend } from "resend";
import { formatDateRangeLine } from "@/lib/format-date-range";
import {
  validateInquiry,
  type InquiryFieldErrors,
  type InquiryParsed,
} from "@/lib/inquiry-validate";

const resend = new Resend(process.env.RESEND_API_KEY);

function parseToAddresses(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildOwnerEmailBody(data: InquiryParsed): string {
  const datesLine = formatDateRangeLine(data.arrivalDate, data.departureDate);
  const addOnLabels: Record<string, string> = {
    "wifi-starlink": "Wi-Fi Starlink (paid add-on)",
  };
  const addOnsText =
    data.addOns.length > 0 ? data.addOns.map((a) => addOnLabels[a] ?? a).join(", ") : "";

  const lines = [
    "New F1 COTA quote request",
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Dates: ${datesLine}`,
    data.groupSize != null ? `Group size: ${data.groupSize}` : "",
    addOnsText ? `Add-ons: ${addOnsText}` : "",
    data.message ? `Message: ${data.message}` : "",
    data.source ? `Lead source: ${data.source}` : "",
    "",
    "— Sent from the Triple W F1 landing page",
  ];
  return lines.filter((l) => l !== "").join("\n");
}

export type InquiryState = {
  ok: boolean;
  message?: string;
  errors?: InquiryFieldErrors;
  values?: Record<string, unknown>;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const raw = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    arrivalDate: formData.get("arrivalDate") ?? formData.get("dateRangeStart"),
    departureDate: formData.get("departureDate") ?? formData.get("dateRangeEnd"),
    groupSize: formData.get("groupSize"),
    addOns: formData.getAll("addOns"),
    message: formData.get("message"),
    source: formData.get("source"),
    website: formData.get("website"),
  };

  const values: Record<string, unknown> = {
    fullName: raw.fullName,
    email: raw.email,
    phone: raw.phone,
    arrivalDate: raw.arrivalDate,
    departureDate: raw.departureDate,
    groupSize: raw.groupSize,
    addOns: raw.addOns,
    message: raw.message,
    source: raw.source,
  };

  const parsed = validateInquiry(raw);

  if (!parsed.ok) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: parsed.errors,
      values,
    };
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return { ok: true, message: "", values: { ...values, phone: data.phone } };
  }

  const toList = parseToAddresses(process.env.INQUIRY_TO_EMAIL);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (toList.length === 0) {
    console.error("INQUIRY_TO_EMAIL env var is missing or empty");
    return {
      ok: false,
      message:
        "Something went wrong. Please call us directly at (972) 965-6901 — we'll take care of you.",
      values,
    };
  }

  const emailBody = buildOwnerEmailBody(data);

  try {
    const ownerEmail = await resend.emails.send({
      from: `Triple W Inquiry <${fromEmail}>`,
      to: toList,
      replyTo: data.email,
      subject: `New F1 inquiry — ${data.fullName}`,
      text: emailBody,
    });

    if (ownerEmail.error) {
      console.error("Resend owner email error:", ownerEmail.error);
      return {
        ok: false,
        message:
          "Something went wrong. Please call us directly at (972) 965-6901 — we'll take care of you.",
        values,
      };
    }
  } catch (err) {
    console.error("Resend owner email exception:", err);
    return {
      ok: false,
      message:
        "Something went wrong. Please call us directly at (972) 965-6901 — we'll take care of you.",
      values,
    };
  }

  const addOnLabels: Record<string, string> = {
    "wifi-starlink": "Wi-Fi Starlink (paid add-on)",
  };
  const addOnsText =
    data.addOns.length > 0 ? data.addOns.map((a) => addOnLabels[a] ?? a).join(", ") : "";
  const datesLine = formatDateRangeLine(data.arrivalDate, data.departureDate);

  const hasVerifiedDomain = !fromEmail.endsWith("@resend.dev");
  if (hasVerifiedDomain) {
    try {
      await resend.emails.send({
        from: `Triple W Rentals <${fromEmail}>`,
        to: data.email,
        replyTo: toList[0],
        subject: "We got your F1 weekend inquiry",
        text: `
Hi ${data.fullName.split(" ")[0]},

Thanks for reaching out about race weekend. I got your details:

• ${datesLine}
${data.groupSize != null ? `• Group of ${data.groupSize}` : ""}
${data.addOns.length ? `• Add-ons: ${addOnsText}` : ""}

I'll check F1 weekend availability for you and call you back at ${data.phone} within 2 hours (or by 9am tomorrow if you wrote in overnight).

If it's easier, feel free to call or text me directly at (972) 965-6901.

— Weston & the Triple W team
   Tyler, Texas
`.trim(),
      });
    } catch (err) {
      console.error("Resend auto-reply exception:", err);
    }
  }

  return {
    ok: true,
    message: "",
    values: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      groupSize: data.groupSize != null ? String(data.groupSize) : "",
      addOns: data.addOns,
      message: data.message,
      source: data.source ?? "",
    },
  };
}
