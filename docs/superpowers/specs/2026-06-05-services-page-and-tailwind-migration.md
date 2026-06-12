# Design Spec — /services Page (exact Vertora clone) + global.css → Tailwind migration

**Date**: 2026-06-05
**Reference**: https://vertora.webflow.io/service (live source extracted via Playwright + Webflow IX2 interaction data)
**Author decisions** (confirmed):

- Route: `/services` (plural)
- Fidelity: **exact clone** — Vertora content verbatim (texts, prices, project names) + real animations
- Source of truth: **real Webflow IX2 interaction data** extracted from the live page (not visual guesswork)
- Styling: **Tailwind-native** — no new global CSS classes; utilities in components
- Tokens: mapped to **Tailwind v4 `@theme`** as semantic tokens
- Migration scope: **services + home + about** (sequenced: services → home → about to avoid regression)

---

## 0. CRITICAL HONESTY NOTES

Things the previous observational memory (`reference_vertora_service_page.md`) got **wrong or incomplete**, now corrected from the real IX2 data:

1. The hero "Service" heading **does** animate letter-by-letter, but via `swingTo` easing, 500ms per letter, stagger delays `0/100/200/300/500/600/700` (action list **a-66 "Text reveal(1)"**, targeting `.rt-text-one`…`.rt-text-eight`). It is **scroll-into-view triggered** (fires on load because it's in view), not a page-load timeline.
2. The page is **far richer** than documented: it has a **mouse-move parallax** on the service-list images (a-45–a-50), an **accordion service list with rotateY scroll reveal** (a-32 + a-24/25/33), a **25s infinite rotating badge** (a-27), a **20s infinite marquee** (a-29 "Marque"), **counters** (a-4), and a **scroll-scrub image carousel** in the dark section (a-21 "Service image animation").
3. The "Creative Studio" expanding-image effect is the **final-CTA scroll-scrub** (a-41) — a separate mechanism from the dark section.
4. Animations are **Webflow IX2** (data-driven), NOT hand-written GSAP. We re-implement them in **GSAP targeting React refs** (the established project pattern — same as `AboutHero.tsx`).

**Extraction artifacts** (kept in repo root, git-ignored as reference):

- `vertora-ix2-data.json` — full site IX2 blob (events + actionLists)
- `vertora-ix2-focused.json` — events bound to this page
- `vertora-animations-decoded.txt` — human-readable decode
- `vertora-content-tokens.json` — design tokens + images
- `service-page-html.html`, `service-page-*.png/md` — HTML + breakpoint screenshots

---

## 1. ARCHITECTURE

### Routes

```
app/services/page.tsx        → /services
```

Service-detail (`/services/[slug]`) is **out of scope** for this spec (done later).

### Components (Tailwind-native, one per section)

```
components/services/
  ServicesHero.tsx            Hero: "Service" letter reveal + 3 photo cards slide-up + scroll parallax
  StrategyFeaturesSection.tsx "Crafting unique strategies…" + 3 feature cards (hover image reveal) + Trust marquee
  ServicesAccordionSection.tsx "Innovative ideas…" + rotating badge + 4-item accordion (rotateY reveal, hover image, mouse parallax)
  CreativeStudioSection.tsx   Dark: "Creative [img] Studio" + scroll-scrub image carousel + video + portfolio carousel (01/02/03)
  GalleryTagsSection.tsx      Image + "Creative photography / Social media marketing / Branding design" (hover image swap)
  ServicesPricingSection.tsx  "Customized packages…" + Monthly/Yearly toggle + 3 tiers (Basic/Standard-dark/Premium)
  ServicesCtaSection.tsx      "Create a world-class portfolio…" + gradient blob + "Get a quote" (scroll-scrub reveal)
  ServicesAnimInit.tsx        'use client' GSAP init for the whole page (ScrollTrigger registrations)
```

Reused unchanged: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/ui/AnimWrapper.tsx`.

### Data

Vertora content is static and verbatim — inline in components (no `data/` layer needed for an exact clone). Repeated structures (feature cards, accordion items, portfolio items, pricing tiers) use small local `const` arrays inside their component.

### Animation strategy

- `ServicesAnimInit` (client) runs one `useGSAP` scope over the page root.
- Each animation targets **stable `data-anim` attributes or refs**, NOT global classes.
- Continuous loops (rotating badge 25s, marquee 20s, arrow bob) use **CSS `@theme` animations** (Tailwind v4 `--animate-*`) — no JS needed, matches Webflow's CSS-like loops.
- Scroll-scrub (hero parallax, dark-section carousel, final CTA) use `ScrollTrigger` with `scrub`.
- Reveal-on-scroll (slide-from-bottom stagger) reuses the existing `AnimWrapper` `data-anim` batch pattern where the timing matches; custom ones get their own ScrollTrigger.

---

## 2. TAILWIND `@theme` TOKEN MAP

Expand the `@theme` block in `globals.css`. Map every Webflow token to a semantic name. Components then use `bg-ivory`, `text-fiery-red`, `max-w-container`, `text-h2`, etc.

```css
@theme {
  /* colors */
  --color-ivory: #f8f7f3;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-dark-gray: #4d4d4d; /* body + secondary text */
  --color-light-gray: #e8e8e8;
  --color-silver-gray: #c8c8c8;
  --color-silver: #c0c0c0;
  --color-fiery-red: #f3350c; /* accent dot / button dot */
  --color-blue: #2563eb;
  --color-light-border: rgba(0, 0, 0, 0.1);

  /* fonts */
  --font-sans: 'Inter Tight', sans-serif;

  /* font sizes (clamp preserved exactly from Webflow) */
  --text-h1: clamp(2.5rem, 10vw, 13.75rem);
  --text-h2: 2.5rem;
  --text-h3: 1.875rem;
  --text-h4: 1.5rem;
  --text-h5: 1.25rem;
  --text-h6: 1.125rem;
  --text-body: 1rem;
  --text-sub: 0.875rem;
  --text-big1: clamp(2.1rem, 5vw, 3.75rem);
  --text-big2: clamp(1.5rem, 7vw, 9.37rem);
  --text-big3: clamp(2.15rem, 10vw, 9.3rem);
  --text-big4: clamp(2.15rem, 6vw, 6.35rem);
  --text-big5: clamp(3.75rem, 10vw, 12.5rem);

  /* containers + gutter */
  --container-tiny: 78.75rem;
  --container-small: 96.25rem;
  --container: 82.5rem;
  --container-medium: 99.375rem;
  --container-large: 101.875rem;
  --container-xl: 120rem;

  /* radii */
  --radius-sm: 0.625rem;
  --radius-md: 1.25rem;
  --radius-lg: 1.875rem;
  --radius-xl: 6.25rem;

  /* continuous animations (replace Webflow IX2 loops) */
  --animate-badge-spin: badge-spin 25s linear infinite;
  --animate-marquee: marquee 20s linear infinite;
  --animate-arrow-bob: arrow-bob 12s ease-in-out infinite;
}

@keyframes badge-spin {
  to {
    transform: rotate(359deg);
  }
}
@keyframes marquee {
  to {
    transform: translateX(-100%);
  }
}
@keyframes arrow-bob {
  0%,
  100% {
    transform: translateY(-0.125rem);
  }
  50% {
    transform: translateY(0.4375rem);
  }
}
```

Line-heights / letter-spacing that don't map cleanly to a Tailwind scale are applied as arbitrary values per element (`leading-[1.25] tracking-[-0.075rem]`).

---

## 3. SECTION-BY-SECTION SPEC

> Layout values (container `82.5rem`, gutter `0.9375rem`, section gaps `7.6875rem`/`8.125rem`) come from the extracted tokens. Each section: max-w container centered, horizontal padding = gutter.

### 3.1 ServicesHero

**Content**: H1 "Service" (one `<span>` per letter for stagger). Right column subhead: _"We provide digital solutions to boost your brand's online presence, from web design to branding and content creation, all tailored to your business needs."_ + CTA **"Let's talk"** → `/contact`. Three stacked photo cards (`rt-service-hero-image` CDN URLs from `vertora-content-tokens.json`).
**Layout**: split — text left (~55%), 3 cards right; ivory bg; large top padding.
**Animations**:

- **Letters** (a-66): each letter starts `y:100%`, animates to `0` with `swingTo` (GSAP `back.out(1.7)` approx), 0.5s, stagger `[0,.1,.2,.3,.5,.6,.7]`s, on load.
- **Cards** (a-11/12/13): each card `y:3.14rem→0`, `opacity:0→1`, blur→0, 0.5s ease, stagger `0.1/0.2/0.3`s, on scroll-into-view (fires on load).
- **Scroll parallax** (a-112-style, verified on service page as the card drift): on scroll the 3 cards translate up at different rates and text fades — `ScrollTrigger scrub`.

### 3.2 StrategyFeaturesSection

**Heading**: "Crafting unique strategies that turn visions into powerful results" (centered, `--text-h2`, weight 600).
**3 feature cards** (3-col grid, vertical dividers):
| Title | Description |
|---|---|
| Award wining agency | Our recognition is proof of the trust our clients place in us and the results we achieve together. |
| Vision realized | From strategy to execution, we ensure every detail reflects your brand's purpose and ambition. |
| Impactful design | We craft designs that not only capture attention but also inspire action and leave a lasting impression. |
Each card: 3D icon on top (the lottie/image icons), title (`--text-h4`), description.
**Feature card hover** (a-30): on hover a rotated image scales in (`scale 0→1, rotate -14°→0`, 1.5s `[0.23,1,0.32,1]`), marquee fades, icon scales `1→1.1`.
**Trust marquee pill** (a-29): black pill "TRUST" + "Join the 850+ company trusting our creative portfolio agency services" + arrow; the inner train translates `0→-100%` over 20s infinite (`--animate-marquee`).

### 3.3 ServicesAccordionSection

**Left**: heading "Innovative ideas and bold execution that drive measurable growth" (`--text-h2`) + **rotating circular badge** "SINCE 2012 · AWARD WINNING SOLUTIONS" rotating 0→359° over 25s infinite (a-27, `--animate-badge-spin`).
**Right**: 4-item accordion list — **Web development, 3D design, 3D visualisation, UI/UX design** — each row: title + "View more" + arrow → `/service-detail/<slug>`. One row (per scroll position) reveals an image panel.
**Animations**:

- **Scroll-through rotateY reveal** (a-32 + variants): each list item rotates `rotateY -90→0→90`, opacity `0→1→0`, blur, mapped to scroll progress.
- **Hover reveal** (a-33): on row hover, `.rt-line-v5` underline grows `0→100%` (1.2s cubic-bezier `[0.784,0.325,0.222,0.98]`), the image card fades in, big text color → silver-gray.
- **Hover arrow swap** (a-24/25): white arrow-v1 slides out top-right, arrow-v2 slides in from bottom-left; underline grows.
- **Mouse-move parallax** (a-45–a-50): the revealed image translates on `MOUSE_X` (`x:20→0`) / `MOUSE_Y` — bind `mousemove` over the row.

### 3.4 CreativeStudioSection (dark)

**Top**: big split text "Creative [striped image] Studio" — letters reveal (a-66 pattern), with an inline image between the words.
**Scroll-scrub image carousel** (a-21 "Service image animation"): as you scroll, a stack of `.rt-service-image-one…five` slide vertically (`y:100→0→-100` chained) behind a black cover, with `.rt-text-style-h5` labels cross-fading (text-one…five) and arrow filters swapping, and `.rt-line-v2._1…_5` opacity indicators toggling. Mapped to `ScrollTrigger scrub`.
**Video** with play/pause button (inline `<video>`, button toggles).
**Left copy**: "We collaborate with forward thinking brands to build lasting creative impact" + "We blends creativity with technical expertise to craft experiences that captivate audiences, communicate your brand message." + CTA "Let's talk" → `/contact`.
**Portfolio carousel** (3 items, `.rt-card` hover = a-42/43):
| # | Title | Description | Link |
|---|---|---|---|
| (01) | Chromore | Vibrant, minimalist design studio. | /portfolio-detail/chromore |
| (02) | Gareos | Eco-friendly skincare for a natural glow. | /portfolio-detail/gareos |
| (03) | Movtreh | Photography and motion graphics studio. | /portfolio-detail/movtreh |
**Card hover** (a-42): image-wrap grows (`w/h 0→9.5/7.3rem`, 1s `[0,0.164,0,0.995]`), number badge fades, card bg → black, title/description text → white.

### 3.5 GalleryTagsSection

**Layout**: image left + 3 underlined headings right — **Creative photography / Social media marketing / Branding design** (`--text-big4`). Heading "Creative portfolio agency" + body "We showcase innovative projects and designs that highlight creativity, strategy and impactful results for clients."
**Hover**: hovering a tag swaps the left image (image cards stacked, opacity/transform swap — a-33-style reveal).

### 3.6 ServicesPricingSection

**Heading**: "Customized packages perfectly suited to your project's requirements" (`--text-h2`). **Monthly/Yearly toggle**.
**3 tiers** (Standard = featured dark card):
| Tier | Monthly | Yearly | Card | Features |
|---|---|---|---|---|
| Basic | $25 | $29 | white | Single-page responsive portfolio · Clean template customization · Basic image gallery setup · Standard speed optimization · Email support only |
| Standard ★ | $30 | $49 | **black** | Multi-page responsive portfolio · Advanced design customization · Interactive gallery & Sliders · SEO-friendly structure setup · Priority email support |
| Premium | $95 | $99 | white | Fully custom portfolio design · Animated sections & Micro-interactions · High-speed optimization + CDN setup · On-page SEO + Content placement · Support with WhatsApp assistance |
All CTAs "Get started now" → `/pricing`.
**Toggle** (a-39/40): toggle ball `x:0↔140px`, monthly/yearly price boxes cross-fade (opacity), "Monthly"/"Yearly" label colors swap. Click + second-click trigger.

### 3.7 ServicesCtaSection

**Content**: "Create a world-class portfolio that represents your talent with impact" (white, on dark animated gradient-blob bg) + CTA "Get a quote" → `/contact`.
**Scroll-scrub** (a-41): tied to scroll progress — heading `y:100→0` (3%→13%), the CTA button circle `width 35→100`, `scale 0.7→1`, `opacity 0→1` across 24%→52%.

### 3.8 Shared — Buttons & Footer

**Button hover** (a-9/10, used on every CTA): background circle scales `0→10×` (800ms ease), text-wrap moves up `y:-1.65rem` (outExpo), icon block appears (`scale 0→1`), red dot. Reuse across all "Let's talk / Get started / Get a quote / Submit".
**Footer**: existing `Footer.tsx` reused. Social icon hover crossfade (a-35/36) already part of footer or added.

---

## 4. ANIMATION CATALOG (exact extracted values → GSAP)

| ID             | Name                              | Trigger                   | Key values                                                                         |
| -------------- | --------------------------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| a-66           | Hero letter reveal                | scroll-into-view (load)   | y 100%→0, swingTo, 0.5s, stagger 0/.1/.2/.3/.5/.6/.7s                              |
| a-11/12/13     | Slide from bottom (stagger 1/2/3) | scroll-into-view          | y 3.14rem→0, opacity 0→1, blur, 0.5s ease, delay .1/.2/.3s                         |
| a-27           | Rotate badge                      | load (loop)               | rotate 0→359°, 25s linear infinite                                                 |
| a-29           | Marquee                           | load (loop)               | translateX 0→-100%, 20s linear infinite                                            |
| a-30/31        | Feature card hover                | hover                     | image scale 0→1 + rotate -14°→0, 1.5s [.23,1,.32,1]; icon 1→1.1                    |
| a-32           | Accordion item scroll reveal      | scrolling-in-view         | rotateY -90→0 (40%) →90 (100%), opacity 0→1→0, blur                                |
| a-33/34…       | Service reveal on hover           | hover                     | line-v5 width 0→100% 1.2s [.784,.325,.222,.98]; card opacity; text→silver-gray     |
| a-24/25        | Service hover arrow swap          | hover                     | arrow-v1 x100 y-100 out, arrow-v2 in, line 0→100%                                  |
| a-45–50        | Service image mouse parallax      | mousemove                 | x 20→0 on MOUSE_X (+ MOUSE_Y)                                                      |
| a-21           | Dark-section image carousel       | scrolling-in-view (scrub) | service-image-one…five y chained 100→0→-100; labels/arrows/lines cross-fade        |
| a-42/43        | Portfolio card hover              | hover                     | image-wrap w/h 0→9.5/7.3rem 1s [0,.164,0,.995]; bg→black, text→white, number fades |
| a-39/40        | Pricing toggle                    | click / 2nd click         | ball x 0↔140px; price boxes opacity swap; label colors                             |
| a-41           | Final CTA                         | scrolling-in-view (scrub) | heading y100→0 (3-13%); circle width 35→100, scale .7→1, opacity 0→1 (24-52%)      |
| a-9/10/190/191 | Button hover                      | hover                     | bg circle scale 0→10×/40× 800ms; text y-1.65rem outExpo; icon scale 0→1            |
| a-4            | Counter                           | scroll-into-view          | number count-up (reuse existing `CounterInit`)                                     |
| a-228/229      | Navbar dropdown                   | dropdown                  | list y20→0 opacity, arrow rotate 0↔180° (in existing Navbar)                       |
| a-234–237      | Hamburger menu                    | click/hover               | (in existing MobileNav)                                                            |

Easing map (Webflow → GSAP): `swingTo`→`back.out(1.7)`, `inOutCubic`→`power2.inOut`, `outExpo`→`expo.out`, `outQuart`→`power4.out`, `inOutQuint`→`power4.inOut`, `ease`→`power1.inOut`, cubic-bezier arrays → `CustomEase`.

---

## 5. MIGRATION PLAN (global.css → Tailwind)

Sequenced to avoid regression; each phase verified at all breakpoints (480/768/1440) before the next — per `feedback_responsive_verification`.

1. **Token foundation** — expand `@theme`, add keyframes (§2). Keep `:root` vars temporarily for un-migrated pages.
2. **/services** — built Tailwind-native from the start (no new global classes).
3. **Home** — migrate each `components/home/*` from `.hero-*`/`.di-*`/`.rt-*` to utilities; delete the corresponding global CSS blocks once a component is migrated + verified.
4. **About** — same for `components/about/*`.
5. **Cleanup** — remove now-dead `:root` vars and leftover global classes; keep only: base reset, `@font-face`/`@import`, `@theme`, `@keyframes`, and any unavoidable pseudo-element/`::after` decorative CSS that has no utility equivalent.

**What stays in CSS (cannot be pure utility):** keyframes; pseudo-element decorations (hero grid lines `::after` pulses); GSAP needs stable hooks (use `data-*`/refs, not styling classes); `@theme` tokens.

---

## 6. VERIFICATION REQUIREMENTS

- After each section/page: load in browser via Playwright at **480, 768, 1440** and compare against the captured Vertora screenshots / live site. No claim of "done" without screenshots — per `feedback_responsive_verification` + `verification-before-completion`.
- `npm run lint` + `npm run build` must pass with zero errors after every phase.
- Animations checked live (load sequence, hover, scroll-scrub, toggle) against vertora.webflow.io/service.

---

## 6b. PIXEL-PERFECT UI BAR (non-negotiable)

The UI must be **indistinguishable from vertora.webflow.io/service** — professional grade. Concretely:

- Side-by-side Playwright screenshot diff against the live site at 480/768/1440; iterate until layout, spacing, type scale, colors, radii, and hover/scroll behaviors match.
- Exact tokens from `vertora-content-tokens.json` (no eyeballed colors/sizes).
- Exact animation values from §4 (no approximated timings beyond the documented easing map).
- Real Vertora image assets (CDN URLs already extracted) so visuals are identical.

## 6c. PERFORMANCE / SEO / LIGHTHOUSE PHASE (after build + migration)

Run **after** services is built and home/about are migrated. Goal: **Lighthouse 100** across Performance / Accessibility / Best Practices / SEO, lighter & faster code.

- **Images**: serve via `next/image` (AVIF/WebP, responsive `sizes`, lazy below the fold, priority on hero, explicit width/height to kill CLS). Replace raw `<img>`/CSS bg where it costs LCP.
- **Fonts**: self-host Inter Tight via `next/font` (swap, preload, subset) instead of the Google `@import` (removes render-blocking request + matches AGENTS.md "read the docs" Next conventions).
- **JS weight**: GSAP imported once via `lib/gsap.ts`; register only used plugins; keep section components server components where no interactivity is needed, isolating `'use client'` to the animation initializers. Avoid shipping animation code for offscreen sections unnecessarily.
- **CSS weight**: after migration, dead global CSS removed → smaller bundle; Tailwind purges unused utilities automatically.
- **SEO**: per-page `metadata` (title, description, canonical, OpenGraph/Twitter), semantic landmarks (`<main>`, `<section aria-labelledby>`, one `<h1>`), descriptive `alt` text, `sitemap.ts` + `robots.ts`, structured data (`Organization`/`Service` JSON-LD) where appropriate.
- **Accessibility**: color contrast, focus-visible states, reduced-motion fallback (`prefers-reduced-motion` → skip/shorten GSAP), keyboard-operable toggle/accordion/carousel.
- **CWV**: verify LCP/CLS/INP via Lighthouse + `next build` analyze; no layout shift from animations (use transforms/opacity only).

Verification: `npx lighthouse` (or Chrome DevTools) on `/`, `/about`, `/services` — capture scores, iterate to 100.

## 7. OUT OF SCOPE

- `/services/[slug]` service-detail page (later).
- Blog, Portfolio, Contact page rebuilds.
- Backend/data layer (content is static verbatim).
