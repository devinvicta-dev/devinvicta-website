'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export default function ServiceV2Section() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.svc2-item').forEach((el) => {
        gsap.set(el, { y: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          end: 'bottom 8%',
          fastScrollEnd: true,
          onEnter: () =>
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              force3D: true,
              overwrite: true,
            }),
          onLeave: () =>
            gsap.to(el, {
              y: -20,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              force3D: true,
              overwrite: true,
            }),
          onEnterBack: () =>
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              force3D: true,
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(el, {
              y: 40,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              force3D: true,
              overwrite: true,
            }),
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      className="relative z-10 bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:22px_22px] pt-14 md:pt-28"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-wide px-5 md:px-8">
        <h2
          data-anim
          className="mb-12 max-w-[44rem] text-[clamp(1.5625rem,3.5vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black md:mb-16"
        >
          We tailor software the way it should be: measured to your business, built to last.
        </h2>
        <div className="relative flex flex-col gap-[0.875rem] [perspective:2000px]">
          {[
            { z: 'z-[6]', title: 'Web Development' },
            { z: 'z-[5]', title: 'Mobile Apps' },
            { z: 'z-[4]', title: 'AI Agents & LLM Integration' },
            { z: 'z-[3]', title: 'UX/UI Design' },
            { z: 'z-[2]', title: 'AI Automation & Workflows' },
            { z: 'z-[1]', title: 'Cloud & Backend' },
          ].map((item) => (
            <div
              key={item.title}
              className={cn(
                'svc2-item relative flex items-center justify-start border-b-[0.0625rem] border-black/[0.08] py-6',
                item.z
              )}
              data-anim=""
            >
              <div className="relative z-[2]">
                <h3 className="text-[clamp(1.5rem,7vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.125rem] text-black mix-blend-difference [transition:color_0.35s] md:text-[clamp(2.15rem,6vw,6.35rem)]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
          <div className="hidden"></div>
        </div>
      </div>
    </section>
  )
}
