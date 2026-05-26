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
  start: new CalendarDate(2026, 10, 24),
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
  "rounded-sm px-3 py-2 text-xs font-medium uppercase tracking-wider border transition-colors";

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
              ? "border-[#D4A853] bg-[#D4A853]/15 text-[#F5F0E8]"
              : "border-[#F5F0E8]/15 text-[#F5F0E8]/70 hover:border-[#D4A853]/40"
          }`}
          onClick={() => setFromPreset("f1", F1_WEEKEND_RANGE)}
        >
          F1 Weekend
        </button>
        <button
          type="button"
          className={`${chip} ${
            preset === "race"
              ? "border-[#D4A853] bg-[#D4A853]/15 text-[#F5F0E8]"
              : "border-[#F5F0E8]/15 text-[#F5F0E8]/70 hover:border-[#D4A853]/40"
          }`}
          onClick={() => setFromPreset("race", RACE_ONLY_RANGE)}
        >
          Race Only
        </button>
        <button
          type="button"
          className={`${chip} ${
            preset === "custom"
              ? "border-[#D4A853] bg-[#D4A853]/15 text-[#F5F0E8]"
              : "border-[#F5F0E8]/15 text-[#F5F0E8]/70 hover:border-[#D4A853]/40"
          }`}
          onClick={() => setFromPreset("custom", range ?? F1_WEEKEND_RANGE)}
        >
          Custom
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <p className="text-sm text-[#F5F0E8]/85 mb-2">{rangeSummary(range)}</p>
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
              className="max-w-full text-[#F5F0E8] react-aria-RangeCalendar"
            >
              <header className="flex items-center gap-2 mb-3 px-1">
                <Button
                  slot="previous"
                  className="h-10 w-10 flex items-center justify-center rounded-sm border border-[#F5F0E8]/15 text-[#D4A853] hover:bg-[#F5F0E8]/5 outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden />
                </Button>
                <Heading className="flex-1 text-center font-[var(--font-cormorant)] text-lg text-[#F5F0E8]" />
                <Button
                  slot="next"
                  className="h-10 w-10 flex items-center justify-center rounded-sm border border-[#F5F0E8]/15 text-[#D4A853] hover:bg-[#F5F0E8]/5 outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden />
                </Button>
              </header>
              <CalendarGrid className="w-full border-separate border-spacing-1">
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="p-1 text-center text-[10px] uppercase tracking-wider text-[#F5F0E8]/45">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className="group relative p-0 outline-none data-outside-month:text-[#F5F0E8]/25 data-unavailable:text-[#F5F0E8]/25 data-disabled:text-[#F5F0E8]/25"
                    >
                      {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isDisabled }) => (
                        <span
                          className={[
                            "flex h-9 w-9 items-center justify-center rounded-full text-sm",
                            isDisabled ? "cursor-default" : "cursor-default",
                            isSelected && (isSelectionStart || isSelectionEnd)
                              ? "bg-[#D4A853] text-[#0D0B09] font-semibold"
                              : isSelected
                                ? "bg-[#D4A853]/25 text-[#F5F0E8]"
                                : "text-[#F5F0E8]/90 group-hover:bg-[#F5F0E8]/10",
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
                <Text slot="errorMessage" className="mt-2 block text-sm text-[#B8732E]">
                  {error}
                </Text>
              ) : null}
            </RangeCalendar>
          </I18nProvider>
          <p className="mt-2 text-xs text-[#F5F0E8]/45">Required - tap your arrival and departure</p>
        </div>
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
