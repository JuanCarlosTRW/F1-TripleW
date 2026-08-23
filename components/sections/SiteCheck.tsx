"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const OPTIONS: Array<{
  value: string;
  title: string;
  note: string;
}> = [
  {
    value: "premium",
    title: "I have a Premium RV site",
    note: "Reserved, paved, water + electric. COTA listed these as sold out in Aug 2026. If you hold one, you're in a strong position.",
  },
  {
    value: "lot-n",
    title: "I'm heading to Lot N",
    note: "First come, first served dry camping. No hookups, so the generator, water and waste plan is part of the match.",
  },
  {
    value: "other",
    title: "I booked another campground",
    note: "A site near Austin with its own rules. We verify dimensions, access and delivery windows with them.",
  },
  {
    value: "none",
    title: "I don't have a campsite yet",
    note: "Start here anyway. We'll tell you what's realistically still available before you spend anything.",
  },
];

/**
 * Campsite-first qualifier. Selecting an option preselects the same answer in
 * the availability form and jumps the visitor there.
 */
export default function SiteCheck() {
  const choose = (value: string) => {
    trackEvent("site_check_select", { campsite: value });
    window.dispatchEvent(new CustomEvent("triplew:campsite", { detail: value }));
    document
      .getElementById("check-availability")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => choose(opt.value)}
          className="group flex flex-col items-start rounded-md border border-line bg-white p-5 text-left transition-colors hover:border-navy md:p-6"
        >
          <span className="flex w-full items-center justify-between gap-3">
            <span className="type-h3 text-ink">{opt.title}</span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-action transition-transform group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </span>
          <span className="mt-2 text-sm leading-relaxed text-slate">{opt.note}</span>
        </button>
      ))}
    </div>
  );
}
