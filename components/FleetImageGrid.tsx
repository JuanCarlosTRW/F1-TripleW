"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FLEET_IMAGES = [
  "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp",
  "https://static.wixstatic.com/media/62f926_72984415dae543f5a93113defc3976a4~mv2.webp",
  "https://static.wixstatic.com/media/62f926_6081972934c541bf9b8aaa703b74f585~mv2.webp",
  "https://static.wixstatic.com/media/62f926_69694ee7940c4fe4985b984e4067343e~mv2.webp",
  "https://static.wixstatic.com/media/62f926_26b6714d0a0d4937b73e45668ce44bd9~mv2.webp",
  "https://static.wixstatic.com/media/62f926_d5db0126f18a4cc0884f4308913f9362~mv2.webp",
] as const;

const LABELS = [
  "Class A & fifth wheels",
  "Travel trailers",
  "Lot N ready",
  "Full kitchen & bath",
  "Sleeps up to 12",
  "Owner-delivered",
] as const;

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function FleetImageGrid() {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {FLEET_IMAGES.map((src, i) => (
          <motion.article
            key={src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease, delay: i * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#1A1510]/10 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1510]/10">
              <Image
                src={src}
                alt={`Triple W RV — ${LABELS[i]}`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 text-center border-t border-[#1A1510]/6">
              <p className="font-[var(--font-cormorant)] text-lg font-medium text-[#1A1510]">
                {LABELS[i]}
              </p>
              <p className="text-xs text-[#8B6B1F] mt-1 uppercase tracking-wider">Sleeps 4–12</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1 scrollbar-none">
        {FLEET_IMAGES.map((src, i) => (
          <article
            key={src}
            className="snap-center shrink-0 w-[min(88vw,360px)] overflow-hidden rounded-2xl bg-white border border-[#1A1510]/10 shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={`Triple W RV — ${LABELS[i]}`}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium text-[#1A1510] text-sm">{LABELS[i]}</p>
              <p className="text-[10px] text-[#8B6B1F] mt-0.5 uppercase tracking-wider">Sleeps 4–12</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
