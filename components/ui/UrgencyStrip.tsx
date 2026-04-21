"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "triplew:urgency-dismissed";

type UrgencyStripProps = {
  /** `stacked` = not fixed; parent provides the fixed shell. */
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={
            layout === "stacked"
              ? "relative z-20 w-full overflow-hidden bg-gradient-to-r from-[#D4A853] via-[#E0B964] to-[#D4A853] border-b border-[#0D0B09]/10"
              : "fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-gradient-to-r from-[#D4A853] via-[#E0B964] to-[#D4A853] border-b border-[#0D0B09]/10"
          }
        >
          <div className="relative max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-3 text-[#0D0B09]">
            <span className="text-[11px] md:text-xs font-medium tracking-wide text-center">
              Only 14 units · Race weekend books out by August ·{" "}
              <a
                href="#request-a-quote"
                className="font-bold underline underline-offset-2 hover:no-underline"
              >
                Reserve yours →
              </a>
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-5 h-5 rounded-full hover:bg-[#0D0B09]/10 transition-colors"
            >
              <X className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
