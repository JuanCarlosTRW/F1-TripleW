"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Phone, Truck, PartyPopper } from "lucide-react";
import PremiumImageGallery, { type GalleryItem } from "@/components/ui/PremiumImageGallery";
import Reviews from "@/components/Reviews";
import IntroAnimation from "@/components/ui/IntroAnimation";
import BookingInquiryForm from "@/components/BookingInquiryForm";

const Hyperspeed = dynamic(() => import("@/components/ui/Hyperspeed"), { ssr: false });

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
};

function fadeUpDelay(delay: number) {
  return {
    ...fadeUp,
    transition: { duration: 0.6, ease, delay },
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
    desc: "100,000+ fans on the same roads. You\u2019ll spend more time commuting than watching the race.",
  },
  {
    title: "Split Across 3 Hotel Rooms",
    desc: "Your group of 8 is scattered across different floors, different hotels. The trip you planned together becomes separate trips.",
  },
];

const desirePoints = [
  {
    title: "Wake Up at the Track",
    desc: "Step outside, grab your coffee, walk to the gates. No commute.",
  },
  {
    title: "Six Minutes from Turn 6",
    desc: "Full kitchen, king beds, outdoor lounge. Your crew under one roof.",
  },
  {
    title: "Stay for Everything",
    desc: "Concerts, qualifying, the race. Walk back to the RV whenever.",
  },
];

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Call or Text",
    desc: "Tell us your dates, group size, and which RV catches your eye. We confirm availability on the spot.",
  },
  {
    num: "02",
    icon: Truck,
    title: "We Deliver. Level. Hook Up.",
    desc: "Your unit is towed to your reserved COTA site, leveled, slide-outs deployed, water and power connected, generator installed if you\u2019re in Lot N.",
  },
  {
    num: "03",
    icon: PartyPopper,
    title: "Walk to the Track",
    desc: "Six minutes to Turn 6. Grill between sessions. Sleep through the night. Check out Monday \u2014 we handle cleanup.",
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

// Image pulled from the Fleet Gallery for the Dream section
const DREAM_IMAGE = "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp";

const valueStack: Array<[string, string]> = [
  ["Premium RV (Class A, Fifth Wheel, Travel Trailer \u2014 sleeps 4\u201312)", "From $200/night"],
  ["White-glove delivery to any COTA lot or Austin campground", "$500 value"],
  ["Full setup: leveling, slide-outs, water, electric, sewer", "$200 value"],
  ["60-minute walkthrough on arrival", "Included"],
  ["Generator rental (required for Lot N dry camping)", "$150/day"],
  ["24/7 on-call support through race weekend", "Included"],
];

const trustPoints = [
  { value: "4.7\u2605", label: "Google Rating" },
  { value: "200+", label: "Deliveries" },
  { value: "14", label: "Unit Fleet" },
  { value: "24/7", label: "Support" },
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
        <main className="font-[var(--font-outfit)] bg-[#0D0B09] text-[#F5F0E8]">
          {/* ─── NAVBAR ─── */}
          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0B09]/85 backdrop-blur-xl border-b border-[#D4A853]/8">
            <span className="font-[var(--font-cormorant)] text-xl md:text-2xl font-medium text-[#D4A853] tracking-wide">
              Triple W Rentals
            </span>
            <div className="flex items-center gap-5 md:gap-8">
              <a
                href="#request-a-quote"
                className="hidden md:inline-block text-sm text-[#F5F0E8]/60 hover:text-[#D4A853] transition-colors tracking-wide"
              >
                Request Quote
              </a>
              <a
                href="tel:9729656901"
                className="text-sm text-[#F5F0E8]/80 hover:text-[#D4A853] transition-colors tracking-wide"
              >
                (972) 965-6901
              </a>
            </div>
          </nav>

          {/* ─── HERO ─── */}
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
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0D0B09]/50 via-transparent to-[#0D0B09]/70" />

            <div className="relative z-[2] max-w-4xl mx-auto pt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-block border border-[#D4A853]/40 rounded-full px-4 py-1.5 mb-8"
              >
                <span className="type-eyebrow text-[#D4A853]">
                  October 23&ndash;25, 2026 &middot; Circuit of The Americas
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="type-display text-[#F5F0E8]"
              >
                Your RV, Delivered.
                <br />
                <span className="text-[#D4A853]">You Just Show Up.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.4 }}
                className="mt-8 type-body text-[#F5F0E8]/80 max-w-2xl mx-auto"
              >
                We tow it to your COTA site, level it, hook up power and water, and stock it to your spec. You land Thursday and walk straight to the track.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="tel:9729656901"
                  className="w-full sm:w-auto bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm"
                >
                  Reserve Your RV
                </a>
                <a
                  href="#request-a-quote"
                  className="text-sm text-[#F5F0E8]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
                >
                  Or request a quote &rarr;
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.8 }}
                className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#F5F0E8]/60 uppercase tracking-[0.15em]"
              >
                <span>200+ Deliveries</span>
                <span className="hidden md:inline-block w-px h-3 bg-[#F5F0E8]/20" />
                <span>4.7&#9733; Rating</span>
                <span className="hidden md:inline-block w-px h-3 bg-[#F5F0E8]/20" />
                <span>Owner-Operated</span>
              </motion.div>
            </div>
          </section>

          {/* ─── BEFORE & AFTER (merged Problem + Dream) ─── */}
          <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-charcoal-warm)" }}
            />
            <div className="relative max-w-5xl mx-auto">
              <motion.div {...fadeUp} className="text-center mb-14">
                <span className="type-eyebrow text-[#D4A853] block mb-3">The Same Weekend</span>
                <h2 className="type-h2 text-[#F5F0E8]">Two Very Different Trips.</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {/* Without plan */}
                <motion.div
                  {...fadeUpDelay(0.1)}
                  className="bg-[#1A1510]/60 backdrop-blur-sm border border-[#F5F0E8]/5 rounded-lg p-7 md:p-8"
                >
                  <span className="type-eyebrow text-[#A8A29E]/80 block mb-5">Without a Plan</span>
                  <ul className="space-y-5">
                    {painPoints.map((p, i) => (
                      <li key={i} className="border-l-2 border-[#8B4513]/30 pl-4">
                        <h3 className="text-[15px] font-medium text-[#F5F0E8]/90">{p.title}</h3>
                        <p className="mt-1 text-sm font-light text-[#F5F0E8]/55 leading-relaxed">{p.desc}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* With Triple W — hero image on top, text below */}
                <motion.div
                  {...fadeUpDelay(0.2)}
                  className="bg-[#1A1510] border border-[#D4A853]/20 rounded-lg p-7 md:p-8 overflow-hidden relative"
                  style={{ boxShadow: "var(--shadow-card-gold)" }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{ background: "var(--gradient-gold-glow)" }}
                  />
                  <div className="relative">
                    <span className="type-eyebrow text-[#D4A853] block mb-5">With Triple W</span>
                    <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden mb-6">
                      <Image
                        src={DREAM_IMAGE}
                        alt="Triple W RV set up at Circuit of the Americas"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510]/40 to-transparent" />
                    </div>
                    <ul className="space-y-5">
                      {desirePoints.map((d, i) => (
                        <li key={i} className="border-l-2 border-[#D4A853] pl-4">
                          <h3 className="text-[15px] font-medium text-[#F5F0E8]">{d.title}</h3>
                          <p className="mt-1 text-sm font-light text-[#F5F0E8]/70 leading-relaxed">{d.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── HOW IT WORKS — card-based, no connecting lines ─── */}
          <section className="bg-[#0D0B09] py-20 md:py-28 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp} className="text-center mb-14">
                <span className="type-eyebrow text-[#D4A853] block mb-3">How It Works</span>
                <h2 className="type-h2 text-[#F5F0E8]">Three steps. Zero stress.</h2>
                <p className="mt-3 type-body-sm text-[#F5F0E8]/60 max-w-xl mx-auto">
                  We handle the logistics. Your crew handles the weekend.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                      className="relative bg-[#1A1510]/60 border border-[#D4A853]/12 rounded-lg p-7 md:p-8 hover:border-[#D4A853]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-[var(--font-cormorant)] text-4xl text-[#D4A853]/30 leading-none">
                          {s.num}
                        </span>
                        <div className="w-11 h-11 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/40 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#D4A853]" />
                        </div>
                      </div>
                      <h3 className="type-h3 text-[#F5F0E8] mb-2">{s.title}</h3>
                      <p className="type-body-sm text-[#F5F0E8]/65">{s.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── THE OFFER ─── */}
          <section
            id="the-offer"
            className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden border-t border-[#D4A853]/10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "var(--gradient-gold-glow)" }}
            />
            <div className="relative max-w-5xl mx-auto">
              <motion.div {...fadeUp} className="text-center mb-14">
                <span className="type-eyebrow text-[#D4A853] block mb-3">The Weekend Package</span>
                <h2 className="type-h2 text-[#F5F0E8] leading-[1.1]">
                  The full F1 weekend &mdash;
                  <br className="hidden md:block" /> delivered to your site.
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-start">
                {/* Value stack */}
                <motion.div
                  {...fadeUpDelay(0.1)}
                  className="bg-[#1A1510]/60 border border-[#F5F0E8]/8 rounded-lg p-7 md:p-9"
                >
                  <ul className="space-y-0 divide-y divide-[#D4A853]/8">
                    {valueStack.map(([text, value], i) => (
                      <li key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#D4A853] shrink-0" />
                        <div className="flex-1 flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-6">
                          <span className="text-[15px] font-light leading-relaxed text-[#F5F0E8]/90">{text}</span>
                          <span className="text-xs text-[#D4A853]/80 shrink-0 font-medium tracking-wider uppercase">
                            {value}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Price anchor */}
                <motion.div
                  {...fadeUpDelay(0.15)}
                  className="bg-[#1A1510] border border-[#D4A853]/25 rounded-lg p-8 text-center md:sticky md:top-24"
                  style={{ boxShadow: "var(--shadow-card-gold)" }}
                >
                  <span className="type-eyebrow text-[#D4A853]/80 block mb-4">Weekend Packages</span>
                  <div className="font-[var(--font-cormorant)] leading-none">
                    <span className="text-[#F5F0E8]/80 text-xl">From</span>
                    <div className="mt-1">
                      <span className="text-6xl text-[#D4A853]">$200</span>
                      <span className="text-xl text-[#F5F0E8]/60">/night</span>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-[#F5F0E8]/70 leading-relaxed">
                    A 4-night trip for 6 runs about <strong className="text-[#F5F0E8] font-medium">$133/person/night</strong>.
                    Less than a downtown hotel &mdash; six minutes from Turn 6.
                  </p>
                  <a
                    href="tel:9729656901"
                    className="block mt-6 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm hover:bg-[#e0b964] transition-colors text-sm"
                  >
                    Call for a Quote
                  </a>
                  <a
                    href="#request-a-quote"
                    className="block mt-3 text-xs text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
                  >
                    Or request one online
                  </a>
                  <p className="mt-5 text-xs text-[#F5F0E8]/45 leading-relaxed">
                    Race weekend books out by August. 14 units.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── FLEET GALLERY ─── */}
          <section className="bg-[#F7F4F0] py-20 md:py-28 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp} className="text-center mb-12">
                <span className="type-eyebrow text-[#8B6B1F] block mb-3">The Fleet</span>
                <h2 className="type-h2 text-[#1A1510]">Fourteen units. All delivered by us.</h2>
                <p className="mt-3 type-body-sm text-[#1A1510]/60 max-w-xl mx-auto">
                  Every unit is owned, maintained, and delivered by Triple W &mdash; whether it sleeps 4 or 12.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease }}
              >
                <PremiumImageGallery items={FLEET_MEDIA} />
              </motion.div>

              <motion.div {...fadeUpDelay(0.1)} className="mt-10 text-center">
                <a
                  href="https://triple-w-rentals.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium tracking-wide text-[#8B6B1F] hover:text-[#1A1510] transition-colors underline underline-offset-4"
                >
                  See the full 14-unit lineup &rarr;
                </a>
              </motion.div>
            </div>
          </section>

          {/* ─── INQUIRY FORM ─── */}
          <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50"
              style={{ background: "var(--gradient-charcoal-warm)" }}
            />
            <div className="relative">
              <BookingInquiryForm variant="primary" />
            </div>
          </section>

          {/* ─── TESTIMONIALS ─── */}
          <Reviews />

          {/* ─── COMPACT TRUST STRIP (was Why Triple W full section) ─── */}
          <section className="bg-[#0D0B09] py-12 md:py-16 px-6 border-t border-[#D4A853]/10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {trustPoints.map((tp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                    className="text-center"
                  >
                    <div className="font-[var(--font-cormorant)] text-3xl md:text-4xl text-[#D4A853] leading-none">
                      {tp.value}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.15em] text-[#F5F0E8]/60">{tp.label}</div>
                  </motion.div>
                ))}
              </div>
              <motion.p
                {...fadeUpDelay(0.2)}
                className="mt-10 text-center text-sm text-[#F5F0E8]/60 max-w-2xl mx-auto leading-relaxed"
              >
                Triple W isn&rsquo;t a marketplace. It&rsquo;s a 14-unit fleet out of Tyler, Texas, personally run by Corbin Walker.
                Every booking confirmed by the owner. Every delivery tracked. Every weekend handled.
              </motion.p>
            </div>
          </section>

          {/* ─── COTA CAMPING GUIDE — COLLAPSIBLE ─── */}
          <section className="bg-[#F4EDE3] py-16 md:py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-2">
                  <div>
                    <span className="type-eyebrow text-[#8B6B1F] block mb-2">Reference</span>
                    <h2 className="type-h2 text-[#1A1510]">Camping at COTA &mdash; the two options</h2>
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full border border-[#1A1510]/20 flex items-center justify-center text-[#1A1510]/60 group-open:rotate-180 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>

                <div className="mt-8 grid md:grid-cols-2 gap-5">
                  {/* Premium */}
                  <div className="bg-white rounded-lg p-7 border border-[#D4A853]/12">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#8B6B1F] border border-[#D4A853]/40 rounded-full px-3 py-1 mb-4">
                      Premium
                    </span>
                    <h3 className="type-h3 text-[#1A1510] mb-3">Trackside Full-Hookup</h3>
                    <ul className="space-y-1.5 text-sm text-[#1A1510]/70 leading-relaxed">
                      <li>Near Turns 3&ndash;6 on the back straight</li>
                      <li>Water, electric, sewer hookups</li>
                      <li>Thu Oct 22 &rarr; Mon Oct 26</li>
                      <li>Book through COTA (tickets separate)</li>
                    </ul>
                    <p className="mt-4 text-sm text-[#8B6B1F] font-medium">We deliver to your reserved Premium site.</p>
                  </div>

                  {/* Lot N */}
                  <div className="bg-white rounded-lg p-7 border border-[#D4A853]/12">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1A1510]/70 border border-[#1A1510]/20 rounded-full px-3 py-1 mb-4">
                      Lot N
                    </span>
                    <h3 className="type-h3 text-[#1A1510] mb-3">Hilltop Dry Camping</h3>
                    <ul className="space-y-1.5 text-sm text-[#1A1510]/70 leading-relaxed">
                      <li>Short walk to Turns 3 and 6</li>
                      <li>No hookups (we rent generators)</li>
                      <li>First-come, first-served</li>
                      <li>Pets &amp; registered golf carts welcome</li>
                    </ul>
                    <p className="mt-4 text-sm text-[#8B6B1F] font-medium">We deliver to Lot N with generator included.</p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-[#1A1510]/50 text-center">
                  COTA reservations: 512-655-6300 &middot; COTA-Sales@thecircuit.com
                </p>
              </details>
            </div>
          </section>

          {/* ─── FINAL CTA ─── */}
          <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "var(--gradient-gold-glow)" }}
            />
            <div className="relative max-w-3xl mx-auto text-center">
              <motion.span
                {...fadeUp}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block type-eyebrow text-[#D4A853] border border-[#D4A853]/30 rounded-full px-4 py-1.5 mb-8"
              >
                14 Units &middot; Books Out by August
              </motion.span>

              <motion.h2 {...fadeUpDelay(0.1)} className="type-h2 text-[#F5F0E8]">
                Lock in your unit for race weekend 2026.
              </motion.h2>
              <motion.p {...fadeUpDelay(0.15)} className="mt-5 type-body-sm text-[#F5F0E8]/70 max-w-xl mx-auto">
                One call and your unit is reserved. We deliver, level, hook up, and walk you through.
                <span className="text-[#F5F0E8]/90"> Starting at $200/night.</span>
              </motion.p>

              <motion.div
                {...fadeUpDelay(0.2)}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="tel:9729656901"
                  className="w-full sm:w-auto bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm"
                >
                  Call Corbin &middot; (972) 965-6901
                </a>
                <a
                  href="#request-a-quote"
                  className="text-sm text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
                >
                  Or request a callback &rarr;
                </a>
              </motion.div>

              <motion.p
                {...fadeUpDelay(0.25)}
                className="mt-8 text-xs text-[#F5F0E8]/45 max-w-md mx-auto leading-relaxed"
              >
                Every booking personally handled by Corbin Walker, owner of Triple W.
              </motion.p>
            </div>
          </section>

          {/* ─── FOOTER ─── */}
          <footer className="bg-[#0D0B09] border-t border-[#D4A853]/15 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#F5F0E8]/45 tracking-wide">
              <span>&copy; 2026 Triple W Rentals &middot; Tyler, Texas</span>
              <span className="flex gap-3">
                <a href="tel:9729656901" className="hover:text-[#D4A853] transition-colors">(972) 965-6901</a>
                <span>&middot;</span>
                <a href="mailto:triplewrentals@gmail.com" className="hover:text-[#D4A853] transition-colors">triplewrentals@gmail.com</a>
              </span>
              <a
                href="https://triple-w-rentals.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4A853] transition-colors"
              >
                TripleWRentals.com
              </a>
            </div>
          </footer>
        </main>
      </motion.div>
    </IntroAnimation>
  );
}
