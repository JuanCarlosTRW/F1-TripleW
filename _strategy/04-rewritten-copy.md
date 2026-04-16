# Rewritten Copy — Section by Section

Every rewrite below is calibrated to the WWP brief (`02-wwp-brief.md`) and the Grand Slam offer (`03-grand-slam-offer.md`).

**How to use this doc:** For each section, find the `app/page.tsx` line range, compare current → new, and replace. Line numbers reference the state of the file at 2026-04-16. Run a fresh `Read` before editing if the file has changed since.

---

## 1. Hero Section (lines 151–263)

### Hero Eyebrow (line 202)

**Current:**
```
October 23–25, 2026 · Circuit of The Americas · Austin, TX
```

**Keep as-is.** Specificity wins.

---

### Hero Headline (line 212)

**Current:**
```
Your Private Suite at the United States Grand Prix
```

**New:**
```
Your RV, Delivered to the Track. You Just Show Up.
```

**Why:** Leads with the mechanism and the benefit in eight words. "Delivered to the track" names the differentiator in the first fold. "You just show up" reframes the entire logistics problem as Triple W's problem, not the buyer's.

**Alternative if you want to stay more literal to "Private Suite" premium feel:**
```
A Private Trackside Suite. Delivered, Set Up, and Waiting for Your Crew.
```

---

### Hero Subhead (lines 219–222)

**Current:**
```
Premium RVs delivered and set up at COTA. Wake up trackside. Walk to the race. Skip the hotel chaos and the $600-a-night rooms.
```

**New:**
```
We tow the RV to your COTA site, level it, hook up power and water, and stock it to your spec. You land Thursday, walk six minutes to Turn 6, and race weekend has already started.
```

**Why:** Shows the mechanism explicitly ("tow, level, hook up, stock"). Turns the benefit into a vivid moment ("Thursday... six minutes to Turn 6"). Drops "$600-a-night rooms" from here — that's addressed in the Problem section already; the hero is for desire, not pain.

---

### Hero Primary CTA (line 231)

**Current:**
```
Reserve Your RV — (972) 965-6901
```

**New:**
```
Reserve Your RV · (972) 965-6901
```

Minor — middle-dot instead of em-dash for visual rhythm consistency with the eyebrow.

---

### Hero Secondary CTA (new element — add below primary CTA around line 232)

**New (insert a small text link under the primary button):**
```
Prefer to not call? Request a quote →
```

This should scroll to the inquiry form anchor (`#request-a-quote`). Code details in `05-booking-form-code.md`.

---

### Hero Social Proof Badges (line 240)

**Current:**
```
["200+ Rentals", "4.7★ Google Reviews", "Delivered & Set Up", "Texas Statewide"]
```

**New:**
```
["200+ Deliveries", "4.7★ Google Reviews", "Owner-Operated", "Texas Statewide"]
```

**Why:** "Deliveries" (not "Rentals") reinforces the wedge. "Owner-Operated" signals accountability in a word everyone understands — stronger than "Texas Statewide" alone.

---

## 2. Problem Section (lines 265–297)

### Eyebrow (line 272)

**Current:**
```
The Reality of F1 Weekend
```

**New:**
```
The Race Weekend Tax
```

**Why:** More specific and more loaded. "Tax" frames what follows as money and friction the buyer is being forced to pay.

---

### Section Heading (line 278)

**Current:**
```
What Race Weekend Actually Looks Like Without a Plan
```

**New:**
```
What Race Weekend Actually Costs You Without a Plan
```

**Why:** "Costs you" adds an economic frame that primes the price anchor later. One word change.

---

### Pain Points (lines 31–48 — the data array)

Keep the four existing pain points. Tighten one:

**painPoints[0] (`$600/Night Hotel Rooms`) — keep as is.**

**painPoints[1] (`2-Hour Traffic Each Way`) — keep as is.**

**painPoints[2] (`Missing the Concerts`) — keep as is, but update headliners if confirmed for 2026.**
```
title: "Missing the Headliners"
desc: "Major acts perform Friday and Saturday nights. Leave early to beat traffic, or stay and face a 90-minute Uber surge from the track back to downtown."
```
(The existing copy names Maroon 5 and Post Malone — those were the 2024 lineup. Confirm 2026 lineup before shipping, otherwise keep generic.)

**painPoints[3] (`Split Across 3 Hotel Rooms`) — keep as is.**

---

## 3. Dream Section (lines 299–351)

### Eyebrow (line 328)

**Current:**
```
With Triple W
```

**Keep.**

---

### Heading (line 331)

**Current:**
```
What It Feels Like When You Do It Right
```

**New:**
```
The Version Where You Actually Enjoy the Weekend
```

**Why:** "Enjoy" is the felt-sense the buyer is paying for. "Do it right" is abstract.

---

### Desire Points (lines 50–67 — the data array)

Tighten `desirePoints[1]` ("Your Own Private Space") — current is list-y. Replace:

**Current:**
```
title: "Your Own Private Space"
desc: "Full kitchen, king beds, outdoor setup, smart TVs. Everything you need — nothing you don't."
```

**New:**
```
title: "A Real Home, Six Minutes from Turn 6"
desc: "Full kitchen, king beds, outdoor lounge, smart TVs. The kind of setup where your crew actually wants to hang out between sessions — not just sleep."
```

**Why:** Names the distance ("six minutes from Turn 6") — that single fact destroys every hotel in Austin. "A real home" (not "your own private space") matches the aspirational status upgrade.

**Keep the other three desire points as written** — they're already strong.

---

## 4. How It Works (lines 353–484)

### Section Heading (line 364)

**Current:**
```
Three Steps. Zero Stress.
```

**Keep.** It's tight.

---

### Section Subhead (line 367)

**Current:**
```
We handle the hard part. You handle the fun part.
```

**New:**
```
We handle the logistics. Your crew handles the weekend.
```

**Why:** "The hard part / the fun part" is a cliché the avatar has seen a hundred times. "Logistics" is specific and mature.

---

### Steps (lines 69–88 — the data array)

**Step 01 — keep as-is.**

**Step 02 — UPGRADE (this is the biggest copy lift on the page).**

**Current:**
```
title: "We Deliver to COTA"
desc: "Your RV arrives before you do — fully set up, cleaned, stocked, and ready. We walk you through everything on arrival."
```

**New:**
```
title: "We Deliver. Level. Hook Up. Stock."
desc: "Your unit is towed to your reserved COTA site before you arrive, leveled on the pad, slide-outs deployed, water and power connected, generator installed if you're in Lot N. We walk you through every system when you land."
```

**Why:** Names the exact operational sequence. Sells the mechanism. Every word is a proof point and an objection-killer.

**Step 03 — tighten:**

**Current:**
```
title: "Enjoy Race Weekend"
desc: "Walk to the track. Come back whenever you want. Grill out between sessions. Live like a local, not a tourist."
```

**New:**
```
title: "Walk to the Track"
desc: "Six minutes to Turn 6. Grill between sessions. Sleep through the night after the race instead of Uber-surging back to a Holiday Inn. Check out Monday — we handle cleanup."
```

**Why:** "Walk to the track" is literally the product. Specifics (Turn 6, Monday checkout, we handle cleanup) build trust. The Holiday Inn callback ties back to the Problem section.

---

### Mid-section tagline (line 481)

**Current:**
```
It really is that simple.
```

**New:**
```
One call. One delivery. One perfect weekend.
```

**Why:** "Simple" is weak. Triple cadence lands better and previews the offer section.

---

## 5. NEW OFFER SECTION (insert between lines 484 and 486)

This is a brand new section. Insert after `</section>` on line 484 and before `{/* ─── SECTION 4: THE FLEET ─── */}` on line 486.

```tsx
{/* ─── NEW SECTION: THE OFFER ─── */}
<section id="the-offer" className="bg-[#0D0B09] py-24 md:py-32 px-6 relative overflow-hidden border-t border-[#D4A853]/10">
  <div className="max-w-5xl mx-auto">
    <motion.span
      {...fadeUp}
      className="block text-xs uppercase tracking-[0.2em] text-[#D4A853] mb-4 text-center"
    >
      The Weekend Package
    </motion.span>
    <motion.h2
      {...fadeUpDelay(0.1)}
      className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#F5F0E8] text-center leading-tight"
    >
      The Full F1 Weekend &mdash; Delivered to Your Site
    </motion.h2>
    <motion.p
      {...fadeUpDelay(0.15)}
      className="mt-6 text-lg text-[#F5F0E8]/80 max-w-2xl mx-auto text-center leading-relaxed"
    >
      One call locks your unit. We tow it to your COTA site, level it, hook up power and water, and stock it to your spec. You land Thursday and walk into a home already waiting.
    </motion.p>

    <div className="mt-14 grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-start">
      {/* Value stack */}
      <motion.ul
        {...fadeUpDelay(0.2)}
        className="space-y-4 text-[#F5F0E8]/90"
      >
        {[
          ["Premium RV rental (Class A, Fifth Wheel, or Travel Trailer, sleeps 4–12)", "From $200/night"],
          ["White-glove delivery to any COTA lot or Austin-area campground", "$500 value"],
          ["Full setup: leveling, slide-outs, water, electric, sewer", "$200 value"],
          ["60-minute walkthrough when you arrive", "Included"],
          ["Generator rental (required for Lot N dry camping)", "$150/day value"],
          ["24/7 on-call support through race weekend", "Included"],
        ].map(([text, value], i) => (
          <li key={i} className="flex items-start gap-3 border-b border-[#D4A853]/10 pb-4">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4A853] shrink-0" />
            <div className="flex-1 flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-6">
              <span className="text-base font-light leading-relaxed">{text}</span>
              <span className="text-sm text-[#D4A853]/80 shrink-0 font-medium tracking-wide">{value}</span>
            </div>
          </li>
        ))}
      </motion.ul>

      {/* Price anchor + CTA */}
      <motion.div
        {...fadeUpDelay(0.25)}
        className="bg-[#1A1510] border border-[#D4A853]/20 p-8 rounded-sm text-center md:sticky md:top-24"
      >
        <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A853]/80 mb-3">
          Weekend Packages
        </span>
        <div className="font-[var(--font-cormorant)] text-5xl text-[#F5F0E8] leading-none">
          From <span className="text-[#D4A853]">$200</span>
          <span className="text-2xl text-[#F5F0E8]/60">/night</span>
        </div>
        <p className="mt-5 text-sm text-[#F5F0E8]/70 leading-relaxed">
          A typical 4-night trip for a group of 6 runs about <strong className="text-[#F5F0E8]">$133/person/night</strong> &mdash; less than a downtown Austin hotel room, six minutes from Turn 6.
        </p>
        <a
          href="tel:9729656901"
          className="block mt-6 bg-[#D4A853] text-[#0D0B09] font-semibold uppercase tracking-wider px-6 py-4 rounded-sm hover:bg-[#e0b964] transition-colors text-sm"
        >
          Call for Your Weekend Quote
        </a>
        <a
          href="#request-a-quote"
          className="block mt-3 text-sm text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
        >
          Or request one online
        </a>
        <p className="mt-6 text-xs text-[#F5F0E8]/50 leading-relaxed">
          Race weekend historically books out by August. 14-unit fleet.
        </p>
      </motion.div>
    </div>
  </div>
</section>
```

---

## 6. Fleet Section (lines 486–526)

### Heading (line 492) — Keep.

### Subhead (lines 497–500)

**Current:**
```
Every unit is cleaned, prepped, and delivered with the same standard — whether it sleeps 4 or 12.
```

**New:**
```
Every unit in the fleet is owned, maintained, and delivered by Triple W &mdash; whether it sleeps 4 or 12.
```

**Why:** "Owned and maintained" differentiates from marketplaces (Outdoorsy, RVshare) where the RV could be anyone's. Triple W's moat.

---

### Fleet CTA (lines 512–524) — Reconsider

The external link to `triple-w-rentals.vercel.app` is a leak. If that site is the main fleet catalog, acceptable. But consider:

**Option A (keep external, rewrite):**
```
See the full 14-unit lineup at TripleWRentals.com
```

**Option B (replace with inline action):**
```
Call to see the full 14-unit lineup — we'll recommend the right fit for your group size and campground.
```
Primary CTA = phone. This keeps the buyer on page.

**Recommendation:** Option B. Option A sends premium buyers to a second Vercel app that's likely lower-polish than this one.

---

## 7. Mid-Page CTA Strip (lines 528–551)

**Replace entirely with the booking form.** See `05-booking-form-code.md` for the form component and mount instructions.

---

## 8. Testimonials (line 554 — `<Reviews />`)

Add a "Hero Review" block **above** the auto-scrolling columns. The three hero reviews should mention delivery, setup, or Corbin by name.

**Hero Review Block (conceptual markup — adapt to `components/Reviews.tsx`):**

```tsx
<div className="max-w-5xl mx-auto mb-16 grid md:grid-cols-3 gap-6">
  {heroReviews.map((r, i) => (
    <div key={i} className="bg-[#1A1510] border border-[#D4A853]/20 p-6 rounded-sm">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#D4A853] text-[#D4A853]" />)}
      </div>
      <p className="text-[#F5F0E8]/85 text-sm leading-relaxed italic">
        &ldquo;{r.quote}&rdquo;
      </p>
      <p className="mt-4 text-xs text-[#D4A853] uppercase tracking-wider">
        {r.name} &middot; {r.event}
      </p>
    </div>
  ))}
</div>
```

**Recommended hero review selection criteria:**
- Pick 3 from the existing 12 that specifically mention: delivery on time, setup quality, Corbin by name, or trackside experience.
- If none mention delivery specifically, use any 3 that emphasize reliability and show up / setup.
- If you want new hero reviews, solicit from last year's USGP customers with: "Could you mention that we delivered and set up?" in the ask.

---

## 9. Why Triple W (lines 557–617)

### Eyebrow (line 574) — Keep.

### Heading (line 580)

**Current:**
```
Built for Events Exactly Like This
```

**New:**
```
Owner-Operated. Texas-Made. Race-Weekend-Proven.
```

**Why:** Three specific claims, each defensible. Avoids the generic "built for" framing.

---

### Why Triple W Intro Paragraph (lines 585–587)

**Current:**
```
We've delivered RVs to motorsport events, horse shows, family reunions, and corporate retreats across Texas. F1 weekend is our kind of challenge — and your crew deserves better than a hotel.
```

**New:**
```
Triple W isn&rsquo;t a marketplace. It&rsquo;s a 14-unit fleet out of Tyler, Texas, personally run by Corbin Walker. Over 200 deliveries to motorsport events, horse shows, corporate retreats, and private weekends. F1 weekend is exactly what we&rsquo;re built for.
```

**Why:** "Isn't a marketplace" differentiates. Naming the owner creates accountability. "Exactly what we're built for" is confident without being braggy.

---

### Trust Points (lines 108–125 — the data array)

**trustPoints[0] — keep as is.**

**trustPoints[1] (`Generator Rental Available`) — keep as is.**

**trustPoints[2] (`Outdoor Add-On — $100`) — tighten:**

**Current:**
```
title: "Outdoor Add-On — $100"
desc: "Grill, chairs, outdoor table, and lawn setup. Turn your campsite into a tailgate."
```

**New:**
```
title: "Outdoor Kit — $100"
desc: "Grill, chairs, table, shade setup. Your site looks like a tailgate before your crew even lands."
```

**trustPoints[3] — rewrite with owner-name:**

**Current:**
```
title: "4.7 Stars · 200+ Bookings"
desc: "We show up early, set up right, and stay reachable 24/7. Every single time."
```

**New:**
```
title: "4.7★ · 200+ Deliveries · Owner-Coordinated"
desc: "Corbin Walker personally confirms every booking, tracks every delivery, and stays reachable 24/7 through race weekend."
```

**Why:** Names the owner. Shifts trust point from generic "we" to specific accountable person.

---

### Math Callout (line 613–614)

**Current:**
```
For a group of 6, an RV at COTA costs less per person than one downtown hotel room — and you're sleeping trackside.
```

**Keep** — it's working hard. Or tighten:

**Alternative:**
```
For a group of six, this runs ~$133 per person per night &mdash; less than a downtown hotel room, six minutes from Turn 6.
```

---

## 10. COTA Camping Guide (lines 620–703)

Copy is solid. **No rewrites needed.** Consider moving this section **below** the Offer section in the render order (currently it's after Why Triple W). The educational content is good but decelerates conversion momentum — place it where a buyer who's already sold can reference it.

**Recommendation:** Keep copy as-is. If you re-order sections, put COTA Camping Guide between Testimonials and Why Triple W, or collapse it into a disclosure (`<details>` element or expand/collapse panel).

---

## 11. Final CTA (lines 706–748)

### Urgency badge (line 718)

**Current:**
```
Limited Availability — 14 Units
```

**New:**
```
14-Unit Fleet · Race Weekend Books Out by August
```

**Why:** Specifies WHY it's limited. "By August" is a time anchor that creates urgency without being manufactured.

---

### Final CTA Heading (lines 725–727)

**Current:**
```
Race Weekend Fills Up. Your RV Shouldn't Be an Afterthought.
```

**New:**
```
Race Weekend 2026. Lock In Your Unit Before the Fleet Fills.
```

**Why:** Direct, dated, imperative. "Afterthought" is soft; "lock in" is what the buyer is trying to do.

---

### Final CTA Subhead (lines 730–732)

**Current:**
```
Lock in your unit now. We'll handle everything from delivery to setup — you just show up and enjoy the Grand Prix.
```

**New:**
```
One call and your unit is reserved. We deliver to your COTA site, level it, hook it up, and walk you through everything when you arrive. Starting at $200/night.
```

**Why:** Repeats the mechanism + names the price anchor one more time right before the final CTA.

---

### Final CTA Button (lines 736–739)

**Current:**
```
Call or Text (972) 965-6901
```

**New:**
```
Call Corbin · (972) 965-6901
```

**Why:** Names the owner. Every interaction that reminds the buyer he's dealing with a person, not a form, reduces friction.

**Secondary CTA (new — add below primary button):**
```tsx
<a
  href="#request-a-quote"
  className="block mt-4 text-sm text-[#D4A853]/80 hover:text-[#D4A853] transition-colors underline underline-offset-4"
>
  Or send your details and we&rsquo;ll call you back
</a>
```

---

### Owner reassurance (lines 743–745)

**Current:**
```
Every booking is personally handled by Corbin Walker, owner of Triple W. He'll answer your call, confirm your unit, and make sure everything's ready when you arrive.
```

**Keep — it's already excellent.**

---

## Navbar (lines 138–149) — Optional tweak

Consider adding a second CTA to the navbar: a small "Request Quote" text link that scrolls to the form. On mobile, this appears as a compact pill next to the phone number.

```tsx
<div className="flex items-center gap-4 md:gap-6">
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
```

---

## Summary Table — Copy Changes

| Priority | Section | Change | Line(s) |
|---|---|---|---|
| 🔴 High | Hero headline | Reframe around delivery | 212 |
| 🔴 High | Hero subhead | Mechanism + Thursday scene | 219–222 |
| 🔴 High | NEW Offer section | Full insert | After 484 |
| 🔴 High | Step 02 of How It Works | Specific operational sequence | 79–82 |
| 🟡 Medium | Hero secondary CTA | Add "Request a quote" link | After 232 |
| 🟡 Medium | Social proof badges | "Deliveries" + "Owner-Operated" | 240 |
| 🟡 Medium | Desire point #2 | "Real home, six minutes from Turn 6" | 56–57 |
| 🟡 Medium | Why Triple W heading | "Owner-Operated. Texas-Made..." | 580 |
| 🟡 Medium | Trust point #4 | Name Corbin explicitly | 122–124 |
| 🟡 Medium | Final CTA badge | "Books out by August" | 718 |
| 🟡 Medium | Final CTA heading | "Lock in your unit" imperative | 725–727 |
| 🟢 Low | Problem eyebrow | "The Race Weekend Tax" | 272 |
| 🟢 Low | How It Works subhead | "logistics" not "hard part" | 367 |
| 🟢 Low | Fleet subhead | "owned, maintained" | 497–500 |
| 🟢 Low | Step 03 | "Walk to the Track" + checkout | 84–86 |
| 🟢 Low | Final CTA subhead | Re-echo mechanism + price | 730–732 |
