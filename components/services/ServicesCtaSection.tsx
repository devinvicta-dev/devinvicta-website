'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import SlideButton from '@/components/ui/SlideButton'
import ShaderBackground from '@/components/ui/ShaderBackground'

export default function ServicesCtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

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
      <div className="svc-cta-panel relative mx-auto flex max-w-page flex-col items-center gap-10 overflow-hidden rounded-panel bg-black px-6 py-28 text-center">
        {/* Ambient glows behind the shader — same as the hero */}
        <div className="pointer-events-none absolute -top-[68%] left-[7%] h-[700px] w-[700px] rounded-full bg-[rgb(5,40,140)] blur-[110px] md:[will-change:transform] md:animate-[glow-drift_8s_ease-in-out_infinite_alternate]"></div>
        <div className="pointer-events-none absolute bottom-0 -left-[22%] top-auto h-[480px] w-[480px] rounded-full bg-[rgb(8,25,80)] blur-[100px]"></div>
        {/* WebGL smoke shader — exact same config as the hero (non-interactive) */}
        <ShaderBackground
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.55]"
          anchor={[0.82, 0.95]}
          speed={1.4}
          interactive={false}
        />
        <h2 className="svc-cta-heading relative z-10 max-w-3xl text-big1 leading-[1.1] font-semibold tracking-[-0.04em] text-white">
          Let&apos;s build software that performs, scales and stays compliant
        </h2>
        <div className="svc-cta-btn relative z-10">
          <SlideButton href="/contact" text="Get a quote" variant="white" />
        </div>
      </div>
    </section>
  )
}
