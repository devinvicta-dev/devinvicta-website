'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/gsap'
import SlideButton from '@/components/ui/SlideButton'
import ShaderBackground from '@/components/ui/ShaderBackground'

export default function ServicesCtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('services')

  useGSAP(
    () => {
      // outer panel slides up into view (separate from the heading scale/rise anim)
      gsap.fromTo(
        '.svc-cta-panel',
        { yPercent: 100, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          },
        }
      )
      // a-41 "CTA effect" — heading rises, button reveals as the section scrolls in
      gsap.fromTo(
        '.svc-cta-heading',
        { yPercent: 60, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(
        '.svc-cta-btn',
        { scale: 0.7, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-ivory px-5 py-14 md:px-8 md:py-28">
      <div className="svc-cta-panel relative mx-auto flex max-w-page flex-col items-center overflow-hidden rounded-panel bg-black px-6 py-24 text-center md:py-32">
        {/* Ambient glows behind the shader — same as the hero */}
        <div className="pointer-events-none absolute top-[-68%] left-[7%] h-[700px] w-[700px] rounded-full bg-[rgb(74,48,120)] blur-[110px] md:[will-change:transform] md:animate-[glow-drift_8s_ease-in-out_infinite_alternate]"></div>
        <div className="pointer-events-none absolute bottom-0 left-[-22%] top-auto h-[480px] w-[480px] rounded-full bg-[rgb(48,30,82)] blur-[100px]"></div>
        {/* WebGL smoke shader — exact same config as the hero (non-interactive) */}
        <ShaderBackground
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.55]"
          anchor={[0.82, 0.95]}
          speed={1.4}
          interactive={false}
        />

        {/* Kicker */}
        <span className="svc-cta-heading relative z-10 mb-7 inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-medium tracking-[0.02em] text-white/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-purple" aria-hidden="true" />
          {t('cta.kicker')}
        </span>

        <h2 className="svc-cta-heading relative z-10 max-w-4xl text-big1 leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-white">
          {t('cta.heading')}
        </h2>

        <p className="svc-cta-heading relative z-10 mt-7 max-w-xl text-lg leading-relaxed text-balance text-white/65 md:text-xl">
          {t('cta.body')}
        </p>

        <div className="svc-cta-btn relative z-10 mt-11 flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
          <SlideButton href="/contact" text={t('cta.button')} variant="white" />
          <a
            href="mailto:info@devinvicta.com"
            className="group inline-flex items-center gap-2 text-base font-medium text-white/70 transition-colors duration-200 hover:text-white"
          >
            <span className="border-b border-white/30 pb-0.5 transition-colors duration-200 group-hover:border-white">
              {t('cta.emailLink')}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
