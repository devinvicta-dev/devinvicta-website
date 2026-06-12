'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/gsap'
import { SWING_TO } from '@/lib/animations/easing'
import { useMouseParallax, useScrubParallax } from '@/lib/animations/hooks'
import Navbar from '@/components/layout/Navbar'
import BookACallButton from '@/components/ui/BookACallButton'
import { cn } from '@/lib/utils'

// Abstract, material craft imagery (rendered B&W) — flowing silk, sculptural
// stone and faceted plaster: "bespoke / crafted / one-of-a-kind" via form, not people.
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1617238749996-ab4c0f9fba57?w=900&h=1200&fit=crop&q=85',
  'https://images.unsplash.com/photo-1667400104789-f50a4cb393cf?w=900&h=1200&fit=crop&q=85',
  'https://images.unsplash.com/photo-1604854574894-1be73ca43cb8?w=900&h=1200&fit=crop&q=85',
]

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('services')
  const tNav = useTranslations('nav')
  const letters = t('hero.title').split('')

  useGSAP(
    () => {
      // a-66 "Text reveal" — letters slide up from below with swingTo stagger
      gsap.fromTo(
        '.svc-hero-letter',
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.0,
          ease: SWING_TO,
          stagger: 0.08,
        }
      )

      // a-11/12/13 "Slide from bottom" — 3 hero cards rise with blur + opacity stagger
      gsap.fromTo(
        '.svc-hero-card',
        { y: '3.14rem', autoAlpha: 0, filter: 'blur(8px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.2,
        }
      )
    },
    { scope: sectionRef }
  )

  // Subtle scroll-scrubbed parallax drift on the inner image of each card so it
  // does not fight the card entrance transform. Drift kept small (Vertora-like).
  useScrubParallax(
    cardsRef,
    [
      { selector: '.svc-hero-img-0', y: -8.5 },
      { selector: '.svc-hero-img-1', y: -8.5 },
      { selector: '.svc-hero-img-2', y: -4.5 },
    ],
    { start: 'top bottom', end: 'bottom top' }
  )

  // Subtle mouse-follow parallax on the hero imagery (Webflow MOUSE_MOVE).
  useMouseParallax(cardsRef, '.svc-hero-card', 30, 15)

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-hero-title"
      className="relative overflow-hidden bg-transparent"
    >
      <Navbar light />
      <div className="mx-auto max-w-page px-5 pt-24 md:pt-28 pb-20 md:px-8">
        {/* top row: title + subhead */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h1
            id="services-hero-title"
            className="text-h1 leading-[0.9] font-semibold tracking-[-0.044em] text-black"
          >
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="svc-hero-letter inline-block">{l}</span>
              </span>
            ))}
          </h1>
          <div className="flex max-w-sm flex-col items-start gap-7 lg:pt-6">
            <p className="text-body leading-[1.625] text-dark-gray">{t('hero.subhead')}</p>
            <BookACallButton variant="dark" label={tNav('cta')} />
          </div>
        </div>

        {/* 3 hero image cards — middle card is taller (4/5), outer cards 3/4 */}
        <div ref={cardsRef} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-20">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={i}
              className={cn(
                'svc-hero-card relative overflow-hidden rounded-panel',
                i === 1 ? 'sm:-mt-16' : i === 2 ? 'sm:mt-10' : ''
              )}
              style={{ aspectRatio: i === 1 ? '4 / 5' : '3 / 4' }}
            >
              <Image
                src={src}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 640px) 100vw, 33vw"
                className={`svc-hero-img-${i} h-full w-full scale-[1.06] object-cover`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
