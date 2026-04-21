"use client";

import { motion } from "framer-motion";
import { DollarSign, Minus, Plus } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import type { DateRange } from "react-aria-components";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import F1QuoteDateRange, { F1_WEEKEND_RANGE } from "@/components/F1QuoteDateRange";
import PhoneLink from "@/components/PhoneLink";

const initialState: InquiryState = { ok: false };

const ease = [0.25, 0.1, 0.25, 1] as const;

type Variant = "primary" | "compact";

function displayPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw.trim() || "(972) 965-6901";
}

function getStr(vals: Record<string, unknown> | undefined, k: string): string {
  if (!vals) return "";
  const v = vals[k];
  return typeof v === "string" ? v : "";
}

function getAddOns(vals: Record<string, unknown> | undefined): string[] {
  if (!vals) return [];
  const v = vals.addOns;
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

export default function BookingInquiryForm({
  variant = "primary",
  source = "",
}: {
  variant?: Variant;
  source?: string;
}) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const [range, setRange] = useState<DateRange | null>(F1_WEEKEND_RANGE);
  const [groupSize, setGroupSize] = useState(6);
  const conversionFired = useRef(false);

  useEffect(() => {
    if (!state.ok) {
      conversionFired.current = false;
      return;
    }
    if (conversionFired.current) return;
    conversionFired.current = true;
    if (typeof window !== "undefined" && window.gtag) {
      // TODO: Replace FORM_SUBMIT_LABEL with actual conversion label from Google Ads
      window.gtag("event", "conversion", {
        send_to: "AW-10835426783/FORM_SUBMIT_LABEL",
        value: 1.0,
        currency: "USD",
      });
    }
  }, [state.ok]);

  if (state.ok) {
    const phoneRaw = getStr(state.values, "phone");
    const shown = displayPhone(phoneRaw);
    return (
      <motion.div
        id="request-a-quote"
        data-form-container
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
        <h3 className="font-[var(--font-cormorant)] text-3xl text-[#F5F0E8]">✓ Got it.</h3>
        <p className="mt-4 text-base text-[#F5F0E8]/80 leading-relaxed">
          We&apos;ll call you within 2 hours at {shown}.
        </p>
        <p className="mt-4 text-sm text-[#F5F0E8]/70 leading-relaxed">
          In a rush? Call{" "}
          <PhoneLink className="text-[#D4A853] hover:underline underline-offset-4">
            (972) 965-6901
          </PhoneLink>{" "}
          now.
        </p>
      </motion.div>
    );
  }

  const vals = state.values;
  const serverFail =
    state.message &&
    state.message.includes("Something went wrong") &&
    !state.errors;

  return (
    <motion.form
      id="request-a-quote"
      data-form-container
      action={formAction}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className={`${
        variant === "primary" ? "max-w-2xl" : "max-w-xl"
      } mx-auto bg-[#1A1510] border border-[#D4A853]/20 rounded-lg p-6 md:p-10 relative`}
      style={{ boxShadow: "var(--shadow-card-gold)" }}
    >
      <div className="text-center mb-8">
        <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-3">
          Request a Callback
        </span>
        <h3 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#F5F0E8]">
          Tell us about your weekend.
        </h3>
        <p className="mt-3 text-sm text-[#F5F0E8]/70">
          The team calls back within 2 hours. Or{" "}
          <PhoneLink className="text-[#D4A853] hover:underline underline-offset-4">
            call now at (972) 965-6901
          </PhoneLink>
          .
        </p>
      </div>

      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <input type="hidden" name="source" value={source} />

      {serverFail ? (
        <div
          className="mb-8 rounded-sm border border-[#B8732E]/40 bg-[#0D0B09] px-4 py-4 text-center text-sm text-[#F5F0E8]/85"
          role="alert"
        >
          Something went wrong. Please call us directly at (972) 965-6901 — we&apos;ll take care of
          you.
        </div>
      ) : null}

      <div className="mb-10 rounded-sm border border-[#F5F0E8]/10 bg-[#0D0B09]/40 p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.15em] text-[#D4A853]/90 mb-4">
          Step 1 — When and how many
        </p>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <F1QuoteDateRange
            value={range}
            onChange={setRange}
            error={state.errors?.dateRange}
          />
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
              Group size
            </span>
            <input type="hidden" name="groupSize" value={groupSize} readOnly />
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease group size"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#F5F0E8]/15 text-[#F5F0E8] hover:border-[#D4A853]/50 hover:text-[#D4A853] transition-colors disabled:opacity-40"
                disabled={groupSize <= 2}
                onClick={() => setGroupSize((n) => Math.max(2, n - 1))}
              >
                <Minus className="w-5 h-5" strokeWidth={2} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Group size"
                value={String(groupSize)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  if (raw === "") return;
                  const v = parseInt(raw, 10);
                  if (Number.isNaN(v)) return;
                  setGroupSize(Math.min(12, Math.max(2, v)));
                }}
                className="min-w-0 flex-1 bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-3 py-3 rounded-sm text-center text-sm focus:outline-none focus:border-[#D4A853]"
              />
              <button
                type="button"
                aria-label="Increase group size"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#F5F0E8]/15 text-[#F5F0E8] hover:border-[#D4A853]/50 hover:text-[#D4A853] transition-colors disabled:opacity-40"
                disabled={groupSize >= 12}
                onClick={() => setGroupSize((n) => Math.min(12, n + 1))}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            {state.errors?.groupSize ? (
              <p className="mt-2 text-xs text-[#B8732E]">{state.errors.groupSize}</p>
            ) : (
              <p className="mt-2 text-xs text-[#F5F0E8]/45">Optional</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-sm border border-[#F5F0E8]/10 bg-[#0D0B09]/40 p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.15em] text-[#D4A853]/90 mb-4">
          Step 2 — How to reach you
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <Field
            label="Full name"
            name="fullName"
            required
            defaultValue={getStr(vals, "fullName")}
            error={state.errors?.fullName}
            autoComplete="name"
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            required
            defaultValue={getStr(vals, "phone")}
            error={state.errors?.phone}
            autoComplete="tel"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            defaultValue={getStr(vals, "email")}
            error={state.errors?.email}
            wide
            autoComplete="email"
          />
        </div>
        <p className="mt-3 text-xs text-[#F5F0E8]/45">All three required</p>
      </div>

      <details className="group mb-8 rounded-sm border border-[#F5F0E8]/10 bg-[#0D0B09]/30">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm text-[#F5F0E8]/70 marker:content-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
          <span>Optional: add-ons, anything else</span>
          <span className="text-[#D4A853] transition-transform group-open:rotate-180">▾</span>
        </summary>
        <div className="border-t border-[#F5F0E8]/10 p-4 md:p-5 space-y-5">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-3">
              Add-ons (optional)
            </span>
            <label className="inline-flex items-center gap-2.5 bg-[#0D0B09] border border-[#F5F0E8]/15 px-4 py-2.5 rounded-sm text-sm text-[#F5F0E8]/80 cursor-pointer hover:border-[#D4A853]/50 transition-colors has-[:checked]:border-[#D4A853] has-[:checked]:text-[#F5F0E8]">
              <input
                type="checkbox"
                name="addOns"
                value="wifi-starlink"
                defaultChecked={getAddOns(vals).includes("wifi-starlink")}
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
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/60 mb-2">
              Anything else?
            </label>
            <textarea
              name="message"
              rows={3}
              maxLength={2000}
              defaultValue={getStr(vals, "message")}
              placeholder="Campground preference, special requests, flexibility on dates…"
              className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4A853] transition-colors text-sm resize-none placeholder:text-[#F5F0E8]/30"
            />
          </div>
        </div>
      </details>

      {state.message && !state.ok && !serverFail ? (
        <p className="mb-4 text-sm text-[#B8732E] text-center">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:brightness-105 active:scale-[0.99] transition-all text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(212,168,83,0.2)]"
      >
        {isPending ? (
          <span className="inline-flex items-center justify-center gap-2.5">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Sending…
          </span>
        ) : (
          "Send Request — We Call You Back in 2 Hours"
        )}
      </button>

      <p className="mt-4 text-xs text-center text-[#F5F0E8]/50">
        Prefer to talk now? Call{" "}
        <PhoneLink className="text-[#D4A853] hover:underline underline-offset-4">
          (972) 965-6901
        </PhoneLink>{" "}
        — Weston answers directly.
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
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  wide?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/60 mb-2 font-medium">
        {label}
        {required && <span className="text-[#D4A853] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className={`w-full bg-[#0D0B09] border ${
          error ? "border-[#B8732E]/70" : "border-[#F5F0E8]/15"
        } text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all text-sm placeholder:text-[#F5F0E8]/30`}
      />
      {error && <p className="mt-1.5 text-xs text-[#B8732E]">{error}</p>}
    </div>
  );
}
