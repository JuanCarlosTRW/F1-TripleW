"use client";

import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import type { DateRange } from "react-aria-components";
import {
  I18nProvider,
  RangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  Button,
  Heading,
  Text,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatStaySummary, isoFromDateValue } from "@/lib/format-date-range";

/** Full stay: arrive Thu Oct 22, leave Mon Oct 26 (the COTA RV access window). */
export const F1_WEEKEND_RANGE: DateRange = {
  start: new CalendarDate(2026, 10, 22),
  end: new CalendarDate(2026, 10, 26),
};

/** Race days only (Fri Oct 23 to Sun Oct 25): arrive Fri, leave Mon Oct 26 at pickup. */
export const RACE_ONLY_RANGE: DateRange = {
  start: new CalendarDate(2026, 10, 23),
  end: new CalendarDate(2026, 10, 26),
};

type Preset = "f1" | "race" | "custom";

const PRESETS: ReadonlyArray<{ key: Preset; label: string; range: DateRange | null }> = [
  { key: "f1", label: "Full stay · Oct 22-26", range: F1_WEEKEND_RANGE },
  { key: "race", label: "Race weekend · Oct 23-25", range: RACE_ONLY_RANGE },
  { key: "custom", label: "Custom dates", range: null },
];

function rangeSummary(range: DateRange | null): string {
  if (!range?.start || !range?.end) return "Select your arrival and departure dates";
  return formatStaySummary(isoFromDateValue(range.start), isoFromDateValue(range.end));
}

const minDate = new CalendarDate(2026, 1, 1);
const maxDate = new CalendarDate(2027, 12, 31);

const chip =
  "min-h-11 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors";

export default function F1QuoteDateRange({
  value,
  onChange,
  error,
}: {
  value: DateRange | null;
  onChange: (next: DateRange | null) => void;
  error?: string;
}) {
  const [preset, setPreset] = useState<Preset>("f1");

  const setFromPreset = (p: Preset, r: DateRange | null) => {
    setPreset(p);
    onChange(r);
  };

  const range = value;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={preset === p.key}
            className={`${chip} ${
              preset === p.key
                ? "border-navy bg-paper-warm/50 text-ink"
                : "border-line text-slate hover:border-navy/50"
            }`}
            onClick={() => setFromPreset(p.key, p.range ?? range ?? F1_WEEKEND_RANGE)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-ink">{rangeSummary(range)}</p>
        <p className="mb-3 text-xs text-slate">
          Race days are Fri Oct 23 to Sun Oct 25. Monday Oct 26 is departure and pickup day. Setup is done before you arrive.
        </p>
        <I18nProvider locale="en-US">
          <RangeCalendar
            aria-label="Arrival and departure dates"
            value={range ?? undefined}
            minValue={minDate}
            maxValue={maxDate}
            onChange={(next) => {
              setPreset("custom");
              onChange(next);
            }}
            className="max-w-full text-ink"
          >
            <header className="flex items-center gap-2 mb-3 px-1">
              <Button
                slot="previous"
                className="h-10 w-10 flex items-center justify-center border border-line text-ink hover:bg-paper-warm outline-none focus-visible:ring-2 focus-visible:ring-action"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
              </Button>
              <Heading className="flex-1 text-center font-(family-name:--font-barlow) font-semibold text-lg text-ink" />
              <Button
                slot="next"
                className="h-10 w-10 flex items-center justify-center border border-line text-ink hover:bg-paper-warm outline-none focus-visible:ring-2 focus-visible:ring-action"
              >
                <ChevronRight className="w-5 h-5" aria-hidden />
              </Button>
            </header>
            <CalendarGrid className="w-full table-fixed border-separate border-spacing-0.5">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="p-1 text-center text-[10px] uppercase tracking-wider text-slate">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="group relative p-0 outline-none data-outside-month:text-slate/30 data-unavailable:text-slate/30 data-disabled:text-slate/30"
                  >
                    {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd }) => (
                      <span
                        className={[
                          "mx-auto flex aspect-square w-full max-w-11 items-center justify-center text-sm",
                          isSelected && (isSelectionStart || isSelectionEnd)
                            ? "bg-navy text-white font-semibold"
                            : isSelected
                              ? "bg-navy/10 text-ink"
                              : "text-ink group-hover:bg-paper-warm",
                        ].join(" ")}
                      >
                        {formattedDate}
                      </span>
                    )}
                  </CalendarCell>
                )}
              </CalendarGridBody>
            </CalendarGrid>
            {error ? (
              <Text slot="errorMessage" className="mt-2 block text-sm text-action">
                {error}
              </Text>
            ) : null}
          </RangeCalendar>
        </I18nProvider>
        <p className="mt-2 text-xs text-slate">
          Arrive Thursday, Friday or whenever your weekend starts. Tap the calendar for custom dates.
        </p>
      </div>

      {range?.start && range?.end ? (
        <>
          <input type="hidden" name="arrivalDate" value={isoFromDateValue(range.start)} readOnly />
          <input type="hidden" name="departureDate" value={isoFromDateValue(range.end)} readOnly />
        </>
      ) : null}
    </div>
  );
}
