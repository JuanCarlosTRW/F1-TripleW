"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const InquirySchema = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(100),
    email: z.string().trim().email("Valid email required").max(200),
    phone: z.string().trim().min(7, "Phone is required").max(30),
    arrivalDate: z.string().min(1, "Arrival date required"),
    departureDate: z.string().min(1, "Departure date required"),
    groupSize: z.coerce.number().int().min(1).max(20),
    rvPreference: z.enum([
      "any",
      "class-a",
      "fifth-wheel",
      "travel-trailer",
      "advise",
    ]),
    addOns: z.array(z.enum(["wifi-starlink"])).default([]),
    message: z.string().trim().max(2000).optional().default(""),
    // Honeypot — must be empty. Bots fill it.
    website: z.string().max(0, "bot").optional().default(""),
  })
  .refine(
    (data) => new Date(data.departureDate) > new Date(data.arrivalDate),
    { message: "Departure must be after arrival", path: ["departureDate"] }
  );

export type InquiryValues = z.infer<typeof InquirySchema>;

export type InquiryState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof InquiryValues, string>>;
  values?: Record<string, unknown>;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    arrivalDate: formData.get("arrivalDate"),
    departureDate: formData.get("departureDate"),
    groupSize: formData.get("groupSize"),
    rvPreference: formData.get("rvPreference"),
    addOns: formData.getAll("addOns"),
    message: formData.get("message"),
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

Arrival:     ${data.arrivalDate}
Departure:   ${data.departureDate}
Group size:  ${data.groupSize}
RV pref:     ${rvLabels[data.rvPreference]}
Add-ons:     ${addOnsText}

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
  //    onboarding@resend.dev can't send to arbitrary recipients in sandbox mode,
  //    so skip auto-reply when using the sandbox sender.
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

• ${data.arrivalDate} → ${data.departureDate}
• Group of ${data.groupSize}
• RV preference: ${rvLabels[data.rvPreference]}
${data.addOns.length ? `• Add-ons: ${addOnsText}` : ""}

I'll check F1 weekend availability for you and call you back at ${data.phone} within the next few hours (or by 9am tomorrow if you wrote in overnight).

If it's easier, feel free to call or text me directly at (972) 965-6901.

— Weston & the Triple W team
   Tyler, Texas
`.trim(),
      });
    } catch (err) {
      // Non-blocking — the lead is already captured. Log only.
      console.error("Resend auto-reply exception:", err);
    }
  }

  return {
    ok: true,
    message: "Thanks. The Triple W team will call you back within a few hours.",
  };
}
