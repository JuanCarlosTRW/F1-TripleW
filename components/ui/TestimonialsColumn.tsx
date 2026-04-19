"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Testimonial = {
  text: string;
  name: string;
  rating?: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars({ count = 5, variant = "dark" }: { count?: number; variant?: "dark" | "light" }) {
  const color = variant === "light" ? "text-[#D4A853]" : "text-gold";
  return (
    <div className={cn("flex gap-0.5 text-sm mb-3", color)} aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>&#9733;</span>
      ))}
    </div>
  );
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 15,
  variant = "dark",
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  return (
    <div className={cn(className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {testimonials.map(({ text, name, rating = 5 }, i) => (
              <article
                key={`${dup}-${i}`}
                className={cn(
                  "p-7 md:p-8 rounded-2xl max-w-xs w-full",
                  isLight
                    ? "bg-white border border-[#1A1510]/8 shadow-[0_4px_24px_rgba(26,21,16,0.06),0_1px_3px_rgba(26,21,16,0.04)]"
                    : "border border-gold/10 bg-charcoal-warm/60 backdrop-blur-sm shadow-[0_4px_40px_rgba(212,168,83,0.04)]"
                )}
              >
                <Stars count={rating} variant={variant} />
                <p
                  className={cn(
                    "text-[14px] md:text-[15px] leading-relaxed italic",
                    isLight ? "text-[#1A1510]/85" : "text-cream"
                  )}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div
                  className={cn(
                    "flex items-center gap-3 mt-6 pt-4 border-t",
                    isLight ? "border-[#1A1510]/8" : "border-gold/10"
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold tracking-wider",
                      isLight
                        ? "bg-[#D4A853]/12 border border-[#D4A853]/40 text-[#8B6B1F]"
                        : "bg-gold/15 border border-gold/30 text-gold"
                    )}
                  >
                    {initials(name)}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "font-medium text-sm tracking-tight leading-5",
                        isLight ? "text-[#1A1510]" : "text-cream"
                      )}
                    >
                      {name}
                    </div>
                    <div
                      className={cn(
                        "text-[11px] uppercase tracking-[0.2em] leading-5",
                        isLight ? "text-[#8B6B1F]" : "text-gold/70"
                      )}
                    >
                      Google Review
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
