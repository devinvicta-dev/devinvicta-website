'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  client: string
  challenge: string
  solution: string
  result: string
  href?: string
  confidential?: boolean
  image: string
}

// The 9 real case studies surfaced as expanding rows. Each row shows the client
// name + headline result; expanding reveals challenge → solution → result. We
// link out only where a public URL exists; confidential work is labelled.
const CASES: CaseStudy[] = [
  {
    num: '01',
    client: 'Start-up Fintech',
    challenge:
      'No functional product, with automatic invoicing and integrated HR management, and no ability to grow or connect systems.',
    solution:
      'MVP with an invoicing module, AI-powered invoice reading and processing, intelligent categorization and a fully integrated HR management module.',
    result:
      'Robust product delivered in 3 months. AI-automated invoice categorization. Client team operational and autonomous from day one.',
    confidential: true,
    image: img('1554224155-6726b3ff858f'),
  },
  {
    num: '02',
    client: 'E-commerce (Anonymous)',
    challenge:
      'Old content-management system with no API of its own, no control over data and unable to integrate AI or grow the business.',
    solution:
      'Full migration to a proprietary backend with API, dedicated database and integration of AI modules for personalization and automation.',
    result:
      'Migration completed in 4 months with no downtime. Improved performance. Full control over data and a platform ready to grow with AI.',
    image: img('1556742049-0cfed4f6a45d'),
  },
  {
    num: '03',
    client: 'Europacolon Portugal',
    challenge: 'Outdated institutional website, no admin platform and no email forwarding.',
    solution:
      'Modern new institutional website with a full admin backend, email forwarding and automatic AI analysis of contact requests, with categorization and prioritization before reaching the administrator.',
    result:
      'Website delivered in 6 months. Admin platform live from day one. Continuous maintenance service active.',
    href: 'https://www.europacolon.pt/home',
    image: img('1498050108023-c5249f4df085'),
  },
  {
    num: '04',
    client: 'Start-up Fintech (Confidential)',
    challenge:
      'Existing AI fraud-detection system needing improved performance, precision and platform development.',
    solution:
      "Optimization of AI fraud-detection models for payments and e-commerce, plus active contribution to building and improving the company's tech platform.",
    result:
      'AI models with greater fraud-detection precision, a more robust and scalable platform, delivered over 12 months of continuous collaboration.',
    confidential: true,
    image: img('1563013544-824ae1b704d3'),
  },
  {
    num: '05',
    client: 'Start-up Insurance (Confidential)',
    challenge:
      'Quotes website built on outdated systems, manual processes and no automation for the sales team, limiting growth.',
    solution:
      'Full migration of all systems to modern technologies, improved quotes engine with AI and automation of sales-team processes.',
    result:
      'Project completed in 18 months. Conversion up over 50%, significantly faster system and a more efficient sales team. Continuous maintenance active.',
    confidential: true,
    image: img('1450101499163-c8848c66ca85'),
  },
  {
    num: '06',
    client: 'Vmoove Transfers',
    challenge:
      'No online presence, no admin platform and no automated processes, limiting acquisition of new clients.',
    solution:
      'Modern informational website, complete admin platform and AI processes to optimize operations.',
    result: 'Website delivered in 4 months. Considerable increase in clients since launch.',
    href: 'https://vmoovetransfers.com',
    image: img('1502920917128-1aa500764cbd'),
  },
  {
    num: '07',
    client: 'Start-up Manufacturing (Confidential)',
    challenge:
      'Client factories with no visibility over their own production processes, no real-time data and unable to make informed decisions.',
    solution:
      'Software with AI for factory monitoring and optimization, providing real-time data and insight into production.',
    result:
      'Delivered in 8 months with an established maintenance plan. Clients gained greater knowledge and control over their factories, generating significant value.',
    confidential: true,
    image: img('1581091226825-a6a2a5aee158'),
  },
  {
    num: '08',
    client: 'Multinational Maritime Transport (Confidential)',
    challenge:
      'Multinational with no digital platform for its clients and no AI processes, limiting operational efficiency and client experience.',
    solution:
      'Full digitalization with a dedicated platform and AI processes integrated into operations.',
    result:
      'Ongoing for 12 months. Platform launched with very positive results and significantly more efficient operations with integrated AI.',
    confidential: true,
    image: img('1494412574643-ff11b0a5c1c3'),
  },
  {
    num: '09',
    client: 'Start-up Automotive (Confidential)',
    challenge:
      'No functional product, no automated booking system and unable to forecast demand or proactively communicate with clients.',
    solution:
      'MVP with a car-wash booking system, AI integration for demand forecasting and automatic next-wash notifications to clients.',
    result:
      'Robust MVP delivered with an operational booking system, clients auto-notified via AI and ability to anticipate demand peaks from day one.',
    confidential: true,
    image: img('1605559424843-9e4c228bf1c2'),
  },
]

export default function ServicesWorkSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-transparent px-5 py-14 md:px-8 md:py-28">
      <div className="mx-auto max-w-page">
        {/* header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-24">
          <WordScrub className="text-h2 leading-[1.15] font-semibold tracking-[-0.04em] text-black">
            Real case studies: challenges solved with software and responsible AI
          </WordScrub>
          <div data-anim className="flex flex-col items-start gap-6 lg:pt-2">
            <p className="max-w-md text-body leading-[1.7] text-dark-gray">
              From MVPs to enterprise migrations, here is how we partner with fintech, insurance,
              e-commerce, manufacturing and more, shipping products that perform, scale and stay
              compliant.
            </p>
            <SlideButton href="/contact" text="Let's talk" className="w-fit" />
          </div>
        </div>

        {/* case studies — hovering a row expands it into a tall black panel with
            the image and the challenge → solution → result detail revealed */}
        <div className="mt-12 flex flex-col gap-4 md:mt-16">
          {CASES.map((item, i) => {
            const isActive = active === i

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
                      {item.client}
                    </h3>
                    <p
                      className={cn(
                        'mt-2 max-w-md text-sub leading-[1.5]',
                        isActive ? 'text-white/60' : 'text-dark-gray'
                      )}
                    >
                      {item.result}
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
                    alt={item.client}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>

                {/* challenge + solution detail — only when active */}
                <div className={cn('flex w-full flex-col gap-3 lg:w-[30%]', !isActive && 'hidden')}>
                  <div>
                    <span className="text-sub font-semibold tracking-[0.06em] text-white/40 uppercase">
                      Challenge
                    </span>
                    <p className="mt-1 text-sub leading-[1.5] text-white/70">{item.challenge}</p>
                  </div>
                  <div>
                    <span className="text-sub font-semibold tracking-[0.06em] text-white/40 uppercase">
                      Solution
                    </span>
                    <p className="mt-1 text-sub leading-[1.5] text-white/70">{item.solution}</p>
                  </div>
                  {item.href ? (
                    <span className="mt-1 flex items-center gap-1.5 text-sub font-semibold text-white">
                      Visit project
                      <span aria-hidden>↗</span>
                    </span>
                  ) : item.confidential ? (
                    <span className="mt-1 text-sub font-medium text-white/40">
                      Confidential project
                    </span>
                  ) : null}
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
