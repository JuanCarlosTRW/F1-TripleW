# Booking Inquiry Form — Full Implementation

Complete, ready-to-paste code for the Resend-powered inquiry form. Built for Next.js 16 App Router with Server Actions.

**IMPORTANT (from `AGENTS.md`):** Next 16 has breaking changes vs older versions. Before implementing, read `node_modules/next/dist/docs/` for the current Server Action pattern and confirm nothing I reference below has shifted.

---

## 1. Dependencies to Install

```bash
npm install resend zod
```

That's it. No new UI libraries — form uses the existing Tailwind + Framer Motion stack.

---

## 2. Environment Variables

Create / update `.env.local` at the project root. **`.env.local` is git-ignored by default in Next.js — never commit it.**

```env
# Resend — https://resend.com/api-keys
RESEND_API_KEY=re_hW7ztkY1_C1SeqcZx3eFiKo7sn6py7YnT

# Where inquiries are sent
INQUIRY_TO_EMAIL=jcpl-07@hotmail.com

# Verified sending domain in Resend
# Until a real domain is verified, use the Resend sandbox sender:
#   RESEND_FROM_EMAIL=onboarding@resend.dev
# After verifying triplewrentals.com in Resend, switch to:
#   RESEND_FROM_EMAIL=inquiries@triplewrentals.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**⚠️ Security note:** The API key above is already in this chat transcript. After we ship, rotate the key at https://resend.com/api-keys and replace it in `.env.local`.

**⚠️ Domain verification:** Resend's `onboarding@resend.dev` sender can only send to *your own verified account email*. That works for the **owner notification** (since the destination is your Hotmail, and you'll add that address to Resend's "allowed recipients" for sandbox). It will **NOT** deliver to prospects (the auto-reply). To enable auto-reply to prospects, verify a domain you own — ideally `triplewrentals.com` — in Resend, then switch `RESEND_FROM_EMAIL` to something like `inquiries@triplewrentals.com`.

**Verification steps for `triplewrentals.com`:**
1. Log into Resend → Domains → Add Domain → `triplewrentals.com`
2. Resend shows you 3 DNS records (TXT for verification, MX for receiving, DKIM TXT for signing).
3. Add each to your domain registrar's DNS panel.
4. Wait 10–30 minutes for DNS propagation.
5. Click "Verify" in Resend. Domain should show green.
6. Update `RESEND_FROM_EMAIL` to `inquiries@triplewrentals.com` (or any prefix@yourdomain).

Until that's done, the code below will still deliver owner notifications to your Hotmail but silently skip the prospect auto-reply (guarded by a check).

---

## 3. Server Action — `app/actions/inquiry.ts`

Create a new file at `app/actions/inquiry.ts`:

```typescript
"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const InquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(200),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  arrivalDate: z.string().min(1, "Arrival date required"),
  departureDate: z.string().min(1, "Departure date required"),
  groupSize: z.coerce.number().int().min(1).max(20),
  rvPreference: z.enum(["any", "class-a", "fifth-wheel", "travel-trailer", "advise"]),
  addOns: z.array(z.enum(["generator", "outdoor-kit", "groceries"])).default([]),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot — must be empty. Bots fill it.
  website: z.string().max(0, "bot").optional().default(""),
});

export type InquiryState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof InquirySchema>, string>>;
  // Preserved values so we can repopulate the form on validation failure
  values?: Partial<z.infer<typeof InquirySchema>>;
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
    website: formData.get("website"), // honeypot
  };

  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: InquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof InquirySchema>;
      fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fieldErrors,
      values: raw as Partial<z.infer<typeof InquirySchema>>,
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
      message: "We couldn't submit your request right now. Please call (972) 965-6901.",
    };
  }

  const addOnLabels: Record<string, string> = {
    generator: "Generator",
    "outdoor-kit": "Outdoor Kit",
    groceries: "Pre-stocked groceries",
  };
  const addOnsText = data.addOns.length
    ? data.addOns.map(a => addOnLabels[a] ?? a).join(", ")
    : "None";

  const rvLabels: Record<string, string> = {
    any: "Any",
    "class-a": "Class A Motorhome",
    "fifth-wheel": "Fifth Wheel",
    "travel-trailer": "Travel Trailer",
    advise: "Advise me",
  };

  // 1. Owner notification
  const ownerEmail = await resend.emails.send({
    from: `Triple W Inquiry <${fromEmail}>`,
    to: toEmail,
    replyTo: data.email,
    subject: `New F1 inquiry — ${data.name} (${data.groupSize} guests)`,
    text: `
New inquiry from TripleW landing page.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Arrival: ${data.arrivalDate}
Departure: ${data.departureDate}
Group size: ${data.groupSize}
RV preference: ${rvLabels[data.rvPreference]}
Add-ons: ${addOnsText}

Message:
${data.message || "(none)"}

— Sent from the Triple W F1 landing page
`.trim(),
  });

  if (ownerEmail.error) {
    console.error("Resend owner email error:", ownerEmail.error);
    return {
      ok: false,
      message: "We couldn't submit your request right now. Please call (972) 965-6901.",
    };
  }

  // 2. Prospect auto-reply — only if we have a verified sending domain
  //    onboarding@resend.dev can't send to arbitrary recipients in sandbox mode,
  //    so skip auto-reply when using the sandbox sender.
  const hasVerifiedDomain = !fromEmail.endsWith("@resend.dev");
  if (hasVerifiedDomain) {
    await resend.emails.send({
      from: `Corbin at Triple W <${fromEmail}>`,
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

— Corbin Walker
   Owner, Triple W Rentals
   Tyler, Texas
`.trim(),
    });
    // We don't block on auto-reply errors — the lead is already captured.
  }

  return {
    ok: true,
    message: "Thanks. Corbin will call you back within a few hours.",
  };
}
```

---

## 4. Form Component — `components/BookingInquiryForm.tsx`

Create a new file at `components/BookingInquiryForm.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = { ok: false };

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function BookingInquiryForm({ variant = "primary" }: { variant?: "primary" | "compact" }) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-w-xl mx-auto text-center py-12"
      >
        <div className="inline-flex w-14 h-14 rounded-full bg-[#D4A853]/15 border border-[#D4A853] items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[var(--font-cormorant)] text-3xl text-[#F5F0E8]">
          Got it.
        </h3>
        <p className="mt-4 text-base text-[#F5F0E8]/80 leading-relaxed">
          {state.message}
        </p>
        <p className="mt-6 text-sm text-[#F5F0E8]/60">
          Want it faster?{" "}
          <a href="tel:9729656901" className="text-[#D4A853] hover:underline">
            Call (972) 965-6901
          </a>
        </p>
      </motion.div>
    );
  }

  const vals = state.values ?? {};

  return (
    <motion.form
      id="request-a-quote"
      action={formAction}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease }}
      className={`${
        variant === "primary" ? "max-w-3xl" : "max-w-2xl"
      } mx-auto bg-[#1A1510] border border-[#D4A853]/20 rounded-sm p-6 md:p-10`}
    >
      <div className="text-center mb-8">
        <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-3">
          Request a Quote
        </span>
        <h3 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#F5F0E8]">
          Tell us about your weekend.
        </h3>
        <p className="mt-3 text-sm text-[#F5F0E8]/70">
          Corbin calls you back within a few hours. Or{" "}
          <a href="tel:9729656901" className="text-[#D4A853] hover:underline">
            call now at (972) 965-6901
          </a>.
        </p>
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <label className="absolute left-[-9999px]" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label="Your name"
          name="name"
          required
          defaultValue={(vals.name as string) ?? ""}
          error={state.errors?.name}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          defaultValue={(vals.phone as string) ?? ""}
          error={state.errors?.phone}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={(vals.email as string) ?? ""}
          error={state.errors?.email}
          wide
        />
        <Field
          label="Arrival date"
          name="arrivalDate"
          type="date"
          required
          defaultValue={(vals.arrivalDate as string) ?? "2026-10-22"}
          min="2026-01-01"
          error={state.errors?.arrivalDate}
        />
        <Field
          label="Departure date"
          name="departureDate"
          type="date"
          required
          defaultValue={(vals.departureDate as string) ?? "2026-10-26"}
          min="2026-01-01"
          error={state.errors?.departureDate}
        />
        <Field
          label="Group size"
          name="groupSize"
          type="number"
          required
          min={1}
          max={20}
          defaultValue={(vals.groupSize as string) ?? "6"}
          error={state.errors?.groupSize}
        />

        <div className="md:col-span-1">
          <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
            RV preference
          </label>
          <select
            name="rvPreference"
            defaultValue={(vals.rvPreference as string) ?? "any"}
            className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm"
          >
            <option value="any">Any</option>
            <option value="class-a">Class A Motorhome</option>
            <option value="fifth-wheel">Fifth Wheel</option>
            <option value="travel-trailer">Travel Trailer</option>
            <option value="advise">Not sure — advise me</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <span className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-3">
            Add-ons (optional)
          </span>
          <div className="flex flex-wrap gap-3">
            {[
              { val: "generator", label: "Generator" },
              { val: "outdoor-kit", label: "Outdoor Kit ($100)" },
              { val: "groceries", label: "Pre-stocked fridge" },
            ].map((opt) => (
              <label
                key={opt.val}
                className="inline-flex items-center gap-2 bg-[#0D0B09] border border-[#F5F0E8]/15 px-4 py-2.5 rounded-sm text-sm text-[#F5F0E8]/80 cursor-pointer hover:border-[#D4A853]/50 transition-colors has-[:checked]:border-[#D4A853] has-[:checked]:text-[#F5F0E8]"
              >
                <input
                  type="checkbox"
                  name="addOns"
                  value={opt.val}
                  defaultChecked={
                    Array.isArray(vals.addOns) &&
                    (vals.addOns as string[]).includes(opt.val)
                  }
                  className="accent-[#D4A853]"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
            Anything else?
          </label>
          <textarea
            name="message"
            rows={3}
            maxLength={2000}
            defaultValue={(vals.message as string) ?? ""}
            placeholder="Campground preference, special requests, flexibility on dates…"
            className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {state.message && !state.ok && (
        <p className="mt-6 text-sm text-[#D4A853] text-center">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 w-full bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send & Get a Callback"}
      </button>

      <p className="mt-4 text-xs text-center text-[#F5F0E8]/50">
        Prefer to talk? Call Corbin directly at{" "}
        <a href="tel:9729656901" className="text-[#D4A853]">
          (972) 965-6901
        </a>
      </p>
    </motion.form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  error,
  wide,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  wide?: boolean;
  min?: string | number;
  max?: string | number;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
        {label}
        {required && <span className="text-[#D4A853] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className={`w-full bg-[#0D0B09] border ${
          error ? "border-red-500/60" : "border-[#F5F0E8]/15"
        } text-[#F5F0E8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
```

**Implementation notes:**
- Uses `useActionState` — the Next.js 16 / React 19 pattern. If you're on an older React version, swap to `useFormState` from `react-dom`.
- Progressive enhancement: the form works without JS (server action handles naked `<form action>`).
- Honeypot uses `absolute left-[-9999px]` visually hidden but accessible to bots.
- `has-[:checked]` Tailwind pseudo-selector for checkbox styling — requires Tailwind 3.4+. You're on Tailwind 4, so this works.

---

## 5. Mount Points in `app/page.tsx`

**Import at the top** of `app/page.tsx`:

```tsx
import BookingInquiryForm from "@/components/BookingInquiryForm";
```

### Primary mount — replace the mid-page CTA strip (lines 528–551)

Replace the entire `{/* ─── MID-PAGE CTA STRIP ─── */}` section with:

```tsx
{/* ─── MID-PAGE: INQUIRY FORM ─── */}
<section className="bg-[#0D0B09] py-20 md:py-28 px-6">
  <BookingInquiryForm variant="primary" />
</section>
```

### Secondary mount — below the Final CTA (after line 748)

Optional: Add a compact instance below the Final CTA section but before the footer. If you'd rather keep the page tighter, skip this and let the primary form + the `#request-a-quote` anchor link from the hero/final CTAs do the work.

If you want it:

```tsx
{/* ─── SECONDARY INQUIRY FORM ─── */}
<section className="bg-[#0D0B09] py-16 px-6 border-t border-[#D4A853]/10">
  <BookingInquiryForm variant="compact" />
</section>
```

### Hero secondary CTA link (around line 232)

Add under the primary phone button:

```tsx
<motion.a
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease, delay: 0.7 }}
  href="#request-a-quote"
  className="block mt-4 text-sm text-[#F5F0E8]/70 hover:text-[#D4A853] transition-colors underline underline-offset-4"
>
  Prefer to not call? Request a quote &rarr;
</motion.a>
```

---

## 6. Test Checklist (before deploy)

Run locally with `npm run dev`:

1. Fill form with valid data → submit → confirm owner email arrives at `jcpl-07@hotmail.com` within 30s. Success state renders.
2. Submit with empty required fields → inline red errors show on each missing field, submit button re-enables.
3. Submit with invalid email (`foo@bar`) → email field shows error.
4. Submit with departure date before arrival date → currently not validated; consider adding a refinement in `InquirySchema` (see enhancement below).
5. Fill the honeypot `website` field manually via dev tools → submit → should show success state with NO email sent.
6. Test on mobile viewport (375px) → all inputs are ≥44px tall (tap-target friendly).
7. Turn off JS → form still submits and works (progressive enhancement check).

### Optional zod enhancement for date ordering

Add after the base `InquirySchema`:

```typescript
const InquirySchema = z.object({ /* ...fields... */ }).refine(
  (data) => new Date(data.departureDate) > new Date(data.arrivalDate),
  { message: "Departure must be after arrival", path: ["departureDate"] }
);
```

---

## 7. Production Checklist

- [ ] Add `RESEND_API_KEY` to Vercel project env vars (production + preview)
- [ ] Add `INQUIRY_TO_EMAIL` to Vercel env vars
- [ ] Add `RESEND_FROM_EMAIL` to Vercel env vars (use `onboarding@resend.dev` until domain verified)
- [ ] Verify `triplewrentals.com` in Resend to enable prospect auto-replies
- [ ] Switch `RESEND_FROM_EMAIL` to `inquiries@triplewrentals.com` after domain verification
- [ ] Rotate the Resend API key (since it was pasted in chat) — create a new one, update Vercel + `.env.local`, revoke the old
- [ ] Test the full flow from production URL with a real email
- [ ] Add the form's submission event to any analytics you're running (Google Analytics, Plausible) for funnel tracking
