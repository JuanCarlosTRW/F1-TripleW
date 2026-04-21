"use client";

import { useEffect, useId, useState } from "react";
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
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
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
  if (!range?.start || !range?.end) return "Select your dates";
  return formatDateRangeLine(isoFromDateValue(range.start), isoFromDateValue(range.end));
}

const minDate = new CalendarDate(2026, 1, 1);
const maxDate = new CalendarDate(2027, 12, 31);

const chip =
  "rounded-sm px-3 py-2 text-xs font-medium uppercase tracking-wider border transition-colors";

function RangePickerPanel({
  range,
  onChange,
  error,
  onComplete,
}: {
  range: DateRange | null;
  onChange: (next: DateRange | null) => void;
  error?: string;
  onComplete: () => void;
}) {
  return (
    <I18nProvider locale="en-US">
      <RangeCalendar
        aria-label="Arrival and departure dates"
        value={range ?? undefined}
        minValue={minDate}
        maxValue={maxDate}
        onChange={(next) => {
          onChange(next);
          if (next?.start && next?.end) {
            onComplete();
          }
        }}
        className="max-w-full text-[#F5F0E8] p-2"
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
        <CalendarGrid className="w-full border-separate border-spacing-0">
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell className="p-1 pb-2 text-center text-[10px] uppercase tracking-wider text-[#F5F0E8]/45">
                {day}
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className="group relative p-0 outline-none data-outside-month:text-[#F5F0E8]/20 data-unavailable:text-[#F5F0E8]/20 data-disabled:text-[#F5F0E8]/20"
              >
                {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isDisabled }) => {
                  const isMiddle = Boolean(isSelected && !isSelectionStart && !isSelectionEnd);
                  const isCap = Boolean(isSelected && (isSelectionStart || isSelectionEnd));
                  return (
                    <span
                      className={[
                        "mx-0 flex min-h-9 w-full min-w-[2.25rem] items-center justify-center text-sm transition-colors",
                        !isSelected && !isDisabled && "text-[#F5F0E8]/90 hover:bg-[#F5F0E8]/10",
                        isMiddle && "rounded-none bg-[#D4A853]/28 text-[#F5F0E8]",
                        isCap &&
                          "bg-[#D4A853] font-semibold text-[#0D0B09] shadow-[inset_0_0_0_1px_rgba(13,11,9,0.08)]",
                        isSelectionStart && isSelected && "rounded-l-lg rounded-r-none",
                        isSelectionEnd && isSelected && "rounded-r-lg rounded-l-none",
                        isDisabled && "cursor-default opacity-40",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {formattedDate}
                    </span>
                  );
                }}
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
  );
}

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
  const [open, setOpen] = useState(false);
  const triggerId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const setFromPreset = (p: Preset, r: DateRange | null) => {
    setPreset(p);
    onChange(r);
    setOpen(false);
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

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            id={triggerId}
            className="flex w-full max-w-md items-center justify-between gap-3 rounded-sm border border-[#F5F0E8]/20 bg-[#0D0B09] px-4 py-3 text-left text-sm text-[#F5EDE0] hover:border-[#D4A853]/40 transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0">
              <CalendarRange className="w-4 h-4 shrink-0 text-[#D4A853]" aria-hidden />
              <span className="truncate">{rangeSummary(range)}</span>
            </span>
            <ChevronDown className="w-4 h-4 shrink-0 text-[#D4A853]/80" aria-hidden />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={8}
            collisionPadding={16}
            className="z-[100] w-[min(calc(100vw-2rem),380px)] rounded-lg border border-[#D4A853]/25 bg-[#1A1510] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] outline-none max-md:fixed max-md:left-2 max-md:right-2 max-md:bottom-2 max-md:top-auto max-md:w-auto max-md:max-h-[min(70vh,520px)] max-md:overflow-y-auto max-md:rounded-t-2xl max-md:rounded-b-lg"
          >
            <div className="flex items-center justify-between border-b border-[#F5F0E8]/10 pb-2 mb-1 md:hidden">
              <span className="text-xs uppercase tracking-wider text-[#D4A853]">Select dates</span>
              <Popover.Close asChild>
                <button
                  type="button"
                  className="rounded-full p-2 text-[#F5F0E8]/50 hover:bg-white/5 hover:text-[#F5F0E8]"
                  aria-label="Close calendar"
                >
                  <X className="w-4 h-4" />
                </button>
              </Popover.Close>
            </div>
            <RangePickerPanel
              range={range}
              onChange={(next) => {
                setPreset("custom");
                onChange(next);
              }}
              error={error}
              onComplete={() => setOpen(false)}
            />
            <div className="mt-3 flex justify-end md:hidden">
              <Popover.Close asChild>
                <button
                  type="button"
                  className="w-full rounded-sm bg-[#D4A853] py-3 text-sm font-semibold text-[#0D0B09]"
                >
                  Done
                </button>
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <p className="text-xs text-[#F5F0E8]/45">Required — tap dates in the calendar</p>

      {range?.start && range?.end ? (
        <>
          <input type="hidden" name="arrivalDate" value={isoFromDateValue(range.start)} readOnly />
          <input type="hidden" name="departureDate" value={isoFromDateValue(range.end)} readOnly />
        </>
      ) : null}
    </div>
  );
}
