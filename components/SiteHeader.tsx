"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneLink from "@/components/PhoneLink";

const LOGO =
  "https://static.wixstatic.com/media/62f926_cdac06309eba45679ea0ac08a402b45c~mv2.png";

export default function SiteHeader({ layout = "fixed" }: { layout?: "fixed" | "stacked" }) {
  const shell =
    layout === "stacked"
      ? "relative z-10 w-full flex items-center justify-between bg-[#0D0B09]/90 backdrop-blur-xl border-b border-[#D4A853]/10 py-3 md:py-4 px-4 md:px-8"
      : "fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-[#0D0B09]/90 backdrop-blur-xl border-b border-[#D4A853]/10 py-3 md:py-4 px-4 md:px-8 [padding-top:max(0.75rem,env(safe-area-inset-top))]";
  return (
    <header className={shell}>
      <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Triple W Rentals home">
        <Image
          src={LOGO}
          alt="Triple W Rentals"
          width={160}
          height={48}
          priority
          className="h-10 w-auto md:h-12"
        />
      </Link>
      <div className="flex items-center gap-3 md:gap-6">
        <a
          href="#request-a-quote"
          className="hidden md:inline-block text-sm text-[#F5F0E8]/80 hover:text-[#D4A853] transition-colors tracking-wide"
        >
          Request Quote
        </a>
        <PhoneLink
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold tracking-wide px-4 py-2.5 rounded-sm text-[#D4A853] hover:text-[#e0b964] transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          <span>(972) 965-6901</span>
        </PhoneLink>
        <PhoneLink
          className="md:hidden inline-flex flex-col items-center justify-center gap-0.5 rounded-sm border border-[#D4A853]/60 text-[#D4A853] font-semibold px-3 py-2 min-h-11 min-w-11 hover:bg-[#D4A853]/10 transition-colors"
          aria-label="Call (972) 965-6901"
        >
          <Phone className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[10px] uppercase tracking-wider leading-none">Call</span>
        </PhoneLink>
      </div>
    </header>
  );
}
