'use client'

import { type RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { SCRUB_EASE, prefersReducedMotion } from './easing'

/**
 * Reusable GSAP motion hooks mirroring Vertora's Webflow IX2 interactions.
 * All hooks are scoped to a container ref and no-op under reduced-motion.
 */

/**
 * Mouse-move parallax (Webflow MOUSE_MOVE). Translates each matched target by a
 * fraction of the pointer offset from the container centre. Vertora amplitudes
 * are roughly ±50px X / ±20px Y for hero/portfolio imagery.
 */
export function useMouseParallax(
  scope: RefObject<HTMLElement | null>,
  targetSelector: string,
  strengthX = 50,
  strengthY = 20
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = scope.current
      if (!el) return
      const targets = gsap.utils.toArray<HTMLElement>(targetSelector, el)
      if (!targets.length) return
      const setters = targets.map((t) => ({
        x: gsap.quickTo(t, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(t, 'y', { duration: 0.6, ease: 'power3.out' }),
      }))
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5 // -0.5..0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        setters.forEach((s) => {
          s.x(nx * strengthX)
          s.y(ny * strengthY)
        })
      }
      const onLeave = () =>
        setters.forEach((s) => {
          s.x(0)
          s.y(0)
        })
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope }
  )
}

/**
 * Scroll-scrubbed parallax drift (Webflow SCROLLING_IN_VIEW). Each item drifts
 * to its `y` offset as the trigger scrolls through the viewport.
 */
export function useScrubParallax(
  scope: RefObject<HTMLElement | null>,
  items: { selector: string; y: number }[],
  opts: { start?: string; end?: string } = {}
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = scope.current
      if (!el) return
      items.forEach(({ selector, y }) => {
        const target = el.querySelector(selector)
        if (!target) return
        gsap.to(target, {
          y,
          ease: SCRUB_EASE,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top bottom',
            end: opts.end ?? 'bottom top',
            scrub: 1,
          },
        })
      })
    },
    { scope }
  )
}

/**
 * Hover timeline helper (Webflow MOUSE_OVER/MOUSE_OUT). Builds a paused timeline
 * once and plays/reverses it on pointer enter/leave of the trigger element.
 */
export function useHoverTimeline(
  ref: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline, el: HTMLElement) => void
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      if (!el) return
      const tl = gsap.timeline({ paused: true })
      build(tl, el)
      const enter = () => tl.play()
      const leave = () => tl.reverse()
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        tl.kill()
      }
    },
    { scope: ref }
  )
}

/**
 * Pin a section and expose normalized scroll progress (Webflow sticky + scrub).
 * Disabled below `minWidth` (default 992px, Vertora's animation breakpoint) and
 * under reduced-motion — callers should render a static fallback there.
 */
export function usePinScrub(
  scope: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  opts: { endVh?: number; minWidth?: number } = {}
) {
  useGSAP(
    () => {
      const el = scope.current
      if (!el) return
      const minWidth = opts.minWidth ?? 992
      if (prefersReducedMotion() || window.innerWidth < minWidth) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${opts.endVh ?? 200}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => onProgress(self.progress),
      })
      return () => st.kill()
    },
    { scope }
  )
}
