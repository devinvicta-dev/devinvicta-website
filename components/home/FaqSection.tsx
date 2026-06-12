'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import WordScrub from '@/components/ui/WordScrub'
import SlideButton from '@/components/ui/SlideButton'
import { faqItems } from '@/data/faq'

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const faqRightRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('home')

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.faq-item')
      if (!items.length) return

      gsap.set(items, { y: 30, opacity: 0 })
      ScrollTrigger.create({
        trigger: faqRightRef.current,
        start: 'top 90%',
        end: 'bottom 8%',
        onEnter: () =>
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.1,
            ease: 'power3.out',
            force3D: true,
            overwrite: true,
          }),
        onLeave: () =>
          gsap.to(items, {
            y: -20,
            opacity: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: 'power2.in',
            force3D: true,
            overwrite: true,
          }),
        onEnterBack: () =>
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power3.out',
            force3D: true,
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(items, {
            y: 30,
            opacity: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: 'power2.in',
            force3D: true,
            overwrite: true,
          }),
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:22px_22px] pt-14 md:pt-28"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-[1.875rem] lg:flex-row lg:items-start lg:justify-between">
          {/* Left column — sticks while the questions scroll past on desktop */}
          <div className="flex max-w-[25rem] flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <WordScrub className="text-[clamp(1.5625rem,3.5vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black">
                {t('faq.title')}
              </WordScrub>
              <p
                className="text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.625] text-dark-gray"
                style={{ marginTop: '1rem' }}
                data-anim
              >
                {t('faq.subtitle')}
              </p>
            </div>
            <div
              className="flex flex-col gap-[1.875rem] rounded-card border border-black/15 p-[1.875rem]"
              data-anim
            >
              <h4 className="text-2xl font-semibold leading-[1.41] tracking-[-0.045rem] text-black">
                {t('faq.ctaTitle')}
              </h4>
              <p className="leading-[1.625] text-dark-gray" style={{ fontSize: '0.9375rem' }}>
                {t('faq.ctaBody')}
              </p>
              <SlideButton href="/contact" text={t('faq.ctaButton')} />
            </div>
          </div>

          {/* Right column — accordion */}
          <Accordion defaultValue={[0]} className="max-w-[41.875rem] flex-1" ref={faqRightRef}>
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="faq-item border-b-[0.0625rem] border-black/20 px-[1.875rem] pb-[0.5625rem] last:border-b-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group/faq flex w-full cursor-pointer items-center justify-between gap-4 pt-[1.8125rem] pb-[0.6875rem] text-left outline-none">
                    <span className="text-2xl font-semibold leading-[1.41] text-black">
                      {t(`faq.items.${item.key}.question`)}
                    </span>
                    <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black">
                      <div className="absolute h-0.5 w-[0.6875rem] bg-white"></div>
                      <div className="absolute h-0.5 w-[0.6875rem] rotate-90 bg-white [transition:transform_0.3s,opacity_0.3s] group-aria-expanded/faq:rotate-0 group-aria-expanded/faq:opacity-0"></div>
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-400 ease-out data-ending-style:h-0 data-starting-style:h-0">
                  <p className="pb-[1.875rem] text-[0.9375rem] leading-[1.625] text-dark-gray">
                    {t(`faq.items.${item.key}.answer`)}
                  </p>
                </AccordionPrimitive.Panel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
