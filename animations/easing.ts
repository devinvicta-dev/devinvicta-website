/**
 * Webflow IX2 → GSAP easing/transform equivalents, derived from the live
 * Vertora interactions data (docs/vertora/vertora-ix2.json).
 */

// Vertora's generic SCROLL_INTO_VIEW reveal uses Webflow "ease"
export const REVEAL_EASE = 'power2.out'
// Hero letters use Webflow "swingTo"
export const SWING_TO = 'back.out(1)'
// Hover micro-interactions
export const HOVER_EASE = 'power2.out'
// Scroll-scrubbed motion is linear
export const SCRUB_EASE = 'none'

// Shared reveal definition (matches Vertora: y 50 / opacity / blur(6px))
export const REVEAL_FROM = { y: 50, autoAlpha: 0, filter: 'blur(6px)' }
export const REVEAL_TO = {
  y: 0,
  autoAlpha: 1,
  filter: 'blur(0px)',
  duration: 0.5,
  ease: REVEAL_EASE,
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
