'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { REVEAL_EASE, prefersReducedMotion } from '@/lib/animations/easing'

interface AnimWrapperProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  /** reveal tuning (defaults match Vertora: y50 + blur(6px), 0.5s) */
  duration?: number
  stagger?: number
}

export default function AnimWrapper({
  children,
  className,
  as: Tag = 'div',
  duration = 0.5,
  stagger = 0.1,
}: AnimWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = ref.current!.querySelectorAll('[data-anim]')
      if (!items.length) return
      // Reduced motion: CSS forces [data-anim] visible; skip JS animation.
      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: 'all' })
        return
      }

      // On touch devices, animating filter:blur() during scroll is GPU-heavy and
      // makes scrolling feel laggy — drop the blur there and keep the cheap
      // y/opacity reveal. Desktop keeps the full Vertora blur reveal.
      const lite = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
      const blur = (px: number) => (lite ? {} : { filter: `blur(${px}px)` })

      // Reveal once: rise from y50 (+blur on desktop) → settle, on scroll-in.
      // No leave/back handlers, so content stays visible once revealed and never
      // disappears while scrolling.
      gsap.set(items, { y: 50, opacity: 0, ...blur(6) })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            ...blur(0),
            duration,
            ease: REVEAL_EASE,
            force3D: true,
            stagger,
            overwrite: true,
          }),
      })
    },
    { scope: ref, dependencies: [] }
  )

  const Component = Tag as React.ElementType
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
