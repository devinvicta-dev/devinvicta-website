'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'
import SlideButton from '@/components/ui/SlideButton'
import { cn } from '@/lib/utils'

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=55`

type CaseStudy = {
  num: string
  key: string
  slug?: string
  image: string
}

const CASES: CaseStudy[] = [
  { num: '01', key: 'europacolon', slug: 'europacolon', image: '/assets/work/europacolon.png' },
  { num: '02', key: 'fintech', image: img('1620503374956-c942862f0372') },
  { num: '03', key: 'ecommerce', slug: 'ecommerce', image: img('1594332495179-d979bcd18142') },
  { num: '04', key: 'fraud', slug: 'fraud', image: img('1556388275-bb5585725aca') },
  { num: '05', key: 'insurance', slug: 'insurance', image: img('1625948085447-2881572802ca') },
  { num: '06', key: 'vmoove', slug: 'vmoove', image: '/assets/work/vmoove.png' },
  {
    num: '07',
    key: 'manufacturing',
    slug: 'manufacturing',
    image: img('1608424371207-ab70d9d68e80'),
  },
  { num: '08', key: 'maritime', slug: 'maritime', image: img('1523251836828-b75d28b89804') },
  { num: '09', key: 'automotive', slug: 'automotive', image: img('1536405416754-3bcd4fb38128') },
]

export default function ServicesWorkSection() {
  const [active, setActive] = useState(0)
  const t = useTranslations('services')

  return (
    <section className="bg-transparent px-5 py-14 md:px-8 md:py-28">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-24">
          <WordScrub className="text-h2 leading-[1.15] font-semibold tracking-[-0.04em] text-black">
            {t('work.headline')}
          </WordScrub>
          <div data-anim className="flex flex-col items-start gap-6 lg:pt-2">
            <p className="max-w-md text-body leading-[1.7] text-dark-gray">{t('work.body')}</p>
            <SlideButton href="/contact" text={t('work.cta')} className="w-fit" />
          </div>
        </div>

        <div className="mt-12 flex flex-col md:mt-16">
          {CASES.map((item, i) => {
            const isActive = active === i
            const client = t(`work.cases.${item.key}.client`)
            const result = t(`work.cases.${item.key}.result`)

            const surface = isActive
              ? 'rounded-panel bg-black'
              : 'border-b border-black/10 bg-transparent'
            const padding = isActive ? 'px-6 py-5 md:px-12 md:py-6' : 'px-2 py-7 md:py-9'

            const rowContent = (
              <div className={cn('block', padding)}>
                {/* always-visible header row */}
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span
                    className={cn(
                      'text-sub font-semibold shrink-0',
                      isActive ? 'text-white/40' : 'text-black/40'
                    )}
                  >
                    ({item.num})
                  </span>
                  <h3
                    className={cn(
                      'text-h3 font-semibold tracking-[-0.03em]',
                      isActive ? 'text-white' : 'text-black'
                    )}
                  >
                    {client}
                  </h3>
                </div>

                {/* expandable panel — grid-template-rows trick for smooth height */}
                <div
                  className="grid [transition:grid-template-rows_0.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-6 pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                      {/* result text */}
                      <p
                        className={cn(
                          'max-w-md text-sub leading-[1.5] lg:w-[40%] lg:shrink-0',
                          isActive ? 'text-white/60' : 'text-dark-gray'
                        )}
                      >
                        {result}
                      </p>

                      {/* image */}
                      <div
                        className="relative aspect-[300/208] w-full overflow-hidden rounded-card lg:w-[22%] [transition:opacity_0.3s_0.15s,transform_0.3s_0.15s] lg:[transition:opacity_0.4s_0.2s,transform_0.4s_0.2s]"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={client}
                          fill
                          sizes="(max-width: 1024px) 100vw, 320px"
                          className={cn(
                            'object-cover',
                            (item.key === 'europacolon' || item.key === 'vmoove') && 'object-top'
                          )}
                        />
                      </div>

                      {/* solution detail */}
                      <div
                        className="flex w-full flex-col gap-3 lg:w-[30%] [transition:opacity_0.3s_0.2s,transform_0.3s_0.2s]"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                        }}
                      >
                        <div>
                          <span className="text-sub font-semibold tracking-[0.06em] text-white/40 uppercase">
                            {t('work.solutionLabel')}
                          </span>
                          <p className="mt-1 text-sub leading-[1.5] text-white/70">
                            {t(`work.cases.${item.key}.solution`)}
                          </p>
                        </div>
                        {item.slug ? (
                          <span className="mt-1 flex items-center gap-1.5 text-sub font-semibold text-white">
                            {t('work.visitProject')}
                            <span aria-hidden>↗</span>
                          </span>
                        ) : (
                          <span className="mt-1 text-sub font-medium text-white/40">
                            {t('work.confidential')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )

            return (
              <div
                key={item.num}
                data-anim
                onMouseEnter={() => setActive(i)}
                className={cn('[transition:background-color_0.5s,border-radius_0.5s]', surface)}
              >
                {item.slug ? (
                  <Link href={`/projects/${item.slug}`} className="block">
                    {rowContent}
                  </Link>
                ) : (
                  rowContent
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
