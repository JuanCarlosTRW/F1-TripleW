"use client";

import { Minus, Plus } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { DateRange } from "react-aria-components";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import F1QuoteDateRange, { F1_WEEKEND_RANGE } from "@/components/F1QuoteDateRange";
import PhoneLink from "@/components/PhoneLink";
import SmsLink from "@/components/SmsLink";
import { BUSINESS } from "@/content/site";
import { trackEvent, trackFormSubmitConversion } from "@/lib/analytics";
import type { CampsiteValue } from "@/lib/inquiry-validate";

const initialState: InquiryState = { ok: false };

/** Which step each server-validated field belongs to, for error focus. */
const FIELD_STEP: Record<string, number> = {
  campsite: 1,
  dateRange: 1,
  adults: 2,
  kids: 2,
  fullName: 3,
  phone: 3,
  email: 3,
};

const STEP_LABELS: ReadonlyArray<readonly [number, string]> = [
  [1, "Campsite"],
  [2, "Group"],
  [3, "Contact"],
];

const CAMPSITE_OPTIONS: Array<{
  value: CampsiteValue;
  title: string;
  note: string;
}> = [
  {
    value: "premium",
    title: "COTA Premium RV site",
    note: "Reserved, paved, water + electric",
  },
  {
    value: "lot-n",
    title: "COTA Lot N",
    note: "First come, first served, no hookups",
  },
  {
    value: "other",
    title: "Another campground",
    note: "A reserved site near Austin",
  },
  {
    value: "none",
    title: "No campsite yet",
    note: "We'll explain which types work",
  },
];

const NO_SITE_NOTE =
  "We can explain which campsite types work with our fleet, but campsites must be reserved directly through COTA or another campground.";

function displayPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 11 && d.startsWith("1"))
    return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return raw.trim() || BUSINESS.phoneDisplay;
}

function getStr(vals: Record<string, unknown> | undefined, k: string): string {
  if (!vals) return "";
  const v = vals[k];
  return typeof v === "string" ? v : "";
}

/* ─── Success state: the exact next step, not a generic thank-you ─── */

function InquirySuccess({
  phoneDisplay,
  contactMethod,
  hasSite,
}: {
  phoneDisplay: string;
  contactMethod: string;
  hasSite: boolean;
}) {
  const reachVerb =
    contactMethod === "email" ? "email" : contactMethod === "text" ? "text" : "call";
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-2xl rounded-md border border-line bg-white p-6 md:p-9"
    >
      <p className="type-eyebrow text-action">Request received</p>
      <h3 className="type-h3 mt-3 text-ink">
        Done. Here&apos;s exactly what happens next.
      </h3>

      <ol className="mt-5 space-y-3.5">
        {[
          `We ${reachVerb} you at ${phoneDisplay}, usually within two hours during business hours or first thing next morning.`,
          hasSite
            ? "We verify your site: dimensions, access windows and current COTA delivery rules for your exact spot."
            : NO_SITE_NOTE,
          "You get an itemized race-weekend quote: rental, delivery, setup, pickup, power plan, taxes and deposit. Campsite and race tickets stay separate.",
        ].map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white"
            >
              {i + 1}
            </span>
            <p className="type-body-sm text-slate">{step}</p>
          </li>
        ))}
      </ol>

      {hasSite ? (
        <div className="mt-6 rounded-sm border border-line bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Good to have ready
          </p>
          <p className="mt-1 text-sm text-slate">
            Your campsite confirmation, and your site number if one is assigned.
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <PhoneLink location="form_success" className="btn-primary flex-1">
          Call {BUSINESS.phoneDisplay}
        </PhoneLink>
        <SmsLink location="form_success" className="btn-secondary flex-1 text-ink">
          Text us instead
        </SmsLink>
      </div>
    </div>
  );
}

/* ─── Shared field bits ─── */

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-action">{children}</p>;
}

const inputCls =
  "w-full rounded-sm border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-slate/60 transition-colors focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(16,27,45,0.12)]";

const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wider text-ink";

function TextField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  error,
  autoComplete,
  placeholder,
  optionalTag,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  optionalTag?: boolean;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required ? <span className="ml-1 text-action">*</span> : null}
        {optionalTag ? (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-slate">
            (optional)
          </span>
        ) : null}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputCls} ${error ? "border-action/70" : "border-line"}`}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  optionalTag,
}: {
  legend: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  optionalTag?: boolean;
}) {
  return (
    <fieldset>
      <legend className={labelCls}>
        {legend}
        {optionalTag ? (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-slate">
            (optional)
          </span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`cursor-pointer rounded-sm border px-3.5 py-2.5 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
              value === opt.value
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-slate hover:border-navy/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {hint ? <p className="mt-2 text-xs text-slate">{hint}</p> : null}
      <ErrorText>{error}</ErrorText>
    </fieldset>
  );
}

function Stepper({
  label,
  name,
  value,
  min,
  max,
  onChange,
  error,
}: {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  error?: string;
}) {
  const btn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-navy disabled:opacity-40";
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <input type="hidden" name={name} value={value} readOnly />
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className={btn}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <input
          type="text"
          inputMode="numeric"
          aria-label={label}
          value={String(value)}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw === "") return;
            const v = parseInt(raw, 10);
            if (Number.isNaN(v)) return;
            onChange(Math.min(max, Math.max(min, v)));
          }}
          className="min-w-0 flex-1 rounded-sm border border-line bg-white px-1 py-3.5 text-center text-sm font-medium text-ink transition-colors focus:border-navy focus:shadow-[0_0_0_3px_rgba(16,27,45,0.12)] focus:outline-none"
        />
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className={btn}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

/* ─── The form ─── */

const emptySubscribe = () => () => {};

export default function AvailabilityForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  // Progressive enhancement: server HTML shows all steps stacked so the form
  // still works without JS; once hydrated we collapse to a 3-step flow.
  const enhanced = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Ad-variant attribution (?src=...) captured client-side so the page itself
  // stays fully static. Written straight to the hidden input, no re-render.
  const sourceRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const src = new URLSearchParams(window.location.search).get("src");
    if (src && sourceRef.current) sourceRef.current.value = src.slice(0, 64);
  }, []);

  const [step, setStep] = useState(1);
  const [campsite, setCampsite] = useState<string>("");
  const [range, setRange] = useState<DateRange | null>(F1_WEEKEND_RANGE);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [beds, setBeds] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("call");
  const [stepErrors, setStepErrors] = useState<{ campsite?: string; dateRange?: string }>(
    {}
  );

  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const conversionFired = useRef(false);

  // Let the "Where are you staying?" section preselect the campsite.
  useEffect(() => {
    const onPreselect = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        setCampsite(detail);
        setStep(1);
        setStepErrors({});
      }
    };
    window.addEventListener("triplew:campsite", onPreselect);
    return () => window.removeEventListener("triplew:campsite", onPreselect);
  }, []);

  // Analytics: conversion + funnel events on success.
  useEffect(() => {
    if (!state.ok) {
      conversionFired.current = false;
      return;
    }
    if (conversionFired.current) return;
    conversionFired.current = true;
    trackEvent("form_submit", { qualified: state.qualified === true });
    trackFormSubmitConversion();
    if (state.qualified) {
      trackEvent("qualified_lead", {});
    }
  }, [state.ok, state.qualified]);

  // Jump to the step that holds the first server-side error. State is
  // adjusted during render (with a guard) instead of in an effect, per
  // https://react.dev/learn/you-might-not-need-an-effect
  const [seenErrors, setSeenErrors] = useState(state.errors);
  if (state.errors !== seenErrors) {
    setSeenErrors(state.errors);
    if (state.errors) {
      const steps = Object.keys(state.errors)
        .map((k) => FIELD_STEP[k] ?? 3)
        .sort((a, b) => a - b);
      if (steps.length > 0) setStep(steps[0]);
    }
  }

  if (state.ok) {
    const phoneRaw = getStr(state.values, "phone");
    const method = getStr(state.values, "contactMethod") || "call";
    const site = getStr(state.values, "campsite");
    return (
      // Same stable wrapper as the form branch: the sticky-CTA observer and
      // the #check-availability anchor keep working after success replaces
      // the form.
      <div id="check-availability" data-form-container className="scroll-mt-28">
        <InquirySuccess
          phoneDisplay={displayPhone(phoneRaw)}
          contactMethod={method}
          hasSite={site !== "none" && site !== ""}
        />
      </div>
    );
  }

  const vals = state.values;
  const serverFail = state.message?.includes("Something went wrong") && !state.errors;

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", {});
  };

  const validateStep1 = (): boolean => {
    const errs: { campsite?: string; dateRange?: string } = {};
    if (!campsite) errs.campsite = "Tell us where you're planning to stay";
    if (!range?.start || !range?.end) errs.dateRange = "Please select your dates";
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      trackEvent("form_step_complete", { step: 1, campsite });
    }
    if (step === 2) {
      trackEvent("form_step_complete", { step: 2, adults, kids });
    }
    setStep((s) => Math.min(3, s + 1));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stepVisible = (n: number) => !enhanced || step === n;
  const hasSite = campsite !== "" && campsite !== "none";

  return (
    <div id="check-availability" data-form-container className="scroll-mt-28">
    <div
      className="mx-auto max-w-2xl rounded-md border border-line bg-white p-5 md:p-9"
      style={{ boxShadow: "0 8px 40px rgba(16, 27, 45, 0.08)" }}
    >
      <div className="mb-6 text-center">
        <p className="type-eyebrow text-action">Check My Site &amp; RV Options</p>
        <h3 className="type-h3 mt-3 text-ink">
          Tell us your campsite and your group. We&apos;ll do the rest.
        </h3>
        <p className="mt-3 text-sm text-slate">
          No obligation. {BUSINESS.responsePromise} Prefer to talk?{" "}
          <PhoneLink
            location="form_header"
            className="font-medium text-ink underline underline-offset-4 hover:text-action"
          >
            Call or text {BUSINESS.phoneDisplay}
          </PhoneLink>
        </p>
      </div>

      {enhanced ? (
        <ol className="mb-6 flex items-center justify-center gap-2" aria-hidden>
          {STEP_LABELS.map(([n, label]) => (
            <li key={n} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  step === n
                    ? "bg-navy text-white"
                    : n < step
                      ? "bg-navy/15 text-navy"
                      : "bg-paper-warm text-slate"
                }`}
              >
                {n}
              </span>
              <span
                className={`hidden text-xs uppercase tracking-wider sm:inline ${
                  step === n ? "font-semibold text-ink" : "text-slate"
                }`}
              >
                {label}
              </span>
              {n < 3 ? <span className="mx-1 h-px w-4 bg-line sm:w-5" /> : null}
            </li>
          ))}
        </ol>
      ) : null}

      <form ref={formRef} action={formAction} noValidate onFocus={markStarted}>
        {/* Honeypot */}
        <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <input type="hidden" name="source" defaultValue="" ref={sourceRef} />

        {/*
          State-driven mirrors of the radio groups. React 19 resets form DOM
          after every action round trip, which can uncheck controlled radios;
          these hidden inputs re-render from state so the server always gets
          the selection. The server reads the last non-empty occurrence, so
          the named radios below still work without JS.
        */}
        <input type="hidden" name="campsite" value={campsite} readOnly />
        <input type="hidden" name="beds" value={beds} readOnly />
        <input type="hidden" name="contactMethod" value={contactMethod} readOnly />

        {serverFail ? (
          <div
            className="mb-6 rounded-sm border border-action/40 bg-paper px-4 py-4 text-center text-sm text-ink"
            role="alert"
          >
            Something went wrong on our end. Please call or text us at{" "}
            <PhoneLink
              location="form_error"
              className="font-semibold underline underline-offset-4"
            >
              {BUSINESS.phoneDisplay}
            </PhoneLink>{" "}
            and we&apos;ll take care of you.
          </div>
        ) : null}

        {/* ─── STEP 1: CAMPSITE ─── */}
        <fieldset hidden={!stepVisible(1)} className="space-y-5">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate">
            Step 1 of 3: Your campsite
          </legend>

          <fieldset>
            <legend className={labelCls}>
              Do you already have a race-weekend campsite?
              <span className="ml-1 text-action">*</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {CAMPSITE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-sm border p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                    campsite === opt.value
                      ? "border-navy bg-navy"
                      : "border-line bg-white hover:border-navy/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="campsite"
                    value={opt.value}
                    checked={campsite === opt.value}
                    onChange={() => {
                      setCampsite(opt.value);
                      setStepErrors((e) => ({ ...e, campsite: undefined }));
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`block text-sm font-semibold ${
                      campsite === opt.value ? "text-white" : "text-ink"
                    }`}
                  >
                    {opt.title}
                  </span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      campsite === opt.value ? "text-white/80" : "text-slate"
                    }`}
                  >
                    {opt.note}
                  </span>
                </label>
              ))}
            </div>
            <ErrorText>{stepErrors.campsite ?? state.errors?.campsite}</ErrorText>
          </fieldset>

          {campsite === "none" ? (
            <p
              role="note"
              className="rounded-sm border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-ink"
            >
              {NO_SITE_NOTE}{" "}
              Send the form anyway and we&apos;ll point you at the realistic options before
              you spend anything.
            </p>
          ) : null}

          {hasSite ? (
            <TextField
              label="Site or lot number, if you know it"
              name="siteNumber"
              defaultValue={getStr(vals, "siteNumber")}
              placeholder="e.g. Premium 42"
              optionalTag
            />
          ) : null}

          <div>
            <p className={labelCls}>
              Your stay dates
              <span className="ml-1 text-action">*</span>
            </p>
            <F1QuoteDateRange
              value={range}
              onChange={setRange}
              error={stepErrors.dateRange ?? state.errors?.dateRange}
            />
          </div>

          {enhanced ? (
            <button type="button" onClick={goNext} className="btn-primary w-full">
              Continue to Your Group
            </button>
          ) : null}
        </fieldset>

        {/* ─── STEP 2: GROUP & RV FIT ─── */}
        <fieldset hidden={!stepVisible(2)} className="mt-2 space-y-5">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate">
            Step 2 of 3: Your group
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <Stepper
              label="Adults"
              name="adults"
              value={adults}
              min={1}
              max={16}
              onChange={setAdults}
              error={state.errors?.adults}
            />
            <Stepper
              label="Kids"
              name="kids"
              value={kids}
              min={0}
              max={16}
              onChange={setKids}
              error={state.errors?.kids}
            />
          </div>

          <ChipGroup
            legend="How many real beds do you want?"
            name="beds"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6-plus", label: "6+" },
              { value: "not-sure", label: "Not sure" },
            ]}
            value={beds}
            onChange={setBeds}
            hint="Permanent beds, not fold-out couches. This is how we pick the right unit for your adults."
          />

          <div>
            <label htmlFor="budget" className={labelCls}>
              Approximate weekend budget
              <span className="ml-1.5 font-normal normal-case tracking-normal text-slate">
                (optional)
              </span>
            </label>
            <select
              id="budget"
              name="budget"
              defaultValue={getStr(vals, "budget")}
              className={`${inputCls} border-line appearance-none`}
            >
              <option value="">Select a range</option>
              <option value="under-2000">Under $2,000 total</option>
              <option value="2000-3500">$2,000 to $3,500 total</option>
              <option value="3500-5000">$3,500 to $5,000 total</option>
              <option value="5000-plus">$5,000+ total</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          {campsite === "lot-n" ? (
            <p className="text-xs leading-relaxed text-slate">
              Lot N has no hookups. We size a generator and fuel plan to your unit and build
              it into the quote.
            </p>
          ) : null}

          {enhanced ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goBack}
                className="btn-secondary text-ink sm:w-1/3"
              >
                Back
              </button>
              <button type="button" onClick={goNext} className="btn-primary sm:flex-1">
                Continue to Contact Info
              </button>
            </div>
          ) : null}
        </fieldset>

        {/* ─── STEP 3: CONTACT ─── */}
        <fieldset hidden={!stepVisible(3)} className="mt-2 space-y-5">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate">
            Step 3 of 3: How to reach you
          </legend>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Full name"
              name="fullName"
              required
              defaultValue={getStr(vals, "fullName")}
              error={state.errors?.fullName}
              autoComplete="name"
            />
            <TextField
              label="Mobile number"
              name="phone"
              type="tel"
              required
              defaultValue={getStr(vals, "phone")}
              error={state.errors?.phone}
              autoComplete="tel"
            />
            <div className="md:col-span-2">
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                defaultValue={getStr(vals, "email")}
                error={state.errors?.email}
                autoComplete="email"
              />
            </div>
          </div>

          <ChipGroup
            legend="How should we get back to you?"
            name="contactMethod"
            options={[
              { value: "call", label: "Call me" },
              { value: "text", label: "Text me" },
              { value: "email", label: "Email me" },
            ]}
            value={contactMethod}
            onChange={setContactMethod}
          />

          <div>
            <label htmlFor="message" className={labelCls}>
              Anything else?
              <span className="ml-1.5 font-normal normal-case tracking-normal text-slate">
                (optional)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              maxLength={2000}
              defaultValue={getStr(vals, "message")}
              placeholder="Multiple RVs, accessibility needs, pets, flexible dates..."
              className={`${inputCls} border-line resize-none`}
            />
          </div>

          {state.message && !state.ok && !serverFail ? (
            <p className="text-center text-sm font-medium text-action">{state.message}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            {enhanced ? (
              <button
                type="button"
                onClick={goBack}
                className="btn-secondary text-ink sm:w-1/3"
              >
                Back
              </button>
            ) : null}
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <span className="inline-flex items-center justify-center gap-2.5">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
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
                  Sending...
                </span>
              ) : (
                "Check My Site & RV Options"
              )}
            </button>
          </div>

          <p className="text-center text-xs leading-relaxed text-slate">
            No obligation. Race tickets and campsite reservations are separate. Delivery is
            confirmed after site and access review.
          </p>
        </fieldset>
      </form>
    </div>
    </div>
  );
}
