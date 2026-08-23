"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackSmsClick } from "@/lib/analytics";
import { BUSINESS } from "@/content/site";

type SmsLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  /** Where on the page the link lives - reported to analytics. */
  location?: string;
};

export default function SmsLink({ onClick, location = "page", ...props }: SmsLinkProps) {
  return (
    <a
      href={BUSINESS.smsHref}
      {...props}
      onClick={(e) => {
        trackSmsClick(location);
        onClick?.(e);
      }}
    />
  );
}
