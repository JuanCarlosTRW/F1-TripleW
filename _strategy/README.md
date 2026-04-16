# Triple W F1 — Site Amelioration Package

**Goal:** Drive more bookings (phone + form) and raise premium positioning for Triple W Rentals' F1 weekend landing page ahead of USGP 2026.

**Approach:** Full audit + Winner's Writing Process + Grand Slam offer engineering + booking form implementation + visual polish — all delivered as documentation so you can execute the edits in a fresh session or hand off to a developer.

**Completed:** 2026-04-16

---

## Files in This Package

| File | What it is | Use when |
|---|---|---|
| [01-audit.md](./01-audit.md) | Conversion audit with dimension scores, top 3 leaks, section-by-section diagnosis | You want to understand *why* the changes below are being made — or prioritize differently |
| [02-wwp-brief.md](./02-wwp-brief.md) | Winner's Writing Process brief — target avatar, current state, dream state, awareness/sophistication levels, tone rules | Anyone writing additional copy for the brand (social, email, ads) should read this first |
| [03-grand-slam-offer.md](./03-grand-slam-offer.md) | Full offer document — value stack, price anchor, scarcity framing, proof substitutes | When you need to explain the offer to a partner, update pricing, or test variations |
| [04-rewritten-copy.md](./04-rewritten-copy.md) | Section-by-section rewritten copy with `app/page.tsx` line numbers | Primary reference for the edit session. Paste each rewrite over the existing copy at the referenced line |
| [05-booking-form-code.md](./05-booking-form-code.md) | Full code for the form component, Server Action, Resend setup, env vars, mount points | When adding the inquiry form to the site |
| [06-visual-polish.md](./06-visual-polish.md) | Spacing, typography, contrast, reduced-motion, LCP, mobile fixes — every change is a specific line/class edit | After copy changes ship, for the visual refinement pass |
| [README.md](./README.md) | This file — master checklist and implementation order | Starting point every time you re-enter the project |

---

## Implementation Order

Do it in phases. Each phase is independently shippable — ship, test, confirm leads are flowing, then move to the next.

### Phase A — Copy & Offer (Highest Conversion Lift)
1. Open `04-rewritten-copy.md`.
2. Apply the **🔴 High priority** rewrites first:
   - Hero headline (line 212)
   - Hero subhead (lines 219–222)
   - Step 02 of How It Works (lines 79–82 in data array)
   - Insert the NEW Offer section (after line 484)
3. Run `npm run dev` and visually verify each change.
4. Commit. Deploy to Vercel preview. Share with a trusted friend for a gut check.
5. Apply the 🟡 Medium priority rewrites.
6. Apply the 🟢 Low priority rewrites.
7. Commit + deploy.

**Expected lift: +15–25% call volume just from the hero reframe + offer section.**

---

### Phase B — Booking Form
1. Open `05-booking-form-code.md`.
2. `npm install resend zod`
3. Create `.env.local` with the three env vars from the doc.
4. Create `app/actions/inquiry.ts` with the Server Action code.
5. Create `components/BookingInquiryForm.tsx` with the form component code.
6. Mount the form in `app/page.tsx` — replace the mid-page CTA strip (lines 528–551).
7. Add the hero "Prefer to not call? Request a quote →" link.
8. Test end-to-end locally: submit form, verify owner email arrives at `jcpl-07@hotmail.com`.
9. Add the three env vars to Vercel (Production + Preview).
10. Deploy to preview. Test on the preview URL. Then promote to production.

**Expected lift: +30–50% total leads from capturing mobile non-callers.**

**Follow-up action:** verify `triplewrentals.com` in Resend to unlock prospect auto-replies. See `05-booking-form-code.md` §2 for the 5-step DNS verification guide.

---

### Phase C — Visual Polish
1. Open `06-visual-polish.md`.
2. Apply the `globals.css` additions (reduced-motion + `--gold-accessible`).
3. Normalize section padding (§1 of the doc).
4. Fix gold-on-cream contrast violations (§3).
5. Add reduced-motion guards to Hyperspeed + IntroAnimation (§4).
6. Lazy-load Fleet Gallery items 4–11 (§5).
7. Add gold hairlines between dark/light sections (§6).
8. Optimize Hyperspeed for mobile (§7).
9. Bump form input padding to `py-3.5` (§8).

**Expected lift: a11y compliance, faster mobile LCP, smoother section rhythm. No direct conversion lift but reduces bounce and supports premium positioning.**

---

### Phase D — Verification
After all three phases ship:

1. **Form E2E test** — submit valid + invalid, confirm emails + error states
2. **Responsive** — screenshot at 375 / 768 / 1280 / 1920 and compare
3. **Accessibility** — run axe-core or Lighthouse a11y audit — target ≥ 95
4. **Build** — `npm run build` must succeed (Next 16 has strict checks; see `AGENTS.md`)
5. **Lighthouse Mobile** — target Perf ≥ 85, A11y ≥ 95, Best Practices = 100
6. **Live check** — test the `tel:` link on a real iPhone and Android
7. **Cross-browser** — test on Safari (desktop + mobile), Chrome, Firefox

---

## What's NOT in This Package

Deliberately excluded from scope:

- **SEO optimization** — meta tags, schema.org, Google Business Profile integration. Flagged for a follow-up round.
- **Paid-ad landing variants** — if you run Google/Meta ads to this page, create dedicated variants per ad creative.
- **Analytics** — no Google Analytics or Plausible setup. Add one before running paid traffic.
- **A/B testing infrastructure** — the rewrites above are a single-variant replacement. Future testing requires Vercel Edge Config or similar.
- **Booking system integration** — the form sends email; it does not write to a CRM, calendar, or reservation system. If you want Airtable/HubSpot/Google Sheets logging, add it on top of the Server Action.
- **Additional pages** — this is a single landing page. Rate sheets, fleet detail pages, FAQ, about-us page all excluded.

---

## Open Action Items (User)

Resolve these before or during implementation:

1. ⚠️ **Rotate the Resend API key.** The current key was pasted in chat and is persisted in this session's transcript. After deploying, generate a new key at https://resend.com/api-keys, update `.env.local` locally + Vercel env vars, and revoke the old one.
2. ⚠️ **Verify `triplewrentals.com` in Resend** to enable prospect auto-replies. Until then, auto-replies are skipped (owner notifications still work).
3. Confirm the October 2026 concert lineup if you decide to update `painPoints[2]` with specific artist names.
4. Pick the 3 hero reviews from the existing 12 Google reviews (criteria: mentions delivery / setup / Corbin by name / specific F1 trip).
5. Decide: keep the "See Full Fleet at TripleWRentals.com" external CTA (leak), or replace with an on-page CTA? Recommendation in `04-rewritten-copy.md` §6.
6. Optional: decide whether to add a second compact form below the Final CTA, or rely solely on the primary form + anchor links.

---

## Expected Overall Impact

Conservative projection with all three phases shipped:

- **~1.5×–2× current booking volume** post-implementation
- **Higher average booking value** from premium positioning + $200/night anchor filtering for qualified buyers
- **Lower bounce rate on mobile** from reduced-motion + LCP fixes
- **Accessibility compliance** (WCAG 2.1 AA) unblocks corporate buyers with procurement requirements

---

## If You Hand This to a New Claude Session

Copy-paste this prompt into a fresh Claude Code session at `/Users/jcpl/F1-TripleW`:

> I have a strategy package in `_strategy/`. Please:
> 1. Read `_strategy/README.md` first for the implementation order.
> 2. Read `_strategy/04-rewritten-copy.md` and apply all 🔴 High priority copy changes to `app/page.tsx`.
> 3. Then read `_strategy/05-booking-form-code.md` and implement the booking form (create files, install deps, mount in page.tsx).
> 4. Then read `_strategy/06-visual-polish.md` and apply the fixes.
> 5. Verify via `preview_start` + `preview_screenshot` at mobile + desktop after each phase.
> 6. Do not deploy — leave on Vercel preview for my review.

That single prompt is enough to execute the entire package.
