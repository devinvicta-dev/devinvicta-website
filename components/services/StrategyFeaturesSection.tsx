'use client'

import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'
import { Separator } from '@/components/ui/separator'
import StrategyFeatureCard from '@/components/services/StrategyFeatureCard'

const FEATURES = [
  { key: 'excellence', icon: '/icons/icon-excellence.png' },
  { key: 'compliance', icon: '/icons/icon-compliance.png' },
  { key: 'endToEnd', icon: '/icons/icon-delivery.png' },
] as const

export default function StrategyFeaturesSection() {
  const t = useTranslations('services')
  return (
    <section className="bg-transparent py-14 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <WordScrub className="mx-auto max-w-3xl text-center text-h2 leading-[1.25] font-semibold tracking-[-0.075rem] text-black">
          {t('strategy.headline')}
        </WordScrub>

        <Separator className="mt-16 bg-black/10" />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <StrategyFeatureCard
              key={f.key}
              feature={f}
              index={i}
              withDivider={i < FEATURES.length - 1}
            />
          ))}
        </div>

        {/* Trust pill */}
        <div
          data-anim
          className="mx-auto mt-14 flex max-w-3xl items-center gap-4 rounded-pill bg-black/[0.04] px-3 py-3 md:px-4"
        >
          <span className="shrink-0 rounded-pill bg-black px-4 py-2 text-sub font-bold tracking-[0.0675rem] text-white uppercase">
            {t('strategy.trustLabel')}
          </span>
          <p className="flex-1 text-body text-dark-gray">{t('strategy.trustText')}</p>
          <span className="mr-1 shrink-0 text-lg text-black" aria-hidden>
            →
          </span>
        </div>
      </div>
    </section>
  )
}
