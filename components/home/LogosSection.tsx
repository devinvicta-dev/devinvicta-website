'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { REVEAL_EASE, prefersReducedMotion } from '@/lib/animations/easing'
import WordScrub from '@/components/ui/WordScrub'
import { Badge } from '@/components/ui/badge'

const DIFFERENTIATOR_KEYS = ['compliance', 'pricing', 'engineering', 'bespoke'] as const

export default function LogosSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('home')

  useGSAP(
    () => {
      const cards = gridRef.current!.querySelectorAll('[data-card]')
      if (!cards.length) return
      if (prefersReducedMotion()) {
        gsap.set(cards, { clearProps: 'all' })
        return
      }

      // Dedicated staggered entrance — fires later than the global reveal so the
      // cards visibly rise in sequence as the row reaches the viewport.
      gsap.set(cards, { y: 48, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: REVEAL_EASE,
        stagger: 0.12,
        force3D: true,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
      })
      ScrollTrigger.refresh()
    },
    { scope: gridRef, dependencies: [] }
  )

  return (
    <section className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:22px_22px] pt-14 md:pt-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:mb-[5.625rem] md:flex-row md:items-start md:justify-between md:gap-[1.875rem]">
          <Badge
            variant="outline"
            data-anim=""
            className="h-auto bg-white px-3 py-1 text-sm font-semibold tracking-[0.0675rem] text-gray uppercase"
          >
            {t('differentiators.badge')}
          </Badge>
          <WordScrub className="max-w-[42rem] text-[clamp(1.5625rem,3.5vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black md:ml-auto">
            {t('differentiators.headline')}
          </WordScrub>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4"
        >
          {DIFFERENTIATOR_KEYS.map((key, i) => (
            <article
              key={key}
              data-card=""
              className="rounded-card bg-white p-[1.875rem] shadow-[0_2px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-[1.875rem] flex items-center justify-between">
                <p className="text-[0.875rem] leading-[1.625] text-dark-gray">
                  {t(`differentiators.items.${key}.label`)}
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <h3 className="mb-3 text-[1.2rem] font-semibold leading-[1.33] tracking-[-0.03em] text-black">
                {t(`differentiators.items.${key}.title`)}
              </h3>
              <p className="text-[0.875rem] leading-[1.625] text-dark-gray">
                {t(`differentiators.items.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
