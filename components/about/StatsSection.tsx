import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'
import { Separator } from '@/components/ui/separator'

export default function StatsSection() {
  const t = useTranslations('about')
  return (
    <section className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:24px_24px] py-14 md:py-28 bg-ivory">
      <div className="mx-auto max-w-page px-5 md:px-8 grid grid-cols-1 md:grid-cols-[40%_1fr] gap-10 md:gap-20 items-stretch">
        <div className="relative flex w-full min-h-[260px] md:min-h-[400px]" data-anim>
          <Image
            src="https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?w=800&h=1000&fit=crop&q=85"
            alt="Draped linen, soft sculptural folds"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="stats-photo object-cover rounded-[1.25rem] [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
          />
        </div>
        <div className="flex flex-col justify-center pt-4">
          <div className="mb-8 flex flex-col gap-5">
            <WordScrub
              className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.035em] text-black leading-[1.2]"
              as="p"
            >
              {t('stats.introP1')}
            </WordScrub>
            <WordScrub
              className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.035em] text-black leading-[1.2]"
              as="p"
            >
              {t('stats.introP2')}
            </WordScrub>
          </div>
          <Separator className="bg-black/10" />
          <div
            className="grid grid-cols-[1fr_2fr] gap-8 py-7 border-b border-black/10 items-center"
            data-anim
          >
            <div
              className="stats-big text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] text-black leading-none"
              data-target="2"
              data-suffix="+"
            >
              0+
            </div>
            <div className="text-[0.9375rem] text-dark-gray leading-[1.65]">{t('stats.years')}</div>
          </div>
          <div
            className="grid grid-cols-[1fr_2fr] gap-8 py-7 border-b border-black/10 items-center"
            data-anim
          >
            <div className="stats-big text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] text-black leading-none">
              AI
            </div>
            <div className="text-[0.9375rem] text-dark-gray leading-[1.65]">{t('stats.ai')}</div>
          </div>
          <div
            className="grid grid-cols-[1fr_2fr] gap-8 py-7 border-b border-black/10 items-center"
            data-anim
          >
            <div
              className="stats-big text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] text-black leading-none"
              data-target="360"
              data-suffix="°"
            >
              0°
            </div>
            <div className="text-[0.9375rem] text-dark-gray leading-[1.65]">
              {t('stats.endToEnd')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
