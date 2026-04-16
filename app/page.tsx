"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Phone, Truck, PartyPopper } from "lucide-react";
import PremiumImageGallery, { type GalleryItem } from "@/components/ui/PremiumImageGallery";
import IntroAnimation from "@/components/ui/IntroAnimation";

const Hyperspeed = dynamic(() => import("@/components/ui/Hyperspeed"), { ssr: false });

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease },
};

function fadeUpDelay(delay: number) {
  return {
    ...fadeUp,
    transition: { duration: 0.7, ease, delay },
  };
}

/* ─── DATA ─── */

const painPoints = [
  {
    title: "$600/Night Hotel Rooms",
    desc: "Austin hotels triple their rates during race weekend. You\u2019re paying resort prices for a Holiday Inn 25 miles from the track.",
  },
  {
    title: "2-Hour Traffic Each Way",
    desc: "100,000+ fans trying to reach COTA on the same roads. You\u2019ll spend more time in traffic than watching the race.",
  },
  {
    title: "Missing the Concerts",
    desc: "Maroon 5 on Friday. Post Malone on Saturday. Leave early to beat traffic, or stay and face a 90-minute Uber surge.",
  },
  {
    title: "Split Across 3 Hotel Rooms",
    desc: "Your group of 8 is scattered across different floors, different hotels. The trip you planned together becomes separate trips.",
  },
];

const desirePoints = [
  {
    title: "Wake Up at the Track",
    desc: "Your RV is parked at COTA. Step outside, grab your coffee, and walk to the gates. No commute. No stress.",
  },
  {
    title: "Your Own Private Space",
    desc: "Full kitchen, king beds, outdoor setup, smart TVs. Everything you need \u2014 nothing you don\u2019t.",
  },
  {
    title: "Stay for Everything",
    desc: "Concerts, qualifying, the race itself. Walk back to your RV whenever you want. No curfew. No checkout.",
  },
  {
    title: "Everyone Together",
    desc: "Your whole crew under one roof. Cook breakfast together. Watch the sunset over the track. This is how it\u2019s supposed to feel.",
  },
];

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Call or Text Us",
    desc: "Tell us your dates, your group size, and which RV catches your eye. We\u2019ll confirm availability on the spot.",
  },
  {
    num: "02",
    icon: Truck,
    title: "We Deliver to COTA",
    desc: "Your RV arrives before you do \u2014 fully set up, cleaned, stocked, and ready. We walk you through everything on arrival.",
  },
  {
    num: "03",
    icon: PartyPopper,
    title: "Enjoy Race Weekend",
    desc: "Walk to the track. Come back whenever you want. Grill out between sessions. Live like a local, not a tourist.",
  },
];

const FLEET_MEDIA: GalleryItem[] = [
  {
    type: "video",
    src: "https://video.wixstatic.com/video/62f926_8ff76b0555c04f32acb69a68ef4633af/480p/mp4/file.mp4",
    poster: "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp",
  },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_72984415dae543f5a93113defc3976a4~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_6081972934c541bf9b8aaa703b74f585~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_69694ee7940c4fe4985b984e4067343e~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_26b6714d0a0d4937b73e45668ce44bd9~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_d5db0126f18a4cc0884f4308913f9362~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_e4c918f468b243d89371fa40f6424fce~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_b833defbf81b455991760bc1f4c878ff~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_1ba23ff81e904ae2b5feae14ed4754fb~mv2.webp" },
  { type: "image", src: "https://static.wixstatic.com/media/62f926_cf6fafa3b7184f93b149c98ee96c783f~mv2.webp" },
];

const trustPoints = [
  {
    title: "Delivered. Set Up. Walked Through.",
    desc: "Your RV arrives at COTA before you do. We handle placement, hookups, and a full walkthrough.",
  },
  {
    title: "Generator Rental Available",
    desc: "Camping in Lot N with no hookups? We provide generator rentals for full power all weekend.",
  },
  {
    title: "Outdoor Add-On \u2014 $100",
    desc: "Grill, chairs, outdoor table, and lawn setup. Turn your campsite into a tailgate.",
  },
  {
    title: "4.7 Stars \u00b7 200+ Bookings",
    desc: "We show up early, set up right, and stay reachable 24/7. Every single time.",
  },
];

/* ─── PAGE ─── */

export default function Home() {
  return (
    <IntroAnimation>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    <main className="font-[var(--font-outfit)]">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0B09]/90 backdrop-blur-md">
        <span className="font-[var(--font-cormorant)] text-xl md:text-2xl font-medium text-[#D4A853] tracking-wide">
          Triple W Rentals
        </span>
        <a
          href="tel:9729656901"
          className="text-sm text-[#F5F0E8]/80 hover:text-[#D4A853] transition-colors tracking-wide"
        >
          (972) 965-6901
        </a>
      </nav>

      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#0D0B09] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hyperspeed
            effectOptions={{
              distortion: "turbulentDistortion",
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 3,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0x131318,
                brokenLines: 0x131318,
                leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                sticks: 0x03b3c3,
              },
            }}
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0D0B09]/40 via-transparent to-[#0D0B09]/50" />

        <div className="relative z-[2] max-w-3xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-block border border-[#D4A853]/40 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]">
              October 23&ndash;25, 2026 &middot; Circuit of The Americas &middot; Austin, TX
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="font-[var(--font-cormorant)] text-4xl sm:text-5xl md:text-7xl font-normal text-[#F5F0E8] leading-[1.1]"
          >
            Your Private Suite at the United States Grand Prix
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl font-light text-[#F5F0E8]/80 max-w-2xl mx-auto leading-relaxed"
          >
            Premium RVs delivered and set up at COTA. Wake up trackside. Walk to the race. Skip the hotel chaos and the $600-a-night rooms.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            href="tel:9729656901"
            className="inline-block mt-10 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm md:text-base"
          >
            Reserve Your RV &mdash; (972) 965-6901
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-[#F5F0E8]/80 uppercase tracking-wider"
          >
            {["200+ Rentals", "4.7\u2605 Google Reviews", "Delivered & Set Up", "Texas Statewide"].map(
              (item, i) => (
                <span key={i} className="flex items-center gap-4 md:gap-8">
                  {i > 0 && (
                    <span className="hidden md:inline-block w-px h-4 bg-[#F5F0E8]/20 -ml-4 md:-ml-8" />
                  )}
                  <span>{item}</span>
                </span>
              )
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-12 flex justify-center text-[#D4A853] opacity-40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2A: THE PROBLEM (Dark) ─── */}
      <section className="bg-[#0D0B09] py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...fadeUp}
            className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-4"
          >
            The Reality of F1 Weekend
          </motion.span>
          <motion.h2
            {...fadeUpDelay(0.1)}
            className="font-[var(--font-cormorant)] text-3xl md:text-4xl text-[#F5F0E8]"
          >
            What Race Weekend Actually Looks Like Without a Plan
          </motion.h2>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="bg-[#1A1510] p-6 md:p-8 rounded-sm border-l-[3px] border-[#8B4513]/40"
              >
                <h3 className="text-lg font-semibold text-[#F5F0E8]">{p.title}</h3>
                <p className="mt-2 text-base font-light text-[#F5F0E8]/70 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2B: THE DREAM (Light split-panel) ─── */}
      <section className="bg-[#F5F0E8]">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="relative min-h-[400px] md:min-h-[500px]"
          >
            <Image
              src="https://static.wixstatic.com/media/62f926_bf23e37064074d13911e9210dd2584e6~mv2.png"
              alt="Triple W RV setup at an event"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="p-10 md:p-16 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-4">
              With Triple W
            </span>
            <h2 className="font-[var(--font-cormorant)] text-3xl md:text-4xl text-[#1A1510]">
              What It Feels Like When You Do It Right
            </h2>

            <div className="mt-8 space-y-6">
              {desirePoints.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="border-l-[3px] border-[#D4A853] pl-5"
                >
                  <h3 className="text-lg font-semibold text-[#1A1510]">{d.title}</h3>
                  <p className="mt-1 text-base font-light text-[#1A1510]/70 leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: HOW IT WORKS ─── */}
      <section className="bg-[#0D0B09] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8]">
              Three Steps. Zero Stress.
            </h2>
            <p className="mt-4 text-lg text-[#F5F0E8]/70 max-w-xl mx-auto">
              We handle the hard part. You handle the fun part.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-16 md:gap-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="relative">
                    {/* Connecting line — desktop horizontal */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 -z-0">
                        <div className="w-full h-full bg-[#D4A853]/20" />
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4A853] via-[#e0b964] to-[#D4A853]"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.3, ease }}
                          style={{ originX: 0 }}
                        />
                      </div>
                    )}

                    {/* Connecting line — mobile vertical */}
                    {i < steps.length - 1 && (
                      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%+1rem)]">
                        <div className="w-full h-full bg-[#D4A853]/20" />
                        <motion.div
                          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#D4A853] via-[#e0b964] to-[#D4A853]"
                          initial={{ height: "0%" }}
                          whileInView={{ height: "100%" }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 1.2, delay: 0.8 + i * 0.3, ease: "easeInOut" }}
                        />
                      </div>
                    )}

                    {/* Step card */}
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                    >
                      {/* Icon circle */}
                      <div className="flex justify-center mb-6">
                        <motion.div
                          className="relative w-20 h-20 rounded-full bg-[#D4A853]/10 border-2 border-[#D4A853] flex items-center justify-center"
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                          >
                            <Icon className="w-8 h-8 text-[#D4A853]" />
                          </motion.div>

                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[#D4A853]"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.4, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
                          />
                        </motion.div>
                      </div>

                      {/* Step number with scale-in */}
                      <motion.div
                        className="text-center mb-3"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.2, ease }}
                      >
                        <span className="font-[var(--font-cormorant)] text-5xl font-light text-[#D4A853]/25">
                          {s.num}
                        </span>
                      </motion.div>

                      {/* Text content */}
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                      >
                        <h3 className="text-xl md:text-2xl font-semibold text-[#F5F0E8] mb-3">
                          {s.title}
                        </h3>
                        <p className="font-light text-[#F5F0E8]/70 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                          {s.desc}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mid-section tagline */}
          <motion.p
            {...fadeUpDelay(0.3)}
            className="mt-12 text-center text-base text-[#F5F0E8]/60 italic"
          >
            It really is that simple.
          </motion.p>
        </div>
      </section>

      {/* ─── SECTION 4: THE FLEET ─── */}
      <section className="bg-[#F7F4F0] py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#1A1510] text-center"
          >
            The Fleet
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.1)}
            className="mt-4 text-lg text-[#1A1510]/60 text-center max-w-xl mx-auto"
          >
            Every unit is cleaned, prepped, and delivered with the same standard &mdash; whether it sleeps 4 or 12.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease }}
            className="mt-16"
          >
            <PremiumImageGallery items={FLEET_MEDIA} />
          </motion.div>

          <motion.div {...fadeUpDelay(0.2)} className="mt-16 text-center">
            <p className="text-[#1A1510]/60 mb-6">
              We have 14 units in our fleet. Call to see the full lineup and find the right fit.
            </p>
            <a
              href="https://triple-w-rentals.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#D4A853] text-[#D4A853] font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-[#D4A853] hover:text-[#0D0B09] transition-colors text-sm"
            >
              See Full Fleet at TripleWRentals.com &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── MID-PAGE CTA STRIP ─── */}
      <section className="bg-[#0D0B09] py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            {...fadeUp}
            className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#F5F0E8]"
          >
            See a unit you like?
          </motion.h3>
          <motion.p
            {...fadeUpDelay(0.1)}
            className="mt-2 text-base text-[#F5F0E8]/70"
          >
            Call or text us &mdash; we&rsquo;ll check F1 weekend availability on the spot.
          </motion.p>
          <motion.a
            {...fadeUpDelay(0.2)}
            href="tel:9729656901"
            className="inline-block mt-4 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm md:text-base"
          >
            (972) 965-6901
          </motion.a>
        </div>
      </section>

      {/* ─── SECTION 6: WHY TRIPLE W ─── */}
      <section className="bg-[#1A1510] py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/62f926_b687d2cf0d374773b965a26a2da00832~mv2.webp"
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            {...fadeUp}
            className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-4"
          >
            Why Triple W
          </motion.span>
          <motion.h2
            {...fadeUpDelay(0.1)}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8]"
          >
            Built for Events Exactly Like This
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.2)}
            className="mt-6 text-lg text-[#F5F0E8]/80 max-w-2xl mx-auto leading-relaxed"
          >
            We&rsquo;ve delivered RVs to motorsport events, horse shows, family reunions, and corporate retreats across Texas. F1 weekend is our kind of challenge &mdash; and your crew deserves better than a hotel.
          </motion.p>

          <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
            {trustPoints.map((tp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="bg-[rgba(245,240,232,0.05)] border border-[rgba(212,168,83,0.15)] p-6 rounded-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#D4A853] shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-[#F5F0E8]">{tp.title}</h3>
                    <p className="mt-2 text-sm font-light text-[#F5F0E8]/65 leading-relaxed">{tp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUpDelay(0.3)}
            className="mt-10 text-base text-[#F5F0E8]/70 italic"
          >
            For a group of 6, an RV at COTA costs less per person than one downtown hotel room &mdash; and you&rsquo;re sleeping trackside.
          </motion.p>
        </div>
      </section>

      {/* ─── SECTION 7: COTA CAMPING GUIDE ─── */}
      <section className="bg-[#F4EDE3] py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="font-[var(--font-cormorant)] text-3xl md:text-4xl text-[#1A1510] text-center"
          >
            Camping at COTA &mdash; What You Need to Know
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.1)}
            className="mt-4 text-base text-[#1A1510]/70 text-center max-w-2xl mx-auto leading-relaxed"
          >
            COTA offers two on-site camping options for F1 weekend. Both let you stay at the track for the entire event &mdash; Thursday through Monday. You don&rsquo;t need to own an RV. That&rsquo;s where we come in.
          </motion.p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
              className="bg-white rounded-sm p-8 border border-[#D4A853]/10"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#D4A853] border border-[#D4A853]/40 rounded-full px-3 py-1 mb-4">
                Premium
              </span>
              <h3 className="font-[var(--font-cormorant)] text-xl font-medium text-[#1A1510] mb-4">
                Trackside Full-Hookup Sites
              </h3>
              <ul className="space-y-2 text-sm text-[#1A1510]/70 leading-relaxed">
                <li>Located on the back straight, near Turns 3&ndash;6</li>
                <li>Full hookups: water, electric, sewer</li>
                <li>~40&prime; &times; 24&prime; sites</li>
                <li>Access: Thursday Oct 22 (7 AM) to Monday Oct 26 (noon)</li>
                <li>RV camping does NOT include race admission &mdash; tickets sold separately</li>
                <li>Sites sell out fast &mdash; book directly through COTA</li>
              </ul>
              <p className="mt-4 text-sm text-[#D4A853] font-medium">
                We deliver your RV directly to your reserved Premium site.
              </p>
            </motion.div>

            {/* Lot N */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="bg-white rounded-sm p-8 border border-[#D4A853]/10"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1A1510]/70 border border-[#1A1510]/20 rounded-full px-3 py-1 mb-4">
                Lot N
              </span>
              <h3 className="font-[var(--font-cormorant)] text-xl font-medium text-[#1A1510] mb-4">
                Hilltop Dry Camping
              </h3>
              <ul className="space-y-2 text-sm text-[#1A1510]/70 leading-relaxed">
                <li>Short walk to Turn 3 and Turn 6</li>
                <li>No hookups &mdash; bring a generator (we rent them)</li>
                <li>First-come, first-served site selection</li>
                <li>Access: Thursday Oct 22 to Monday Oct 26</li>
                <li>Shower passes and pump-outs available for purchase</li>
                <li>Pets allowed, golf carts welcome (must register)</li>
              </ul>
              <p className="mt-4 text-sm text-[#D4A853] font-medium">
                We deliver your RV to Lot N and set up with a generator so you&rsquo;re fully powered.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUpDelay(0.2)} className="mt-10 text-center text-sm text-[#1A1510]/50 space-y-1">
            <p>
              For camping reservations, contact COTA directly at 512-655-6300 or COTA-Sales@thecircuit.com
            </p>
            <p>
              For your RV rental, call Triple W at{" "}
              <a href="tel:9729656901" className="text-[#D4A853] hover:underline">
                (972) 965-6901
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 8: FINAL CTA ─── */}
      <section className="bg-[#0D0B09] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Urgency badge */}
          <motion.div
            {...fadeUp}
            className="mb-8 inline-block"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-xs uppercase tracking-widest text-[#D4A853] border border-[#D4A853]/30 rounded-full px-4 py-1.5"
            >
              Limited Availability &mdash; 14 Units
            </motion.span>
          </motion.div>

          <motion.h2
            {...fadeUpDelay(0.1)}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8] leading-tight"
          >
            Race Weekend Fills Up. Your RV Shouldn&rsquo;t Be an Afterthought.
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.2)}
            className="mt-4 text-lg text-[#F5F0E8]/70 max-w-xl mx-auto leading-relaxed"
          >
            Lock in your unit now. We&rsquo;ll handle everything from delivery to setup &mdash; you just show up and enjoy the Grand Prix.
          </motion.p>
          <motion.a
            {...fadeUpDelay(0.3)}
            href="tel:9729656901"
            className="inline-block mt-10 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm md:text-base"
          >
            Call or Text (972) 965-6901
          </motion.a>
          <motion.p
            {...fadeUpDelay(0.4)}
            className="mt-6 text-sm text-[#F5F0E8]/50 max-w-lg mx-auto"
          >
            Every booking is personally handled by Corbin Walker, owner of Triple W. He&rsquo;ll answer your call, confirm your unit, and make sure everything&rsquo;s ready when you arrive.
          </motion.p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0D0B09] border-t border-[#D4A853]/20 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#F5F0E8]/50">
          <span>&copy; 2026 Triple W Rentals &middot; Tyler, Texas</span>
          <span>
            <a href="tel:9729656901" className="hover:text-[#D4A853] transition-colors">
              (972) 965-6901
            </a>
            {" "}&middot;{" "}
            <a href="mailto:triplewrentals@gmail.com" className="hover:text-[#D4A853] transition-colors">
              triplewrentals@gmail.com
            </a>
          </span>
          <a
            href="https://triple-w-rentals.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4A853] transition-colors"
          >
            Visit TripleWRentals.com
          </a>
        </div>
      </footer>
    </main>
    </motion.div>
    </IntroAnimation>
  );
}
