'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SERVICES, type Service } from '@/lib/services'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type Bullet = { label: string; text: string }
type Feature = { title: string; desc: string }

/**
 * Service-detail body — the single 2-column block (`rt-blog-content`) from
 * Vertora: a sticky service sidebar on the left, and the full editorial column
 * on the right (overview → strategy → process bullets → 2×2 feature
 * grid → closing statement).
 */
export default function ServiceDetailBody({ service }: { service: Service }) {
  const t = useTranslations('services')

  const def = `definitions.${service.slug}`
  const introParas = t.raw(`${def}.introParas`) as string[]
  const bullets = t.raw(`${def}.bullets`) as Bullet[]
  const features = t.raw(`${def}.features`) as Feature[]

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* sidebar: service nav */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => {
                const active = s.slug === service.slug
                return (
                  <li key={s.slug} data-anim>
                    <Link
                      href={`/service-detail/${s.slug}`}
                      className={cn(
                        'group flex items-center justify-between rounded-pill px-6 py-4 text-button font-semibold transition-colors duration-300',
                        active
                          ? 'bg-black text-white'
                          : 'bg-white text-black ring-1 ring-black/10 hover:bg-black hover:text-white'
                      )}
                    >
                      {t(`definitions.${s.slug}.title`)}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* right editorial column */}
          <div className="flex flex-col">
            {/* overview */}
            <h2
              data-anim
              className="text-h2 leading-[1.2] font-semibold tracking-[-0.04em] text-black"
            >
              {t(`${def}.intro`)}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {introParas.map((p, i) => (
                <p data-anim key={i} className="text-body leading-[1.7] text-dark-gray">
                  {p}
                </p>
              ))}
            </div>

            {/* strategy */}
            <h3
              data-anim
              className="mt-12 text-h4 leading-[1.3] font-semibold tracking-[-0.02em] text-black"
            >
              {t(`${def}.subHeading`)}
            </h3>
            <p data-anim className="mt-4 text-body leading-[1.7] text-dark-gray">
              {t(`${def}.subPara`)}
            </p>

            {/* process heading + bullets */}
            <h3
              data-anim
              className="mt-12 text-h3 leading-[1.2] font-semibold tracking-[-0.03em] text-black"
            >
              {t('detail.processHeading')}
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {bullets.map((b) => (
                <li
                  data-anim
                  key={b.label}
                  className="flex gap-3 text-body leading-[1.7] text-dark-gray"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-fiery-red"
                  />
                  <span>
                    <span className="font-semibold text-black">{b.label} : </span>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* 2×2 numbered feature grid */}
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {features.map((f, i) => (
                <div data-anim key={f.title} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sub font-semibold text-white">
                    {service.featureNums[i]}
                  </span>
                  <div>
                    <h5 className="text-h5 font-semibold tracking-[-0.01em] text-black">
                      {f.title}
                    </h5>
                    <p className="mt-2 text-sub leading-[1.6] text-dark-gray">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* closing statement */}
            <h3
              data-anim
              className="mt-16 text-h3 leading-[1.2] font-semibold tracking-[-0.03em] text-black"
            >
              {t(`${def}.closingHeading`)}
            </h3>
            <p data-anim className="mt-5 text-body leading-[1.7] text-dark-gray">
              {t(`${def}.closingPara`)}
            </p>
          </div>
        </div>
      </div>
      <Separator className="bg-black/10" />
    </section>
  )
}
