'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion: skip Lenis (and its rAF loop) entirely so the
    // browser uses native scrolling. We still keep ScrollTrigger refreshes for
    // any scroll-driven reveals that remain.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = reduceMotion
      ? null
      : new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

    let rafCb: ((time: number) => void) | null = null
    if (lenis) {
      rafCb = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(rafCb)
      gsap.ticker.lagSmoothing(0)
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Debounced refresh — recompute ScrollTrigger start/end after layout shifts.
    let raf = 0
    const refresh = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const onLoad = () => refresh()
    window.addEventListener('load', onLoad)

    // next/image lazy-loads after init, shifting layout and breaking
    // scrub/pin start/end — refresh as each image finishes loading.
    const imgs = Array.from(document.querySelectorAll('img'))
    imgs.forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', refresh, { once: true })
      img.addEventListener('error', refresh, { once: true })
    })

    // Catch any other layout changes (fonts, dynamic content).
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)

    return () => {
      lenis?.destroy()
      if (rafCb) gsap.ticker.remove(rafCb)
      window.removeEventListener('load', onLoad)
      imgs.forEach((img) => {
        img.removeEventListener('load', refresh)
        img.removeEventListener('error', refresh)
      })
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <>{children}</>
}
