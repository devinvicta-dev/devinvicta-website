'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SWING_TO } from '@/lib/animations/easing'
import Navbar from '@/components/layout/Navbar'
import WordScrub from '@/components/ui/WordScrub'
import ContactForm from './ContactForm'

const BADGE_RING =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/69295ba40a71b2cba1174042_text-rotate-aniamtion.svg'
const BADGE_ICON =
  'https://cdn.prod.website-files.com/691d92c72b801c04cbc08bec/69295ba4a30174ac153e4553_Group%201597884598.svg'

const LETTERS = 'Contact'.split('')

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
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
      <div className="mx-auto max-w-page px-5 pt-section-hero-pt pb-16 md:px-8">
        {/* title + rotating badge */}
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-h1 leading-[0.9] font-semibold tracking-[-0.044em] text-black">
            {LETTERS.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="contact-letter inline-block">{l}</span>
              </span>
            ))}
          </h1>
          <div className="relative hidden h-28 w-28 shrink-0 lg:block">
            <img
              src={BADGE_RING}
              alt=""
              className="absolute inset-0 h-full w-full animate-badge-spin"
            />
            <img
              src={BADGE_ICON}
              alt=""
              className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* body: info + form */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <WordScrub className="max-w-md text-h3 leading-[1.15] font-semibold tracking-[-0.03em] text-black">
              Let&apos;s connect! Reach out anytime!
            </WordScrub>
            <div className="mt-12 flex flex-wrap gap-x-20 gap-y-8">
              <div data-anim className="flex flex-col gap-1.5">
                <span className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
                  Email
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
                  Phone
                </span>
                <a
                  href="tel:+351928144223"
                  className="text-h5 font-semibold text-black transition-opacity hover:opacity-60"
                >
                  +351 928 144 223
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
