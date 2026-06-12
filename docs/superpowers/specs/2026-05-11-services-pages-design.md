# Design Spec: Services Page & Service Detail Page

**Date**: 2026-05-11  
**Reference**: https://vertora.webflow.io/service + /service-detail/web-development  
**Approach**: Static component clone, data-driven via `data/services.ts`

---

## 1. ARCHITECTURE

### Routes

```
app/
  services/
    page.tsx                    → /services  (Services listing page)
    [slug]/
      page.tsx                  → /services/[slug]  (Service detail dynamic page)
```

### Data Layer

Extend `data/services.ts` with a new type `ServiceDetail` that holds per-service rich content:

```ts
export type ServiceDetail = {
  id: string // matches slug (e.g. 'web-development')
  slug: string // URL segment
  title: string // e.g. "Web Development"
  heroImage: string // path to hero background image
  featuredImage: string // 780×348 content image
  overview: {
    heading: string // H2 — big bold intro heading
    paragraphs: string[] // 3 body paragraphs
  }
  midHeading: string // H3 after featured image
  midParagraph: string
  keyPointsHeading: string // H3 "Meaningful results..."
  keyPoints: { title: string; body: string }[] // 2 items
  steps: { num: string; title: string; description: string }[] // 4 steps
  closingHeading: string
  closingParagraph: string
}
```

Six services defined: web-development, mobile-apps, ai-agents, ux-ui-design, ai-automation, cloud-backend.

### Component Directory

```
components/
  services/
    ServicesHero.tsx
    StrategySection.tsx
    ServicesGrid.tsx
    CreativeStudioSection.tsx
    GalleryTagsSection.tsx
    ServicesPricingSection.tsx    (reuses home pricing, but scoped)
    ServicesCtaSection.tsx
    ServiceAnimInit.tsx           (GSAP init for /services)
  service-detail/
    DetailHero.tsx
    DetailSidebar.tsx
    DetailContent.tsx
    DetailSteps.tsx
    DetailAnimInit.tsx            (GSAP init for /services/[slug])
```

---

## 2. GLOBAL DESIGN TOKENS (already in globals.css — confirm usage)

```css
--ivory: #f8f7f3; /* body background */
--black: #000;
--dark-gray: #4d4d4d; /* body text, links */
--light-border: rgba(0, 0, 0, 0.1);
--white: #fff;
--light-gray: #e8e8e8;
--red: #f3350c; /* hover accent (limited) */
--fs-h1: 10vw;
--fs-h2: clamp(1.5625rem, 3.5vw, 2.5rem); /* ~40px desktop */
--fs-h3: clamp(1.25rem, 2.5vw, 1.875rem); /* ~30px desktop */
--fs-big2: clamp(1.5rem, 7vw, 9.37rem); /* hero "Services" title */
--ls-h2: -0.03em;
--ls-big3: -0.044em; /* tight letter spacing hero */
```

---

## 3. SERVICES PAGE — `/services`

### 3.1 Navbar

Reuse existing `<Navbar>` component. No changes needed.

### 3.2 Hero Section — `ServicesHero.tsx`

**Layout**: CSS Grid — 2 columns on desktop (`~60% / ~40%`), stacked on mobile  
**Background**: `var(--ivory)` `#F8F7F3`

**Desktop padding**:

```css
padding-top: 10rem; /* ~160-180px — space for fixed navbar */
padding-bottom: 4rem;
```

**Left column:**

- H1 "Services" — each letter in its own `<span>` inside a `.di-hero-chars-wrap` wrapper
  - Font: `var(--fs-big2)` = `clamp(1.5rem, 7vw, 9.37rem)` (~120px at 1440px)
  - Weight: 600
  - Color: #000
  - Letter spacing: `-0.044em`
  - **GSAP animation**: Letters clip-reveal upward on page load
- Paragraph: "We provide digital solutions to boost your brand's online presence, from web development and mobile apps to AI automation and UX design, all engineered to scale."
  - 16px / #4D4D4D / 26px line-height
- CTA "Let's talk" — duplicated-span hover pattern → `/contact`
  - 16px / #4D4D4D / transparent bg / no border

**Right column:**

- 3 images stacked vertically with slight offsets
  - `vertora-service-hero-image-one.webp`, `-two.webp`, `-three.webp` (download from Vertora CDN)
  - Each wrapped in a div, subtle parallax on scroll (GSAP ScrollTrigger)
  - Aspect ratio: approximately 4:3 or square

**GSAP Animation Sequence** (`ServiceAnimInit.tsx`):

```
1. gsap.set('.di-hero-char', { yPercent: 110, opacity: 0 })
2. gsap.set('.di-hero-images', { opacity: 0, y: 40 })
3. timeline:
   .to('.di-hero-char', { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.7, ease: 'power3.out' }, 0)
   .to('.di-hero-images', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.4)
```

**Responsive**:

- Desktop (992px+): 2-col grid, hero ~1023px tall
- Tablet (768-991px): stacked single col, hero ~639px tall, animations OFF
- Mobile (<480px): single col, hero ~508px tall, font scales down (clamp handles it)

---

### 3.3 Strategy / Features Section — `StrategySection.tsx`

**Layout**: Full width, ivory background  
**Section padding**: `6rem 2rem` desktop, `3rem 1.25rem` mobile

**Heading**: `var(--fs-h2)` / 600 / #000 / `var(--ls-h2)`  
Text: "Crafting unique strategies that turn visions into powerful results"

**3 Feature Cards** (CSS grid, 3 cols desktop → 1 col mobile):
Each card:

```
[icon 40×40]
[Title — 18px / 600 / #000]
[Description — 16px / #4D4D4D / 26px lh]
```

Card gap: ~2rem, no border, no shadow, transparent bg.

| Icon            | Title                | Description                                                                                                |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| icon-award.svg  | Award winning agency | "Our recognition is proof of the trust our clients place in us and the results we achieve together."       |
| icon-vision.svg | Vision realized      | "From strategy to execution, we ensure every detail reflects your brand's purpose and ambition."           |
| icon-design.svg | Impactful design     | "We craft designs that not only capture attention but also inspire action and leave a lasting impression." |

**Trust Ticker below cards**:

- Label chip: "Trust" (uppercase, small caps style)
- Text: "Join the 850+ company trusting our creative services"
- Arrow icon → right
- Horizontal marquee/slider of partner logos (reuse `LogosSection` pattern)

**Scroll animation** (992px+ only): Cards fade+translateY in via ScrollTrigger, stagger 0.1s.

---

### 3.4 Services Grid Section — `ServicesGrid.tsx`

**Layout**: Full width, ivory bg  
**Section heading**: `var(--fs-h2)` / 600 / #000

**Rotating text icon**: CSS `animation: spin 10s linear infinite` on a circular SVG with text path  
Small decorative icon next to heading.

**Service Cards** — 4 cards from `serviceV2Items` (Web Development, Mobile Apps, AI Agents, UX/UI Design — or all 6, configurable):

**Card layout** (vertical list, full width, separated by border-bottom `1px solid var(--light-border)`):

```
[Service image — 100% width, ~280px height, object-fit: cover]
[Service title — var(--fs-h3) / 600 / #000]
[Description — 16px / #4D4D4D]
["View more" link + arrow icon]
```

Each card links to `/services/[id]`.

**Desktop grid**: `grid-template-columns: repeat(2, 1fr)` with `gap: 2px` (hairline border effect)  
**Tablet**: same 2-col  
**Mobile**: 1 col

**"View more" hover** (duplicated arrow pattern):

```html
<span class="di-link-wrap">
  View more
  <span class="di-arrow-wrap">
    <img class="di-arrow-1" src="/assets/icons/arrow-right.svg" />
    <img class="di-arrow-2" src="/assets/icons/arrow-right.svg" />
  </span>
</span>
```

CSS: `.di-arrow-wrap { overflow: hidden }` — on hover, first arrow translateY(-100%), second translateY(0) from 100%. Duration: 0.25s ease.

**Scroll animation**: Each card fades in with stagger as it enters viewport.

---

### 3.5 Creative Studio Section — `CreativeStudioSection.tsx`

**Background**: #000 or #0a0a0a (near-black)  
**Text**: #fff  
**Section padding**: `6rem 2rem`

**Split heading**:

```
[left] "Creative" | [right] "Studio"
```

Both in `var(--fs-h2)` / 600 / #fff, flexbox space-between.

**Inline video player**:

- Contained video element with poster image
- Circular play/pause button overlay (44×44px, white bg, black icon)
- Click toggles `video.play()` / `video.pause()` and swaps icon

**Right column content**:

- Subheading: "We collaborate with forward thinking brands to build lasting creative impact" — H3 / #fff
- Body: paragraph / #fff opacity 0.8
- CTA "Let's talk" → `/contact` (white text hover variant)

**Portfolio Carousel (3 items)**:

- Number badge: `(01)` `(02)` `(03)` — 14px / #fff opacity 0.6
- Title: H3 / #fff
- Description: 16px / #fff opacity 0.8
- "View more" link with white arrows

Carousel navigation: dot indicators, click or swipe to change.  
**Implementation**: GSAP or CSS-only carousel (3 panels, translateX based).

---

### 3.6 Gallery + Tags Section — `GalleryTagsSection.tsx`

**Background**: `var(--ivory)`  
**Layout**: 3-image mosaic (CSS grid, asymmetric) + tag chips + heading + paragraph

**Images** (download from Vertora CDN, rename):

- `services-gallery-1.webp`, `services-gallery-2.webp`, `services-gallery-3.webp`

**Tag chips** (3 pills):

```css
border: 1px solid var(--light-border);
border-radius: 100px;
padding: 0.5rem 1.25rem;
font-size: 14px;
```

Tags: "Creative development", "AI & Automation", "Design systems"

**Heading**: "Creative technology agency" — `var(--fs-h2)` / 600 / #000  
**Body**: paragraph / #4D4D4D

**Responsive**: Images stack to 1-col on mobile, 2-col tablet, 3-col desktop.

---

### 3.7 Pricing Section — `ServicesPricingSection.tsx`

Identical structure to home pricing. Can extract shared `PricingGrid` component or duplicate scoped version.

**Monthly/Yearly toggle**:

```tsx
const [yearly, setYearly] = useState(false)
```

Price values swap with opacity transition (0.2s).

**3 Tier Cards** — `grid-template-columns: repeat(3, 370px)` desktop, `repeat(1, 1fr)` mobile:

| Tier       | Monthly | Yearly | Card bg |
| ---------- | ------- | ------ | ------- |
| Basic      | $25/mo  | $29/mo | #fff    |
| Standard ★ | $30/mo  | $49/mo | #000    |
| Premium    | $95/mo  | $99/mo | #fff    |

Card anatomy:

```
[Tier name — 12px uppercase letter-spacing 0.1em]
[Price — var(--fs-big4) / 600]
[/ Month — 16px]
[Description — 14px / #4D4D4D]
[divider line]
[Features list — 5 items each with tick icon]
[CTA "Get started now" → /contact]
```

Standard card (dark): all text #fff, tick icon white version.  
Card border-radius: `var(--r-md)` = 1.25rem.  
Card padding: 2rem.  
Card border: `1px solid var(--light-border)` (Basic/Premium only).

**"Get started now"** — duplicated-span hover pattern.

---

### 3.8 Final CTA Section — `ServicesCtaSection.tsx`

**Background**: `var(--ivory)`  
**Text center-aligned**

Heading: "Create a world-class digital product that represents your business" — `var(--fs-h2)` / 600 / #000  
Button: "Get a quote" → `/contact` — duplicated-span pattern, 16px / #4D4D4D

---

### 3.9 Footer

Reuse existing `<Footer>` component. No changes.

---

## 4. SERVICE DETAIL PAGE — `/services/[slug]`

### 4.1 Data Generation

```ts
// app/services/[slug]/page.tsx
export async function generateStaticParams() {
  return serviceV2Items.map((s) => ({ slug: s.id }))
}
```

At build time generates: web-development, mobile-apps, ai-agents, ux-ui-design, ai-automation, cloud-backend.

### 4.2 Hero Section — `DetailHero.tsx`

**Height**: 677px  
**Background**: Full-bleed image with dark overlay `rgba(0,0,0,0.55)`  
**Image source**: `service.heroImage` from service data

**H1**: service `title` property

- Font: `var(--fs-big2)` ≈ 120px / 600 / #fff / letter-spacing `-0.044em`
- Positioned: absolute center or bottom-left of hero
- **GSAP animation**: letter stagger reveal on load (same pattern as Services hero)

**Metadata row** (below H1, inside hero or just below it):

```
[left] SERVICE DETAIL    [center] 2024 — 2025    [right] PROJECTS BY YEARS
```

Font: 12px uppercase / letter-spacing 0.1em / #4D4D4D (or #fff with opacity if inside dark hero)

---

### 4.3 Main Content — `DetailContent.tsx` + `DetailSidebar.tsx`

**Outer layout** (desktop 992px+):

```css
display: grid;
grid-template-columns: 330px 1fr;
gap: 2rem;
max-width: 1140px;
margin: 0 auto;
padding: 4rem 1.5rem;
```

**Mobile/tablet**: sidebar hidden (`display: none` below 992px), content full-width.

---

### 4.4 Sidebar — `DetailSidebar.tsx`

Position: sticky top (follows scroll within page section).

```css
position: sticky;
top: 100px;
align-self: start;
```

**Service links list** (from `serviceV2Items` array):

```tsx
serviceV2Items.map((s) => (
  <Link href={`/services/${s.id}`} className={s.id === slug ? 'active' : ''}>
    {s.title}
    <img src="/assets/icons/arrow-right.svg" />
  </Link>
))
```

**Link styling**: 30px / 600 / #4D4D4D  
**Active state**: color #000 + arrow translates right 4px  
**Hover**: color #000 + arrow translate transition 0.2s  
**Divider**: `border-bottom: 1px solid var(--light-border)` between each link

---

### 4.5 Right Content Column

Uses `service.overview`, `service.steps`, etc. from the data object.

**Section 1 — Overview**:

- H2: `service.overview.heading`
- 3 paragraphs: `service.overview.paragraphs.map(...)`

**Section 2 — Featured Image**:

```html
<div class="di-detail-image-wrap">
  <img src="{service.featuredImage}" width="780" height="348" />
  <button class="di-play-btn">▶</button>
  <!-- opens lightbox -->
  <p class="di-image-caption">Bold ideas move forward fast</p>
</div>
```

Image: `aspect-ratio: 780/348`, `width: 100%`, `object-fit: cover`, `border-radius: var(--r-sm)`  
Caption: 14px / center / #4D4D4D / margin-top 0.75rem

**Section 3 — Mid content**:

- H3: `service.midHeading`
- Paragraph: `service.midParagraph`

**Section 4 — Key Points**:

- H3: `service.keyPointsHeading`
- 2 key point items: `{ title, body }` — title bold, body paragraph below

---

### 4.6 Process Steps — `DetailSteps.tsx`

**Layout**: CSS grid `repeat(2, 1fr)`, gap `2rem`  
**Mobile**: `repeat(1, 1fr)`

Each step:

```html
<div class="di-step">
  <span class="di-step-num">01</span>
  <div>
    <h3 class="di-step-title">Branding identity</h3>
    <p class="di-step-desc">Building visual stories that...</p>
  </div>
</div>
```

**Step number**: 24px / 600 / #4D4D4D / margin-bottom 0.5rem  
**Step title**: 30px / 600 / #4D4D4D  
**Step desc**: 16px / #4D4D4D / 26px line-height  
**Step box**: `padding: 1.5rem 0` / `border-top: 1px solid var(--light-border)`

**Closing H2 + paragraph** below the step grid.

---

### 4.7 Pricing + CTA + Footer

Same components as Services page (reused). Same markup, same data.

---

## 5. ANIMATIONS — COMPLETE CATALOG

### 5.1 Hero Letter Reveal (Both Pages)

**File**: `ServiceAnimInit.tsx` / `DetailAnimInit.tsx`  
**Trigger**: page load (not scroll)  
**Implementation**:

```ts
import { useGSAP } from '@gsap/react'
import gsap from '@/lib/gsap'

useGSAP(() => {
  gsap.set('.di-hero-char', { yPercent: 110 })
  gsap.to('.di-hero-char', {
    yPercent: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.04,
    delay: 0.1,
  })
}, [])
```

Each letter wrapped: `<span class="di-char-outer"><span class="di-hero-char">{letter}</span></span>`  
The outer span has `overflow: hidden` to clip the upward reveal.

### 5.2 Image Entrance (Services Hero)

After letter animation completes (~0.5s offset):

```ts
gsap.to('.di-hero-img', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 })
```

Initial state: `opacity: 0, y: 50`

### 5.3 Hover — Duplicated Span Buttons

**Pattern** used on: "Let's talk", "Get a quote", "Get started now", "View more"

```css
.di-btn-wrap {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 1.2em; /* clips to single line height */
}
.di-btn-text-1,
.di-btn-text-2 {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}
.di-btn-wrap:hover .di-btn-text-1 {
  transform: translateY(-100%);
}
.di-btn-wrap:hover .di-btn-text-2 {
  transform: translateY(-100%);
}
```

Both spans start at their natural position; on hover, both shift up simultaneously to create a slide-out/slide-in illusion. The second span starts at `translateY(0)` but positioned below the clip area via `margin-top: -1.2em` or absolute positioning.

### 5.4 Hover — Arrow Icon Swap

```css
.di-arrow-wrap {
  overflow: hidden;
  height: 12px;
  position: relative;
}
.di-arrow-1 {
  transform: translateY(0);
  transition: transform 0.25s ease;
}
.di-arrow-2 {
  position: absolute;
  top: 0;
  transform: translateY(100%);
  transition: transform 0.25s ease;
}
.di-link:hover .di-arrow-1 {
  transform: translateY(-100%);
}
.di-link:hover .di-arrow-2 {
  transform: translateY(0);
}
```

### 5.5 Scroll-Triggered Section Entrances (992px+ only)

**ScrollTrigger** on each major section:

```ts
gsap.from('.di-section-card', {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.di-cards-wrap',
    start: 'top 80%',
  },
})
```

Applied to: feature cards, service cards, pricing cards, step items, gallery images.

### 5.6 Rotating Text Icon

```css
.di-rotate-icon {
  animation: di-spin 10s linear infinite;
}
@keyframes di-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 5.7 Pricing Price Toggle

```tsx
const price = yearly ? tier.yearly : tier.monthly
// Wrap in <AnimatePresence> or use CSS opacity transition:
```

CSS approach:

```css
.di-price {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.di-price.updating {
  opacity: 0;
  transform: translateY(-8px);
}
```

JS: add `updating` class, update number, remove class after 200ms.

### 5.8 Video Play/Pause (Creative Studio)

```tsx
const videoRef = useRef<HTMLVideoElement>(null)
const [playing, setPlaying] = useState(false)
const toggle = () => {
  if (playing) videoRef.current?.pause()
  else videoRef.current?.play()
  setPlaying((p) => !p)
}
```

### 5.9 Portfolio Carousel (Creative Studio Section)

3-item carousel with GSAP:

```ts
gsap.to('.di-portfolio-items', { x: `-${index * 100}%`, duration: 0.5, ease: 'power2.out' })
```

Numbered dot indicators update active state on change.

### 5.10 Sidebar Sticky Scroll (Detail Page, 992px+ only)

CSS-only:

```css
.di-sidebar {
  position: sticky;
  top: 6rem;
  align-self: start;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}
```

---

## 6. RESPONSIVE BEHAVIOR — ALL BREAKPOINTS

### Breakpoints (matching Vertora/Webflow pattern)

```css
/* In globals.css or component CSS */
/* Mobile: default (< 480px) */
/* Mobile-L: 480px+ */
/* Tablet: 768px+ */
/* Desktop: 992px+ (animations ON, sidebar ON) */
/* Desktop-L: 1280px+ */
/* Desktop-XL: 1440px+ */
```

### Services Page (`/services`)

| Element              | Mobile (<480px)    | Tablet (768px) | Desktop (992px+)    |
| -------------------- | ------------------ | -------------- | ------------------- |
| Hero layout          | Single col stacked | Single col     | 2-col (60/40)       |
| Hero height          | ~508px             | ~639px         | ~1023px             |
| Hero font (H1)       | clamp → ~56px      | clamp → ~80px  | ~120px (9.37rem)    |
| Nav                  | Hamburger          | Hamburger      | Full nav visible    |
| Feature cards        | 1 col              | 2 col          | 3 col               |
| Service cards grid   | 1 col              | 2 col          | 2 col (large cards) |
| Creative Studio cols | 1 col              | 1 col          | 2 col               |
| Gallery images       | 1 col              | 2 col          | 3 col               |
| Pricing cards        | 1 col              | 1 col          | 3 col (370px each)  |
| Footer cols          | 1 col              | 2 col          | 4 col               |
| Animations           | OFF                | OFF            | ON (ScrollTrigger)  |
| Font size base       | 15px               | 15px           | 16px                |

### Service Detail Page (`/services/[slug]`)

| Element            | Mobile (<480px) | Tablet (768px)      | Desktop (992px+)          |
| ------------------ | --------------- | ------------------- | ------------------------- |
| Sidebar            | Hidden          | Hidden              | Visible (330px sticky)    |
| Content layout     | Single col      | Single col centered | 2-col (sidebar + content) |
| Hero H1            | ~56px           | ~80px               | 120px                     |
| Hero height        | Compressed      | ~500px              | 677px                     |
| Process steps      | 1 col           | 1 col               | 2 col                     |
| Pricing cards      | 1 col           | 1 col               | 3 col                     |
| Featured image     | Full width      | Full width          | 780px                     |
| Page height approx | ~5335px         | ~4794px             | ~4899px                   |
| Animations         | OFF             | OFF                 | ON                        |

### Specific CSS breakpoints to write:

```css
/* Mobile-only overrides */
@media (max-width: 479px) {
  .di-hero-grid {
    grid-template-columns: 1fr;
  }
  .di-sidebar {
    display: none;
  }
  .di-pricing-grid {
    grid-template-columns: 1fr;
  }
  .di-cards-grid {
    grid-template-columns: 1fr;
  }
  .di-steps-grid {
    grid-template-columns: 1fr;
  }
  .di-footer-grid {
    grid-template-columns: 1fr;
  }
}
/* Tablet */
@media (min-width: 768px) and (max-width: 991px) {
  .di-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .di-feature-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* Desktop */
@media (min-width: 992px) {
  .di-hero-grid {
    grid-template-columns: 60fr 40fr;
  }
  .di-sidebar {
    display: block;
  }
  .di-detail-layout {
    grid-template-columns: 330px 1fr;
  }
  .di-pricing-grid {
    grid-template-columns: repeat(3, 370px);
  }
  .di-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .di-footer-grid {
    grid-template-columns: 1fr auto auto auto;
  }
}
```

---

## 7. IMAGES TO DOWNLOAD

From Vertora CDN (for initial placeholder use, user will replace later):

| File             | Source                                                                                                                        | Local path                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Service hero 1   | vertora CDN                                                                                                                   | /assets/images/service-hero-1.webp          |
| Service hero 2   | vertora CDN                                                                                                                   | /assets/images/service-hero-2.webp          |
| Service hero 3   | vertora CDN                                                                                                                   | /assets/images/service-hero-3.webp          |
| Gallery 1        | vertora CDN                                                                                                                   | /assets/images/services-gallery-1.webp      |
| Gallery 2        | vertora CDN                                                                                                                   | /assets/images/services-gallery-2.webp      |
| Gallery 3        | vertora CDN                                                                                                                   | /assets/images/services-gallery-3.webp      |
| Detail featured  | https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6939166012dc73d79f9e1ec9_vertora-blog-details-featured-image.webp | /assets/images/service-detail-featured.webp |
| Service card 1-6 | existing or vertora                                                                                                           | /assets/images/svc2-1.jpg etc.              |

Icons (SVG):

- `/assets/icons/arrow-right.svg`
- `/assets/icons/tick-black.svg`
- `/assets/icons/tick-white.svg`
- `/assets/icons/play.svg`
- `/assets/icons/rotate-text.svg` (or CSS-text-path implementation)

---

## 8. COMPONENT CHECKLIST

### Services Page

- [ ] `ServicesHero.tsx` — 2-col hero, letter-split H1, 3 images, CTA
- [ ] `StrategySection.tsx` — heading, 3 feature cards, trust ticker
- [ ] `ServicesGrid.tsx` — heading, rotating icon, 4-6 service cards with hover arrows
- [ ] `CreativeStudioSection.tsx` — dark bg, split heading, video, portfolio carousel
- [ ] `GalleryTagsSection.tsx` — 3 images mosaic, tag chips, heading, body
- [ ] `ServicesPricingSection.tsx` — toggle, 3 pricing cards, CTAs
- [ ] `ServicesCtaSection.tsx` — centered heading, "Get a quote" CTA
- [ ] `ServiceAnimInit.tsx` — GSAP page init (letters + images)
- [ ] `app/services/page.tsx` — assembles all sections

### Service Detail Page

- [ ] `DetailHero.tsx` — full-bleed bg image, overlay, H1 letters, metadata row
- [ ] `DetailSidebar.tsx` — sticky nav list, active state, arrows
- [ ] `DetailContent.tsx` — overview H2 + 3 paras, featured image + video, mid H3 + para, key points
- [ ] `DetailSteps.tsx` — 2×2 step grid, closing H2+para
- [ ] `DetailAnimInit.tsx` — GSAP page init (hero letters)
- [ ] `app/services/[slug]/page.tsx` — fetches service data, layout with sidebar+content
- [ ] `data/services.ts` — extend with `ServiceDetail` type + 6 service objects

---

## 9. DATA EXTENSION — `data/services.ts`

Add for each of the 6 DevInvicta services:

```ts
export const serviceDetails: ServiceDetail[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    heroImage: '/assets/images/service-hero-1.webp',
    featuredImage: '/assets/images/service-detail-featured.webp',
    overview: {
      heading:
        'Successful digital experiences are shaped by intention, structure and an understanding of what truly matters',
      paragraphs: [
        'Rather than relying on assumptions, we build through insight and exploration. Each project is guided by a clear strategy that informs design decisions and ensures the final outcome feels considered and effective.',
        'We focus on simplicity that enhances meaning. Clean layouts, thoughtful interactions, and consistent systems allow brands to communicate with confidence while reducing friction for users.',
        'Our goal is to create work that endures. By designing with adaptability in mind, we help brands stay relevant as their needs, audiences and platforms continue to evolve.',
      ],
    },
    midHeading:
      'Purpose-driven design leads to experiences that feel intuitive, engaging and aligned with real goals',
    midParagraph:
      'By refining ideas through collaboration and feedback, we deliver solutions that balance aesthetics with performance—resulting in digital experiences that remain strong over time.',
    keyPointsHeading:
      'Meaningful results are shaped through focus, structure and deliberate execution',
    keyPoints: [
      {
        title: 'Strategic foundation building',
        body: 'Understanding objectives and audiences allows us to design work that feels relevant and intentional.',
      },
      {
        title: 'Reliable design systems',
        body: 'We create cohesive structures that support consistency while allowing room for evolution and growth.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Discovery & Architecture',
        description:
          'Mapping your goals, users and technical requirements to define the right foundation.',
      },
      {
        num: '02',
        title: 'UI/UX Design',
        description:
          'Design that shapes clear stories and builds stronger connections with people.',
      },
      {
        num: '03',
        title: 'Development',
        description:
          'Precise engineering with modern frameworks — Next.js, TypeScript, scalable APIs.',
      },
      {
        num: '04',
        title: 'Launch & Optimization',
        description:
          'Deployment, performance tuning and ongoing support to keep your product sharp.',
      },
    ],
    closingHeading: 'Balanced design decisions lead to experiences that endure over time',
    closingParagraph:
      'We prioritize structure, usability and clarity to support both user needs and business goals. This results in digital solutions that feel reliable, cohesive and capable of evolving without losing their core intent.',
  },
  // ... repeat for mobile-apps, ai-agents, ux-ui-design, ai-automation, cloud-backend
]
```

---

## 10. IMPLEMENTATION ORDER

1. Extend `data/services.ts` with `ServiceDetail` type + all 6 entries
2. Download/copy image assets
3. Build `app/services/page.tsx` sections top→bottom
4. Build `app/services/[slug]/page.tsx` with sidebar + content
5. Add GSAP animations (ServiceAnimInit, DetailAnimInit)
6. Test all breakpoints: 375px / 480px / 768px / 992px / 1280px / 1440px
7. Verify hover states on all interactive elements
8. Check nav active states for /services route
