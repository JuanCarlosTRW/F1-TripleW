"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneLink from "@/components/PhoneLink";
import { trackEvent } from "@/lib/analytics";

/**
 * Mobile-only sticky action bar. Hidden while the availability form (or the
 * success state) is on screen so it never covers the thing it points to.
 */
export default function StickyMobileCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.querySelector("[data-form-container]");
    if (!form) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setFormInView(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { threshold: [0, 0.05, 0.2] }
    );
    obs.observe(form);
    return () => obs.disconnect();
  }, []);

  const show = scrolled && !formInView;

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-0 left-0 right-0 z-[55] flex shadow-[0_-8px_28px_rgba(10,18,32,0.35)] transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="#check-availability"
        tabIndex={show ? 0 : -1}
        onClick={() => trackEvent("sticky_cta_click", { action: "form" })}
        className="flex flex-1 basis-[62%] items-center justify-center gap-1.5 bg-action py-4 text-[13px] font-semibold uppercase tracking-wide text-white active:brightness-95"
      >
        Check My Site &amp; RV Options
      </a>
      <PhoneLink
        location="sticky_bar"
        tabIndex={show ? 0 : -1}
        className="flex flex-1 basis-[38%] items-center justify-center gap-2 bg-navy py-4 text-[13px] font-semibold tracking-wide text-white active:brightness-110"
      >
        <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        <span>Call</span>
      </PhoneLink>
    </div>
  );
}
