import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneLink from "@/components/PhoneLink";
import { BUSINESS, LOGO_IMAGE } from "@/content/site";

const NAV = [
  { href: "#rv-options", label: "RV Options" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#lot-n-guide", label: "Lot N Guide" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md [padding-top:env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Triple W Rentals home">
          <Image
            src={LOGO_IMAGE}
            alt="Triple W Rentals"
            width={180}
            height={54}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <nav aria-label="Page sections" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-slate transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PhoneLink
            location="header"
            className="hidden items-center gap-2 text-sm font-semibold tracking-wide text-ink transition-colors hover:text-action md:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
            <span>{BUSINESS.phoneDisplay}</span>
          </PhoneLink>
          <a
            href="#check-availability"
            className="hidden rounded-sm bg-action px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-action-deep md:inline-block"
          >
            Check Availability
          </a>
          <PhoneLink
            location="header_mobile"
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
            className="inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-sm border border-navy/25 bg-white px-3 py-2 font-semibold text-ink transition-colors hover:bg-paper-warm md:hidden"
          >
            <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            <span className="text-[10px] uppercase leading-none tracking-wider">Call</span>
          </PhoneLink>
        </div>
      </div>
    </header>
  );
}
