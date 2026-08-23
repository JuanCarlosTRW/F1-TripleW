"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = ComponentPropsWithoutRef<"a"> & {
  /** Analytics event name fired on click (e.g. "hero_cta_click"). */
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
};

export default function TrackedCtaLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}
