import Image from 'next/image'
import { useTranslations } from 'next-intl'
import WordScrub from '@/components/ui/WordScrub'

export default function ValuesBentoSection() {
  const t = useTranslations('about')
  return (
    <section className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:24px_24px] py-14 md:py-28 bg-ivory">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <WordScrub className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.04em] text-black leading-[1.15] text-center mb-14 max-w-[38rem] mx-auto">
          {t('values.headline')}
        </WordScrub>
        <div className="flex flex-wrap min-[1025px]:flex-nowrap gap-5 items-stretch">
          {/* Card 1: dark image */}
          <div
            className="grow shrink basis-full md:basis-[calc(50%-0.625rem)] min-[1025px]:basis-0 min-[1025px]:flex-1 min-w-0 rounded-[1.25rem] overflow-hidden p-8 flex flex-col gap-4 min-h-[320px] cursor-default bg-black"
            data-anim
          >
            <div className="w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center text-[1.1rem] text-white/50 self-end">
              +
            </div>
            <div className="text-[1.125rem] font-bold tracking-[-0.02em] text-white mt-auto">
              {t('values.responsibleAi.title')}
            </div>
            <div className="text-[0.9375rem] text-white/55 leading-[1.6]">
              {t('values.responsibleAi.body')}
            </div>
          </div>
          {/* Card 2: white stat card */}
          <div
            className="grow shrink basis-full md:basis-[calc(50%-0.625rem)] min-[1025px]:basis-0 min-[1025px]:flex-1 min-w-0 rounded-[1.25rem] overflow-hidden p-8 flex flex-col gap-4 min-h-[320px] cursor-default bg-white border border-black/10"
            data-anim
          >
            <div
              className="val-card-stat text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-[-0.05em] text-black"
              data-target="98"
              data-suffix="%"
            >
              0%
            </div>
            <div className="text-[0.9375rem] font-bold text-black">
              {t('values.clientFocus.title')}
            </div>
            <div
              className="text-[0.9375rem] text-dark-gray leading-[1.6]"
              style={{ marginTop: 'auto' }}
            >
              {t('values.clientFocus.body')}
            </div>
            <div className="flex" style={{ marginTop: '1rem' }}>
              <Image
                src="/assets/images/reviewer-1.jpg"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 first:ml-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
              />
              <Image
                src="/assets/images/reviewer-2.jpg"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 first:ml-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
              />
              <Image
                src="/assets/images/reviewer-3.jpg"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 first:ml-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
              />
              <Image
                src="/assets/images/reviewer-4.jpg"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 first:ml-0 [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
              />
            </div>
          </div>
          {/* Card 3: blue accent (wide) */}
          <div
            className="grow shrink basis-full md:basis-[calc(50%-0.625rem)] min-[1025px]:basis-0 min-[1025px]:flex-[2] min-w-0 rounded-[1.25rem] overflow-hidden p-8 flex flex-col gap-4 min-h-[320px] cursor-default bg-blue"
            data-anim
          >
            <div
              className="w-8 h-8 border-2 rounded-full flex items-center justify-center text-[1.1rem]"
              style={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.7)',
                alignSelf: 'flex-end',
              }}
            >
              +
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div
                style={{
                  fontSize: 'clamp(2rem,4vw,3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                }}
              >
                EU
              </div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                {t('values.compliance.title')}
              </div>
              <div
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}
              >
                {t('values.compliance.body')}
              </div>
            </div>
          </div>
          {/* Card 4: dark */}
          <div
            className="grow shrink basis-full md:basis-[calc(50%-0.625rem)] min-[1025px]:basis-0 min-[1025px]:flex-1 min-w-0 rounded-[1.25rem] overflow-hidden p-8 flex flex-col gap-4 min-h-[320px] cursor-default bg-black"
            data-anim
          >
            <div className="w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center text-[1.1rem] text-white/50 self-end">
              +
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                {t('values.excellence.title')}
              </div>
              <div
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
              >
                {t('values.excellence.body')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
