"use client";

import { motion } from "framer-motion";
import { useActionState } from "react";
import { DollarSign } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = { ok: false };

const ease = [0.25, 0.1, 0.25, 1] as const;

type Variant = "primary" | "compact";

export default function BookingInquiryForm({
  variant = "primary",
}: {
  variant?: Variant;
}) {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );

  if (state.ok) {
    return (
      <motion.div
        id="request-a-quote"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-w-xl mx-auto text-center py-12"
      >
        <div className="inline-flex w-14 h-14 rounded-full bg-[#D4A853]/15 border border-[#D4A853] items-center justify-center mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4A853"
            strokeWidth="2"
          >
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
          <a
            href="tel:9729656901"
            className="text-[#D4A853] hover:underline underline-offset-4"
          >
            Call (972) 965-6901
          </a>
        </p>
      </motion.div>
    );
  }

  const vals = state.values ?? {};
  const getStr = (k: string): string => {
    const v = vals[k];
    return typeof v === "string" ? v : "";
  };
  const getAddOns = (): string[] => {
    const v = vals.addOns;
    if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
    return [];
  };

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
      } mx-auto bg-[#1A1510] border border-[#D4A853]/20 rounded-sm p-6 md:p-10 relative`}
    >
      <div className="text-center mb-8">
        <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-3">
          Request a Quote
        </span>
        <h3 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#F5F0E8]">
          Tell us about your weekend.
        </h3>
        <p className="mt-3 text-sm text-[#F5F0E8]/70">
          The team calls you back within a few hours. Or{" "}
          <a
            href="tel:9729656901"
            className="text-[#D4A853] hover:underline underline-offset-4"
          >
            call now at (972) 965-6901
          </a>
          .
        </p>
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label="Your name"
          name="name"
          required
          defaultValue={getStr("name")}
          error={state.errors?.name}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          defaultValue={getStr("phone")}
          error={state.errors?.phone}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={getStr("email")}
          error={state.errors?.email}
          wide
        />
        <Field
          label="Arrival date"
          name="arrivalDate"
          type="date"
          required
          defaultValue={getStr("arrivalDate") || "2026-10-22"}
          min="2026-01-01"
          error={state.errors?.arrivalDate}
        />
        <Field
          label="Departure date"
          name="departureDate"
          type="date"
          required
          defaultValue={getStr("departureDate") || "2026-10-26"}
          min="2026-01-02"
          error={state.errors?.departureDate}
        />
        <Field
          label="Group size"
          name="groupSize"
          type="number"
          required
          min={1}
          max={20}
          defaultValue={getStr("groupSize") || "6"}
          error={state.errors?.groupSize}
        />

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
            RV preference
          </label>
          <select
            name="rvPreference"
            defaultValue={getStr("rvPreference") || "any"}
            className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm"
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
          <label
            className="inline-flex items-center gap-2.5 bg-[#0D0B09] border border-[#F5F0E8]/15 px-4 py-2.5 rounded-sm text-sm text-[#F5F0E8]/80 cursor-pointer hover:border-[#D4A853]/50 transition-colors has-[:checked]:border-[#D4A853] has-[:checked]:text-[#F5F0E8]"
          >
            <input
              type="checkbox"
              name="addOns"
              value="wifi-starlink"
              defaultChecked={getAddOns().includes("wifi-starlink")}
              className="accent-[#D4A853]"
            />
            <span>Wi-Fi Starlink</span>
            <span
              aria-label="Paid add-on"
              title="Paid add-on"
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/40 text-[#D4A853]"
            >
              <DollarSign className="w-3 h-3" strokeWidth={2.5} />
            </span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
            Anything else?
          </label>
          <textarea
            name="message"
            rows={3}
            maxLength={2000}
            defaultValue={getStr("message")}
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
        Prefer to talk? Call the team directly at{" "}
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
        } text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
