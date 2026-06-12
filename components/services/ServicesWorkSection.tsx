'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'
import SlideButton from '@/components/ui/SlideButton'
import { cn } from '@/lib/utils'

// The image only ever renders in a ~320px-wide card, so a 640px source covers
// 2x DPR while keeping each remote request small. q=55 is plenty for the
// grayscale-filtered display and trims payload across the 9 case studies.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=55`

type CaseStudy = {
  num: string
  key: string
  href?: string
  image: string
}

// The 9 real case studies surfaced as expanding rows. Display copy lives in the
// `services` locale namespace (services.work.cases.<key>). This list keeps only
// the locale-independent structure: ordering, image, link and confidential flag.
const CASES: CaseStudy[] = [
  {
    num: '01',
    key: 'europacolon',
    href: 'https://www.europacolon.pt/home',
    image: '/assets/work/europacolon.png',
  },
  { num: '02', key: 'fintech', image: img('1620503374956-c942862f0372') },
  { num: '03', key: 'ecommerce', image: img('1594332495179-d979bcd18142') },
  { num: '04', key: 'fraud', image: img('1556388275-bb5585725aca') },
  { num: '05', key: 'insurance', image: img('1625948085447-2881572802ca') },
  {
    num: '06',
    key: 'vmoove',
    href: 'https://vmoovetransfers.com',
    image: '/assets/work/vmoove.png',
  },
  { num: '07', key: 'manufacturing', image: img('1608424371207-ab70d9d68e80') },
  { num: '08', key: 'maritime', image: img('1523251836828-b75d28b89804') },
  { num: '09', key: 'automotive', image: img('1536405416754-3bcd4fb38128') },
]

export default function ServicesWorkSection() {
  const [active, setActive] = useState(0)
  const t = useTranslations('services')

  return (
    <section className="bg-transparent px-5 py-14 md:px-8 md:py-28">
      <div className="mx-auto max-w-page">
        {/* header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-24">
          <WordScrub className="text-h2 leading-[1.15] font-semibold tracking-[-0.04em] text-black">
            {t('work.headline')}
          </WordScrub>
          <div data-anim className="flex flex-col items-start gap-6 lg:pt-2">
            <p className="max-w-md text-body leading-[1.7] text-dark-gray">{t('work.body')}</p>
            <SlideButton href="/contact" text={t('work.cta')} className="w-fit" />
          </div>
        </div>

        {/* case studies — hovering a row expands it into a tall black panel with
            the image and the challenge → solution → result detail revealed */}
        <div className="mt-12 flex flex-col gap-4 md:mt-16">
          {CASES.map((item, i) => {
            const isActive = active === i
            const client = t(`work.cases.${item.key}.client`)
            const result = t(`work.cases.${item.key}.result`)

            const inner = (
              <div
                className={cn(
                  'flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10',
                  isActive && 'lg:min-h-[300px]'
                )}
              >
                {/* info */}
                <div className="flex items-baseline gap-4 sm:gap-6 lg:w-[40%] lg:shrink-0">
                  <span
                    className={cn(
                      'text-sub font-semibold',
                      isActive ? 'text-white/40' : 'text-black/40'
                    )}
                  >
                    ({item.num})
                  </span>
                  <div>
                    <h3
                      className={cn(
                        'text-h3 font-semibold tracking-[-0.03em]',
                        isActive ? 'text-white' : 'text-black'
                      )}
                    >
                      {client}
                    </h3>
                    <p
                      className={cn(
                        'mt-2 max-w-md text-sub leading-[1.5]',
                        isActive ? 'text-white/60' : 'text-dark-gray'
                      )}
                    >
                      {result}
                    </p>
                  </div>
                </div>

                {/* centered image — always mounted (preloaded) so switching
                    rows never flashes; hidden unless this row is active */}
                <div
                  className={cn(
                    'relative aspect-[300/208] w-full overflow-hidden rounded-card lg:w-[22%]',
                    !isActive && 'hidden'
                  )}
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

                {/* solution detail — only when active */}
                <div className={cn('flex w-full flex-col gap-3 lg:w-[30%]', !isActive && 'hidden')}>
                  <div>
                    <span className="text-sub font-semibold tracking-[0.06em] text-white/40 uppercase">
                      {t('work.solutionLabel')}
                    </span>
                    <p className="mt-1 text-sub leading-[1.5] text-white/70">
                      {t(`work.cases.${item.key}.solution`)}
                    </p>
                  </div>
                  {item.href ? (
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
            )

            const padding = isActive ? 'px-6 py-5 md:px-12 md:py-6' : 'px-2 py-7 md:py-9'
            const surface = isActive
              ? 'rounded-panel bg-black'
              : 'border-b border-black/10 bg-transparent'

            return (
              <div
                key={item.num}
                data-anim
                onMouseEnter={() => setActive(i)}
                className={cn('transition-colors duration-500', surface)}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn('block', padding)}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={padding}>{inner}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
