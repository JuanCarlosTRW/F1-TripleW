"use client";

import { motion } from "framer-motion";

export type GridTestimonial = {
  quote: string;
  name: string;
};

const TESTIMONIALS: GridTestimonial[] = [
  {
    name: "Daniel Henson",
    quote:
      "Have rented many times. Excellent customer service. What stands out is the convenience — they deliver wherever you're at.",
  },
  {
    name: "Dennis Kruse",
    quote:
      "Professional and excellent quality. They even provided an upgraded unit to ensure the stay was the best it could be.",
  },
  {
    name: "Dan & Laura Savage",
    quote:
      "Rented the Impression RV for a mini vacation with our grandkids. Weston and his brother were super helpful.",
  },
  {
    name: "Mylissa Messer",
    quote:
      "Their trailers are exceptionally clean and exactly as described. We will definitely be using them again.",
  },
  {
    name: "Grant Walker",
    quote:
      "The RV was set up and delivered for us. Clean and roomy. Couldn't ask for a better experience!",
  },
  {
    name: "Sandy McKinney",
    quote:
      "Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded.",
  },
];

function initials(name: string) {
  return name
    .replace("&", " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#D4A853] text-sm mb-4" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>&#9733;</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,83,0.12), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <span className="type-eyebrow text-[#D4A853] block mb-3">Testimonials</span>
          <h2 className="font-[var(--font-cormorant)] text-[#F5EDE0] text-4xl md:text-5xl leading-tight">
            Don&apos;t Take Our Word for It.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
              className="flex h-full flex-col rounded-2xl bg-[#F5EDE0] p-6 md:p-8 text-[#0D0B09] shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1"
            >
              <Stars />
              <p className="text-[15px] leading-relaxed text-[#0D0B09]/90 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-5 border-t border-[#0D0B09]/10 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#EDE4D8] border border-[#0D0B09]/10 flex items-center justify-center text-xs font-semibold text-[#0D0B09] shrink-0">
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#0D0B09] leading-snug">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6B1F] mt-0.5">
                    Google Review
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
