<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# DevInvicta landing — project conventions

**Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, GSAP + Lenis.

## Workflow (important)

- **Never run `npm run build` while `npm run dev` is running.** They share `.next/`; the build overwrites artifacts the dev server is serving and triggers an infinite reload loop. Stop the dev server first (`pkill -f "next dev"`), build, then restart dev.
- Verify changes with the running dev server (hot reload) where possible; run `npm run build && npm run lint` only after stopping dev.
- Format with `npx prettier --write <files>` — config in `.prettierrc`.

## Design system

- Tokens live in `styles/globals.css` `@theme` (colors `ivory`, `fiery-red`, `dark-gray`; `text-h1…h6`, `text-big*`; `radius-pill/panel/card`; `max-page`). Use the tokens, not hardcoded values.
- **All imagery is black & white** — a global `img, video { filter: grayscale(1) }` rule. Do **not** animate `filter` on `<img>`/`<video>` (an inline GSAP filter overrides the grayscale).

## Animation

- Scroll reveals: wrap a tree in `AnimWrapper` and mark elements with `data-anim`. Reveal is **once** (no hide-on-leave, so content never disappears on scroll); the blur step is dropped on touch devices for performance.
- Smooth scroll is Lenis via `components/ui/SmoothScroll.tsx`, wired to `ScrollTrigger.update`.

## Content & structure

- This is **DevInvicta**, an AI-focused software house (EU AI Act compliance, phased pricing after a free diagnostic). Do **not** reintroduce Vertora template placeholder copy (e.g. "3D design", "Creative portfolio agency", monthly portfolio tiers).
- Services are a single source of truth in `lib/services.ts` (6 services). Detail pages render from it at `app/service-detail/[slug]`. Keep the accordion (`ServicesAccordionSection`), the footer Services column and the detail sidebar in sync with these slugs.
- Contact form posts to `app/api/contact/route.ts` → Resend (`lib/resend.ts`). The real key lives in `.env.local` (gitignored); `.env.example` holds only a placeholder.
- Header nav (`Navbar`/`MobileNav`) uses real page links (`/about`, `/services`, `/contact`) — no scroll-anchor menu items.
