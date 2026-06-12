'use client'

import { useState } from 'react'
import Image from 'next/image'
import WordScrub from '@/components/ui/WordScrub'
import { Separator } from '@/components/ui/separator'

const BADGE =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/69295ba40a71b2cba1174042_text-rotate-aniamtion.svg'

const ARROW =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/6932c0d5b86dc72da6639743_Arrow%2010%20(1).svg'

const SERVICES = [
  {
    title: 'Web Development',
    href: '/service-detail/web-development',
    body: 'Custom, scalable web platforms spanning clean front-end interfaces, robust APIs and data layers, engineered to perform and built to last.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=70',
  },
  {
    title: 'Mobile Apps',
    href: '/service-detail/mobile-apps',
    body: 'Native-grade iOS, Android and cross-platform apps designed around real user journeys and built to scale with your audience.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=70',
  },
  {
    title: 'AI Agents & LLM',
    href: '/service-detail/ai-agents-llm',
    body: 'Intelligent agents and LLM integrations that automate real work such as document AI, assistants and detection, aligned with the EU AI Act.',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=70',
  },
  {
    title: 'UX/UI Design',
    href: '/service-detail/ux-ui-design',
    body: 'Intuitive, polished interfaces and scalable design systems that remove friction and keep products coherent as they grow.',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=70',
  },
  {
    title: 'AI Automation & Workflows',
    href: '/service-detail/ai-automation',
    body: 'AI-driven automation that gives time back through real-time monitoring, smart notifications and intelligent routing across your systems.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
  },
  {
    title: 'Cloud & Backend',
    href: '/service-detail/cloud-backend',
    body: 'Reliable cloud infrastructure and backends covering APIs, databases, CI/CD and security by design, prepared for growth and AI workloads.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70',
  },
]

export default function ServicesAccordionSection() {
  // Hover-only: the hovered row opens (no scroll-driven auto-change). Default = first.
  const [active, setActive] = useState(0)

  return (
    <section className="bg-transparent py-14 md:py-28">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-24">
        {/* Left: heading + rotating badge (sticky) */}
        <div className="flex flex-col justify-between gap-16 lg:sticky lg:top-10 lg:h-fit">
          <WordScrub className="text-h2 leading-[1.25] font-semibold tracking-[-0.075rem] text-black">
            Innovative ideas and bold execution that drive measurable growth
          </WordScrub>
          <div data-anim className="hidden lg:block">
            <img src={BADGE} alt="" className="h-28 w-28 animate-badge-spin" aria-hidden />
          </div>
        </div>

        {/* Right: accordion list */}
        <div className="flex flex-col">
          {SERVICES.map((s, i) => {
            const isActive = active === i
            return (
              <div
                key={s.title}
                data-anim
                onMouseEnter={() => setActive(i)}
                className="group/row relative pt-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-h4 font-semibold tracking-[-0.045rem] text-black">
                    {s.title}
                  </h3>
                  <a
                    href={s.href}
                    className="flex shrink-0 items-center gap-2 text-sub font-semibold text-black"
                  >
                    View more
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
                          alt={s.title}
                          fill
                          sizes="(max-width: 991px) 100vw, 939px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-body leading-[1.625] text-dark-gray">{s.body}</p>
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
