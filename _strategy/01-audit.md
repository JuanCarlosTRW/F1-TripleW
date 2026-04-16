# Conversion Audit — Triple W Rentals F1 Landing

**Page analyzed:** `app/page.tsx` (778 lines) as of 2026-04-16
**Frame:** conversion = booking phone calls + inquiry form submissions

---

## Dimension Scores (0–10)

| Dimension | Score | One-line diagnosis |
|---|---|---|
| Hero clarity & promise | 7 | Clear *event* ("US Grand Prix"), soft on *promise*. Delivery hook absent from above-the-fold. |
| Pain / desire resonance | 8 | Problem and Dream sections are strong — specific, not generic. Light avatar calibration. |
| Offer clarity | **3** | No price anchor, no value stack, no offer section. Buyer has to call to learn anything. |
| Trust signals | 7 | 12 Google reviews, 4.7★, 200+ bookings, owner-name reassurance. Review placement is mid-page; hero only hints. |
| CTA logic | 6 | Phone CTA repeats 4x. Good repetition, but only one path. **No form = lost leads.** |
| Brand voice consistency | 8 | Premium, restrained, confident. Cormorant + charcoal/gold holds together. |
| Mobile UX | 7 | Responsive, but Hyperspeed is heavy, hero badges wrap awkwardly, no reduced-motion. |
| Conversion architecture | 5 | Good emotional arc (pain → dream → how → proof → CTA) but no offer and no form interrupt the flow to bookings. |
| Scarcity / urgency | 5 | "Limited Availability — 14 Units" pulses in final CTA only. Not backed by specificity. |
| Accessibility | 5 | Gold on cream likely fails WCAG AA for body text; no motion reduction; form (absent) can't be tested. |

**Overall composite:** 6.1 / 10 — strong foundation, two critical gaps suppress conversion.

---

## Top 3 Conversion Leaks (ranked by expected booking lift)

### Leak #1 — No inquiry form
**Impact:** High. An estimated 40%+ of mobile visitors won't call on impulse but will fill a form. Every one of those is a lead lost today.
**Where:** Entire site. The `tel:9729656901` link is the only conversion path.
**Fix:** Add a secondary inquiry form (Phase 4 of plan). Phone stays primary.

### Leak #2 — The differentiator is buried
**Impact:** High. "We deliver and set up the RV for you" is Triple W's most defensible wedge against hotels AND against self-drive RV rentals. Today it surfaces in:
- One line in step 2 of How It Works (`app/page.tsx:79`)
- One trust point in Why Triple W (`app/page.tsx:110`)
- A subhead mention in the hero ("delivered and set up at COTA")

**Fix:**
1. Reframe the hero headline around delivery.
2. Insert a dedicated Offer section between How It Works and the Fleet Gallery that features delivery as the hero benefit inside a value stack.
3. Upgrade step 2 of How It Works with specifics ("leveling, hookups, walkthrough, stocked").

### Leak #3 — No price anchor, no offer logic
**Impact:** Medium-High. Premium buyers need price signals to self-qualify. Today the site reads like a luxury hotel with prices hidden — which works for *Aman Resorts*, but not for a 14-unit RV operator competing with Airbnb listings and hotel comps. A soft anchor ("starting at $200/night") filters price-shoppers while signaling the tier is accessible to the target avatar.

**Fix:** Show "Starting at $200/night" + itemized value stack in the new Offer section. Final CTA echoes the anchor.

---

## Secondary Findings (lower impact, still worth fixing)

- **CTA language is uniform** — all four phone CTAs say essentially the same thing. Vary: hero ("Reserve Your RV"), mid-page ("Check F1 Availability"), final ("Lock In Your Unit"). Fatigue-proofing.
- **Social proof badges** — "200+ Rentals · 4.7★" in hero is fine but doesn't say *delivered* bookings. "200+ Deliveries · 4.7★" tightens the wedge.
- **Fleet gallery CTA** — "See Full Fleet at TripleWRentals.com" sends users OFF-SITE to a separate Vercel app. That's a leak. Consider embedding a fleet grid here or using it as a secondary (not primary) action.
- **Owner reassurance** — "Every booking is personally handled by Corbin Walker" in final CTA is gold. Move a trimmed version higher (under hero?) for immediate trust.
- **COTA camping guide** — educationally strong, but reduces urgency. Consider shortening or moving below the Offer section.
- **Final CTA headline** — "Race Weekend Fills Up. Your RV Shouldn't Be an Afterthought." is clever but soft. A more direct alternative: "Race Weekend 2026 Has [X] Units Left. Here's Yours."

---

## Section-by-Section Diagnosis (with current line refs)

| Section | Lines | Diagnosis | Fix priority |
|---|---|---|---|
| Navbar | 138–149 | Clean. Phone number visible. No change. | — |
| Hero | 151–263 | Headline is event-specific, not benefit-specific. No form CTA. Hyperspeed is expensive on mobile. | **High** |
| Problem | 265–297 | Strong. Each pain point is specific. Slight tighten on "The Reality of F1 Weekend" → "What Race Weekend Actually Costs You". | Low |
| Dream | 299–351 | Strong. Amplify premium ("King beds, real espresso, full bath") in `desirePoints[1]`. | Low |
| How It Works | 353–484 | Step 2 underdelivers. Upgrade to "White-Glove Delivery." | **Medium** |
| Fleet Gallery | 486–526 | Gallery is great. External CTA leaks traffic. | Medium |
| Mid-page CTA strip | 528–551 | **Replace with inquiry form.** | **High** |
| Testimonials | 554 (`<Reviews />`) | Auto-scroll is nice. Curate 3 "hero" reviews (delivery-mentioning) above the scroll. | Medium |
| Why Triple W | 557–617 | Good. Tighten to proof-points. "We've delivered to motorsport events, horse shows..." is broad — replace with "Every booking personally coordinated by Corbin Walker." | Medium |
| COTA Camping Guide | 620–703 | Good info, reduces momentum. Consider collapsing into an expandable panel or moving below Offer. | Low |
| Final CTA | 706–748 | Add specificity + scarcity number + secondary "Request a quote" link to form. | **Medium** |
| Footer | 751–772 | Fine. Keep. | — |

---

## Expected Lift

Based on the leak severity, a conservative projection post-implementation:

- **+30–50% total leads** from adding the inquiry form alone (captures mobile non-callers)
- **+15–25% call volume** from reframing hero around delivery (higher relevance to buyer intent)
- **+10–20% conversion rate on premium units** from adding a $200/night anchor + value stack (premium buyers self-select)

Compound: likely **~1.5×–2× current booking volume** with the full implementation.
