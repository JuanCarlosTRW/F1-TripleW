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

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-gold text-sm mb-3" aria-label={`${count} stars`}>
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
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
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
                className="p-7 md:p-8 rounded-2xl border border-gold/10 bg-charcoal-warm/60 backdrop-blur-sm shadow-[0_4px_40px_rgba(212,168,83,0.04)] max-w-xs w-full"
              >
                <Stars count={rating} />
                <p className="text-cream text-[14px] md:text-[15px] leading-relaxed italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gold/10">
                  <div className="h-10 w-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-semibold tracking-wider">
                    {initials(name)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium text-cream text-sm tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-gold/70 leading-5">
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
