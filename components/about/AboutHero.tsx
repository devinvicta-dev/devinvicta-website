'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import Navbar from '@/components/layout/Navbar'

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bigOuterRef = useRef<HTMLDivElement>(null)
  const bigInnerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set('#di-line-1 .di-hero-letter, #di-line-2 .di-hero-letter', { yPercent: 100 })

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
          yPercent: 0,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.035,
        })
        .to(
          '#di-line-2 .di-hero-letter',
          { yPercent: 0, duration: 1.0, ease: 'power3.out', stagger: 0.035 },
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
        About DevInvicta
      </h1>
      <div className="relative flex flex-col items-center px-8 pt-64 pb-80 max-w-[82.5rem] mx-auto">
        <div className="relative flex flex-col items-center" id="di-text-wrap">
          {/* Line 1: "About" */}
          <div className="di-hero-line flex flex-row items-start overflow-hidden" id="di-line-1">
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              A
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              b
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              o
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              u
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              t
            </div>
          </div>
          {/* Line 2: "DevInvicta" */}
          <div className="di-hero-line flex flex-row items-start overflow-hidden" id="di-line-2">
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              D
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              e
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              v
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              I
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              n
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              v
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              i
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              c
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              t
            </div>
            <div className="di-hero-letter block text-[150px] font-semibold leading-[150px] tracking-[-6.4px] mix-blend-difference text-white [will-change:transform]">
              a
            </div>
          </div>
        </div>
      </div>
      {/* Big image */}
      <div className="di-hero-big-wrap relative w-full px-5 md:px-8 overflow-hidden">
        <div
          className="di-hero-big-outer relative w-full h-[600px] overflow-hidden origin-center [will-change:transform]"
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
                  "url('https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=1600&h=900&fit=crop&q=85')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
