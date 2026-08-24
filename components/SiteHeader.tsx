"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import PhoneLink from "@/components/PhoneLink";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { BUSINESS, EVENT, LOGO_IMAGE } from "@/content/site";

const NAV = [
  { href: "#rv-options", label: "RV Options" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#weekend-guide", label: "Weekend Guide" },
  { href: "#faq", label: "FAQ" },
] as const;

/**
 * Event bar + sticky navigation (brief §7.1). Ivory nav, 68-76 px, light
 * bottom border, red clipped-corner primary CTA. Mobile: logo, phone icon,
 * menu. The fixed bottom CTA lives in StickyMobileCTA.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 [padding-top:env(safe-area-inset-top)]">
      {/* Event bar */}
      <div className="border-b border-[rgba(201,174,124,0.45)] bg-navy-deep text-white">
        <p className="container-x flex h-8 items-center justify-center gap-2 overflow-hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 md:h-9 md:text-[11px]">
          {EVENT.eventBarParts.map((part, i) => (
            <span
              key={part}
              className={`items-center gap-2 ${i === 1 || i === 2 ? "hidden sm:flex" : "flex"}`}
            >
              {i > 0 ? (
                <span aria-hidden className="h-3 w-px bg-[rgba(201,174,124,0.4)]" />
              ) : null}
              <span>{part}</span>
            </span>
          ))}
        </p>
      </div>

      {/* Navigation */}
      <div className="border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-4 md:h-[72px]">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Triple W Rentals home">
            <Image
              src={LOGO_IMAGE}
              alt="Triple W Rentals"
              width={180}
              height={54}
              priority
              className="h-10 w-auto object-contain md:h-11"
            />
          </Link>

          <nav aria-label="Page sections" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium tracking-[0.06em] text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <PhoneLink
              location="header"
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink/70 md:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              <span>{BUSINESS.phoneDisplay}</span>
            </PhoneLink>
            <TrackedCtaLink
              href="#check-availability"
              eventName="header_cta_click"
              className="btn-primary hidden !min-h-11 !px-5 !py-2.5 !text-[13px] md:inline-flex"
            >
              Get My Weekend Quote
            </TrackedCtaLink>

            {/* Mobile: phone icon + menu */}
            <PhoneLink
              location="header"
              aria-label={`Call ${BUSINESS.phoneDisplay}`}
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink md:hidden"
            >
              <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </PhoneLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Page sections" className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line/70 text-base font-semibold text-ink last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <TrackedCtaLink
              href="#check-availability"
              eventName="header_cta_click"
              onClick={() => setOpen(false)}
              className="btn-primary my-3 w-full"
            >
              Get My Weekend Quote
            </TrackedCtaLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
