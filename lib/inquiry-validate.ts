import { parseDate } from "@internationalized/date";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "coordinated" (default: Triple W coordinates the placement) or "own" (the
 * visitor already holds a campsite). The older lot-specific values stay
 * accepted so the submission contract remains backward compatible.
 */
export const CAMPSITE_VALUES = [
  "coordinated",
  "own",
  "premium",
  "lot-n",
  "other",
  "none",
] as const;
export type CampsiteValue = (typeof CAMPSITE_VALUES)[number];

export const BEDS_VALUES = ["1", "2", "3", "4", "5", "6-plus", "not-sure"] as const;
export const BUDGET_VALUES = [
  "under-1000",
  "1000-2500",
  "2500-5000",
  "5000-plus",
  "not-sure",
] as const;
export const CONTACT_METHOD_VALUES = ["call", "text", "email"] as const;
export const ADD_ON_VALUES = ["wifi-starlink"] as const;

function oneOf<T extends readonly string[]>(
  list: T,
  value: unknown
): T[number] | "" {
  return typeof value === "string" && (list as readonly string[]).includes(value)
    ? (value as T[number])
    : "";
}

export type InquiryFieldErrors = Partial<
  Record<"campsite" | "dateRange" | "adults" | "kids" | "fullName" | "phone" | "email", string>
>;

export type InquiryParsed = {
  // Step 1: campsite
  campsite: CampsiteValue;
  siteNumber: string;
  arrivalDate: string;
  departureDate: string;
  // Step 2: group and RV fit
  adults: number;
  kids: number;
  beds: string;
  budget: string;
  addOns: string[];
  // Step 3: contact
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
  message: string;
  // Plumbing
  source: string;
  website: string;
};

function parseCount(value: unknown, min: number, max: number): number | undefined | null {
  const str = value === null || value === undefined ? "" : String(value).trim();
  if (str === "") return undefined;
  const n = Number(str);
  if (!Number.isInteger(n) || n < min || n > max) return null;
  return n;
}

export function validateInquiry(raw: Record<string, unknown>):
  | { ok: true; data: InquiryParsed }
  | { ok: false; errors: InquiryFieldErrors } {
  const errors: InquiryFieldErrors = {};

  // Missing or unknown value means the default coordinated placement.
  const campsite: CampsiteValue = oneOf(CAMPSITE_VALUES, raw.campsite) || "coordinated";

  const siteNumber =
    typeof raw.siteNumber === "string" ? raw.siteNumber.trim().slice(0, 40) : "";

  const arrivalDate = typeof raw.arrivalDate === "string" ? raw.arrivalDate.trim() : "";
  const departureDate =
    typeof raw.departureDate === "string" ? raw.departureDate.trim() : "";
  if (!arrivalDate || !departureDate) {
    errors.dateRange = "Please select your dates";
  } else {
    try {
      const a = parseDate(arrivalDate);
      const d = parseDate(departureDate);
      if (d.compare(a) <= 0) {
        errors.dateRange = "Please select your dates";
      }
    } catch {
      errors.dateRange = "Please select your dates";
    }
  }

  const adults = parseCount(raw.adults, 1, 16);
  if (adults === undefined || adults === null) {
    errors.adults = "How many adults are coming? (1 to 16)";
  }
  const kids = parseCount(raw.kids, 0, 16);
  if (kids === null) {
    errors.kids = "Kids must be between 0 and 16";
  }

  const beds = oneOf(BEDS_VALUES, raw.beds);
  const budget = oneOf(BUDGET_VALUES, raw.budget);
  const addOnsRaw = Array.isArray(raw.addOns) ? raw.addOns : raw.addOns ? [raw.addOns] : [];
  const addOns = Array.from(
    new Set(
      addOnsRaw.filter(
        (v): v is (typeof ADD_ON_VALUES)[number] =>
          typeof v === "string" && (ADD_ON_VALUES as readonly string[]).includes(v)
      )
    )
  );
  const contactMethod = oneOf(CONTACT_METHOD_VALUES, raw.contactMethod);

  const fullName = typeof raw.fullName === "string" ? raw.fullName.trim() : "";
  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name";
  }

  const phone = typeof raw.phone === "string" ? raw.phone : "";
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    errors.phone = "Please enter a valid mobile number";
  }

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  const message = typeof raw.message === "string" ? raw.message.trim().slice(0, 2000) : "";
  const sourceRaw = typeof raw.source === "string" ? raw.source.trim() : "";
  const source = sourceRaw.length > 64 ? sourceRaw.slice(0, 64) : sourceRaw;
  const website = typeof raw.website === "string" ? raw.website : "";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      campsite,
      siteNumber,
      arrivalDate,
      departureDate,
      adults: adults as number,
      kids: kids ?? 0,
      beds,
      budget,
      addOns,
      fullName,
      email,
      phone,
      contactMethod,
      message,
      source,
      website,
    },
  };
}

/**
 * Qualified lead = dates inside the event window, at least one adult and a
 * reachable contact. Placement is coordinated by Triple W, so the campsite no
 * longer gates qualification (legacy "none" stays a nurture lead).
 */
export function isQualifiedLead(data: InquiryParsed): boolean {
  const hasSite = data.campsite !== "none";
  const hasGroup = data.adults >= 1;

  let datesInWindow = false;
  try {
    const a = parseDate(data.arrivalDate);
    const d = parseDate(data.departureDate);
    const windowStart = parseDate("2026-10-19");
    const windowEnd = parseDate("2026-10-29");
    datesInWindow = a.compare(windowEnd) <= 0 && d.compare(windowStart) >= 0;
  } catch {
    datesInWindow = false;
  }

  return hasSite && hasGroup && datesInWindow;
}
