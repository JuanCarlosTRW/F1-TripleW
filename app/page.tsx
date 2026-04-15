"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PremiumImageGallery, { type GalleryItem } from "@/components/ui/PremiumImageGallery";

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
    title: "$600/night hotel rooms",
    desc: "Austin hotels triple their rates during race weekend. You\u2019re paying resort prices for a Holiday Inn 25 miles from the track.",
  },
  {
    title: "2-hour traffic each way",
    desc: "100,000+ fans trying to reach COTA on the same two-lane roads. You\u2019ll spend more time in traffic than watching the race.",
  },
  {
    title: "Missing the concerts",
    desc: "Maroon 5 on Friday. Post Malone on Saturday. Leave early to beat traffic, or stay and face a 90-minute Uber surge.",
  },
  {
    title: "Split across 3 hotel rooms",
    desc: "Your group of 8 is scattered across different floors, different hotels. The trip you planned together becomes separate trips.",
  },
];

const desirePoints = [
  {
    title: "Wake up at the track",
    desc: "Your RV is parked at COTA. Step outside, grab your coffee, and walk to the gates. No commute. No stress.",
  },
  {
    title: "Your own private space",
    desc: "Full kitchen, king beds, outdoor setup, smart TVs. Everything you need \u2014 nothing you don\u2019t.",
  },
  {
    title: "Stay for everything",
    desc: "Concerts, qualifying, the race itself. Walk back to your RV whenever you want. No curfew. No checkout.",
  },
  {
    title: "Everyone together",
    desc: "Your whole crew under one roof. Cook breakfast together. Watch the sunset over the track. This is how it\u2019s supposed to feel.",
  },
];

const steps = [
  {
    num: "01",
    title: "Call or Text Us",
    desc: "Tell us your dates, your group size, and which RV catches your eye. We\u2019ll confirm availability on the spot.",
  },
  {
    num: "02",
    title: "We Deliver to COTA",
    desc: "Your RV arrives before you do \u2014 fully set up, cleaned, stocked, and ready. We walk you through everything on arrival.",
  },
  {
    num: "03",
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
    desc: "Your RV arrives at COTA before you do. We handle placement, hookups, and a full walkthrough so you know everything works.",
  },
  {
    title: "Generator Rental Available",
    desc: "Camping in Lot N with no hookups? We offer generator rentals so you have full power all weekend.",
  },
  {
    title: "Optional Outdoor Add-On \u2014 $100",
    desc: "Grill, chairs, outdoor table, and lawn setup. Everything you need to turn your campsite into a tailgate.",
  },
  {
    title: "4.7 Stars Across 200+ Bookings",
    desc: "We\u2019ve built our reputation on showing up early, setting up right, and being reachable 24/7. Every single time.",
  },
];

/* ─── PAGE ─── */

export default function Home() {
  return (
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
      <section className="relative min-h-screen flex items-center justify-center bg-[#0D0B09] px-6 text-center">
        <div className="max-w-3xl mx-auto pt-20">
          <motion.div
            {...fadeUpDelay(0)}
            className="inline-block border border-[#D4A853]/40 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]">
              October 23&ndash;25, 2026 &middot; Circuit of The Americas &middot; Austin, TX
            </span>
          </motion.div>

          <motion.h1
            {...fadeUpDelay(0)}
            className="font-[var(--font-cormorant)] text-4xl sm:text-5xl md:text-7xl font-normal text-[#F5F0E8] leading-[1.1]"
          >
            Your Private Base Camp at the United States Grand Prix
          </motion.h1>

          <motion.p
            {...fadeUpDelay(0.2)}
            className="mt-6 text-lg md:text-xl font-light text-[#F5F0E8]/80 max-w-2xl mx-auto leading-relaxed"
          >
            Premium RVs delivered and set up at COTA. Wake up trackside. Walk to the race. Skip the hotel chaos and the $600-a-night rooms.
          </motion.p>

          <motion.a
            {...fadeUpDelay(0.4)}
            href="tel:9729656901"
            className="inline-block mt-10 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm md:text-base"
          >
            Reserve Your RV &mdash; (972) 965-6901
          </motion.a>

          <motion.div
            {...fadeUpDelay(0.6)}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-[#F5F0E8]/50 uppercase tracking-wider"
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
        </div>
      </section>

      {/* ─── SECTION 2: PROBLEM / DESIRE ─── */}
      <section className="bg-[#F5F0E8] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20">
          {/* Pain */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#1A1510] mb-10">
              What F1 Weekend Usually Looks Like
            </h2>
            <div className="space-y-8">
              {painPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="border-l-2 border-[#8B4513]/30 pl-5"
                >
                  <h3 className="font-semibold text-[#1A1510] mb-1">{p.title}</h3>
                  <p className="font-light text-[#1A1510]/60 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Desire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#1A1510] mb-10">
              What It Looks Like With Triple W
            </h2>
            <div className="space-y-8">
              {desirePoints.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="border-l-2 border-[#D4A853] pl-5"
                >
                  <h3 className="font-semibold text-[#1A1510] mb-1">{d.title}</h3>
                  <p className="font-light text-[#1A1510]/60 text-sm leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: HOW IT WORKS ─── */}
      <section className="bg-[#0D0B09] py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            {...fadeUp}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8]"
          >
            Three Steps. Zero Stress.
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.1)}
            className="mt-4 text-lg text-[#F5F0E8]/70 max-w-xl mx-auto"
          >
            We handle the hard part. You handle the fun part.
          </motion.p>

          <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Timeline line — desktop horizontal */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-[#D4A853]/30" />
            {/* Timeline line — mobile vertical */}
            <div className="md:hidden absolute top-0 bottom-0 left-6 w-px bg-[#D4A853]/30" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                className="relative text-center md:text-center pl-14 md:pl-0"
              >
                <span className="font-[var(--font-cormorant)] text-5xl font-light text-[#D4A853] block">
                  {s.num}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#F5F0E8]">{s.title}</h3>
                <p className="mt-3 font-light text-[#F5F0E8]/70 text-sm leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
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

      {/* ─── SECTION 5: WHY TRIPLE W ─── */}
      <section className="bg-[#1A1510] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-[var(--font-cormorant)] text-3xl md:text-4xl text-[#F5F0E8]">
              Built for Events Like This
            </h2>
            <p className="mt-4 text-lg text-[#F5F0E8]/80 font-light leading-relaxed">
              Triple W Rentals has delivered RVs to motorsport events, horse shows, family reunions, and corporate retreats across Texas. F1 weekend is no different &mdash; except the stakes are higher and the demand is bigger.
            </p>
            <div className="mt-8 space-y-6">
              {trustPoints.map((tp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#D4A853] shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#F5F0E8] text-sm">{tp.title}</h3>
                    <p className="mt-1 text-sm font-light text-[#F5F0E8]/60 leading-relaxed">
                      {tp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="relative min-h-[500px] rounded-sm overflow-hidden"
          >
            <Image
              src="https://static.wixstatic.com/media/62f926_bf23e37064074d13911e9210dd2584e6~mv2.png"
              alt="Triple W RV setup at an event"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 6: COTA CAMPING GUIDE ─── */}
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
              className="bg-white rounded-sm p-8"
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
              className="bg-white rounded-sm p-8"
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

      {/* ─── SECTION 7: FINAL CTA ─── */}
      <section className="bg-[#0D0B09] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            {...fadeUp}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8] leading-tight"
          >
            Race Weekend Fills Up. Your RV Shouldn&rsquo;t Be an Afterthought.
          </motion.h2>
          <motion.p
            {...fadeUpDelay(0.15)}
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
            className="mt-6 text-sm text-[#F5F0E8]/50"
          >
            Every booking is personally handled by Corbin. No bots. No runaround.
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
  );
}
