"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "triplew:urgency-dismissed";

type UrgencyStripProps = {
  layout?: "overlay" | "stacked";
};

export default function UrgencyStrip({ layout = "overlay" }: UrgencyStripProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
    } catch {
      // ignore
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!mounted) return null;

  const bar =
    layout === "stacked"
      ? "relative z-20 w-full overflow-hidden bg-[#1A1510] border-t-2 border-[#D4A853]/60 border-b border-[#0D0B09]/40"
      : "fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-[#1A1510] border-t-2 border-[#D4A853]/60 border-b border-[#0D0B09]/40";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={bar}
        >
          <div className="relative max-w-7xl mx-auto px-10 md:px-12 py-2 flex items-center justify-center">
            <span className="text-[11px] md:text-xs font-medium tracking-wide text-center text-[#F5EDE0]/90 pr-1">
              Only <strong className="text-[#D4A853] font-semibold">14 units</strong> · Race weekend
              typically sells out by <strong className="text-[#D4A853] font-semibold">August</strong> ·{" "}
              <a
                href="#request-a-quote"
                className="text-[#F5EDE0] underline underline-offset-2 decoration-[#D4A853]/60 hover:text-[#D4A853] transition-colors"
              >
                Reserve yours →
              </a>
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-white/35 hover:text-white/90 hover:bg-white/5 transition-colors"
            >
              <X className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
