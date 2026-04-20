"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, DollarSign, Minus, Phone, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import DateRangePickerField from "@/components/ui/DateRangePickerField";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = { ok: false };

const ease = [0.25, 0.1, 0.25, 1] as const;

type Variant = "primary" | "compact";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function BookingInquiryForm({
  variant = "primary",
  source = "",
}: {
  variant?: Variant;
  source?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState(6);
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    if (state.values && typeof state.values.phone === "string") {
      setPhone(state.values.phone);
    }
  }, [state.values]);

  if (state.ok) {
    const returnPhone = (state.values?.phone as string) || "(972) 965-6901";
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
        <h3 className="font-[var(--font-cormorant)] text-3xl text-[#F5F0E8]">
          Got it.
        </h3>
        <p className="mt-4 text-base text-[#F5F0E8]/80 leading-relaxed">
          {state.message ?? `We'll call you within 2 hours at ${returnPhone}.`}
        </p>
        <p className="mt-6 text-sm text-[#F5F0E8]/60">
          In a rush?{" "}
          <a
            href="tel:9729656901"
            className="text-[#D4A853] hover:underline underline-offset-4"
          >
            Call (972) 965-6901 now
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
    if (Array.isArray(v))
      return v.filter((x): x is string => typeof x === "string");
    return [];
  };

  return (
    <motion.form
      id="request-a-quote"
      data-form-container
      action={formAction}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
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
          The team calls you back within 2 hours.
        </p>
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <input type="hidden" name="source" value={source} />

      {/* ─── STEP 1 ─── */}
      <div className="mb-7">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4A853] text-[#0D0B09] text-[10px] font-bold">
            1
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/60 font-medium">
            When and how many
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
          <DateRangePickerField
            name="dateRange"
            error={
              state.errors?.dateRangeStart ?? state.errors?.dateRangeEnd
            }
          />
          <div>
            <div className="md:mb-3 h-0 md:h-auto" />
            <div className="flex items-stretch bg-[#0D0B09] border border-[#F5F0E8]/15 rounded-sm overflow-hidden focus-within:border-[#D4A853] focus-within:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all">
              <button
                type="button"
                onClick={() => setGroupSize((g) => Math.max(2, g - 1))}
                className="w-12 flex items-center justify-center text-[#F5F0E8]/70 hover:text-[#D4A853] hover:bg-[#D4A853]/5 transition-colors min-h-[44px]"
                aria-label="Decrease group size"
              >
                <Minus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <div className="flex-1 flex flex-col items-center justify-center px-3 min-w-[90px]">
                <span className="text-[10px] uppercase tracking-wider text-[#F5F0E8]/50 leading-none mb-0.5">
                  Group
                </span>
                <span className="font-[var(--font-cormorant)] text-2xl text-[#F5F0E8] leading-none">
                  {groupSize}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setGroupSize((g) => Math.min(12, g + 1))}
                className="w-12 flex items-center justify-center text-[#F5F0E8]/70 hover:text-[#D4A853] hover:bg-[#D4A853]/5 transition-colors min-h-[44px]"
                aria-label="Increase group size"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <input type="hidden" name="groupSize" value={groupSize} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── STEP 2 ─── */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4A853] text-[#0D0B09] text-[10px] font-bold">
            2
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/60 font-medium">
            How to reach you
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Full name"
            name="name"
            required
            defaultValue={getStr("name")}
            error={state.errors?.name}
            autoComplete="name"
          />
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/60 mb-2 font-medium">
              Phone<span className="text-[#D4A853] ml-1">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              autoComplete="tel"
              inputMode="tel"
              placeholder="(972) 965-6901"
              className={`w-full bg-[#0D0B09] border ${
                state.errors?.phone
                  ? "border-[#B8732E]/70"
                  : "border-[#F5F0E8]/15"
              } text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all text-sm placeholder:text-[#F5F0E8]/30`}
            />
            {state.errors?.phone && (
              <p className="mt-1.5 text-xs text-[#B8732E]">
                {state.errors.phone}
              </p>
            )}
          </div>
          <Field
            label="Email"
            name="email"
            type="email"
            required
            defaultValue={getStr("email")}
            error={state.errors?.email}
            wide
            autoComplete="email"
          />
        </div>
      </div>

      {/* ─── OPTIONAL ─── */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setOptionsOpen((o) => !o)}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F5F0E8]/60 hover:text-[#D4A853] transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              optionsOpen ? "rotate-180" : ""
            }`}
          />
          Add RV preference, add-ons, or a message (optional)
        </button>

        <AnimatePresence initial={false}>
          {optionsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/60 mb-2 font-medium">
                    RV preference
                  </label>
                  <select
                    name="rvPreference"
                    defaultValue={getStr("rvPreference") || "any"}
                    className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="class-a">Class A Motorhome</option>
                    <option value="fifth-wheel">Fifth Wheel</option>
                    <option value="travel-trailer">Travel Trailer</option>
                    <option value="advise">Not sure — advise me</option>
                  </select>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/60 mb-2 font-medium">
                    Add-ons
                  </span>
                  <label className="inline-flex items-center gap-2.5 bg-[#0D0B09] border border-[#F5F0E8]/15 px-4 py-2.5 rounded-sm text-sm text-[#F5F0E8]/80 cursor-pointer hover:border-[#D4A853]/50 transition-colors has-[:checked]:border-[#D4A853] has-[:checked]:text-[#F5F0E8]">
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

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/60 mb-2 font-medium">
                    Anything else?
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={2000}
                    defaultValue={getStr("message")}
                    placeholder="Campground preference, special requests, flexibility on dates…"
                    className="w-full bg-[#0D0B09] border border-[#F5F0E8]/15 text-[#F5F0E8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4A853] focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all text-sm resize-none placeholder:text-[#F5F0E8]/30"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {state.message && !state.ok && (
        <div className="mb-5 px-4 py-3 bg-[#B8732E]/10 border border-[#B8732E]/30 rounded-sm">
          <p className="text-sm text-[#B8732E] text-center">
            {state.errors
              ? state.message
              : `Something went wrong. Please call us directly at (972) 965-6901 — we'll take care of you.`}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:brightness-105 active:scale-[0.99] transition-all text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(212,168,83,0.2)]"
      >
        {isPending ? (
          <span className="inline-flex items-center gap-2.5">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
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

      <p className="mt-4 text-xs text-center text-[#F5F0E8]/55">
        Prefer to talk now?{" "}
        <a
          href="tel:9729656901"
          className="text-[#D4A853] hover:underline underline-offset-4 inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3" strokeWidth={2.5} />
          (972) 965-6901 — Weston answers directly
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
  autoComplete,
  placeholder,
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
  autoComplete?: string;
  placeholder?: string;
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
        min={min}
        max={max}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full bg-[#0D0B09] border ${
          error ? "border-[#B8732E]/70" : "border-[#F5F0E8]/15"
        } text-[#F5F0E8] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#D4A853] focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] transition-all text-sm placeholder:text-[#F5F0E8]/30`}
      />
      {error && <p className="mt-1.5 text-xs text-[#B8732E]">{error}</p>}
    </div>
  );
}
