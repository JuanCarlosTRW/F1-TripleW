"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const InquirySchema = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(100),
    email: z.string().trim().email("Valid email required").max(200),
    phone: z.string().trim().min(7, "Phone is required").max(30),
    dateRangeStart: z.string().min(1, "Arrival date required"),
    dateRangeEnd: z.string().min(1, "Departure date required"),
    groupSize: z.coerce.number().int().min(1).max(20),
    rvPreference: z.enum([
      "any",
      "class-a",
      "fifth-wheel",
      "travel-trailer",
      "advise",
    ]).default("any"),
    addOns: z.array(z.enum(["wifi-starlink"])).default([]),
    message: z.string().trim().max(2000).optional().default(""),
    source: z.string().trim().max(64).optional().default(""),
    // Honeypot — must be empty. Bots fill it.
    website: z.string().max(0, "bot").optional().default(""),
  })
  .refine(
    (data) =>
      new Date(data.dateRangeEnd) > new Date(data.dateRangeStart),
    { message: "Departure must be after arrival", path: ["dateRangeEnd"] }
  );

export type InquiryValues = z.infer<typeof InquirySchema>;

export type InquiryState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof InquiryValues, string>>;
  values?: Record<string, unknown>;
};

const MONTHS_LONG = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS_LONG[m - 1]} ${d}, ${y}`;
}

function nightsBetween(startIso: string, endIso: string) {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    dateRangeStart: formData.get("dateRangeStart"),
    dateRangeEnd: formData.get("dateRangeEnd"),
    groupSize: formData.get("groupSize"),
    rvPreference: formData.get("rvPreference") || "any",
    addOns: formData.getAll("addOns"),
    message: formData.get("message"),
    source: formData.get("source"),
    website: formData.get("website"),
  };

  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: InquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof InquiryValues;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fieldErrors,
      values: raw as Record<string, unknown>,
    };
  }

  const data = parsed.data;

  // Silent bot reject — honeypot filled
  if (data.website && data.website.length > 0) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!toEmail) {
    console.error("INQUIRY_TO_EMAIL env var is missing");
    return {
      ok: false,
      message:
        "We couldn't submit your request right now. Please call (972) 965-6901.",
    };
  }

  const addOnLabels: Record<string, string> = {
    "wifi-starlink": "Wi-Fi Starlink (paid add-on)",
  };
  const addOnsText = data.addOns.length
    ? data.addOns.map((a) => addOnLabels[a] ?? a).join(", ")
    : "None";

  const rvLabels: Record<string, string> = {
    any: "Any",
    "class-a": "Class A Motorhome",
    "fifth-wheel": "Fifth Wheel",
    "travel-trailer": "Travel Trailer",
    advise: "Advise me",
  };

  const nights = nightsBetween(data.dateRangeStart, data.dateRangeEnd);
  const dateRangeText = `${formatDate(data.dateRangeStart)} → ${formatDate(data.dateRangeEnd)} (${nights} nights)`;
  const sourceLabel = data.source ? data.source : "direct";

  // 1. Owner notification
  try {
    const ownerEmail = await resend.emails.send({
      from: `Triple W Inquiry <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `New F1 inquiry — ${data.name} (${data.groupSize} guests)`,
      text: `
New inquiry from TripleW F1 landing page.

Name:        ${data.name}
Phone:       ${data.phone}
Email:       ${data.email}

Dates:       ${dateRangeText}
Group size:  ${data.groupSize}
RV pref:     ${rvLabels[data.rvPreference]}
Add-ons:     ${addOnsText}

Lead source: ${sourceLabel}

Message:
${data.message || "(none)"}

— Sent from the Triple W F1 landing page
`.trim(),
    });

    if (ownerEmail.error) {
      console.error("Resend owner email error:", ownerEmail.error);
      return {
        ok: false,
        message:
          "We couldn't submit your request right now. Please call (972) 965-6901.",
      };
    }
  } catch (err) {
    console.error("Resend owner email exception:", err);
    return {
      ok: false,
      message:
        "We couldn't submit your request right now. Please call (972) 965-6901.",
    };
  }

  // 2. Prospect auto-reply — only if we have a verified sending domain.
  const hasVerifiedDomain = !fromEmail.endsWith("@resend.dev");
  if (hasVerifiedDomain) {
    try {
      await resend.emails.send({
        from: `Triple W Rentals <${fromEmail}>`,
        to: data.email,
        replyTo: toEmail,
        subject: "We got your F1 weekend inquiry",
        text: `
Hi ${data.name.split(" ")[0]},

Thanks for reaching out about race weekend. I got your details:

• ${dateRangeText}
• Group of ${data.groupSize}
• RV preference: ${rvLabels[data.rvPreference]}
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
    message: `We'll call you within 2 hours at ${data.phone}.`,
    values: { phone: data.phone },
  };
}
