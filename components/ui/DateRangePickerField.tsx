"use client";

import { RangeCalendar } from "@/components/ui/calendar-rac";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { I18nProvider, type RangeValue } from "react-aria-components";

type DateRange = RangeValue<CalendarDate>;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const F1_WEEKEND: DateRange = {
  start: parseDate("2026-10-22"),
  end: parseDate("2026-10-26"),
};
const RACE_ONLY: DateRange = {
  start: parseDate("2026-10-23"),
  end: parseDate("2026-10-25"),
};

const MIN_DATE = today(getLocalTimeZone());
const MAX_DATE = parseDate("2026-11-30");

function formatRange(value: DateRange | null) {
  if (!value) return "";
  const s = value.start;
  const e = value.end;
  const startStr = `${MONTHS[s.month - 1]} ${s.day}`;
  const endStr = `${MONTHS[e.month - 1]} ${e.day}, ${e.year}`;
  return `${startStr} → ${endStr}`;
}

function nightCount(value: DateRange | null) {
  if (!value) return 0;
  const ms =
    value.end.toDate(getLocalTimeZone()).getTime() -
    value.start.toDate(getLocalTimeZone()).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export default function DateRangePickerField({
  name,
  error,
  defaultValue,
}: {
  name: string;
  error?: string;
  defaultValue?: DateRange | null;
}) {
  const [value, setValue] = useState<DateRange | null>(
    defaultValue ?? F1_WEEKEND
  );
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<"f1" | "race" | "custom">("f1");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const applyPreset = (p: "f1" | "race" | "custom") => {
    setPreset(p);
    if (p === "f1") {
      setValue(F1_WEEKEND);
      setOpen(false);
    } else if (p === "race") {
      setValue(RACE_ONLY);
      setOpen(false);
    } else {
      setValue(null);
      setOpen(true);
    }
  };

  const nights = nightCount(value);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden inputs for form submission */}
      <input
        type="hidden"
        name={`${name}Start`}
        value={value ? value.start.toString() : ""}
      />
      <input
        type="hidden"
        name={`${name}End`}
        value={value ? value.end.toString() : ""}
      />

      <div className="flex flex-wrap gap-2 mb-3">
        {(
          [
            { key: "f1", label: "F1 Weekend" },
            { key: "race", label: "Race Only" },
            { key: "custom", label: "Custom" },
          ] as const
        ).map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => applyPreset(p.key)}
            className={`text-xs font-medium uppercase tracking-wider px-3.5 py-2 rounded-full border transition-all duration-200 active:scale-[0.98] ${
              preset === p.key
                ? "bg-[#D4A853] text-[#0D0B09] border-[#D4A853]"
                : "bg-transparent text-[#F5F0E8]/70 border-[#F5F0E8]/15 hover:border-[#D4A853]/60 hover:text-[#F5F0E8]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`group w-full flex items-center gap-3 bg-[#0D0B09] border text-left px-4 py-3.5 rounded-sm transition-all duration-200 ${
          error
            ? "border-[#B8732E]/70"
            : open
              ? "border-[#D4A853] shadow-[0_0_0_3px_rgba(212,168,83,0.15)]"
              : "border-[#F5F0E8]/15 hover:border-[#D4A853]/50"
        }`}
      >
        <CalendarIcon className="w-4 h-4 text-[#D4A853] shrink-0" strokeWidth={2} />
        <span className="flex-1 text-sm text-[#F5F0E8]">
          {value ? formatRange(value) : (
            <span className="text-[#F5F0E8]/40">Select dates</span>
          )}
        </span>
        {value && nights > 0 && (
          <span className="text-xs text-[#D4A853]/80 uppercase tracking-wider font-medium shrink-0">
            {nights} {nights === 1 ? "night" : "nights"}
          </span>
        )}
      </button>

      {error && <p className="mt-1.5 text-xs text-[#B8732E]">{error}</p>}

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile full-screen backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-[#0D0B09]/80 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed md:absolute inset-x-4 md:inset-x-auto bottom-4 md:bottom-auto md:top-full md:mt-2 md:left-0 z-50 bg-[#F7F4F0] border border-[#D4A853]/20 rounded-lg p-4 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] md:w-auto"
            >
              <div className="flex items-center justify-between mb-3 md:hidden">
                <span className="text-xs uppercase tracking-wider text-[#1A1510]/60 font-medium">
                  Select Dates
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full hover:bg-[#D4A853]/10 text-[#1A1510]/60 hover:text-[#1A1510] transition-colors"
                  aria-label="Close calendar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <I18nProvider locale="en-US">
                <RangeCalendar
                  value={value ?? undefined}
                  onChange={(v) => {
                    setValue(v as DateRange);
                    setPreset("custom");
                  }}
                  minValue={MIN_DATE}
                  maxValue={MAX_DATE}
                />
              </I18nProvider>

              <div className="mt-4 pt-3 border-t border-[#1A1510]/10 flex items-center justify-between gap-3">
                <span className="text-xs text-[#1A1510]/60">
                  {value ? `${nights} ${nights === 1 ? "night" : "nights"}` : "Pick arrival & departure"}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm bg-[#D4A853] text-[#0D0B09] hover:brightness-105 transition-all active:scale-[0.98]"
                  disabled={!value}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export { formatRange, nightCount };
export type { DateRange };
