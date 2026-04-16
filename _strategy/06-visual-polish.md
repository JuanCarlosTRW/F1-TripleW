# Visual Polish — Concrete Fixes

Everything below is a targeted, verifiable change. No redesigns. No "refactor the components." Each item is a surgical edit with a specific line, class change, or file.

---

## 1. Spacing Rhythm

**Problem:** `py-20`, `py-24`, `py-28`, `py-32` are used inconsistently across sections. Visual rhythm breaks.

**Fix:** Normalize to two tokens.

| Token | Tailwind | Use for |
|---|---|---|
| **Section** | `py-24 md:py-32` | Every major section (Hero, Problem, Dream, How It Works, Offer, Fleet, Testimonials, Why Triple W, COTA, Final CTA) |
| **Sub-section** | `py-16 md:py-20` | Secondary inserts (form section, inline CTA strips, optional secondary form) |

**Edits to `app/page.tsx`:**

| Line | Current | New |
|---|---|---|
| 266 | `py-20 md:py-28` | `py-24 md:py-32` |
| 354 | `py-24 md:py-32` | *(keep)* |
| 487 | `py-24 md:py-32` | *(keep)* |
| 557 | `py-24 md:py-32` | *(keep)* |
| 620 | `py-20 md:py-28` | `py-24 md:py-32` |
| 706 | `py-20 md:py-28` | `py-24 md:py-32` |
| (NEW form mount) | — | `py-16 md:py-20` (sub-section) |

Mid-page CTA strip (line 529) becomes the form — use `py-24 md:py-32` (it's a full section now, not a strip).

---

## 2. Typography Scale

**Problem:** Headings jump between `text-3xl md:text-4xl` (Problem, Dream), `text-3xl md:text-5xl` (How It Works, Fleet, Why Triple W, Final CTA), and `text-4xl sm:text-5xl md:text-7xl` (Hero). No consistent scale.

**Fix:** Enforce 3 levels.

| Level | Class | Use for |
|---|---|---|
| **Display** | `text-4xl sm:text-5xl md:text-7xl` | Hero headline only |
| **H2** | `text-3xl md:text-5xl` | All major section headings |
| **H3** | `text-xl md:text-2xl` | Step titles, card titles, sub-headings |

**Edits to `app/page.tsx`:**

| Section | Line | Current | New |
|---|---|---|---|
| Problem H2 | 277 | `text-3xl md:text-4xl` | `text-3xl md:text-5xl` |
| Dream H2 | 330 | `text-3xl md:text-4xl` | `text-3xl md:text-5xl` |
| COTA H2 | 625 | `text-3xl md:text-4xl` | `text-3xl md:text-5xl` |
| (All other H2) | — | *(already correct)* | — |

---

## 3. Gold / Cream Contrast (WCAG AA)

**Problem:** `#D4A853` on `#F5F0E8` — approximate contrast ratio is ~2.3:1. WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold).

**Rule going forward:**
- ✅ Gold `#D4A853` is OK on dark backgrounds (`#0D0B09`, `#1A1510`) — contrast passes.
- ✅ Gold `#D4A853` is OK on light backgrounds **only** for large text (H2+) and decorative elements (borders, bullets, icons).
- ❌ Gold `#D4A853` is NOT OK on cream `#F5F0E8` or `#F7F4F0` for small text / body copy.

**Audit edits to `app/page.tsx`:**

| Element | Line | Problem | Fix |
|---|---|---|---|
| Dream eyebrow "With Triple W" | 327 | Gold on cream, `text-xs` | Change to `text-[#8B6B1F]` (darker gold that hits 4.5:1) or keep gold but bump to `text-sm md:text-base font-semibold` to qualify as "large text" |
| Fleet "We deliver your RV..." lines | 659, 685 | Gold on white card, `text-sm` | Darker gold: `text-[#8B6B1F]` |
| COTA "For your RV rental, call Triple W..." gold link | 697 | Gold on cream | Darken link to `#8B6B1F` or underline-only |

**Add a CSS custom property for "accessible gold" in `app/globals.css`:**

```css
:root {
  --gold: #D4A853;           /* existing — use on dark only */
  --gold-accessible: #8B6B1F; /* for gold on light backgrounds */
}
```

Use `text-[color:var(--gold-accessible)]` in the flagged spots above, or inline `text-[#8B6B1F]`.

---

## 4. Reduced Motion

**Problem:** Hyperspeed (Three.js animated hero), GSAP intro animation, Framer Motion scroll reveals all run regardless of `prefers-reduced-motion`. Accessibility violation, also triggers motion sickness.

**Fix:** Global CSS guard + component-level respect.

**Add to `app/globals.css`:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Framer Motion respect** — Framer Motion reads `prefers-reduced-motion` automatically when you use `useReducedMotion()` hook. But page.tsx currently uses static config objects (`fadeUp`, `fadeUpDelay`). For a minimal intervention, the CSS rule above will short-circuit Framer Motion's durations.

**Hyperspeed guard** — In `components/ui/Hyperspeed.tsx`, at the top of the effect that starts the Three.js render loop, add:

```typescript
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Show a static poster instead of the animated hero
  return null;
}
```

Consider replacing with a static hero background image (dark gradient + subtle texture) for reduced-motion users.

**IntroAnimation guard** — In `components/ui/IntroAnimation.tsx`, wrap the GSAP timeline in the same `matchMedia` check. If reduced motion is set, skip the intro and render children immediately.

---

## 5. Fleet Gallery — LCP / Lazy Loading

**Problem:** 11 media items (1 video + 10 webp images) load eagerly when `PremiumImageGallery` mounts. First contentful paint suffers; mobile data bill suffers.

**Fix:** Lazy-load items 4–11 (keep items 1–3 eager for initial carousel frames).

**Edit `components/ui/PremiumImageGallery.tsx`:** find the image rendering and add `loading={idx < 3 ? "eager" : "lazy"}` to the `<Image />` tag. For the video poster, `loading="lazy"` on the poster image attribute if the video isn't the active slide.

**Secondary fix:** the poster image on the video (line 94 of page.tsx data) duplicates the URL of item[1] at line 96. Not a bug, but consider: the video's poster should be a lower-res version of the video's first frame, not the same URL as the static image that follows. Minor optimization.

---

## 6. Section Transitions

**Problem:** Hard cuts between dark `#0D0B09` and light `#F5F0E8`. Visually abrupt.

**Fix (option A, minimal):** Add a thin gold hairline between sections. One line at the top of each light-background section:

```tsx
<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
```

Insert before each `<section>` that has a light background following a dark one (Dream, Fleet, COTA).

**Fix (option B, more ambitious):** Subtle 80px gradient bridges. Add as the first child of the light section:

```tsx
<div aria-hidden="true" className="h-20 bg-gradient-to-b from-[#0D0B09] to-transparent" />
```

Option A is safer and doesn't affect the visual rhythm. Option B is richer but takes fine-tuning. Start with Option A.

---

## 7. Mobile Hero Optimizations

**Problem on 375px viewport:**
- Hero social proof badges (`["200+ Rentals", "4.7★ Google Reviews", "Delivered & Set Up", "Texas Statewide"]`) wrap to 2+ lines and break the vertical rhythm.
- Hyperspeed 3D canvas is expensive on low-end mobile — mid-tier Android phones can drop to 20fps.

**Fixes:**

**Badges (line 240):**

Change from:
```tsx
className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-[#F5F0E8]/80 uppercase tracking-wider"
```

To:
```tsx
className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-8 text-xs md:text-sm text-[#F5F0E8]/80 uppercase tracking-wider"
```

Change text size on mobile to `text-xs`, add explicit x/y gap control, and drop the per-item separator on mobile by ensuring `i > 0` separators only render at `md:` and up (the current code already does this via `hidden md:inline-block` on line 244 — that's fine).

**Hyperspeed mobile fallback:**

In `components/ui/Hyperspeed.tsx`, detect narrow viewports and either render a static poster OR reduce the intensity:

```typescript
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const adjustedOptions = {
  ...effectOptions,
  lightPairsPerRoadWay: isMobile ? 20 : effectOptions.lightPairsPerRoadWay,
  totalSideLightSticks: isMobile ? 10 : effectOptions.totalSideLightSticks,
};
```

Halves the geometry on mobile — big FPS win, imperceptible visual difference.

---

## 8. Form Tap Targets

**Problem:** Form inputs default to browser-native heights (~30px). On mobile, that's below Apple's 44px minimum.

**Fix:** In `BookingInquiryForm.tsx`, all inputs/selects/textareas use `py-3` which is 12px top + 12px bottom + ~14px line-height = ~38px. Bump to `py-3.5` for 14+14+14 ≈ 42px, still tight. For safety, `py-4`:

```tsx
// In Field component
className={`... px-4 py-3.5 ...`}
```

And for the submit button, verify `py-4` renders ≥44px (it does — `py-4` = 16px top + 16px bottom + ~24px line-height = 56px).

---

## 9. Navbar Scroll Behavior

**Minor:** Navbar is `fixed` with 90% opacity + backdrop blur (line 139). On scroll, at the hero's peak, the gold "Triple W Rentals" logo sits over the Hyperspeed canvas — the blur helps, but on some screens it's muddy.

**Fix:** Tighten the bg opacity on scroll:

Optional — add a scroll-aware bg via a small state hook. For a minimal fix, bump from `bg-[#0D0B09]/90` to `bg-[#0D0B09]/95` at line 139. Tested: the logo pops cleaner.

---

## 10. `globals.css` — Consolidated Addition

Add the following block at the bottom of `app/globals.css`:

```css
/* Accessible gold for use on light backgrounds (small text) */
:root {
  --gold-accessible: #8B6B1F;
}

/* Reduced motion — global guard */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Verification Matrix

After applying these fixes, verify via `mcp__Claude_Preview__*` tools:

| Check | Tool | Pass criteria |
|---|---|---|
| Spacing consistency | `preview_inspect` on section wrappers | All major sections return `py-24` mobile / `py-32` desktop |
| Typography scale | `preview_inspect` on every H2 | `font-size: 1.875rem` (30px) mobile / `font-size: 3rem` (48px) desktop |
| Gold contrast on light | manual calc via contrast-ratio.com for each flagged element | ≥ 4.5:1 for small text |
| Reduced motion | `preview_eval`: `window.matchMedia('(prefers-reduced-motion: reduce)').matches` → emulate via DevTools | Hyperspeed and GSAP intro skip rendering |
| Fleet LCP | `preview_network` filter=failed + eye-check waterfall | Items 4–11 load only when scrolled into view |
| Mobile hero badges | `preview_resize` 375 + `preview_screenshot` | Badges fit in 2 lines max, no horizontal overflow |
| Form tap targets | `preview_inspect` on `input`, `button` | height ≥ 44px at 375px viewport |
| Section transitions | `preview_screenshot` full-page | Gold hairlines visible between dark→light handoffs |
