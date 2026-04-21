"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneLink from "@/components/PhoneLink";

const LOGO =
  "https://static.wixstatic.com/media/62f926_cdac06309eba45679ea0ac08a402b45c~mv2.png";

export default function SiteHeader({ layout = "fixed" }: { layout?: "fixed" | "stacked" }) {
  const creamShell =
    "flex items-center justify-between bg-gradient-to-b from-[#FFFCF7] via-[#FAF6F0] to-[#F2E8DC] backdrop-blur-md border-b border-[#D4A853]/18 py-3 md:py-4 px-4 md:px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_1px_0_rgba(212,168,83,0.12)]";
  const shell =
    layout === "stacked"
      ? `relative z-10 w-full ${creamShell}`
      : `fixed top-0 left-0 right-0 z-40 ${creamShell} [padding-top:max(0.75rem,env(safe-area-inset-top))]`;
  return (
    <header className={shell}>
      <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Triple W Rentals home">
        <Image
          src={LOGO}
          alt="Triple W Rentals"
          width={180}
          height={54}
          priority
          className="h-11 w-auto md:h-14 object-contain contrast-[1.15] saturate-75"
        />
      </Link>
      <div className="flex items-center gap-3 md:gap-6">
        <a
          href="#request-a-quote"
          className="hidden md:inline-block text-sm text-[#3D3834] hover:text-[#8B6B1F] transition-colors tracking-wide font-medium"
        >
          Request Quote
        </a>
        <PhoneLink
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold tracking-wide px-4 py-2.5 rounded-sm text-[#5C4A26] hover:text-[#8B6B1F] transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          <span>(972) 965-6901</span>
        </PhoneLink>
        <PhoneLink
          className="md:hidden inline-flex flex-col items-center justify-center gap-0.5 rounded-sm border border-[#8B6B1F]/40 bg-[#FAF6EF] text-[#5C4A26] font-semibold px-3 py-2 min-h-11 min-w-11 hover:bg-[#F0E6D4] transition-colors"
          aria-label="Call (972) 965-6901"
        >
          <Phone className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[10px] uppercase tracking-wider leading-none">Call</span>
        </PhoneLink>
      </div>
    </header>
  );
}
