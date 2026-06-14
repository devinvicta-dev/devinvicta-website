'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/gsap'
import { SWING_TO, prefersReducedMotion } from '@/lib/animations/easing'
import Navbar from '@/components/layout/Navbar'
import WordScrub from '@/components/ui/WordScrub'
import AwardBadge from '@/components/ui/AwardBadge'
import ContactForm from './ContactForm'

const BADGE_ICON =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/69295ba4a30174ac153e4553_Group%201597884598.svg'

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('contact')
  const letters = t('hero.title').split('')

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.contact-letter', { yPercent: 0 })
        return
      }
      gsap.fromTo(
        '.contact-letter',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: SWING_TO, stagger: 0.06 }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative bg-transparent">
      <Navbar light />
      <div className="mx-auto max-w-page px-5 pt-24 pb-16 md:px-8">
        {/* title + rotating badge */}
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-h1 leading-[0.9] font-semibold tracking-[-0.044em] text-black">
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="contact-letter inline-block">{l}</span>
              </span>
            ))}
          </h1>
          <div className="relative hidden h-28 w-28 shrink-0 lg:block">
            <AwardBadge className="absolute inset-0 h-full w-full animate-badge-spin" />
            <Image
              src={BADGE_ICON}
              alt=""
              width={36}
              height={36}
              unoptimized
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* body: info + form */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <WordScrub className="max-w-md text-h3 leading-[1.15] font-semibold tracking-[-0.03em] text-black">
              {t('hero.headline')}
            </WordScrub>
            <div className="mt-12 flex flex-wrap gap-x-20 gap-y-8">
              <div data-anim className="flex flex-col gap-1.5">
                <span className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
                  {t('hero.emailLabel')}
                </span>
                <a
                  href="mailto:info@devinvicta.com"
                  className="text-h5 font-semibold text-black transition-opacity hover:opacity-60"
                >
                  info@devinvicta.com
                </a>
              </div>
              <div data-anim className="flex flex-col gap-1.5">
                <span className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
                  {t('hero.phoneLabel')}
                </span>
                <a
                  href="tel:+351928277832"
                  className="text-h5 font-semibold text-black transition-opacity hover:opacity-60"
                >
                  +351 928 277 832
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
