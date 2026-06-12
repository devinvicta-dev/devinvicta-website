'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

const SERVICE_KEYS = ['ai', 'web', 'mobile', 'cloud', 'design', 'automation'] as const

export default function ServicesDarkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.services-dark-item').forEach((el) => {
        gsap.set(el, { x: -22, opacity: 0 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          end: 'bottom 8%',
          onEnter: () =>
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              force3D: true,
              overwrite: true,
            }),
          onLeave: () =>
            gsap.to(el, {
              x: -12,
              opacity: 0,
              duration: 0.38,
              ease: 'power2.in',
              force3D: true,
              overwrite: true,
            }),
          onEnterBack: () =>
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              force3D: true,
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(el, {
              x: -22,
              opacity: 0,
              duration: 0.38,
              ease: 'power2.in',
              force3D: true,
              overwrite: true,
            }),
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section className="bg-black py-14 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-page px-5 md:px-8">
        <ul className="list-none p-0 m-0">
          {SERVICE_KEYS.map((key, i) => (
            <li
              key={key}
              className="services-dark-item flex items-center justify-between py-7 border-b border-white/[0.08] first:border-t cursor-default transition-opacity duration-200 hover:opacity-65"
            >
              <div className="flex items-center gap-8">
                <span className="text-[0.7rem] font-bold tracking-[0.08em] text-white/30 min-w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white leading-none">
                  {t(`servicesDark.items.${key}.title`)}
                </span>
              </div>
              <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-white/30">
                {t(`servicesDark.items.${key}.tag`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
