import Image from "next/image";
import {
  CalendarCheck,
  ClipboardCheck,
  KeyRound,
  PhoneCall,
  Truck,
} from "lucide-react";
import AvailabilityForm from "@/components/AvailabilityForm";
import PhoneLink from "@/components/PhoneLink";
import SiteHeader from "@/components/SiteHeader";
import SmsLink from "@/components/SmsLink";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import Faq from "@/components/sections/Faq";
import SiteCheck from "@/components/sections/SiteCheck";
import UnitCards from "@/components/sections/UnitCards";
import PremiumImageGallery, { type GalleryItem } from "@/components/ui/PremiumImageGallery";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import {
  BUSINESS,
  COTA_CAMPING,
  DISCLAIMER,
  EVENT,
  FLEET_CATEGORIES,
  GALLERY_IMAGES,
  HERO_IMAGE,
  INCLUSIONS,
  PRICING,
  REVIEWS,
  TRUST_STATS,
  UNITS,
} from "@/content/site";

const GALLERY_ITEMS: GalleryItem[] = GALLERY_IMAGES.map((src) => ({
  type: "image",
  src,
}));

/* ─── Small server-side building blocks ─── */

function SectionHeading({
  eyebrow,
  title,
  sub,
  light,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className={`type-eyebrow ${light ? "text-white/60" : "text-action"}`}>{eyebrow}</p>
      <h2 className={`type-h2 mt-3 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub ? (
        <p className={`type-body mt-4 ${light ? "text-white/75" : "text-slate"}`}>{sub}</p>
      ) : null}
    </div>
  );
}

/* ─── 1. HERO (control version, no blocking motion) ─── */

function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-navy-deep">
      <Image
        src={HERO_IMAGE}
        alt="A Triple W travel trailer set up at a campsite"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/40"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep to-transparent"
      />

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 pb-20 pt-32 md:px-6 md:pt-36">
        <p className="type-eyebrow text-white/70">
          {EVENT.kickerLabel}
        </p>

        <h1 className="type-display mt-5 max-w-3xl text-white">
          Your Private, Air-Conditioned RV Basecamp Near COTA
        </h1>

        <p className="type-body mt-6 max-w-xl text-white/85">
          Tell us your approved campsite and group size. Triple W matches you with a
          clean, fully equipped RV, verifies delivery feasibility, sets it up and
          collects it after the weekend.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TrackedCtaLink
            href="#check-availability"
            eventName="hero_cta_click"
            className="btn-primary"
          >
            Check My Site &amp; RV Options
          </TrackedCtaLink>
          <span className="flex items-center justify-center gap-2 text-sm text-white/85 sm:justify-start">
            <PhoneLink
              location="hero"
              className="btn-secondary text-white"
            >
              Call {BUSINESS.phoneDisplay}
            </PhoneLink>
            <SmsLink
              location="hero"
              className="px-2 py-3 text-sm font-medium text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              or text us
            </SmsLink>
          </span>
        </div>

        <p className="mt-5 max-w-md text-xs leading-relaxed text-white/60">
          No obligation. Race tickets and campsite reservations are separate. Delivery is
          confirmed after site and access review.
        </p>
      </div>
    </section>
  );
}

/* ─── 2. PROOF STRIP ─── */

function ProofStrip() {
  const items = [
    "Delivered & Set Up",
    "Clean, Stocked Units",
    "Group-Friendly Floorplans",
    "Race-Weekend Support",
  ];
  return (
    <section aria-label="What Triple W handles" className="border-b border-white/10 bg-navy">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 md:flex md:items-center md:justify-between md:px-6">
        {items.map((item) => (
          <li
            key={item}
            className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/80 md:text-[13px]"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── 4. PROBLEM ─── */

const PAIN_POINTS = [
  {
    title: "Hotels scatter the group",
    desc: "Race-weekend hotel blocks split your crew across rooms, floors and properties. The trip you planned together turns into separate trips.",
  },
  {
    title: "The daily commute eats the weekend",
    desc: "More than 100,000 fans move in and out of the circuit each day. Staying far away means spending prime hours in a car instead of at the track.",
  },
  {
    title: "Towing an RV yourself is a second job",
    desc: "Renting a trailer is easy. Towing it into a race-weekend lot, leveling it, and getting the power and water right on your first try is not.",
  },
  {
    title: "Dry camping punishes guesswork",
    desc: "Lot N has no hookups. Without a real generator, fuel, water and waste plan, a hot October afternoon gets long fast.",
  },
];

function Problem() {
  return (
    <section className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The usual race-weekend plan"
          title="Race weekend is already complicated enough."
          sub="Hotels separate the group. Traffic steals hours. Towing and setting up an unfamiliar RV creates a second job. There's a simpler way to stay close to the racing."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {PAIN_POINTS.map((p) => (
            <div key={p.title} className="rounded-md border border-line bg-white p-6">
              <h3 className="type-h3 text-ink">{p.title}</h3>
              <p className="type-body-sm mt-2 text-slate">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. OUTCOME ─── */

const BENEFITS = [
  {
    title: "Arrive, don't assemble",
    desc: "No towing, leveling or hookup guesswork. The setup plan is confirmed before your arrival, and the walkthrough happens on your schedule.",
  },
  {
    title: "Give the crew a real reset",
    desc: "Cold A/C, real beds, a private bathroom, a kitchen and a place to sit together between sessions.",
  },
  {
    title: "Stay inside the weekend",
    desc: "Practice, qualifying, the race, the concerts. Then walk back to your own spot instead of organizing rides and restaurant runs.",
  },
  {
    title: "Know exactly what you booked",
    desc: "The exact unit, the real bed layout, the inclusions, the fees and the power plan, in writing, before you pay.",
  },
];

function Outcome() {
  return (
    <section className="bg-navy px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          light
          eyebrow="With Triple W"
          title="One private basecamp. Your whole crew. Four days of racing."
        />
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={GALLERY_IMAGES[1]}
              alt="Interior of a Triple W rental RV"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="space-y-6">
            {BENEFITS.map((b) => (
              <li key={b.title} className="border-l-2 border-action pl-4">
                <h3 className="type-h3 text-white">{b.title}</h3>
                <p className="type-body-sm mt-1.5 text-white/70">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. HOW IT WORKS ─── */

const STEPS = [
  {
    icon: PhoneCall,
    title: "Tell us your site and your group",
    desc: "Fill out the form or call. Campsite first: Premium RV, Lot N, another campground, or not booked yet.",
  },
  {
    icon: ClipboardCheck,
    title: "We verify before you pay",
    desc: "Site dimensions, campsite pass, unit fit, access windows and COTA's current vendor rules. No deposit until the plan checks out.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve with an itemized quote",
    desc: "Rental, delivery, setup, pickup, power plan, taxes and deposit in one written quote. Campsite and race tickets stay separate.",
  },
  {
    icon: Truck,
    title: "Arrive to a finished setup",
    desc: "We deliver in the confirmed window, level the unit, deploy the slides, connect or install the power plan, and walk you through every system.",
  },
  {
    icon: KeyRound,
    title: "Drive home, we handle the rest",
    desc: "When the weekend ends, you leave. We collect the RV in the confirmed pickup window and deal with the cleanup.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Verified first. Delivered second. Zero guesswork."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="rounded-md border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-barlow)] text-3xl font-semibold text-line">
                    0{i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-action" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─── 8. PREMIUM VS LOT N ─── */

function CompareRow({
  label,
  premium,
  lotN,
}: {
  label: string;
  premium: string;
  lotN: string;
}) {
  return (
    <tr className="border-b border-line last:border-b-0">
      <th
        scope="row"
        className="py-3.5 pr-4 text-left align-top text-xs font-semibold uppercase tracking-wider text-slate"
      >
        {label}
      </th>
      <td className="px-4 py-3.5 align-top text-sm text-ink">{premium}</td>
      <td className="px-4 py-3.5 align-top text-sm text-ink">{lotN}</td>
    </tr>
  );
}

function PremiumVsLotN() {
  const p = COTA_CAMPING.premium;
  const n = COTA_CAMPING.lotN;
  return (
    <section id="lot-n-guide" className="scroll-mt-24 bg-paper-warm px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Know your lot"
          title="Premium RV vs. Lot N: two very different campsites."
          sub="Your campsite decides the unit, the power plan and the delivery logistics. Here's what COTA's 2026 pages list for each area."
        />

        <div className="overflow-x-auto rounded-md border border-line bg-white">
          <table className="w-full min-w-[640px] border-collapse p-2 text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-40 py-4 pl-4 pr-4 md:pl-6" aria-label="Attribute" />
                <th className="px-4 py-4 font-[var(--font-barlow)] text-xl font-semibold text-ink">
                  {p.label}
                </th>
                <th className="px-4 py-4 font-[var(--font-barlow)] text-xl font-semibold text-ink">
                  {n.label}
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr>th]:pl-4 md:[&>tr>th]:pl-6">
              <CompareRow label="Site size" premium={p.siteSize} lotN={n.siteSize} />
              <CompareRow label="Surface" premium={p.surface} lotN={n.surface} />
              <CompareRow label="Utilities" premium={p.hookups} lotN={n.hookups} />
              <CompareRow label="Assignment" premium={p.assignment} lotN={n.assignment} />
              <CompareRow label="Access window" premium={p.accessWindow} lotN={n.accessWindow} />
              <CompareRow
                label="Status / services"
                premium={p.availabilityNote}
                lotN={n.services}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-white p-5">
            <h3 className="text-sm font-semibold text-ink">What Lot N means for your rental</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              No hookups means power comes from a generator sized to the unit, water comes
              from full tanks, and waste capacity is planned for your group. That plan
              (generator, fuel, water, waste) is built into your quote, along with COTA&apos;s
              quiet-hour and safety rules.
            </p>
          </div>
          <div className="rounded-md border border-line bg-white p-5">
            <h3 className="text-sm font-semibold text-ink">Rules change. Verify with COTA</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Campsite availability, services and access rules are COTA&apos;s to set and can
              change. Confirm current details on{" "}
              <a
                href={COTA_CAMPING.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-4 hover:text-action"
              >
                COTA&apos;s official RV camping page
              </a>
              , and we re-verify everything for your exact site before you pay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. RV OPTIONS / FLEET ─── */

function Fleet() {
  return (
    <section id="rv-options" className="scroll-mt-24 bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The RVs"
          title="Real units, matched to your site. Not a stock-photo fleet."
          sub="Every rental is a unit we own, maintain and deliver ourselves. Which one fits your weekend depends on your site's length, surface and power. That's why the match starts with your campsite."
        />

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {FLEET_CATEGORIES.map((cat) => (
            <div key={cat.name} className="rounded-md border border-line bg-white p-5">
              <h3 className="type-h3 text-ink">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{cat.fitNote}</p>
            </div>
          ))}
        </div>

        {UNITS.length > 0 ? (
          <UnitCards />
        ) : (
          <>
            <PremiumImageGallery items={GALLERY_ITEMS} />
            <div className="mx-auto mt-8 max-w-2xl rounded-md border border-line bg-white p-5 text-center">
              <p className="text-sm leading-relaxed text-slate">
                Exact 2026 race-weekend unit cards (floor plans, bed maps and per-unit
                specs) are being finalized with this year&apos;s inventory. Tell us your site
                and group and we&apos;ll send the exact units that fit, with photos and real
                sleeping layouts.
              </p>
              <TrackedCtaLink
                href="#check-availability"
                eventName="fleet_cta_click"
                className="btn-primary mt-4"
              >
                See Which Units Fit My Site
              </TrackedCtaLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── 9. INCLUSIONS + PRICING POSTURE ─── */

function Inclusions() {
  return (
    <section className="bg-navy px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          light
          eyebrow="What you're actually buying"
          title="A solved weekend, priced in one itemized quote."
          sub={
            PRICING.mode === "custom-quote"
              ? "Every group, site and unit combination is different, so we quote the weekend as one itemized package instead of hiding behind a teaser rate."
              : undefined
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-md border border-white/10 bg-navy-soft p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Every rental includes
            </h3>
            <ul className="mt-4 space-y-3">
              {INCLUSIONS.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-action" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-white/10 bg-navy-soft p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Your quote itemizes
            </h3>
            <ul className="mt-4 space-y-3">
              {PRICING.quoteLineItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-action" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-action/40 bg-navy-soft p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Separate purchases, not included
            </h3>
            <ul className="mt-4 space-y-3">
              {PRICING.separatePurchases.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/60">
              Every attendee needs valid circuit admission. The RV is your accommodation.
              The campsite and tickets stay with COTA.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-md border border-white/10 bg-navy-soft p-6 md:flex-row md:items-center md:justify-between">
          <p className="type-body-sm max-w-xl text-white/80">
            Want the number for your exact weekend? Two minutes in the form, or one call,
            gets you an itemized quote with nothing hidden.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedCtaLink
              href="#check-availability"
              eventName="pricing_cta_click"
              className="btn-primary"
            >
              Get My Weekend Quote
            </TrackedCtaLink>
            <PhoneLink location="pricing" className="btn-secondary text-white">
              {BUSINESS.phoneDisplay}
            </PhoneLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 10. REVIEWS ─── */

function Reviews() {
  return (
    <section className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What renters say"
          title="Delivered, set up, and clean. In their words."
          sub="From Triple W's Google reviews across Texas deliveries: the same crew and the same units that run race weekend."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-md border border-line bg-white p-6">
              <blockquote className="type-body-sm flex-1 text-slate">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3 text-sm font-semibold text-ink">
                {r.name}
                <span className="ml-2 font-normal text-slate">Google review</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {TRUST_STATS.items.length > 0 ? (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
            {TRUST_STATS.items.map((tp) => (
              <div key={tp.label} className="text-center">
                <dd className="font-[var(--font-barlow)] text-3xl font-semibold text-ink md:text-4xl">
                  {tp.value}
                  {tp.suffix}
                </dd>
                <dt className="mt-1.5 text-xs uppercase tracking-[0.15em] text-slate">
                  {tp.label}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

/* ─── 11. GROUP VALUE ─── */

function GroupValue() {
  return (
    <section className="bg-paper-warm px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Do the group math"
          title="One basecamp, split by the whole crew."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-md border border-line bg-white p-6 md:p-8">
            <h3 className="type-h3 text-ink">The hotel version</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate">
              <li>Multiple rooms at race-weekend rates, usually with minimum-night stays</li>
              <li>The group split across floors, buildings or towns</li>
              <li>Rides or parking for every single track day</li>
              <li>Nowhere to regroup between sessions or after the concerts</li>
            </ul>
          </div>
          <div className="rounded-md border border-navy/20 bg-navy p-6 md:p-8">
            <h3 className="type-h3 text-white">The basecamp version</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
              <li>One itemized quote, split across everyone staying</li>
              <li>Beds, bathroom, kitchen and A/C in one private spot</li>
              <li>At COTA&apos;s RV areas: walk to the gates instead of commuting</li>
              <li>The RV is the meeting point before, between and after sessions</li>
            </ul>
            <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60">
              Run your own numbers: take your group size, price the rooms and rides for
              four nights, then ask us for the itemized weekend quote and compare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 13. FINAL CTA + FORM ─── */

function FinalCta() {
  return (
    <section className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="type-eyebrow text-action">Final step</p>
          <h2 className="type-h2 mt-3 text-ink">
            Your tickets are the exciting part.
            <br />
            Your lodging should be the easy part.
          </h2>
          <p className="type-body mt-4 text-slate">
            Tell us where you&apos;re staying, how many people are coming and what comfort
            matters most. We&apos;ll confirm availability, campsite compatibility and the best
            Triple W option for your Austin race weekend.
          </p>
        </div>

        <AvailabilityForm />

        <p className="mt-8 text-center text-sm text-slate">
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
          . {BUSINESS.ownerLine}, {BUSINESS.base}.
        </p>
      </div>
    </section>
  );
}

/* ─── 14. FOOTER ─── */

function SiteFooter() {
  return (
    <footer className="bg-navy-deep px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-[var(--font-barlow)] text-2xl font-semibold text-white">
              Triple W Rentals
            </p>
            <p className="mt-1 text-sm text-white/60">
              {BUSINESS.base} &middot; RV rentals, delivered and set up
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm md:items-end">
            <PhoneLink location="footer" className="text-white/80 transition-colors hover:text-white">
              {BUSINESS.phoneDisplay}
            </PhoneLink>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-white/80 transition-colors hover:text-white"
            >
              {BUSINESS.email}
            </a>
            <a
              href={BUSINESS.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 transition-colors hover:text-white"
            >
              Main site &amp; full fleet
            </a>
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-white/50">{DISCLAIMER}</p>
        <p className="mt-4 text-xs text-white/40">
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
        <ProofStrip />

        {/* 3. Campsite compatibility check */}
        <section id="site-check" className="scroll-mt-24 bg-paper-warm px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="First things first"
              title="Where are you staying? Start there."
              sub="An RV rental doesn't come with a legal place to park it. Your campsite decides which units fit, how power works and how delivery happens, so it's the first question we ask, not the last."
            />
            <SiteCheck />
            <p className="mt-5 text-xs leading-relaxed text-slate">
              {EVENT.name} &middot; {EVENT.venue}, {EVENT.city} &middot; Race days{" "}
              {EVENT.raceDaysLabel} &middot; RV areas open {EVENT.stayWindowLabel}. Campsites
              are reserved directly with COTA or your campground, never through us.
            </p>
          </div>
        </section>

        <Problem />
        <Outcome />
        <Fleet />
        <HowItWorks />
        <PremiumVsLotN />
        <Inclusions />
        <Reviews />
        <GroupValue />

        {/* 12. FAQ */}
        <section id="faq" className="scroll-mt-24 bg-paper px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Answers before you ask"
              title="The questions that actually decide this booking."
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
