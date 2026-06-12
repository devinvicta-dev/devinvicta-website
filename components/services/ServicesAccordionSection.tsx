'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'
import AwardBadge from '@/components/ui/AwardBadge'
import { Separator } from '@/components/ui/separator'

const ARROW =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932c0d5b86dc72da6639743_Arrow%2010%20(1).svg'

const SERVICES = [
  {
    key: 'web',
    href: '/service-detail/web-development',
    image:
      'https://images.unsplash.com/photo-1565626424178-c699f6601afd?auto=format&fit=crop&w=1600&q=70',
  },
  {
    key: 'mobile',
    href: '/service-detail/mobile-apps',
    image:
      'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?auto=format&fit=crop&w=1600&q=70',
  },
  {
    key: 'ai',
    href: '/service-detail/ai-agents-llm',
    image:
      'https://images.unsplash.com/photo-1602410086232-0cdfb78b434f?auto=format&fit=crop&w=1600&q=70',
  },
  {
    key: 'design',
    href: '/service-detail/ux-ui-design',
    image:
      'https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?auto=format&fit=crop&w=1600&q=70',
  },
  {
    key: 'automation',
    href: '/service-detail/ai-automation',
    image:
      'https://images.unsplash.com/photo-1547070451-ce386c65160a?auto=format&fit=crop&w=1600&q=70',
  },
  {
    key: 'cloud',
    href: '/service-detail/cloud-backend',
    image:
      'https://images.unsplash.com/photo-1496236436299-cde70e3587cf?auto=format&fit=crop&w=1600&q=70',
  },
] as const

export default function ServicesAccordionSection() {
  // Hover-only: the hovered row opens (no scroll-driven auto-change). Default = first.
  const [active, setActive] = useState(0)
  const t = useTranslations('services')

  return (
    <section className="bg-transparent py-14 md:py-28">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-24">
        {/* Left: heading + rotating badge (sticky) */}
        <div className="flex flex-col justify-between gap-16 lg:sticky lg:top-10 lg:h-fit">
          <WordScrub className="text-h2 leading-[1.25] font-semibold tracking-[-0.075rem] text-black">
            {t('accordion.headline')}
          </WordScrub>
          <div data-anim className="hidden lg:block">
            <AwardBadge className="h-28 w-28 animate-badge-spin" />
          </div>
        </div>

        {/* Right: accordion list */}
        <div className="flex flex-col">
          {SERVICES.map((s, i) => {
            const isActive = active === i
            const title = t(`accordion.items.${s.key}.title`)
            return (
              <div
                key={s.key}
                data-anim
                onMouseEnter={() => setActive(i)}
                className="group/row relative pt-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-h4 font-semibold tracking-[-0.045rem] text-black">{title}</h3>
                  <a
                    href={s.href}
                    className="flex shrink-0 items-center gap-2 text-sub font-semibold text-black"
                  >
                    {t('accordion.viewMore')}
                    {/* dual-arrow hover swap */}
                    <span className="relative block h-[0.875rem] w-[0.875rem] overflow-hidden">
                      <img
                        src={ARROW}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full transition-transform duration-300 ease-out group-hover/row:translate-x-full group-hover/row:-translate-y-full"
                      />
                      <img
                        src={ARROW}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover/row:translate-x-0 group-hover/row:translate-y-0"
                      />
                    </span>
                  </a>
                </div>

                {/* reveal panel: full-width image above full-width body */}
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 pt-5 pb-7">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-panel">
                        <Image
                          src={s.image}
                          alt={title}
                          fill
                          sizes="(max-width: 991px) 100vw, 939px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-body leading-[1.625] text-dark-gray">
                        {t(`accordion.items.${s.key}.body`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* animated divider: static base line + 0 → 100% black fill on active */}
                <div className="relative h-px w-full">
                  <Separator className="absolute inset-0 bg-black/10" />
                  <span
                    className="absolute inset-y-0 left-0 bg-black transition-[width] duration-500 ease-out"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
