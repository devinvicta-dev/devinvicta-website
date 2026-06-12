'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export default function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.innerWidth > 767) {
        // Desktop: sticky scroll carousel animation
        gsap.set(['#card-1', '#card-3'], { x: '-120%', opacity: 0, force3D: true })
        gsap.set(['#card-2', '#card-4'], { x: '120%', opacity: 0, force3D: true })
        gsap.set('.circle-inner', { scale: 0.5, opacity: 0, force3D: true })
        gsap.set(['#circle-two', '#circle-three'], { scale: 0.3, opacity: 0, force3D: true })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to('.circle-inner', { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 0)
          .to('#circle-two', { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.8)
          .to('#card-1', { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, 1)
          .to('#card-2', { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, 2)
          .to('#card-3', { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, 3)
          .to('#circle-three', { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 3.2)
          .to('#card-4', { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, 4)
      } else {
        // Mobile: simple stagger entrance
        gsap.set(['#card-1', '#card-2', '#card-3', '#card-4'], { opacity: 1, x: 0, y: 0 })
        gsap.fromTo(
          ['#card-1', '#card-2', '#card-3', '#card-4'],
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 82%' },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section className="relative h-auto md:h-[700vh]" id="cards-section" ref={sectionRef}>
      <div className="relative top-auto flex h-auto w-full flex-col items-center justify-center overflow-visible bg-ivory p-6 md:sticky md:top-0 md:h-screen md:flex-row md:overflow-hidden md:p-0">
        <div className="hidden md:relative md:flex md:items-center md:justify-center">
          <div className="circle-inner relative z-[2] flex h-[28rem] w-[28rem] items-center justify-center rounded-full border-[0.0625rem] border-dashed border-black/30">
            <p
              className="max-w-[20rem] p-8 text-center text-[clamp(1.25rem,2.5vw,1.875rem)] font-semibold leading-[1.33] tracking-[-0.03em] text-black"
              id="circle-text"
            >
              We engineer software that scales, performs, and ships
            </p>
          </div>
          <div
            className="absolute h-[48rem] w-[48rem] scale-[0.3] rounded-full border-[0.0625rem] border-black/15 opacity-0"
            id="circle-two"
          ></div>
          <div
            className="absolute h-[70rem] w-[70rem] scale-[0.3] rounded-full border-[0.0625rem] border-black/10 opacity-0"
            id="circle-three"
          ></div>
        </div>
        <div className="hidden" id="carousel-dots">
          <div data-dot="0"></div>
          <div data-dot="1"></div>
          <div data-dot="2"></div>
          <div data-dot="3"></div>
        </div>
        <div className="relative inset-auto flex w-full max-w-none flex-col items-stretch justify-start gap-4 p-0 md:pointer-events-none md:absolute md:bottom-0 md:left-1/2 md:top-0 md:max-w-[85rem] md:-translate-x-1/2 md:flex-row md:items-center md:justify-between md:gap-0 md:px-16 md:py-0">
          <div className="contents md:flex md:w-[16rem] md:flex-col md:gap-8 lg:w-[22rem]">
            <div
              className="card-item pointer-events-auto relative order-1 w-full max-w-none rounded-card bg-white p-[1.875rem] opacity-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] md:[will-change:transform,opacity]"
              id="card-1"
            >
              <div className="mb-[1.875rem] flex items-center justify-between">
                <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                  Web &amp; Mobile
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  01
                </div>
              </div>
              <h3
                className="font-semibold leading-[1.33] tracking-[-0.03em] text-black"
                style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}
              >
                Full-stack web &amp; mobile development
              </h3>
              <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                We engineer performant web apps and native-quality mobile experiences from design to
                deployment.
              </p>
            </div>
            <div
              className="card-item pointer-events-auto relative order-3 w-full max-w-none rounded-card bg-white p-[1.875rem] opacity-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] md:[will-change:transform,opacity]"
              id="card-3"
            >
              <div className="mb-[1.875rem] flex items-center justify-between">
                <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                  AI &amp; Automation
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  03
                </div>
              </div>
              <h3
                className="font-semibold leading-[1.33] tracking-[-0.03em] text-black"
                style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}
              >
                AI agents &amp; intelligent automation
              </h3>
              <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                We deploy LLM-powered agents, RAG pipelines, and custom AI automations that cut
                costs and eliminate repetitive work at scale.
              </p>
            </div>
          </div>
          <div className="contents md:flex md:w-[16rem] md:flex-col md:gap-8 lg:w-[22rem]">
            <div
              className="card-item pointer-events-auto relative order-2 w-full max-w-none rounded-card bg-white p-[1.875rem] opacity-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] md:[will-change:transform,opacity]"
              id="card-2"
            >
              <div className="mb-[1.875rem] flex items-center justify-between">
                <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                  UX / UI
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  02
                </div>
              </div>
              <h3
                className="font-semibold leading-[1.33] tracking-[-0.03em] text-black"
                style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}
              >
                Product design &amp; user experience
              </h3>
              <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                We craft interfaces that are both beautiful and intuitive, from wireframes to
                pixel-perfect prototypes.
              </p>
            </div>
            <div
              className="card-item pointer-events-auto relative order-4 w-full max-w-none rounded-card bg-white p-[1.875rem] opacity-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] md:[will-change:transform,opacity]"
              id="card-4"
            >
              <div className="mb-[1.875rem] flex items-center justify-between">
                <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                  Cloud &amp; Backend
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  04
                </div>
              </div>
              <h3
                className="font-semibold leading-[1.33] tracking-[-0.03em] text-black"
                style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}
              >
                Cloud infrastructure &amp; backend systems
              </h3>
              <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.875rem' }}>
                We architect scalable APIs, microservices, and cloud deployments built for
                reliability and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
