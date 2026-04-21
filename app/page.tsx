"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Phone, Truck, PartyPopper } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";
import PremiumImageGallery, { type GalleryItem } from "@/components/ui/PremiumImageGallery";
import Reviews from "@/components/Reviews";
import IntroAnimation from "@/components/ui/IntroAnimation";
import BookingInquiryForm from "@/components/BookingInquiryForm";
import UrgencyStrip from "@/components/ui/UrgencyStrip";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

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

/* ─── HERO COPY VARIANTS ─── */

type HeroVariant = {
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
};

function heroCopy(src: string): HeroVariant {
  if (src === "camping") {
    return {
      eyebrow: "Premium RV + Lot N · COTA Race Weekend",
      h1: (
        <>
          COTA RV Camping{" "}
          <span className="text-[#D4A853]">
            {"\u2014"} Delivered and Set Up for You.
          </span>
        </>
      ),
      sub: "We deliver your RV to Premium Lot or Lot N, level it, deploy the slides, and install your generator if required. Walk six minutes to Turn 6.",
    };
  }
  if (src === "hotel") {
    return {
      eyebrow: "October 23\u201325, 2026 · Circuit of The Americas",
      h1: (
        <>
          The Smarter Alternative to{" "}
          <span className="text-[#D4A853]">$600/Night Austin Hotels.</span>
        </>
      ),
      sub: "Your whole group under one roof, six minutes from Turn 6 \u2014 for less per person than a Holiday Inn 25 miles away. We deliver the RV. You just show up.",
    };
  }
  return {
    eyebrow: "October 23\u201325, 2026 · Circuit of The Americas",
    h1: (
      <>
        RV Rental for F1 at COTA
        <br />
        <span className="text-[#D4A853]">
          {"\u2014"} Delivered to Your Site.
        </span>
      </>
    ),
    sub: "We tow your unit to Circuit of The Americas, level it, hook up power and water, and hand you the keys. You land Thursday with coffee in hand and walk to Turn 6 before first practice.",
  };
}

/* ─── HERO ─── */

function Hero({ src }: { src: string }) {
  const copy = heroCopy(src);
  return (
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

      <div className="relative z-[2] max-w-4xl mx-auto pt-32 md:pt-36 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-block border border-[#D4A853]/40 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="type-eyebrow text-[#D4A853]">{copy.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="type-display text-[#F5F0E8]"
        >
          {copy.h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mt-8 type-body text-[#F5F0E8]/80 max-w-2xl mx-auto"
        >
          {copy.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PhoneLink
            className="w-full sm:w-auto bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:brightness-105 active:scale-[0.98] transition-all text-sm shadow-[0_10px_40px_rgba(212,168,83,0.25)] text-center"
          >
            Call (972) 965-6901 &middot; Reserve Now
          </PhoneLink>
          <a
            href="#request-a-quote"
            className="w-full sm:w-auto border border-[#D4A853]/50 text-[#D4A853] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#D4A853]/10 hover:border-[#D4A853] active:scale-[0.98] transition-all text-sm"
          >
            Request a Callback &rarr;
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#F5F0E8]/60 uppercase tracking-[0.15em]"
        >
          <span>200+ Deliveries</span>
          <span className="hidden md:inline-block w-px h-3 bg-[#F5F0E8]/20" />
          <span>4.7&#9733; Google</span>
          <span className="hidden md:inline-block w-px h-3 bg-[#F5F0E8]/20" />
          <span>Owner-Operated</span>
          <span className="hidden md:inline-block w-px h-3 bg-[#F5F0E8]/20" />
          <span className="text-[#D4A853]/80">Books Out by August</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE BODY ─── */

function HomeBody() {
  const searchParams = useSearchParams();
  const src = (searchParams.get("src") ?? "").toLowerCase();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col [padding-top:env(safe-area-inset-top)]">
        <UrgencyStrip layout="stacked" />
        <SiteHeader layout="stacked" />
      </div>

      <main className="font-[var(--font-outfit)] bg-[#0D0B09] text-[#F5F0E8]">
        {/* ─── HERO ─── */}
        <Hero src={src} />

        {/* ─── CREDIBILITY STRIP ─── */}
        <section className="relative bg-[#0D0B09] border-t border-b border-[#D4A853]/8 py-10 md:py-12 px-6 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p
              {...fadeUp}
              className="font-[var(--font-cormorant)] italic text-[#F5F0E8]/80 text-lg md:text-xl leading-relaxed"
            >
              Triple W isn&rsquo;t a marketplace. It&rsquo;s a 14-unit fleet out of Tyler, Texas,
              run by Weston and the team. Every booking confirmed. Every delivery tracked.
            </motion.p>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden texture-grain">
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "600px",
              height: "400px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, #D4A853 0%, transparent 70%)",
              opacity: 0.12,
            }}
          />
          <div className="relative z-[1] max-w-5xl mx-auto">
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

        {/* ─── TWO VERY DIFFERENT TRIPS (moved up) ─── */}
        <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden texture-grain border-t border-[#D4A853]/8">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{ background: "var(--gradient-charcoal-warm)" }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "420px",
              height: "420px",
              top: "-120px",
              right: "-120px",
              background: "radial-gradient(circle, #D4A853 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "500px",
              height: "500px",
              bottom: "-180px",
              left: "-150px",
              background: "radial-gradient(circle, #A85A28 0%, transparent 70%)",
              opacity: 0.15,
            }}
          />
          <div className="relative z-[1] max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="type-eyebrow text-[#D4A853] block mb-3">The Same Weekend</span>
              <h2 className="type-h2 text-[#F5F0E8]">Two Very Different Trips.</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
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

        {/* ─── THE OFFER ─── */}
        <section
          id="the-offer"
          className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden border-t border-[#D4A853]/10 texture-grain"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "var(--gradient-gold-glow-strong)" }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "500px",
              height: "500px",
              top: "10%",
              left: "-150px",
              background: "radial-gradient(circle, #D4A853 0%, transparent 70%)",
              opacity: 0.18,
            }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "420px",
              height: "420px",
              bottom: "-10%",
              right: "-120px",
              background: "radial-gradient(circle, #A85A28 0%, transparent 70%)",
              opacity: 0.15,
            }}
          />
          <div className="relative z-[1] max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="type-eyebrow text-[#D4A853] block mb-3">The Weekend Package</span>
              <h2 className="type-h2 text-[#F5F0E8] leading-[1.1]">
                The full F1 weekend &mdash;
                <br className="hidden md:block" /> delivered to your site.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-start">
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

              <motion.div
                {...fadeUpDelay(0.15)}
                className="bg-[#1A1510] border border-[#D4A853]/25 rounded-lg p-8 text-center md:sticky md:top-32"
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
                <PhoneLink
                  className="block mt-6 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm hover:brightness-105 active:scale-[0.98] transition-all text-sm shadow-[0_8px_24px_rgba(212,168,83,0.2)] text-center"
                >
                  Call for a Quote
                </PhoneLink>
                <div className="mt-3 text-xs text-[#F5F0E8]/50">
                  (972) 965-6901 &nbsp;&middot;&nbsp;{" "}
                  <a
                    href="#request-a-quote"
                    className="text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
                  >
                    request online
                  </a>
                </div>
                <p className="mt-5 text-xs text-[#F5F0E8]/45 leading-relaxed">
                  Race weekend books out by August. 14 units.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── PRICING ANCHOR CALLOUT ─── */}
        <section className="relative bg-[#0D0B09] border-t border-[#D4A853]/8 py-8 md:py-10 px-6 overflow-hidden">
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p
              {...fadeUp}
              className="text-[#F5F0E8]/80 text-sm md:text-base leading-relaxed"
            >
              A 4-night trip for 6 runs about{" "}
              <span className="text-[#D4A853] font-semibold">$133 per person, per night</span>.
              Less than a downtown hotel &mdash; six minutes from Turn 6.
            </motion.p>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <Reviews />

        {/* ─── INQUIRY FORM ─── */}
        <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden texture-grain">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{ background: "var(--gradient-charcoal-warm)" }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "700px",
              height: "400px",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, #D4A853 0%, transparent 70%)",
              opacity: 0.1,
            }}
          />
          <div className="relative z-[1]">
            <BookingInquiryForm variant="primary" source={src} />
          </div>
        </section>

        {/* ─── TRUST STATS STRIP ─── */}
        <section className="relative bg-[#0D0B09] py-12 md:py-16 px-6 border-t border-[#D4A853]/10 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-[1] max-w-5xl mx-auto">
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
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="relative bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden texture-grain">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "var(--gradient-gold-glow-strong)" }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "600px",
              height: "500px",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, #D4A853 0%, transparent 65%)",
              opacity: 0.22,
            }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "400px",
              height: "300px",
              bottom: "-50px",
              right: "-100px",
              background: "radial-gradient(circle, #A85A28 0%, transparent 70%)",
              opacity: 0.2,
            }}
          />
          <div className="relative z-[1] max-w-3xl mx-auto text-center">
            <motion.span
              {...fadeUp}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block type-eyebrow text-[#D4A853] border border-[#D4A853]/30 rounded-full px-4 py-1.5 mb-8"
            >
              Only 14 Units &middot; Books Out by August
            </motion.span>

            <motion.h2 {...fadeUpDelay(0.1)} className="type-h2 text-[#F5F0E8]">
              Race weekend is closer than it looks.
              <br />
              <span className="text-[#D4A853]">Reserve your unit now.</span>
            </motion.h2>
            <motion.p {...fadeUpDelay(0.15)} className="mt-6 type-body-sm text-[#F5F0E8]/70 max-w-xl mx-auto">
              One call locks your RV. We deliver it to your COTA site, level it, hook it up, and walk your group through every system.
              <span className="text-[#F5F0E8]/95 font-medium"> Starting at $200/night.</span>
            </motion.p>

            <motion.div
              {...fadeUpDelay(0.2)}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <PhoneLink
                className="w-full sm:w-auto bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:brightness-105 active:scale-[0.98] transition-all text-sm shadow-[0_10px_40px_rgba(212,168,83,0.25)] text-center"
              >
                Call the Team &middot; (972) 965-6901
              </PhoneLink>
              <a
                href="#request-a-quote"
                className="text-sm text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
              >
                Request a callback &rarr;
              </a>
            </motion.div>

            <motion.p
              {...fadeUpDelay(0.25)}
              className="mt-8 text-xs text-[#F5F0E8]/50 max-w-md mx-auto leading-relaxed"
            >
              Owned and operated by Weston and the Triple W team &mdash; based in Tyler, Texas.
            </motion.p>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-[#0D0B09] border-t border-[#D4A853]/15 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#F5F0E8]/45 tracking-wide">
            <span>&copy; 2026 Triple W Rentals &middot; Tyler, Texas</span>
            <span className="flex gap-3">
              <PhoneLink className="hover:text-[#D4A853] transition-colors">(972) 965-6901</PhoneLink>
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

      <StickyMobileCTA />
    </>
  );
}

/* ─── PAGE ─── */

export default function Home() {
  return (
    <IntroAnimation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={null}>
          <HomeBody />
        </Suspense>
      </motion.div>
    </IntroAnimation>
  );
}
