'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/gsap'
import WordScrub from '@/components/ui/WordScrub'
import SlideButton from '@/components/ui/SlideButton'

const SERVICE_ITEMS = [
  { num: '(01)', key: 'web', svc: '1', slug: 'web-development' },
  { num: '(02)', key: 'mobile', svc: '2', slug: 'mobile-apps' },
  { num: '(03)', key: 'ai', svc: '3', slug: 'ai-agents-llm' },
  { num: '(04)', key: 'design', svc: '4', slug: 'ux-ui-design' },
  { num: '(05)', key: 'cloud', svc: '5', slug: 'cloud-backend' },
] as const

export default function ServiceV1Section() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('home')

  // Light support animation: swap the left preview image on hover only.
  // Card i (0-based) reveals overlay i-1; card 0 / mouse-leave shows the base image.
  const showImage = (idx: number) => {
    const overlays = sectionRef.current?.querySelectorAll<HTMLElement>('.svc-img-overlay')
    overlays?.forEach((img, i) => {
      img.style.opacity = i === idx - 1 ? '1' : '0'
    })
  }

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || window.innerWidth > 767) return

      // Mobile-only: gentle staggered entrance for the service rows.
      const svcItems = section.querySelectorAll<HTMLElement>('.svc-item')
      if (!svcItems.length) return
      gsap.fromTo(
        svcItems,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section className="h-auto pt-14 md:pt-28" id="services" ref={sectionRef}>
      <div className="relative">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <div className="mb-8 flex flex-col items-start gap-5 md:mb-[5.625rem] md:flex-row md:items-center md:justify-between md:gap-[1.875rem]">
            <WordScrub className="max-w-[39.375rem] text-[clamp(1.5625rem,3.5vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black">
              {t('serviceV1.headline')}
            </WordScrub>
            <div data-anim="">
              <SlideButton href="/contact" text={t('serviceV1.cta')} />
            </div>
          </div>
          <div className="flex flex-col gap-[1.875rem] lg:flex-row lg:items-start lg:justify-between">
            <div className="flex w-full max-w-full flex-1 flex-col gap-[3.375rem] lg:max-w-[18.75rem]">
              <div className="relative overflow-hidden rounded-soft max-md:hidden">
                <Image
                  src="/assets/images/service-1.jpg"
                  width={900}
                  height={1200}
                  sizes="18.75rem"
                  className="block h-auto w-full rounded-soft object-cover [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
                  alt=""
                />
                <Image
                  src="/assets/images/service-2.jpg"
                  fill
                  sizes="18.75rem"
                  className="svc-img-overlay absolute inset-0 block rounded-soft object-cover opacity-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)] [transition:opacity_0.45s_ease]"
                  id="svc-overlay-2"
                  alt=""
                />
                <Image
                  src="/assets/images/service-3.jpg"
                  fill
                  sizes="18.75rem"
                  className="svc-img-overlay absolute inset-0 block rounded-soft object-cover opacity-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)] [transition:opacity_0.45s_ease]"
                  id="svc-overlay-3"
                  alt=""
                />
                <Image
                  src="/assets/images/service-4.jpg"
                  fill
                  sizes="18.75rem"
                  className="svc-img-overlay absolute inset-0 block rounded-soft object-cover opacity-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)] [transition:opacity_0.45s_ease]"
                  id="svc-overlay-4"
                  alt=""
                />
                <Image
                  src="/assets/images/service-5.jpg"
                  fill
                  sizes="18.75rem"
                  className="svc-img-overlay absolute inset-0 block rounded-soft object-cover opacity-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)] [transition:opacity_0.45s_ease]"
                  id="svc-overlay-5"
                  alt=""
                />
              </div>
              <p className="text-[0.9375rem] leading-[1.625] text-dark-gray">
                {t('serviceV1.body')}
              </p>
            </div>
            <div className="flex max-w-[48.125rem] flex-1 flex-col">
              {SERVICE_ITEMS.map((svc, i) => (
                <Link
                  key={svc.svc}
                  href={`/service-detail/${svc.slug}`}
                  onMouseEnter={() => showImage(i)}
                  onMouseLeave={() => showImage(0)}
                  className="svc-item group relative block cursor-pointer overflow-hidden border-b-[0.0625rem] border-black/[0.12] before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-black before:content-[''] before:[transition:transform_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)] md:hover:before:translate-x-0"
                  data-svc={svc.svc}
                >
                  <div className="relative z-[1] flex items-center justify-between px-[1.875rem] py-[2.8125rem]">
                    <span className="min-w-[3rem] text-sm font-semibold text-dark-gray [transition:color_0.35s] md:group-hover:text-white">
                      {svc.num}
                    </span>
                    <span className="flex-1 px-[1.875rem] text-2xl font-semibold text-black [transition:color_0.35s] md:group-hover:text-white">
                      {t(`serviceV1.items.${svc.key}`)}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden">
                      <img
                        src="/assets/svgs/arrow-black.svg"
                        className="w-5 [transition:transform_0.3s] md:group-hover:translate-x-1 md:group-hover:-translate-y-1 md:group-hover:invert"
                        alt="→"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
