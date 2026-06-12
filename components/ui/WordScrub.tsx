'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations/easing'

interface WordScrubProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  scrubSpeed?: number
}

export default function WordScrub({
  children,
  className,
  as: Tag = 'h2',
  scrubSpeed = 1.2,
}: WordScrubProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const el = ref.current!

      // Server HTML renders the children fully visible, so there is never a
      // flash of hidden/dimmed text. Skip the scrub entirely when the user
      // prefers reduced motion or is on a touch device (the scroll-scrub is a
      // desktop nicety and is GPU/scroll-jank-heavy on phones).
      const lite =
        prefersReducedMotion() ||
        (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
      if (lite) return

      const text = el.textContent?.trim() ?? ''
      if (!text) return
      const words = text.split(/\s+/)

      // Split into per-word spans once, cheaply, via a single fragment write.
      const frag = document.createDocumentFragment()
      words.forEach((word, i) => {
        const span = document.createElement('span')
        span.className = 'scrub-word'
        span.style.willChange = 'opacity'
        span.textContent = word
        frag.appendChild(span)
        if (i < words.length - 1) frag.appendChild(document.createTextNode(' '))
      })
      el.textContent = ''
      el.appendChild(frag)

      const wordSpans = el.querySelectorAll('.scrub-word')
      gsap.set(wordSpans, { opacity: 0.12 })
      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end: 'bottom 30%',
          scrub: scrubSpeed,
        },
      })

      // useGSAP auto-reverts tweens/ScrollTriggers created in this scope on
      // unmount/re-run; restore the original text so the next render is clean.
      return () => {
        el.textContent = text
      }
    },
    { scope: ref, dependencies: [scrubSpeed] }
  )

  const Component = Tag as React.ElementType
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
