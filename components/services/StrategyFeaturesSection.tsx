'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { HOVER_EASE } from '@/lib/animations/easing'
import { useHoverTimeline } from '@/lib/animations/hooks'
import WordScrub from '@/components/ui/WordScrub'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    icon: 'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932b6dab7502585152e35f3_abstract25g.webp',
    title: 'Technical excellence',
    body: 'A highly specialised team with real experience in complex software and production-ready AI solutions.',
    accentBlur: false,
  },
  {
    icon: 'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932b6c5b970ca55e688064a_a3926ce37a7ed5b42749159956143939_Rectangle%2048.webp',
    title: 'EU AI Act compliance',
    body: 'Full focus on the AI Act and European regulation, so your business stays legally safe from day one.',
    accentBlur: false,
  },
  {
    icon: 'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932b6c5959ada5418a725a8_351f78c359d0b8e7a55708c982f93c8a_Rectangle%2034.webp',
    title: 'End-to-end delivery',
    body: 'From architecture to deployment, we deliver complete solutions, including maintenance and continuous evolution.',
    accentBlur: false,
  },
]

function FeatureCard({
  feature,
  withDivider,
}: {
  feature: (typeof FEATURES)[number]
  withDivider: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // GSAP hover (replaces CSS group-hover): icon scale ~1.1 + subtle bg tint.
  // Timeline plays in at 0.5s; reversing at timeScale 1.25 yields ~0.4s out.
  useHoverTimeline(cardRef, (tl, el) => {
    const icon = el.querySelector('[data-feature-icon]')
    if (icon) {
      tl.to(icon, { scale: 1.1, duration: 0.5, ease: HOVER_EASE }, 0)
    }
    tl.to(el, { backgroundColor: 'rgba(0,0,0,0.03)', duration: 0.5, ease: HOVER_EASE }, 0)
    el.addEventListener('mouseenter', () => tl.timeScale(1))
    el.addEventListener('mouseleave', () => tl.timeScale(1.25))
  })

  return (
    <div
      ref={cardRef}
      data-anim
      className={cn(
        'flex flex-col items-center gap-5 px-8 py-12 text-center md:py-16',
        withDivider && 'md:border-r md:border-black/10'
      )}
    >
      <Image
        data-feature-icon
        src={feature.icon}
        alt=""
        width={64}
        height={64}
        className={cn(
          'h-16 w-16 object-contain will-change-transform',
          feature.accentBlur && 'blur-[6px]'
        )}
      />
      <h3 className="text-h4 font-semibold tracking-[-0.045rem] text-black">{feature.title}</h3>
      <p className="max-w-xs text-body leading-[1.625] text-dark-gray">{feature.body}</p>
    </div>
  )
}

export default function StrategyFeaturesSection() {
  return (
    <section className="bg-transparent py-14 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <WordScrub className="mx-auto max-w-3xl text-center text-h2 leading-[1.25] font-semibold tracking-[-0.075rem] text-black">
          Crafting unique strategies that turn visions into powerful results
        </WordScrub>

        {/* 3 feature cards with vertical dividers */}
        <Separator className="mt-16 bg-black/10" />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} withDivider={i < FEATURES.length - 1} />
          ))}
        </div>

        {/* Trust pill */}
        <div
          data-anim
          className="mx-auto mt-14 flex max-w-3xl items-center gap-4 rounded-pill bg-black/[0.04] px-3 py-3 md:px-4"
        >
          <span className="shrink-0 rounded-pill bg-black px-4 py-2 text-sub font-bold tracking-[0.0675rem] text-white uppercase">
            Trust
          </span>
          <p className="flex-1 text-body text-dark-gray">
            Trusted across fintech, insurance, e-commerce and manufacturing
          </p>
          <span className="mr-1 shrink-0 text-lg text-black" aria-hidden>
            →
          </span>
        </div>
      </div>
    </section>
  )
}
