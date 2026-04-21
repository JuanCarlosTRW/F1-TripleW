import { getLocalTimeZone, parseDate, type DateValue } from "@internationalized/date";

export function countNightsBetween(arrivalIso: string, departureIso: string): number {
  let cursor = parseDate(arrivalIso);
  const end = parseDate(departureIso);
  let nights = 0;
  while (cursor.compare(end) < 0) {
    nights += 1;
    cursor = cursor.add({ days: 1 });
  }
  return nights;
}

export function formatDateRangeLine(arrivalIso: string, departureIso: string): string {
  const tz = getLocalTimeZone();
  const start = parseDate(arrivalIso);
  const end = parseDate(departureIso);
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const nights = countNightsBetween(arrivalIso, departureIso);
  const nightWord = nights === 1 ? "night" : "nights";
  return `${fmt.format(start.toDate(tz))} → ${fmt.format(end.toDate(tz))} (${nights} ${nightWord})`;
}

export function isoFromDateValue(d: DateValue): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}
