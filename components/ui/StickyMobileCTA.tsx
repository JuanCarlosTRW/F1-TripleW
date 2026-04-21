"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneLink from "@/components/PhoneLink";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    // Show after scrolling past the hero
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
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
        setFormInView(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0, 0.1, 0.3, 0.5] }
    );
    obs.observe(form);
    return () => obs.disconnect();
  }, []);

  const show = visible && !formInView;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[55] flex shadow-[0_-8px_28px_rgba(0,0,0,0.45)]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <PhoneLink className="flex-1 basis-[70%] flex items-center justify-center gap-2 bg-[#D4A853] text-[#0D0B09] font-semibold text-[13px] py-4 tracking-wide active:brightness-95">
            <Phone className="w-4 h-4" strokeWidth={2.5} />
            <span>Call (972) 965-6901</span>
          </PhoneLink>
          <a
            href="#request-a-quote"
            className="flex-1 basis-[30%] flex items-center justify-center gap-1.5 bg-[#1A1510] text-[#D4A853] font-semibold text-[13px] py-4 tracking-wide uppercase active:brightness-110"
          >
            Request
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
