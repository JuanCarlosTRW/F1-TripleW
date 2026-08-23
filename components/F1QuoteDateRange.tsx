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
import { formatDateRangeLine, isoFromDateValue } from "@/lib/format-date-range";

export const F1_WEEKEND_RANGE: DateRange = {
  start: new CalendarDate(2026, 10, 22),
  end: new CalendarDate(2026, 10, 26),
};

export const RACE_ONLY_RANGE: DateRange = {
  start: new CalendarDate(2026, 10, 23),
  end: new CalendarDate(2026, 10, 26),
};

type Preset = "f1" | "race" | "custom";

function rangeSummary(range: DateRange | null): string {
  if (!range?.start || !range?.end) return "Select dates";
  return formatDateRangeLine(isoFromDateValue(range.start), isoFromDateValue(range.end));
}

const minDate = new CalendarDate(2026, 1, 1);
const maxDate = new CalendarDate(2027, 12, 31);

const chip =
  "rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors";

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
        <button
          type="button"
          className={`${chip} ${
            preset === "f1"
              ? "border-navy bg-navy text-white"
              : "border-line text-slate hover:border-navy/50"
          }`}
          onClick={() => setFromPreset("f1", F1_WEEKEND_RANGE)}
        >
          Full Weekend · Oct 22-26
        </button>
        <button
          type="button"
          className={`${chip} ${
            preset === "race"
              ? "border-navy bg-navy text-white"
              : "border-line text-slate hover:border-navy/50"
          }`}
          onClick={() => setFromPreset("race", RACE_ONLY_RANGE)}
        >
          Race Days · Oct 23-26
        </button>
        <button
          type="button"
          className={`${chip} ${
            preset === "custom"
              ? "border-navy bg-navy text-white"
              : "border-line text-slate hover:border-navy/50"
          }`}
          onClick={() => setFromPreset("custom", range ?? F1_WEEKEND_RANGE)}
        >
          Custom
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-2">{rangeSummary(range)}</p>
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
                className="h-10 w-10 flex items-center justify-center rounded-sm border border-line text-ink hover:bg-paper-warm outline-none focus-visible:ring-2 focus-visible:ring-action"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
              </Button>
              <Heading className="flex-1 text-center font-[var(--font-barlow)] font-semibold text-lg text-ink" />
              <Button
                slot="next"
                className="h-10 w-10 flex items-center justify-center rounded-sm border border-line text-ink hover:bg-paper-warm outline-none focus-visible:ring-2 focus-visible:ring-action"
              >
                <ChevronRight className="w-5 h-5" aria-hidden />
              </Button>
            </header>
            <CalendarGrid className="w-full border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="p-1 text-center text-[10px] uppercase tracking-wider text-slate/70">
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
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm",
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
          Race days are Fri-Sun, Oct 23-25. Both COTA RV areas open Thursday, Oct 22.
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
