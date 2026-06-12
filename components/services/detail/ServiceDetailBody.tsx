'use client'

import Link from 'next/link'
import { Play } from 'lucide-react'
import { SERVICES, type Service } from '@/lib/services'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

/**
 * Service-detail body — the single 2-column block (`rt-blog-content`) from
 * Vertora: a sticky service sidebar on the left, and the full editorial column
 * on the right (overview → strategy → video card → process bullets → 2×2 feature
 * grid → closing statement). Mirrors the live reference exactly.
 */
export default function ServiceDetailBody({ service }: { service: Service }) {
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
                      {s.title}
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
              {service.intro}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {service.introParas.map((p, i) => (
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
              {service.subHeading}
            </h3>
            <p data-anim className="mt-4 text-body leading-[1.7] text-dark-gray">
              {service.subPara}
            </p>

            {/* video card */}
            <div
              data-anim
              className="mt-12 relative aspect-[16/9] overflow-hidden rounded-panel bg-black"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={service.video.poster}
              >
                <source src={service.video.webm} type="video/webm" />
                <source src={service.video.mp4} type="video/mp4" />
              </video>
              <div aria-hidden className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-end justify-between p-7">
                <h4 className="max-w-[12ch] text-h4 leading-[1.15] font-semibold tracking-[-0.02em] text-white">
                  {service.videoHeading}
                </h4>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-soft bg-white text-black">
                  <Play className="h-5 w-5 translate-x-[1px] fill-current" />
                </span>
              </div>
            </div>

            {/* process heading + bullets */}
            <h3
              data-anim
              className="mt-12 text-h3 leading-[1.2] font-semibold tracking-[-0.03em] text-black"
            >
              How we work, from free diagnostic to delivery and beyond
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {service.bullets.map((b) => (
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
              {service.features.map((f) => (
                <div data-anim key={f.num} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sub font-semibold text-white">
                    {f.num}
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
              {service.closingHeading}
            </h3>
            <p data-anim className="mt-5 text-body leading-[1.7] text-dark-gray">
              {service.closingPara}
            </p>
          </div>
        </div>
      </div>
      <Separator className="bg-black/10" />
    </section>
  )
}
