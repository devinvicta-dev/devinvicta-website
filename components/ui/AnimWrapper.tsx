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

      // Reveal once: rise from y40 + scale 0.97 → settle, on scroll-in.
      // No leave/back handlers, so content stays visible once revealed and never
      // disappears while scrolling.
      gsap.set(items, { y: 40, opacity: 0, scale: 0.97, force3D: true })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            scale: 1,
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
