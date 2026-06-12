'use client'

import { Fragment, useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { SWING_TO } from '@/lib/animations/easing'
import { useScrubParallax } from '@/lib/animations/hooks'
import Navbar from '@/components/layout/Navbar'
import { Separator } from '@/components/ui/separator'
import type { Service } from '@/lib/services'

/**
 * Service-detail hero — a large dark banner (the service's image) with the title
 * overlaid at the bottom-left. The navbar sits separated above the panel on the
 * light background (not overlaid on the image). A meta row follows below.
 */
export default function ServiceDetailHero({ service }: { service: Service }) {
  const sectionRef = useRef<HTMLElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  const words = service.title.split(' ')

  useGSAP(
    () => {
      // a-66 "Text reveal" — title letters slide up with swingTo stagger
      gsap.fromTo(
        '.svc-detail-letter',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: SWING_TO, stagger: 0.04 }
      )
      // banner image fades + settles in (no filter, so the global B&W stays applied)
      gsap.fromTo(
        '.svc-detail-banner-img',
        { autoAlpha: 0, scale: 1.18 },
        { autoAlpha: 1, scale: 1.12, duration: 0.9, ease: 'power2.out' }
      )
    },
    { scope: sectionRef }
  )

  // gentle scroll-scrubbed drift on the banner image
  useScrubParallax(bannerRef, [{ selector: '.svc-detail-banner-img', y: -32 }], {
    start: 'top top',
    end: 'bottom top',
  })

  return (
    <section ref={sectionRef} className="relative bg-transparent">
      {/* menu separated above the hero, on the light background */}
      <Navbar light />
      <div className="px-3 pt-24 pb-0 sm:px-5 md:px-8 md:pt-28">
        <div
          ref={bannerRef}
          className="relative flex h-[80vh] min-h-[460px] items-end overflow-hidden rounded-panel bg-black"
        >
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="svc-detail-banner-img scale-[1.12] object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
          />
          <div className="relative z-10 w-full px-6 pb-10 md:px-12 md:pb-14">
            <h1 className="text-h1 leading-[0.95] font-semibold tracking-[-0.044em] text-white">
              {words.map((word, wi) => (
                <Fragment key={wi}>
                  {/* keep each word intact; allow line breaks only between words */}
                  <span className="inline-block align-bottom whitespace-nowrap">
                    {[...word].map((l, i) => (
                      <span key={i} className="inline-block overflow-hidden align-bottom">
                        <span className="svc-detail-letter inline-block">{l}</span>
                      </span>
                    ))}
                  </span>
                  {wi < words.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* meta row */}
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 gap-3 py-6 text-sub font-medium tracking-[0.08em] text-dark-gray uppercase sm:grid-cols-3">
          <span data-anim>Service details</span>
          <span data-anim className="sm:text-center">
            {service.years}
          </span>
          <span data-anim className="sm:text-right">
            Projects by years
          </span>
        </div>
        <Separator className="bg-black/10" />
      </div>
    </section>
  )
}
