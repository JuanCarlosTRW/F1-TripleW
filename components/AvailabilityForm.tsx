"use client";

import { Check, Minus, Plus } from "lucide-react";
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
import { ADD_ONS, BUSINESS, HERO } from "@/content/site";
import { trackEvent, trackFormSubmitConversion } from "@/lib/analytics";

/*
  FORM CONTRACT (locked, brief §8). Field names, hidden fields, the server
  action and the success/error states are unchanged from the baseline:
  website (honeypot), source, campsite, beds, contactMethod, siteNumber,
  arrivalDate, departureDate, adults, kids, budget, fullName, phone, email,
  message. Added on request: addOns (checkbox, value "wifi-starlink").
*/

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
  [1, "Stay"],
  [2, "Group"],
  [3, "Contact"],
];

const PLACEMENT_OPTIONS = [
  {
    value: "coordinated",
    title: "Coordinate my campsite for me",
    note: "Triple W confirms your campsite together with the RV",
  },
  {
    value: "own",
    title: "I already have a campsite",
    note: "We verify fit, access and delivery with your site",
  },
] as const;

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

function getList(vals: Record<string, unknown> | undefined, k: string): string[] {
  if (!vals) return [];
  const v = vals[k];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return typeof v === "string" && v ? [v] : [];
}

/* ─── Success state: the exact next step, not a generic thank-you ─── */

function InquirySuccess({
  phoneDisplay,
  email,
  contactMethod,
  ownSite,
}: {
  phoneDisplay: string;
  email: string;
  contactMethod: string;
  ownSite: boolean;
}) {
  const reachVerb =
    contactMethod === "email" ? "email" : contactMethod === "text" ? "text" : "call";
  return (
    <div
      role="status"
      aria-live="polite"
      className="clip-tr mx-auto max-w-2xl border border-line bg-white p-6 md:p-9"
    >
      <p className="type-eyebrow eyebrow-chip">Request received</p>
      <h3 className="type-h3 mt-4 text-ink">
        Done. Here&apos;s exactly what happens next.
      </h3>

      <ol className="mt-5 space-y-3.5">
        {[
          `We ${reachVerb} you at ${contactMethod === "email" ? email : phoneDisplay}, usually within two hours during business hours or first thing next morning.`,
          ownSite
            ? "We verify your site: dimensions, access and the delivery window for your exact spot."
            : "We confirm your campsite and the RV that fits your group, together.",
          "You get an itemized quote: rental, delivery, setup, pickup, power plan where applicable, taxes and deposit. Race tickets stay separate.",
        ].map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-navy text-xs font-bold text-white"
            >
              {i + 1}
            </span>
            <p className="type-body-sm text-slate">{step}</p>
          </li>
        ))}
      </ol>

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

function ErrorText({ id, children }: { id?: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-action">
      {children}
    </p>
  );
}

const inputCls =
  "w-full min-h-14 border bg-white px-4 py-3 text-base text-ink placeholder:text-slate/60 transition-colors focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(11,23,40,0.12)]";

const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink";

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
  const id = `field-${name}`;
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required ? <span className="ml-1 text-action">*</span> : null}
        {optionalTag ? (
          <span className="ml-1.5 font-medium normal-case tracking-normal text-slate">
            (optional)
          </span>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${inputCls} ${error ? "border-action" : "border-line"}`}
      />
      <ErrorText id={errId}>{error}</ErrorText>
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
          <span className="ml-1.5 font-medium normal-case tracking-normal text-slate">
            (optional)
          </span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 border px-3.5 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                selected
                  ? "border-action bg-action-tint text-ink"
                  : "border-line bg-white text-slate hover:border-navy/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {selected ? (
                <Check className="h-4 w-4 text-action" strokeWidth={3} aria-hidden />
              ) : null}
              {opt.label}
            </label>
          );
        })}
      </div>
      {hint ? <p className="mt-2 text-sm text-slate">{hint}</p> : null}
      <ErrorText>{error}</ErrorText>
    </fieldset>
  );
}

function AddOnCheckbox({
  value,
  label,
  note,
  defaultChecked,
}: {
  value: string;
  label: string;
  note: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));
  return (
    <label
      className={`flex min-h-14 cursor-pointer items-start gap-3 border p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
        checked ? "border-action bg-action-tint" : "border-line bg-white hover:border-navy/50"
      }`}
    >
      {/* State-driven mirror: survives React 19's post-action form reset. */}
      {checked ? <input type="hidden" name="addOns" value={value} readOnly /> : null}
      <input
        type="checkbox"
        name="addOns"
        value={value}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
          checked ? "border-action bg-action text-white" : "border-line bg-white"
        }`}
      >
        {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-slate">{note}</span>
      </span>
    </label>
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
  const id = `field-${name}`;
  const btn =
    "flex h-14 w-14 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-navy disabled:opacity-40";
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
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
          id={id}
          type="text"
          inputMode="numeric"
          value={String(value)}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw === "") return;
            const v = parseInt(raw, 10);
            if (Number.isNaN(v)) return;
            onChange(Math.min(max, Math.max(min, v)));
          }}
          className="min-h-14 min-w-0 flex-1 border border-line bg-white px-1 text-center text-base font-semibold text-ink transition-colors focus:border-navy focus:shadow-[0_0_0_3px_rgba(11,23,40,0.12)] focus:outline-none"
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
  const [campsite, setCampsite] = useState<string>("coordinated");
  const [range, setRange] = useState<DateRange | null>(F1_WEEKEND_RANGE);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [beds, setBeds] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("call");
  const [stepErrors, setStepErrors] = useState<{ dateRange?: string }>({});

  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const conversionFired = useRef(false);

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
      <div id="check-availability" data-form-container className="scroll-mt-32">
        <InquirySuccess
          phoneDisplay={displayPhone(phoneRaw)}
          email={getStr(state.values, "email")}
          contactMethod={method}
          ownSite={site === "own"}
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
    const errs: { dateRange?: string } = {};
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

  return (
    <div id="check-availability" data-form-container className="scroll-mt-32">
    <div
      className="clip-tr mx-auto max-w-2xl border border-line bg-white p-4 sm:p-6 md:p-9"
      style={{ boxShadow: "0 12px 40px rgba(11, 23, 40, 0.08)" }}
    >
      <div className="mb-6 text-center">
        <p className="type-eyebrow eyebrow-chip">Get My Weekend Quote</p>
        <h3 className="type-h3 mt-4 text-ink">
          Tell us your group size and dates. We&apos;ll confirm the RV-and-campsite plan
          before you pay.
        </h3>
        <p className="mt-3 text-sm text-slate">
          {BUSINESS.responsePromise} Prefer to talk?{" "}
          <PhoneLink
            location="form_header"
            className="font-semibold text-ink underline underline-offset-4 hover:text-action"
          >
            Call {BUSINESS.phoneDisplay}
          </PhoneLink>{" "}
          or{" "}
          <SmsLink
            location="form_header"
            className="font-semibold text-ink underline underline-offset-4 hover:text-action"
          >
            text us
          </SmsLink>
        </p>
      </div>

      {enhanced ? (
        <ol className="mb-6 flex items-center justify-center gap-2" aria-label="Form progress">
          {STEP_LABELS.map(([n, label]) => {
            const status = step === n ? "current" : n < step ? "done" : "upcoming";
            return (
              <li key={n} className="flex items-center gap-2" aria-current={status === "current" ? "step" : undefined}>
                <span
                  className={`flex h-8 w-8 items-center justify-center text-xs font-bold ${
                    status === "current"
                      ? "bg-action text-white"
                      : status === "done"
                        ? "bg-navy text-white"
                        : "bg-paper-warm text-slate"
                  }`}
                >
                  {status === "done" ? (
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  ) : (
                    `0${n}`
                  )}
                </span>
                <span
                  className={`hidden text-xs font-bold uppercase tracking-[0.16em] sm:inline ${
                    status === "current" ? "text-ink" : "text-slate"
                  }`}
                >
                  {label}
                </span>
                {n < 3 ? <span className="mx-1 h-px w-5 bg-line sm:w-7" /> : null}
              </li>
            );
          })}
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
            className="mb-6 border border-action/40 bg-action-tint px-4 py-4 text-center text-sm text-ink"
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

        {/* ─── STEP 1: STAY ─── */}
        <fieldset hidden={!stepVisible(1)} className="space-y-5">
          <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate">
            Step 1 of 3: Your stay
          </legend>

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

          <fieldset>
            <legend className={labelCls}>Your campsite</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {PLACEMENT_OPTIONS.map((opt) => {
                const selected = campsite === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`relative flex min-h-14 cursor-pointer items-start gap-3 border p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                      selected
                        ? "border-action bg-action-tint"
                        : "border-line bg-white hover:border-navy/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="campsite"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setCampsite(opt.value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
                        selected ? "border-action bg-action text-white" : "border-line bg-white"
                      }`}
                    >
                      {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{opt.title}</span>
                      <span className="mt-0.5 block text-xs text-slate">{opt.note}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {campsite === "own" ? (
            <TextField
              label="Site or lot number, if you know it"
              name="siteNumber"
              defaultValue={getStr(vals, "siteNumber")}
              placeholder="e.g. Site 42"
              optionalTag
            />
          ) : null}

          {enhanced ? (
            <button type="button" onClick={goNext} className="btn-primary w-full">
              Continue to Your Group
            </button>
          ) : null}
        </fieldset>

        {/* ─── STEP 2: GROUP ─── */}
        <fieldset hidden={!stepVisible(2)} className="mt-2 space-y-5">
          <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate">
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
            legend="How many beds do you want?"
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
            <label htmlFor="field-budget" className={labelCls}>
              Approximate weekend budget
              <span className="ml-1.5 font-medium normal-case tracking-normal text-slate">
                (optional)
              </span>
            </label>
            <select
              id="field-budget"
              name="budget"
              defaultValue={getStr(vals, "budget")}
              className={`${inputCls} border-line appearance-none`}
            >
              <option value="">Select a range</option>
              <option value="under-1000">Under $1,000 total</option>
              <option value="1000-2500">$1,000 to $2,500 total</option>
              <option value="2500-5000">$2,500 to $5,000 total</option>
              <option value="5000-plus">$5,000+ total</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <fieldset>
            <legend className={labelCls}>
              Add-ons
              <span className="ml-1.5 font-medium normal-case tracking-normal text-slate">
                (optional)
              </span>
            </legend>
            <div className="grid gap-2">
              {ADD_ONS.map((a) => (
                <AddOnCheckbox
                  key={a.value}
                  value={a.value}
                  label={a.label}
                  note={a.note}
                  defaultChecked={getList(vals, "addOns").includes(a.value)}
                />
              ))}
            </div>
          </fieldset>

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
          <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate">
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
            <label htmlFor="field-message" className={labelCls}>
              Anything else?
              <span className="ml-1.5 font-medium normal-case tracking-normal text-slate">
                (optional)
              </span>
            </label>
            <textarea
              id="field-message"
              name="message"
              rows={2}
              maxLength={2000}
              defaultValue={getStr(vals, "message")}
              placeholder="Multiple RVs, accessibility needs, pets, flexible dates..."
              className={`${inputCls} border-line resize-none`}
            />
          </div>

          {state.message && !state.ok && !serverFail ? (
            <p className="text-center text-sm font-medium text-action" role="alert">
              {state.message}
            </p>
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
                HERO.primaryCta
              )}
            </button>
          </div>

          <p className="text-center text-sm leading-relaxed text-slate">
            No obligation. Availability is confirmed before payment. Race tickets sold
            separately.
          </p>
        </fieldset>
      </form>
    </div>
    </div>
  );
}
