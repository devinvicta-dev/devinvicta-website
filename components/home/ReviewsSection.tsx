'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import WordScrub from '@/components/ui/WordScrub'

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('home')

  useGSAP(
    () => {
      // Stat counter for bc-stat-number
      const statEl = sectionRef.current?.querySelector<HTMLElement>('.bc-stat-number[data-target]')
      if (statEl) {
        const suffix = statEl.dataset.suffix ?? ''
        statEl.textContent = '0' + suffix
        ScrollTrigger.create({
          trigger: statEl,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const target = Number(statEl.dataset.target)
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate() {
                statEl.textContent = Math.round(obj.val) + suffix
              },
            })
          },
        })
      }

      // Bento cell entrance
      const bentoCells = gsap.utils.toArray<HTMLElement>('.bento-cell')
      if (!bentoCells.length) return

      gsap.set(bentoCells, { y: 40, opacity: 0, scale: 0.96 })
      ScrollTrigger.create({
        trigger: '.bento-grid',
        start: 'top 85%',
        end: 'bottom 8%',
        onEnter: () =>
          gsap.to(bentoCells, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.09,
            ease: 'power3.out',
            force3D: true,
            overwrite: true,
          }),
        onLeave: () =>
          gsap.to(bentoCells, {
            y: -20,
            opacity: 0,
            scale: 0.96,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in',
            force3D: true,
            overwrite: true,
          }),
        onEnterBack: () =>
          gsap.to(bentoCells, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
            force3D: true,
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(bentoCells, {
            y: 40,
            opacity: 0,
            scale: 0.96,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in',
            force3D: true,
            overwrite: true,
          }),
      })
    },
    { scope: sectionRef }
  )

  const starPath =
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

  return (
    <section
      className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:22px_22px] pt-14 md:pt-28"
      id="reviews"
      ref={sectionRef}
    >
      {/* Marquee */}
      <div className="overflow-hidden bg-white py-12">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-[1.875rem] whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="contents">
              <span className="text-[clamp(2.15rem,10vw,9.3rem)] font-semibold leading-[0.9] tracking-[-0.044em] text-black">
                {t('reviews.marquee')}
              </span>
              <span className="text-blue">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Reviews body */}
      <div className="pt-14 md:pt-28">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <div className="bento-grid grid grid-cols-1 grid-rows-[auto] gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
            {/* Headline cell */}
            <div className="bento-cell relative order-1 flex min-h-[11rem] flex-col justify-end overflow-hidden rounded-panel bg-white px-[3.0625rem] py-10 before:pointer-events-none before:absolute before:-top-6 before:left-6 before:font-serif before:text-[12rem] before:font-bold before:leading-none before:text-black/5 before:content-['\22'] min-[600px]:order-none min-[600px]:col-span-2 min-[600px]:col-start-1 min-[600px]:row-start-1 min-[900px]:col-start-1 min-[900px]:row-start-1">
              <WordScrub
                as="h2"
                className="relative z-[1] max-w-[32rem] text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-[1.3] tracking-[-0.03em] text-black"
              >
                {t('reviews.headline')}
              </WordScrub>
            </div>

            {/* Stat cell */}
            <div className="bento-cell order-2 flex flex-col justify-between gap-4 rounded-panel bg-black p-[1.875rem] min-[600px]:order-none min-[600px]:col-start-1 min-[600px]:row-start-2 min-[900px]:col-start-3 min-[900px]:row-start-1 min-[900px]:row-span-2">
              <div>
                <p
                  className="bc-stat-number text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.05em] text-white"
                  data-target="98"
                  data-suffix="%"
                >
                  0%
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.05em] text-white/50">
                  {t('reviews.satisfaction')}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}
                >
                  {t('reviews.also')}
                </p>
                <p
                  style={{
                    fontSize: 'var(--fs-h4)',
                    fontWeight: 700,
                    color: 'var(--white)',
                    lineHeight: 1.1,
                  }}
                >
                  50+
                  <br />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {t('reviews.projectsDelivered')}
                  </span>
                </p>
              </div>
              <div className="mt-auto flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-3.5 w-3.5 fill-[#ffc554] text-[#ffc554]"
                    viewBox="0 0 24 24"
                  >
                    <path d={starPath} />
                  </svg>
                ))}
              </div>
            </div>

            {/* Flossie card */}
            <div className="bento-cell order-3 flex flex-col gap-[0.875rem] rounded-panel bg-white p-[1.875rem] min-[600px]:order-none min-[600px]:col-start-2 min-[600px]:row-start-2 min-[900px]:col-start-1 min-[900px]:row-start-2">
              <div className="mb-1 font-serif text-5xl font-bold leading-[0.8] text-black/[0.12]">
                &ldquo;
              </div>
              <p className="flex-1 text-[clamp(0.875rem,1.3vw,1.05rem)] leading-[1.65] text-dark-gray">
                {t('reviews.items.fintech.quote')}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {t('reviews.items.fintech.name')}
                  </p>
                  <p className="text-xs text-dark-gray">{t('reviews.items.fintech.meta')}</p>
                </div>
              </div>
            </div>

            {/* Davis card */}
            <div className="bento-cell order-4 flex flex-col gap-[0.875rem] rounded-panel bg-black p-[1.875rem] min-[600px]:order-none min-[600px]:col-start-1 min-[600px]:row-start-3 min-[900px]:col-start-2 min-[900px]:row-start-2">
              <div className="mb-1 font-serif text-5xl font-bold leading-[0.8] text-white/20">
                &ldquo;
              </div>
              <p className="flex-1 text-[clamp(0.875rem,1.3vw,1.05rem)] leading-[1.65] text-white/85">
                {t('reviews.items.europacolon.quote')}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t('reviews.items.europacolon.name')}
                  </p>
                  <p className="text-xs text-white/55">{t('reviews.items.europacolon.meta')}</p>
                </div>
              </div>
            </div>

            {/* Lincoln featured card (blue, wide) */}
            <div className="bento-cell order-6 flex flex-col gap-4 rounded-panel bg-blue p-[2.5rem] min-[600px]:order-none min-[600px]:col-span-2 min-[600px]:col-start-1 min-[600px]:row-start-4 min-[900px]:col-span-2 min-[900px]:col-start-1 min-[900px]:row-start-3">
              <div className="mb-1 font-serif text-5xl font-bold leading-[0.8] text-white/25">
                &ldquo;
              </div>
              <p className="flex-1 text-[clamp(1rem,1.6vw,1.25rem)] font-medium leading-[1.65] text-white/85">
                {t('reviews.items.insurance.quote')}
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-white/15 pt-5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t('reviews.items.insurance.name')}
                  </p>
                  <p className="text-xs text-white/55">{t('reviews.items.insurance.meta')}</p>
                </div>
              </div>
            </div>

            {/* Aggy card */}
            <div className="bento-cell order-5 flex flex-col gap-[0.875rem] rounded-panel bg-white p-[1.875rem] min-[600px]:order-none min-[600px]:col-start-2 min-[600px]:row-start-3 min-[900px]:col-start-3 min-[900px]:row-start-3">
              <div className="mb-1 font-serif text-5xl font-bold leading-[0.8] text-black/[0.12]">
                &ldquo;
              </div>
              <p className="flex-1 text-[clamp(0.875rem,1.3vw,1.05rem)] leading-[1.65] text-dark-gray">
                {t('reviews.items.vmoove.quote')}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {t('reviews.items.vmoove.name')}
                  </p>
                  <p className="text-xs text-dark-gray">{t('reviews.items.vmoove.meta')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
