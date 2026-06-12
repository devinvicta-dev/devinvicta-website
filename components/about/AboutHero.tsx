'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations/easing'
import Navbar from '@/components/layout/Navbar'

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')
  const bigOuterRef = useRef<HTMLDivElement>(null)
  const bigInnerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('#di-line-1 .di-hero-letter, #di-line-2 .di-hero-letter', { y: 0, opacity: 1 })
        gsap.set('.di-hero-big-wrap', { opacity: 1, y: 0 })
        if (bigOuterRef.current)
          gsap.set(bigOuterRef.current, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: '1.25rem',
          })
        if (bigInnerRef.current) gsap.set(bigInnerRef.current, { scaleX: 1, scaleY: 1 })
        return
      }

      gsap.set('#di-line-1 .di-hero-letter, #di-line-2 .di-hero-letter', { y: 20, opacity: 0 })

      if (bigOuterRef.current)
        gsap.set(bigOuterRef.current, {
          x: '-6.985rem',
          y: '-14.342rem',
          scaleX: 0.66,
          scaleY: 0.686,
          borderRadius: '0rem', // square at the start; rounds in as it scrolls
        })
      if (bigInnerRef.current) gsap.set(bigInnerRef.current, { scaleX: 1.637, scaleY: 1.637 })

      gsap.set('.di-hero-big-wrap', { opacity: 0, y: 50 })

      const heroTL = gsap.timeline({ delay: 0.2 })
      heroTL
        .to('#di-line-1 .di-hero-letter', {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.035,
        })
        .to(
          '#di-line-2 .di-hero-letter',
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.035 },
          '-=0.78'
        )
        .to('.di-hero-big-wrap', { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, '-=0.5')

      if (bigOuterRef.current && bigInnerRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700',
          scrub: 1.8,
          onUpdate(self) {
            const p = self.progress
            const tx = -6.985 * (1 - p)
            const ty = -14.342 * (1 - p)
            const sx = 0.66 + (1 - 0.66) * p
            const sy = 0.686 + (1 - 0.686) * p
            const si = 1.637 + (1 - 1.637) * p
            if (bigOuterRef.current)
              gsap.set(bigOuterRef.current, {
                x: `${tx}rem`,
                y: `${ty}rem`,
                scaleX: sx,
                scaleY: sy,
                borderRadius: `${(1.25 * p).toFixed(3)}rem`, // 0 → 1.25rem across the scroll
              })
            if (bigInnerRef.current) gsap.set(bigInnerRef.current, { scaleX: si, scaleY: si })
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      className="di-hero relative overflow-hidden bg-ivory"
      aria-labelledby="about-hero-title"
      ref={sectionRef}
    >
      <Navbar light />
      <h1 id="about-hero-title" className="sr-only">
        {t('hero.srTitle')}
      </h1>
      <div className="relative flex flex-col items-center px-8 pt-64 pb-80 max-w-330 mx-auto">
        <div className="relative flex flex-col items-center" id="di-text-wrap">
          {/* Title — letters mapped from translations so the headline localizes
              while keeping the per-letter reveal animation (line 2 is the brand). */}
          <div
            className="di-hero-line flex flex-row items-start mix-blend-difference"
            id="di-line-1"
          >
            {t('hero.line1')
              .split('')
              .map((ch, i) => (
                <div
                  key={i}
                  className="di-hero-letter block text-5xl md:text-[6.25rem] lg:text-[9.375rem] font-semibold leading-tight md:leading-25 lg:leading-37.5 tracking-[-1.5px] md:tracking-[-4px] lg:tracking-[-6.4px] text-white [will-change:transform]"
                >
                  {ch}
                </div>
              ))}
          </div>
          <div
            className="di-hero-line flex flex-row items-start mix-blend-difference"
            id="di-line-2"
          >
            {t('hero.line2')
              .split('')
              .map((ch, i) => (
                <div
                  key={i}
                  className="di-hero-letter block text-5xl md:text-[6.25rem] lg:text-[9.375rem] font-semibold leading-tight md:leading-25 lg:leading-37.5 tracking-[-1.5px] md:tracking-[-4px] lg:tracking-[-6.4px] text-white [will-change:transform]"
                >
                  {ch}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Big image */}
      <div className="di-hero-big-wrap relative w-full px-5 md:px-8 overflow-hidden">
        <div
          className="di-hero-big-outer relative w-full h-150 overflow-hidden origin-center [will-change:transform]"
          id="di-big-outer"
          ref={bigOuterRef}
        >
          <div
            className="di-hero-big-inner absolute inset-0 [will-change:transform]"
            id="di-big-inner"
            ref={bigInnerRef}
          >
            <div
              className="di-hero-big-bg w-full h-full bg-cover bg-center bg-no-repeat [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=1600&h=900&fit=crop&q=85')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
