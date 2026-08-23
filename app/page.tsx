import Image from "next/image";
import { Check } from "lucide-react";
import AvailabilityForm from "@/components/AvailabilityForm";
import PhoneLink from "@/components/PhoneLink";
import SiteHeader from "@/components/SiteHeader";
import SmsLink from "@/components/SmsLink";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import Faq from "@/components/sections/Faq";
import FleetCarousel from "@/components/sections/FleetCarousel";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import {
  BUSINESS,
  CAMPSITE,
  EVENT,
  DISCLAIMER,
  FLEET_FIT,
  HERO,
  HERO_IMAGE,
  PAIN_POINTS,
  QUOTE,
  REVIEWS,
  STEPS,
  TIMELINE,
  TRUST_STATS,
  TRUST_STRIP,
} from "@/content/site";

/* ─── Small server-side building blocks ─── */

function SectionHeading({
  eyebrow,
  title,
  sub,
  light,
  center,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 max-w-2xl md:mb-10 ${center ? "mx-auto text-center" : ""}`}>
      <p className={`type-eyebrow ${light ? "text-white/75" : "eyebrow-chip"}`}>{eyebrow}</p>
      <h2 className={`type-h2 mt-4 uppercase ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub ? (
        <p className={`type-body mt-4 ${center ? "mx-auto" : ""} ${light ? "text-white/85" : "text-slate"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/* ─── 02. HERO: asymmetrical 60/40, no blocking motion ─── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <Image
        src={HERO_IMAGE}
        alt="Kitchen and living area inside a Triple W rental RV"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/55"
      />

      <div className="container-x relative z-[1] grid items-center gap-10 pb-14 pt-36 md:pt-40 lg:grid-cols-[3fr_2fr] lg:gap-14 lg:pb-20 lg:pt-44">
        <div>
          <p className="type-eyebrow text-white/75">
            {EVENT.kickerParts.map((part, i, all) => (
              <span key={part} className="inline-block whitespace-nowrap">
                {part}
                {i < all.length - 1 ? (
                  <span aria-hidden className="mx-2">
                    &middot;
                  </span>
                ) : null}
              </span>
            ))}
          </p>

          <h1 className="type-display mt-5 max-w-3xl uppercase text-white">{HERO.h1}</h1>

          <p className="type-body mt-5 text-white/90">{HERO.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedCtaLink
              href="#check-availability"
              eventName="hero_cta_click"
              className="btn-primary"
            >
              {HERO.primaryCta}
            </TrackedCtaLink>
            <PhoneLink location="hero" className="btn-secondary text-white">
              {HERO.secondaryCta}
            </PhoneLink>
            <SmsLink location="hero" className="btn-secondary text-white">
              {HERO.secondaryCtaSms}
            </SmsLink>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">{HERO.microcopy}</p>
        </div>

        {/* Compact package summary card */}
        <aside
          aria-label="Your race-weekend package"
          className="clip-tr border border-white/15 bg-paper p-6 text-ink md:p-7"
        >
          <p className="type-eyebrow eyebrow-chip">{HERO.packageTitle}</p>
          <ul className="mt-5 space-y-3.5">
            {HERO.packageItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-navy text-white"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-base font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-slate">
            {EVENT.venue}, {EVENT.city}. Race days {EVENT.raceDaysLabel}. RV stay{" "}
            {EVENT.stayWindowLabel}. {EVENT.arrivalNote}
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ─── 03. TRUST STRIP ─── */

function TrustStrip() {
  return (
    <section aria-label="What Triple W handles" className="bg-navy-deep">
      <ul className="container-x grid grid-cols-2 gap-y-3 py-4 md:flex md:items-center md:justify-between md:py-5">
        {TRUST_STRIP.map((item, i) => (
          <li key={item} className="flex items-center justify-center gap-4 md:justify-start">
            {i > 0 ? (
              <span aria-hidden className="hidden h-5 w-px rotate-[20deg] bg-white/30 md:block" />
            ) : null}
            <span className="text-center text-xs font-bold uppercase tracking-[0.16em] text-white/90 md:text-[13px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── 04. CAMPSITE COORDINATION (one accurate partnership section) ─── */

function CampsiteCoordination() {
  return (
    <section id="campsite" className="section texture-diag scroll-mt-32 bg-paper">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow={CAMPSITE.eyebrow} title={CAMPSITE.headline} />
          <p className="type-body text-ink/90">{CAMPSITE.body}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {CAMPSITE.proof.map((p) => (
              <li key={p} className="flex items-center gap-2 text-base font-semibold text-ink">
                <span aria-hidden className="h-2.5 w-2.5 bg-action" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="clip-tr border border-line bg-white p-6 md:p-7">
          <p className="type-eyebrow text-action">Next step</p>
          <p className="type-h3 mt-3 text-ink">Tell us your group size and dates.</p>
          <TrackedCtaLink
            href="#check-availability"
            eventName="campsite_cta_click"
            className="btn-primary mt-5 w-full"
          >
            {CAMPSITE.cta}
          </TrackedCtaLink>
          <p className="mt-4 text-sm leading-relaxed text-slate">{CAMPSITE.disclosure}</p>
        </div>
      </div>
    </section>
  );
}

/* ─── 05. WHY NOT A HOTEL ─── */

function WhyBasecamp() {
  return (
    <section className="section diag-top bg-navy pt-[calc(3.5rem+2.5vw)] md:pt-[calc(5rem+2.5vw)]">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="Why not a hotel"
          title="Everything else costs you race hours."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PAIN_POINTS.map((p, i) => (
            <div key={p.title} className="relative overflow-hidden border border-white/10 bg-navy-soft p-6">
              <span aria-hidden className="big-num absolute -right-2 -top-4 !text-white/5">
                0{i + 1}
              </span>
              <h3 className="relative text-xl font-bold leading-snug text-white">{p.title}</h3>
              <p className="relative mt-2 text-base leading-relaxed text-white/80">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 06. THE RVS: rotating real photos, no model names ─── */

function Fleet() {
  return (
    <section id="rv-options" className="section scroll-mt-32 bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="The RVs"
          title="The RV your group actually fits in."
          sub="Fourteen units we own, maintain and deliver ourselves, from premium group setups to family-friendly layouts and smaller rigs for couples or solo travelers. Tell us your group size and how many actually need a bed; the exact unit for your weekend is confirmed in your written quote."
        />
        <FleetCarousel />

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <ul className="flex flex-wrap gap-2">
            {FLEET_FIT.map((label) => (
              <li
                key={label}
                className="border border-line bg-white px-3.5 py-2 text-sm font-bold uppercase tracking-wider text-ink"
              >
                {label}
              </li>
            ))}
          </ul>
          <TrackedCtaLink
            href="#check-availability"
            eventName="fleet_cta_click"
            className="btn-primary"
          >
            Check Which RV Fits My Group
          </TrackedCtaLink>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate">
          Bed counts in your quote are the real permanent sleeping arrangements, not a
          manufacturer&apos;s maximum. Cold A/C, a private bathroom and a kitchen come standard.
        </p>
      </div>
    </section>
  );
}

/* ─── 07. HOW IT WORKS: three steps, oversized pale numbers ─── */

function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-32 bg-paper-warm">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="Three steps between you and a ready basecamp." />
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative overflow-hidden border border-line bg-white p-6 pt-8">
              <span aria-hidden className="big-num absolute -right-3 -top-6">
                {i + 1}
              </span>
              <h3 className="relative type-h3 uppercase text-ink">{s.title}</h3>
              <p className="relative mt-3 text-base leading-relaxed text-slate">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 08. WEEKEND TIMELINE ─── */

function Timeline() {
  return (
    <section
      id="weekend-guide"
      className="section diag-bottom scroll-mt-32 bg-navy pb-[calc(3.5rem+2.5vw)] md:pb-[calc(5rem+2.5vw)]"
    >
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="Weekend guide"
          title="You show up. The work is already done."
          sub={`Race days are ${EVENT.raceDaysLabel}. The RV stay runs ${EVENT.stayWindowLabel}: ${EVENT.arrivalNote} Monday is departure and pickup day, not a race day.`}
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TIMELINE.map((t) => (
            <li key={t.date} className="border border-white/10 bg-navy-soft p-5">
              <p className="font-[var(--font-barlow)] text-sm font-bold uppercase tracking-[0.16em] text-white/70">
                {t.day}
              </p>
              <p className="font-[var(--font-barlow)] text-5xl font-bold leading-none text-white">
                {t.date}
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wider text-action">
                {t.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">{t.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 09. WHAT IS INCLUDED ─── */

function Included() {
  return (
    <section className="section texture-diag bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="What is included"
          title="One written price, confirmed before you pay."
          sub="Every group and unit combination is different, so we quote the weekend as one written package and confirm it before payment."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="clip-tr border border-line bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink">
              The quote confirms
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUOTE.confirms.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/90">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-action" strokeWidth={3} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-paper-warm/60 p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink">
              Always separate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUOTE.alwaysSeparate.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-slate">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-slate" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row">
              <TrackedCtaLink
                href="#check-availability"
                eventName="pricing_cta_click"
                className="btn-primary flex-1"
              >
                Get My Weekend Quote
              </TrackedCtaLink>
              <PhoneLink location="pricing" className="btn-secondary flex-1 text-ink">
                {BUSINESS.phoneDisplay}
              </PhoneLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 10. PROOF ─── */

function Proof() {
  const visible = REVIEWS.slice(0, 3);
  const more = REVIEWS.slice(3);
  return (
    <section className="section bg-paper-warm">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proof"
          title="The same words come up in every review: delivered, set up, clean."
          sub="Real Google reviews from Triple W renters across Texas deliveries: the same crew and the same units that run race weekend."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {visible.map((r) => (
            <figure key={r.name} className="card-lift flex flex-col border border-line bg-white p-5">
              <blockquote className="flex-1 text-base leading-relaxed text-ink/90">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3 text-sm font-bold text-ink">
                {r.name}
                <span className="ml-2 font-medium text-slate">Google review</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {more.length > 0 ? (
          <details className="group mt-4 border border-line bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-[15px] font-bold uppercase tracking-wider text-ink">
                More reviews ({more.length})
              </span>
              <span
                aria-hidden
                className="shrink-0 text-2xl leading-none text-action transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="grid gap-4 border-t border-line p-5 md:grid-cols-3">
              {more.map((r) => (
                <figure key={r.name} className="flex flex-col border border-line bg-paper p-5">
                  <blockquote className="flex-1 text-base leading-relaxed text-ink/90">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 text-sm font-bold text-ink">
                    {r.name}
                    <span className="ml-2 font-medium text-slate">Google review</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-4 border border-line bg-navy px-4 py-6 md:grid-cols-4">
          {TRUST_STATS.map((tp) => (
            <div key={tp.label} className="text-center">
              <dd className="font-[var(--font-barlow)] text-4xl font-bold text-white">
                {tp.value}
                {tp.suffix}
              </dd>
              <dt className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                {tp.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─── 12. FORM + FINAL CTA ─── */

function FinalCta() {
  return (
    <section className="section texture-diag bg-paper">
      <div className="container-x">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <p className="type-eyebrow eyebrow-chip">Final step</p>
          <h2 className="type-h2 mt-4 uppercase text-ink">
            Your Tickets Are the Exciting Part. Your Lodging Should Be the Easy Part.
          </h2>
          <p className="type-body mx-auto mt-4 text-slate">
            Tell us your group size and dates. We&apos;ll confirm the RV-and-campsite plan
            before you pay.
          </p>
        </div>

        <AvailabilityForm />

        <p className="mt-6 text-center text-sm text-slate">
          Rather talk it through?{" "}
          <PhoneLink
            location="final_cta"
            className="font-semibold text-ink underline underline-offset-4 hover:text-action"
          >
            Call {BUSINESS.phoneDisplay}
          </PhoneLink>{" "}
          or{" "}
          <SmsLink
            location="final_cta"
            className="font-semibold text-ink underline underline-offset-4 hover:text-action"
          >
            send a text
          </SmsLink>
          .
        </p>
      </div>
    </section>
  );
}

/* ─── 13. FOOTER ─── */

function SiteFooter() {
  return (
    <footer className="bg-navy-deep py-10">
      <div className="container-x">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-[var(--font-barlow)] text-2xl font-bold uppercase text-white">
              Triple W Rentals
            </p>
            <p className="mt-1 text-sm text-white/70">
              {BUSINESS.base} &middot; RV rentals, delivered and set up
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              We provide the RV, delivery, setup and pickup, and coordinate your campsite
              through our race-weekend partner. Race admission, travel and food are
              separate.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm md:items-end">
            <PhoneLink location="footer" className="font-semibold text-white transition-colors hover:text-action">
              {BUSINESS.phoneDisplay}
            </PhoneLink>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-white/85 transition-colors hover:text-white"
            >
              {BUSINESS.email}
            </a>
            <a
              href={BUSINESS.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 transition-colors hover:text-white"
            >
              Main site &amp; full fleet
            </a>
          </div>
        </div>
        <p className="mt-5 max-w-4xl text-xs leading-relaxed text-white/60">{DISCLAIMER}</p>
        <p className="mt-3 text-xs text-white/50">
          &copy; 2026 Triple W Rentals &middot; {BUSINESS.base} &middot; Deposit, cancellation
          and rental terms are provided in writing with every quote, before any payment.
        </p>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-paper text-ink">
        <Hero />
        <TrustStrip />
        <CampsiteCoordination />
        <WhyBasecamp />
        <Fleet />
        <HowItWorks />
        <Timeline />
        <Included />
        <Proof />

        {/* 11. Selected FAQ */}
        <section id="faq" className="section scroll-mt-32 bg-paper">
          <div className="container-x">
            <SectionHeading
              center
              eyebrow="Selected FAQ"
              title="What people ask before they book."
            />
            <Faq />
          </div>
        </section>

        <FinalCta />
        <SiteFooter />
      </main>

      <StickyMobileCTA />
    </>
  );
}
