'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HOVER_EASE } from '@/lib/animations/easing'
import { useHoverTimeline } from '@/lib/animations/hooks'
import { cn } from '@/lib/utils'

export type StrategyFeature = {
  readonly key: string
  readonly icon: string
}

export default function StrategyFeatureCard({
  feature,
  index,
  withDivider,
}: {
  feature: StrategyFeature
  index: number
  withDivider: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('services')

  useHoverTimeline(cardRef, (tl, el) => {
    const icon = el.querySelector('[data-feature-icon]')
    if (icon) {
      tl.to(icon, { scale: 1.1, duration: 0.5, ease: HOVER_EASE }, 0)
    }
    tl.to(el, { backgroundColor: 'rgba(0,0,0,0.02)', duration: 0.5, ease: HOVER_EASE }, 0)
    el.addEventListener('mouseenter', () => tl.timeScale(1))
    el.addEventListener('mouseleave', () => tl.timeScale(1.25))
  })

  return (
    <div
      ref={cardRef}
      data-anim
      className={cn(
        'flex flex-col items-center gap-6 px-8 py-12 text-center md:py-16',
        withDivider && 'md:border-r md:border-black/10'
      )}
    >
      <span className="text-sub font-bold tracking-[0.12em] text-black/25 uppercase">
        {String(index + 1).padStart(2, '0')}
      </span>
      <Image
        data-feature-icon
        src={feature.icon}
        alt=""
        width={64}
        height={64}
        className="icon-color h-16 w-16 object-contain will-change-transform"
      />
      <h3 className="text-h4 font-semibold tracking-[-0.045rem] text-black">
        {t(`strategy.features.${feature.key}.title`)}
      </h3>
      <p className="max-w-xs text-body leading-[1.625] text-dark-gray">
        {t(`strategy.features.${feature.key}.body`)}
      </p>
    </div>
  )
}
