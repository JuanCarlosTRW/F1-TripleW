"use client";

import { cn } from "@/lib/utils";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  Heading as HeadingRac,
  RangeCalendar as RangeCalendarRac,
  composeRenderProps,
} from "react-aria-components";

interface BaseCalendarProps {
  className?: string;
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps;
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> &
  BaseCalendarProps;

const CalendarHeader = () => (
  <header className="flex w-full items-center gap-1 pb-2">
    <Button
      slot="previous"
      className="flex size-9 items-center justify-center rounded-lg text-[#1A1510]/60 outline-offset-2 transition-colors hover:bg-[#D4A853]/10 hover:text-[#1A1510] focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-[#D4A853]/70"
    >
      <ChevronLeft className="w-4 h-4" strokeWidth={2} />
    </Button>
    <HeadingRac className="grow text-center text-sm font-medium text-[#1A1510] font-[var(--font-cormorant)] tracking-wide text-base" />
    <Button
      slot="next"
      className="flex size-9 items-center justify-center rounded-lg text-[#1A1510]/60 outline-offset-2 transition-colors hover:bg-[#D4A853]/10 hover:text-[#1A1510] focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-[#D4A853]/70"
    >
      <ChevronRight className="w-4 h-4" strokeWidth={2} />
    </Button>
  </header>
);

const CalendarGridComponent = ({ isRange = false }: { isRange?: boolean }) => {
  const now = today(getLocalTimeZone());

  return (
    <CalendarGridRac>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="size-9 rounded-lg p-0 text-[10px] font-medium uppercase tracking-wider text-[#1A1510]/50">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-[#1A1510] outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow] focus:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-[#D4A853]/15 data-[hovered]:text-[#1A1510] data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[unavailable]:line-through data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-[#D4A853]/70",
              isRange
                ? "data-[selected]:bg-[#D4A853]/20 data-[selected]:text-[#1A1510] data-[selected]:rounded-none data-[selection-start]:rounded-s-lg data-[selection-end]:rounded-e-lg data-[selection-start]:[&:not([data-hover])]:bg-[#D4A853] data-[selection-end]:[&:not([data-hover])]:bg-[#D4A853] data-[selection-start]:[&:not([data-hover])]:text-[#0D0B09] data-[selection-end]:[&:not([data-hover])]:text-[#0D0B09] data-[selection-start]:[&:not([data-hover])]:font-semibold data-[selection-end]:[&:not([data-hover])]:font-semibold data-[invalid]:bg-[#B8732E]/15 data-[invalid]:data-[selection-start]:[&:not([data-hover])]:bg-[#B8732E] data-[invalid]:data-[selection-end]:[&:not([data-hover])]:bg-[#B8732E] data-[invalid]:data-[selection-start]:[&:not([data-hover])]:text-white data-[invalid]:data-[selection-end]:[&:not([data-hover])]:text-white"
                : "data-[selected]:bg-[#D4A853] data-[selected]:text-[#0D0B09] data-[selected]:font-semibold",
              date.compare(now) === 0 &&
                cn(
                  "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-[#D4A853]",
                  isRange
                    ? "data-[selection-start]:[&:not([data-hover])]:after:bg-[#F5F0E8] data-[selection-end]:[&:not([data-hover])]:after:bg-[#F5F0E8]"
                    : "data-[selected]:after:bg-[#F5F0E8]"
                )
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  );
};

const Calendar = ({ className, ...props }: CalendarProps) => {
  return (
    <CalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent />
    </CalendarRac>
  );
};

const RangeCalendar = ({ className, ...props }: RangeCalendarProps) => {
  return (
    <RangeCalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent isRange />
    </RangeCalendarRac>
  );
};

export { Calendar, RangeCalendar };
