'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations/easing'
import Navbar from '@/components/layout/Navbar'
import ShaderBackground from '@/components/ui/ShaderBackground'
import BookACallButton from '@/components/ui/BookACallButton'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('home')
  const tNav = useTranslations('nav')

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(['#hero-tagline', '.hero-heading'], { opacity: 1, y: 0 })
        return
      }
      // GSAP from index.html lines 3722-3739:
      gsap.fromTo(
        '#hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.hero-heading',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4 }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section className="h-lvh overflow-hidden p-0 md:px-4 md:py-4" ref={sectionRef}>
      <div
        className="relative flex h-full items-center justify-center overflow-hidden rounded-none bg-black md:rounded-panel"
        id="hero-wrapper"
      >
        <Navbar />
        {/* Fluid blue cloud shader, anchored to the top-right */}
        <ShaderBackground
          className="pointer-events-none absolute inset-0 z-1 h-full w-full opacity-55"
          anchor={[0.82, 0.95]}
          speed={1.4}
          interactive={false}
        />
        <div className="pointer-events-none absolute inset-0 z-2 hidden overflow-hidden md:block">
          {/* Vertical grid lines: draw-in + traveling ::after pulse */}
          <div className="absolute bottom-0 top-0 left-[20%] w-px origin-top scale-y-0 animate-[hgl-draw-v_0.9s_ease_forwards] [animation-delay:0.3s] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_15%,rgba(255,255,255,0.08)_85%,transparent_100%)] after:absolute after:-left-px after:-right-px after:h-20 after:animate-[hgl-travel-v_4.5s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:1.8s] after:content-['']"></div>
          <div className="absolute bottom-0 top-0 left-[40%] w-px origin-top scale-y-0 animate-[hgl-draw-v_0.9s_ease_forwards] [animation-delay:0.55s] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_15%,rgba(255,255,255,0.08)_85%,transparent_100%)] after:absolute after:-left-px after:-right-px after:h-20 after:animate-[hgl-travel-v_5.5s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:2.4s] after:content-['']"></div>
          <div className="absolute bottom-0 top-0 left-[60%] w-px origin-top scale-y-0 animate-[hgl-draw-v_0.9s_ease_forwards] [animation-delay:0.8s] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_15%,rgba(255,255,255,0.08)_85%,transparent_100%)] after:absolute after:-left-px after:-right-px after:h-20 after:animate-[hgl-travel-v_4.8s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:3.1s] after:content-['']"></div>
          <div className="absolute bottom-0 top-0 left-[80%] w-px origin-top scale-y-0 animate-[hgl-draw-v_0.9s_ease_forwards] [animation-delay:1.05s] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_15%,rgba(255,255,255,0.08)_85%,transparent_100%)] after:absolute after:-left-px after:-right-px after:h-20 after:animate-[hgl-travel-v_5.2s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:2s] after:content-['']"></div>
          {/* Horizontal grid lines: draw-in + traveling ::after pulse */}
          <div className="absolute left-0 right-0 top-[33%] h-px origin-left scale-x-0 animate-[hgl-draw-h_0.9s_ease_forwards] [animation-delay:1.2s] bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_15%,rgba(255,255,255,0.06)_85%,transparent_100%)] after:absolute after:-top-px after:-bottom-px after:w-[120px] after:animate-[hgl-travel-h_6s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:2.6s] after:content-['']"></div>
          <div className="absolute left-0 right-0 top-[66%] h-px origin-left scale-x-0 animate-[hgl-draw-h_0.9s_ease_forwards] [animation-delay:1.45s] bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_15%,rgba(255,255,255,0.06)_85%,transparent_100%)] after:absolute after:-top-px after:-bottom-px after:w-[120px] after:animate-[hgl-travel-h_6.5s_ease-in-out_infinite] after:rounded-[2px] after:bg-white/[0.03] after:[animation-delay:3.4s] after:content-['']"></div>
        </div>
        {/* Secondary ambient glows (top-right is now the fluid shader) */}
        <div className="pointer-events-none absolute top-[-68%] left-[7%] h-175 w-175 rounded-full bg-[rgb(74,48,120)] blur-[110px] md:[will-change:transform] md:animate-[glow-drift_8s_ease-in-out_infinite_alternate]"></div>
        <div className="pointer-events-none absolute bottom-0 left-[-22%] top-auto h-120 w-120 rounded-full bg-[rgb(48,30,82)] blur-[100px]"></div>

        {/* Text content */}
        <div className="absolute inset-0 z-8 flex flex-col justify-end gap-0 px-6 pt-20 pb-8 md:justify-center md:p-0">
          <h1 className="hero-heading flex w-full flex-col items-start justify-center gap-0 md:items-center md:gap-[0.15em]">
            <span
              className="relative z-8 whitespace-normal text-left text-[clamp(2.5rem,13vw,5rem)] font-semibold leading-none tracking-[-0.04em] text-white md:whitespace-nowrap md:text-center md:text-[clamp(2.5rem,9.5vw,13.75rem)]"
              id="hero-word-l"
            >
              {t('hero.wordLeft')}
            </span>
            <span
              className="relative z-8 whitespace-normal text-left text-[clamp(2.5rem,13vw,5rem)] font-semibold leading-none tracking-[-0.04em] text-white md:whitespace-nowrap md:text-right md:text-[clamp(2.5rem,9.5vw,13.75rem)]"
              id="hero-word-r"
            >
              {t('hero.wordRight')}
            </span>
          </h1>
          <div className="relative mt-6 flex w-full items-end justify-between md:absolute md:bottom-14 md:left-10 md:right-10 md:mt-0 md:w-auto">
            <p
              className="hero-tagline max-w-full text-[0.8125rem] leading-[1.6] text-white/75 md:max-w-88 md:text-sm"
              id="hero-tagline"
            >
              {t('hero.tagline')}
            </p>
            <BookACallButton
              variant="light"
              className="hero-tagline shrink-0"
              label={tNav('cta')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
