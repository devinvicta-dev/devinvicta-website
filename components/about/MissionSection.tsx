import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'

export default function MissionSection() {
  const t = useTranslations('about')
  return (
    <section className="py-14 md:py-28 bg-ivory">
      <div className="mx-auto max-w-page px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1fr_45%] gap-10 md:gap-20 items-start">
        <div className="flex flex-col items-start gap-8">
          {/* Icon */}
          <svg
            className="w-14 h-14 opacity-70"
            data-anim
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="27" stroke="#0a0a0a" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="18" stroke="#0a0a0a" strokeWidth="1.5" />
            <path
              d="M28 1 C28 1 38 14 38 28 C38 42 28 55 28 55"
              stroke="#0a0a0a"
              strokeWidth="1.5"
            />
            <path
              d="M28 1 C28 1 18 14 18 28 C18 42 28 55 28 55"
              stroke="#0a0a0a"
              strokeWidth="1.5"
            />
            <line x1="1" y1="28" x2="55" y2="28" stroke="#0a0a0a" strokeWidth="1.5" />
          </svg>
          <WordScrub
            as="h2"
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.04em] text-black"
          >
            {t('mission.headline')}
          </WordScrub>
          <p className="text-base text-dark-gray leading-[1.7]" data-anim>
            {t('mission.body')}
          </p>
        </div>
        <div className="hidden md:flex flex-col gap-6 items-start" data-anim>
          <div className="relative w-full h-[clamp(420px,50vw,620px)]">
            <Image
              src="https://images.unsplash.com/photo-1593250816874-8edf4f732edb?w=700&h=900&fit=crop&q=80"
              alt="Draped satin fabric, folds in raking light"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="mission-img-single object-cover rounded-[1.25rem] [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
