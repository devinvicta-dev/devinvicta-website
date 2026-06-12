'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations/easing'
import WordScrub from '@/components/ui/WordScrub'
import { milestones } from '@/data/milestones'

export default function MilestonesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('.milestone-row')
      if (!rows.length) return

      if (prefersReducedMotion()) {
        gsap.set(rows, { y: 0, opacity: 1 })
        return
      }

      gsap.set(rows, { y: 28, opacity: 0, force3D: true })

      function playIn() {
        gsap.to(rows, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          force3D: true,
          stagger: 0.22,
          overwrite: true,
        })
      }
      function playOut(reverse: boolean) {
        gsap.to(rows, {
          y: reverse ? 28 : -22,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          force3D: true,
          stagger: { each: 0.08, from: (reverse ? 'end' : 'start') as 'end' | 'start' },
          overwrite: true,
        })
      }

      ScrollTrigger.create({
        trigger: '.milestones-card',
        start: 'top 78%',
        end: 'bottom 8%',
        onEnter: playIn,
        onEnterBack: playIn,
        onLeave: () => playOut(false),
        onLeaveBack: () => playOut(true),
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:24px_24px] py-14 md:py-28 bg-ivory"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-6 md:gap-0 mb-12">
          <WordScrub className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.04em] text-black leading-[1.15] max-w-[30rem]">
            {t('milestones.headline')}
          </WordScrub>
        </div>
        <div className="milestones-card bg-white rounded-[1.25rem] overflow-hidden">
          <div className="w-full">
            {milestones.map((m, i) => (
              <div
                className="milestone-row flex items-center px-4 py-6 border-t border-black/10 last:border-b transition-colors duration-200 hover:bg-black/[0.03] [will-change:transform,opacity]"
                key={`${m.year}-${i}`}
              >
                <span className="text-dark-gray font-semibold text-[0.9375rem] w-32 flex-shrink-0">
                  {m.year}
                </span>
                <span className="flex-1 text-[0.9375rem] text-black font-semibold">
                  {t(`milestones.items.${m.key}.title`)}
                </span>
                <span className="text-dark-gray text-[0.9375rem] font-medium text-right">
                  {t(`milestones.items.${m.key}.description`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
