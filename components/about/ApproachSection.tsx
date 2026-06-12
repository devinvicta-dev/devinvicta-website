import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'

const cards = [
  {
    key: 'diagnostic',
    dark: false,
    icon: (
      <>
        <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 11h12M10 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: 'aiWorks',
    dark: true,
    icon: (
      <>
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 16l4 4 8-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    key: 'complete',
    dark: false,
    icon: (
      <path
        d="M4 24L12 16L18 22L28 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const

export default function ApproachSection() {
  const t = useTranslations('about')
  return (
    <section className="py-14 md:py-28 bg-ivory border-t border-black/10">
      <div className="mx-auto max-w-page px-5 md:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-7.5 md:items-end">
          <WordScrub
            as="h2"
            className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.04em] text-black leading-[1.15] max-w-136"
          >
            {t('approach.headline')}
          </WordScrub>
          <p
            className="text-[0.9375rem] text-dark-gray leading-[1.7] max-w-136 md:ml-auto"
            data-anim
          >
            {t('approach.body')}
          </p>
        </div>

        {/* Full-width image on top */}
        <div
          className="relative w-full h-[clamp(280px,42vw,480px)] overflow-hidden rounded-card"
          data-anim
        >
          <Image
            src="https://images.unsplash.com/photo-1496236436299-cde70e3587cf?w=1600&h=900&fit=crop&q=85"
            alt="Brutalist concrete fins, raking light and shadow"
            fill
            sizes="100vw"
            className="approach-center-img object-cover [filter:grayscale(1)_contrast(1.2)_brightness(0.9)]"
          />
        </div>

        {/* 3-up bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim>
          {cards.map((c) => (
            <div
              key={c.key}
              className={`flex flex-col rounded-card p-7 ${
                c.dark ? 'bg-black' : 'bg-white border border-black/10'
              }`}
            >
              <svg
                className={`w-9 h-9 mb-4 ${c.dark ? 'text-white/80' : 'text-black/70'}`}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {c.icon}
              </svg>
              <div className={`text-lg font-bold mb-2 ${c.dark ? 'text-white' : 'text-black'}`}>
                {t(`approach.cards.${c.key}.title`)}
              </div>
              <div
                className={`text-sm leading-[1.6] ${c.dark ? 'text-white/50' : 'text-dark-gray'}`}
              >
                {t(`approach.cards.${c.key}.body`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
