# Grand Slam Offer — Triple W F1 Weekend Package

**Variant:** No-guarantee. Delivery is framed as a *benefit* and a *mechanism*, not a promise with consequences. Risk-reversal comes from proof instead.

**Anchor:** "Weekend packages starting at $200/night."

---

## The Offer in One Sentence

> **Your RV delivered to COTA, leveled, hooked up, and stocked — so your crew can walk straight to the track the moment they arrive.**

That's the whole thing. Every other element below supports this sentence.

---

## Headline & Subhead

**Section headline:**
> The Full F1 Weekend — Delivered to Your Site

**Subhead:**
> One call locks your unit. We tow it to your COTA camping site, level it, hook up water and power, and stock it to your spec. You land Thursday and walk into a home already waiting.

---

## Value Stack (Dollar-Anchored)

Present as a vertical list with checkmarks. Dollar figures are **perceived value anchors**, not quoted add-on prices. Nothing sums to a total. The site never shows a total — it directs to "Call for your weekend quote."

| Included | Value |
|---|---|
| ✓ Premium RV rental (Class A, Fifth Wheel, or Travel Trailer, sleeps 4–12) | From $200/night |
| ✓ White-glove delivery to any COTA lot or Austin-area campground | $500 value |
| ✓ Full setup: leveling, slide-outs, water, electric, sewer | $200 value |
| ✓ 60-minute walkthrough when you arrive | Included |
| ✓ Generator rental (required for Lot N dry camping) | $150/day value |
| ✓ 24/7 on-call support through race weekend | Included |

**Optional add-ons (disclosed, not bundled):**
- Outdoor Kit — grill, chairs, table, shade — $100 flat
- Pre-stocked fridge — groceries, drinks, pre-race coffee setup — call for quote
- Post-weekend cleaning — always included, nothing extra to do at checkout

---

## Pricing Anchor Display

**Primary position (Offer section):**
> Weekend packages from **$200/night**
> Typical 4-night trip for a group of 6 runs less per person than a downtown Austin hotel room.

**Secondary position (Final CTA):**
> Starting at $200/night. Units go fast — race weekend historically books out by August.

**Optional but recommended math callout (somewhere in the Offer section or Why Triple W):**
> 4 nights × $200 ÷ 6 guests = **$133/person/night** — sleeping 6 minutes from Turn 6, not in a Holiday Inn 25 miles away.

This single sentence converts price-skeptics faster than any other copy element.

---

## Scarcity Framing

Real, specific, defensible. Never invent numbers.

**Primary:**
> 14-unit fleet. Race weekend historically books out by August.

**Secondary (if/when you have actual remaining unit count, add):**
> X units remaining for October 23–25, 2026.

**Implementation note for the dev:** Wire the count to a simple env variable (`NEXT_PUBLIC_UNITS_REMAINING`) you can update manually each week. If you'd rather not maintain it, the default copy without a specific number is fine.

---

## Risk Reversal (Proof Substitute)

Since no hard guarantee, stack specific proof:

1. **Owner accountability:** "Every booking personally coordinated by Corbin Walker — the owner. He answers your call. He confirms your unit. He makes sure it arrives right."
2. **Volume proof:** "200+ RVs delivered to motorsport events, corporate retreats, and private celebrations across Texas."
3. **Rating proof:** "4.7 stars on Google. [X] reviews mention delivery specifically."
4. **Event specialization:** "Built for events exactly like this — we've delivered to COTA, horse shows, family reunions, and large corporate gatherings across the state."
5. **Texas-rooted:** "Tyler, Texas-based. Not a marketplace. Not a middleman. A fleet we own, units we maintain, deliveries we personally run."

---

## Section Structure (Proposed HTML Layout)

Place the new Offer section **between `How It Works` (ends line 484) and `The Fleet` (starts line 487)**.

Recommended visual:
- Dark background (`#0D0B09`) to match the flow
- Cormorant serif headline
- Gold accent for the price anchor
- Two-column layout on desktop: left column = value stack with checkmarks, right column = price anchor + math callout + CTA
- Mobile: single column, value stack first, anchor + CTA below

See `04-rewritten-copy.md` for the exact copy block and `05-booking-form-code.md` for optional form integration at this location.

---

## Why This Offer Works (Strategic Notes)

- **It names the unique mechanism.** "White-glove delivery" is a real operational capability that marketplace competitors (Outdoorsy, RVshare) can't match at scale. Naming it claims the category.
- **It uses a price anchor without a guarantee.** $200/night sets the floor, filters the tire-kickers, and signals accessible-but-premium. The math callout ($133/person/night) reframes the price against hotels.
- **It stacks proof instead of promising consequences.** The buyer's biggest fear is "what if it shows up wrong?" — proof answers that better than a refund clause would, because the buyer doesn't want to collect a refund, he wants the weekend to be perfect.
- **It names add-ons separately.** Respects the buyer's intelligence. Doesn't bundle things that should be opt-in. Premium buyers notice bundle padding and trust it less.
- **It leaves the total invisible.** "Call for your quote" preserves your margin flexibility and filters for high-intent leads. Premium brands almost never show a total on page. (Keep the $200/night anchor only.)

---

## Things I Considered and Rejected

- **"Book by [date] and get X% off"** — promotional discounts cheapen premium positioning. Rejected.
- **"Bring your own food, we'll stock the fridge free"** — nice gesture but lowers perceived value of add-ons. Rejected.
- **Limited-time bonus stack (e.g., "Book this week, get outdoor kit free")** — works for info products, reads as gimmicky for a 14-unit RV fleet. Rejected.
- **Total package price with strikethrough "compare to hotel"** — tempting but makes the site feel like a discount brand. Reserved as a potential A/B test later.
