"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Phone, Truck, Flag } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";
import FleetImageGrid from "@/components/FleetImageGrid";
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
    icon: Flag,
    title: "Walk to the Track",
    desc: "Six minutes to Turn 6. Grill between sessions. Sleep through the night. Check out Monday \u2014 we handle cleanup.",
  },
];

const DREAM_IMAGE = "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp";

const HOTEL_CHAOS_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop";

const F1_STRIP_IMAGE =
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&q=80&auto=format&fit=crop";

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
          className="inline-block rounded-full border border-[#D4A853]/50 bg-[#D4A853]/5 px-4 py-1.5 mb-8 backdrop-blur-sm"
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

        <section className="relative w-full overflow-hidden border-y border-[#D4A853]/15 bg-[#0D0B09]">
          <div className="relative aspect-[21/9] max-h-[220px] md:max-h-[280px] w-full">
            <Image
              src={F1_STRIP_IMAGE}
              alt="Race circuit atmosphere"
              fill
              className="object-cover opacity-90"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B09] via-[#0D0B09]/55 to-[#0D0B09]/25" />
          </div>
        </section>

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

            <div className="grid md:grid-cols-3 gap-5 md:gap-6 md:items-stretch">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                    className="relative flex h-full min-h-[280px] flex-col bg-[#1A1510]/60 border border-[#D4A853]/12 rounded-lg p-7 md:p-8 hover:border-[#D4A853]/30 transition-colors"
                  >
                    <div className="flex shrink-0 items-center justify-between pb-6">
                      <span className="font-[var(--font-cormorant)] text-4xl text-[#D4A853]/30 leading-none">
                        {s.num}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4A853]/40 bg-[#D4A853]/10">
                        <Icon className="h-5 w-5 text-[#D4A853]" />
                      </div>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col justify-center gap-2">
                      <h3 className="type-h3 shrink-0 text-[#F5F0E8]">{s.title}</h3>
                      <p className="type-body-sm leading-relaxed text-[#F5F0E8]/70">{s.desc}</p>
                    </div>
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

            <div className="grid md:grid-cols-2 gap-5 md:gap-6 md:items-stretch">
              <motion.div
                {...fadeUpDelay(0.1)}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-[#F5F0E8]/10 bg-[#1A1510]/80 backdrop-blur-sm"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={HOTEL_CHAOS_IMAGE}
                    alt="Hotel and travel stress during a busy weekend"
                    fill
                    className="object-cover grayscale contrast-110"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B09]/85 via-red-950/25 to-amber-950/15" />
                </div>
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <span className="type-eyebrow text-[#F5EDE0]/80 block mb-5">Without a Plan</span>
                  <ul className="space-y-5">
                    {painPoints.map((p, i) => (
                      <li key={i} className="border-l-2 border-[#B85A28]/50 pl-4">
                        <h3 className="text-[15px] font-medium text-[#F5EDE0]">{p.title}</h3>
                        <p className="mt-1 text-sm font-light text-[#F5EDE0]/70 leading-relaxed">{p.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                {...fadeUpDelay(0.2)}
                className="flex h-full flex-col bg-[#1A1510] border border-[#D4A853]/20 rounded-lg p-7 md:p-8 overflow-hidden relative"
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

            <FleetImageGrid />

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
                className="rounded-lg border border-[#D4A853]/25 bg-[#14110E] p-7 md:p-9 shadow-[inset_0_1px_0_rgba(212,168,83,0.08)]"
              >
                <ul className="space-y-6">
                  {valueStack.map(([text, value], i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D4A853]/50 bg-[#D4A853]/15 text-[11px] font-bold text-[#D4A853]"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-snug text-[#F5EDE0]">{text}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#D4A853]">
                          {value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                {...fadeUpDelay(0.15)}
                className="rounded-lg border border-[#D4A853]/35 bg-[#12100C] p-8 text-center md:sticky md:top-32"
                style={{ boxShadow: "0 0 0 1px rgba(212,168,83,0.12), 0 24px 60px rgba(0,0,0,0.45)" }}
              >
                <span className="type-eyebrow mb-3 block text-[#D4A853] tracking-[0.25em]">From</span>
                <div className="font-[var(--font-cormorant)] leading-none text-[#F5EDE0]">
                  <span className="block text-6xl md:text-7xl font-medium text-[#F5EDE0]">$200</span>
                  <span className="mt-2 block font-[var(--font-cormorant)] text-xl italic text-[#F5EDE0]/65">
                    /night
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-[#F5EDE0]/85">
                  <span className="font-semibold text-[#F5EDE0]">$133/person/night</span> for 6 on a 4-night
                  stay.
                  <br />
                  <span className="text-[#F5EDE0]/75">Less than a downtown hotel — six minutes from Turn 6.</span>
                </p>
                <PhoneLink className="mt-8 block w-full rounded-sm bg-[#D4A853] py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-[#0D0B09] shadow-[0_10px_30px_rgba(212,168,83,0.25)] transition-all hover:brightness-105 active:scale-[0.99]">
                  Call the Team · (972) 965-6901
                </PhoneLink>
                <div className="mt-4 text-xs text-[#F5EDE0]/55">
                  <a
                    href="#request-a-quote"
                    className="text-[#D4A853] underline underline-offset-4 hover:text-[#e0b964]"
                  >
                    Request online
                  </a>
                </div>
                <p className="mt-6 text-xs italic leading-relaxed text-[#F5EDE0]/50">
                  Race weekend books out by August. 14 units.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── PRICING ANCHOR CALLOUT ─── */}
        <section className="relative border-y border-[#D4A853]/25 bg-[#0D0B09] py-20 md:py-28 px-6 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(212,168,83,0.14), transparent 55%)",
            }}
          />
          <div className="relative z-[1] mx-auto max-w-2xl text-center">
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-[#D4A853]/30 bg-[#14110E]/90 px-8 py-12 md:px-14 md:py-16 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(212,168,83,0.12)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D4A853]">The math</p>
              <p className="mt-6 font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#D4A853] leading-none">
                $133 per person, per night
              </p>
              <p className="mt-6 mx-auto max-w-[560px] text-base leading-relaxed text-[#F5EDE0]/90">
                A 4-night trip for 6 people. Less than a downtown Austin hotel — and six minutes from Turn 6
                instead of 25 miles out.
              </p>
              <PhoneLink className="mt-10 inline-flex w-full sm:w-auto justify-center rounded-sm bg-[#D4A853] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-[#0D0B09] shadow-[0_12px_40px_rgba(212,168,83,0.3)] transition-all hover:brightness-105">
                Call the Team · (972) 965-6901
              </PhoneLink>
            </motion.div>
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
          <div className="relative z-[1] max-w-5xl mx-auto text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4A853]/90 mb-10">
              The numbers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#D4A853]/20">
              {trustPoints.map((tp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                  className="text-center px-2 md:px-6"
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
        <section className="relative bg-[#0D0B09] py-24 md:py-32 px-6 overflow-hidden texture-grain">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "var(--gradient-gold-glow-strong)" }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "720px",
              height: "560px",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, #D4A853 0%, transparent 62%)",
              opacity: 0.2,
            }}
          />
          <div
            aria-hidden="true"
            className="glow-spot"
            style={{
              width: "420px",
              height: "320px",
              bottom: "-80px",
              right: "-120px",
              background: "radial-gradient(circle, #A85A28 0%, transparent 70%)",
              opacity: 0.16,
            }}
          />
          <div className="relative z-[1] mx-auto max-w-3xl text-center">
            <motion.p
              {...fadeUp}
              className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4A853]"
            >
              Only 14 units · Books out by August
            </motion.p>

            <motion.h2
              {...fadeUpDelay(0.08)}
              className="mt-8 font-[var(--font-cormorant)] text-5xl font-normal leading-[1.05] text-[#F5EDE0] md:text-7xl"
            >
              Race weekend is closer
              <br />
              than it looks.
            </motion.h2>
            <motion.p
              {...fadeUpDelay(0.12)}
              className="mt-6 font-[var(--font-cormorant)] text-2xl italic text-[#D4A853] md:text-3xl"
            >
              Reserve your unit now.
            </motion.p>
            <motion.p
              {...fadeUpDelay(0.16)}
              className="mx-auto mt-8 max-w-[560px] text-base leading-relaxed text-[#F5EDE0]/88"
            >
              One call locks your RV. We deliver it to your COTA site, level it, hook it up, and walk your group
              through every system. <span className="font-medium text-[#F5EDE0]">Starting at $200/night.</span>
            </motion.p>

            <motion.div
              {...fadeUpDelay(0.2)}
              className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
            >
              <PhoneLink className="inline-flex w-full justify-center rounded-sm bg-[#D4A853] px-10 py-4 text-center text-sm font-semibold uppercase tracking-wider text-[#0D0B09] shadow-[0_14px_48px_rgba(212,168,83,0.28)] transition-all hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-w-[280px]">
                Call the Team · (972) 965-6901
              </PhoneLink>
              <a
                href="#request-a-quote"
                className="text-center text-sm text-[#F5EDE0]/70 underline decoration-[#D4A853]/50 underline-offset-4 transition-colors hover:text-[#D4A853]"
              >
                Request a callback
              </a>
            </motion.div>

            <motion.p
              {...fadeUpDelay(0.24)}
              className="mx-auto mt-14 max-w-md text-xs italic leading-relaxed text-[#F5EDE0]/45"
            >
              Owned and operated by Weston and the team — Tyler, Texas.
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
