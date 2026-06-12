'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { SWING_TO } from '@/lib/animations/easing'
import { useMouseParallax, useScrubParallax } from '@/lib/animations/hooks'
import Navbar from '@/components/layout/Navbar'
import { cn } from '@/lib/utils'

const HERO_IMAGES = [
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932ac58f54bfef16ed1ec4d_vertora-service-hero-image-one.webp',
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932ac58d9196fcd41fc42db_vertora-service-hero-image-two.webp',
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932ac58b7502585152a95af_vertora-service-hero-image-three.webp',
]

const LETTERS = 'Service'.split('')

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
      <div className="mx-auto max-w-page px-5 pt-section-hero-pt pb-20 md:px-8">
        {/* top row: title + subhead */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h1
            id="services-hero-title"
            className="text-h1 leading-[0.9] font-semibold tracking-[-0.044em] text-black"
          >
            {LETTERS.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="svc-hero-letter inline-block">{l}</span>
              </span>
            ))}
          </h1>
          <div className="flex max-w-sm flex-col items-start gap-7 lg:pt-6">
            <p className="text-body leading-[1.625] text-dark-gray">
              We provide digital solutions to boost your brand’s online presence, from web design to
              branding and content creation, all tailored to your business needs.
            </p>
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
