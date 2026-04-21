import { parseDate } from "@internationalized/date";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type InquiryFieldErrors = Partial<
  Record<"fullName" | "phone" | "email" | "dateRange" | "groupSize", string>
>;

export type InquiryParsed = {
  fullName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  groupSize?: number;
  addOns: string[];
  message: string;
  source: string;
  website: string;
};

export function validateInquiry(raw: {
  fullName: unknown;
  email: unknown;
  phone: unknown;
  arrivalDate: unknown;
  departureDate: unknown;
  groupSize: unknown;
  addOns: unknown;
  message: unknown;
  source: unknown;
  website: unknown;
}): { ok: true; data: InquiryParsed } | { ok: false; errors: InquiryFieldErrors } {
  const errors: InquiryFieldErrors = {};

  const fullName = typeof raw.fullName === "string" ? raw.fullName.trim() : "";
  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name";
  }

  const phone = typeof raw.phone === "string" ? raw.phone : "";
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    errors.phone = "Please enter a valid phone number";
  }

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  const arrivalDate = typeof raw.arrivalDate === "string" ? raw.arrivalDate.trim() : "";
  const departureDate = typeof raw.departureDate === "string" ? raw.departureDate.trim() : "";
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

  let groupSize: number | undefined;
  const gsStr =
    raw.groupSize === null || raw.groupSize === undefined
      ? ""
      : String(raw.groupSize).trim();
  if (gsStr !== "") {
    const n = Number(gsStr);
    if (!Number.isInteger(n) || n < 2 || n > 12) {
      errors.groupSize = "Group size must be between 2 and 12";
    } else {
      groupSize = n;
    }
  }

  const addOnsRaw = raw.addOns;
  const addOns = Array.isArray(addOnsRaw)
    ? addOnsRaw.filter((x): x is string => x === "wifi-starlink")
    : [];

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const sourceRaw = typeof raw.source === "string" ? raw.source.trim() : "";
  const source = sourceRaw.length > 64 ? sourceRaw.slice(0, 64) : sourceRaw;
  const website = typeof raw.website === "string" ? raw.website : "";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      arrivalDate,
      departureDate,
      groupSize,
      addOns,
      message,
      source,
      website,
    },
  };
}
