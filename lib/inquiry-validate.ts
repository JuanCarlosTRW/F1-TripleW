import { parseDate } from "@internationalized/date";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CAMPSITE_VALUES = ["premium", "lot-n", "other", "none"] as const;
export type CampsiteValue = (typeof CAMPSITE_VALUES)[number];

export const PASS_STATUS_VALUES = ["purchased", "purchasing", "not-yet"] as const;
export type PassStatusValue = (typeof PASS_STATUS_VALUES)[number];

export const POWER_VALUES = ["hookups", "generator", "not-sure"] as const;
export const SLEEPING_VALUES = ["real-beds", "mixed", "flexible"] as const;
export const BUDGET_VALUES = [
  "under-2000",
  "2000-3500",
  "3500-5000",
  "5000-plus",
  "not-sure",
] as const;
export const CONTACT_METHOD_VALUES = ["call", "text", "email"] as const;

function oneOf<T extends readonly string[]>(
  list: T,
  value: unknown
): T[number] | "" {
  return typeof value === "string" && (list as readonly string[]).includes(value)
    ? (value as T[number])
    : "";
}

export type InquiryFieldErrors = Partial<
  Record<
    | "campsite"
    | "passStatus"
    | "dateRange"
    | "groupTotal"
    | "fullName"
    | "phone"
    | "email",
    string
  >
>;

export type InquiryParsed = {
  // Step 1 - campsite readiness
  campsite: CampsiteValue;
  passStatus: PassStatusValue | "";
  siteNumber: string;
  arrivalDate: string;
  departureDate: string;
  // Step 2 - RV fit
  groupTotal?: number;
  adults?: number;
  kids?: number;
  sleeping: string;
  power: string;
  budget: string;
  message: string;
  // Step 3 - contact
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
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

  const campsite = oneOf(CAMPSITE_VALUES, raw.campsite);
  if (!campsite) {
    errors.campsite = "Tell us where you're planning to stay";
  }

  const passStatus = oneOf(PASS_STATUS_VALUES, raw.passStatus);
  if (campsite && campsite !== "none" && !passStatus) {
    errors.passStatus = "Tell us where your campsite pass stands";
  }

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

  const groupTotal = parseCount(raw.groupTotal, 1, 16);
  if (groupTotal === null) {
    errors.groupTotal = "Group size must be between 1 and 16";
  }
  const adults = parseCount(raw.adults, 0, 16);
  const kids = parseCount(raw.kids, 0, 16);

  const sleeping = oneOf(SLEEPING_VALUES, raw.sleeping);
  const power = oneOf(POWER_VALUES, raw.power);
  const budget = oneOf(BUDGET_VALUES, raw.budget);
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
      campsite: campsite as CampsiteValue,
      passStatus,
      siteNumber,
      arrivalDate,
      departureDate,
      groupTotal: groupTotal ?? undefined,
      adults: adults ?? undefined,
      kids: kids ?? undefined,
      sleeping,
      power,
      budget,
      message,
      fullName,
      email,
      phone,
      contactMethod,
      source,
      website,
    },
  };
}

/**
 * Qualified lead = has (or is buying) a compatible campsite, dates inside the
 * event window, a group size, and a reachable contact (audit §14).
 */
export function isQualifiedLead(data: InquiryParsed): boolean {
  const hasSite =
    data.campsite === "premium" || data.campsite === "lot-n" || data.campsite === "other";
  const passOk = data.passStatus === "purchased" || data.passStatus === "purchasing";
  const hasGroup = data.groupTotal !== undefined && data.groupTotal >= 1;

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

  return hasSite && passOk && hasGroup && datesInWindow;
}
