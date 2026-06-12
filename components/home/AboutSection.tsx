import Image from 'next/image'
import WordScrub from '@/components/ui/WordScrub'
import SlideButton from '@/components/ui/SlideButton'
import { Separator } from '@/components/ui/separator'

export default function AboutSection() {
  return (
    <section
      className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:22px_22px] py-14 md:py-28"
      id="about"
    >
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="flex flex-col items-center justify-between gap-[1.875rem] md:flex-row">
          <div className="flex max-w-[36.25rem] flex-1 flex-col items-stretch gap-8 md:flex-row md:gap-12 lg:gap-[7.375rem]">
            <div className="relative flex max-w-[2.8rem] flex-1 flex-row items-center md:flex-col">
              <span className="whitespace-nowrap text-sm font-semibold tracking-[0.0675rem] text-gray md:origin-[left_center] md:[transform:translate(0,2.625rem)_rotate(-90deg)]">
                ABOUT US
              </span>
              <Separator
                orientation="vertical"
                className="absolute right-0 top-0 hidden h-full bg-black/20 md:block"
              />
            </div>
            <div className="mb-[-0.375rem] flex max-w-[29rem] flex-1 flex-col gap-[3.125rem]">
              <WordScrub className="max-w-[26.4375rem] text-[clamp(1.5625rem,3.5vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black">
                We partner with ambitious teams building the next wave of AI-powered products
              </WordScrub>
              <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between md:gap-[1.875rem]">
                <div className="flex max-w-full flex-col gap-10 md:max-w-[17rem]">
                  <p
                    className="mt-5 text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.625]"
                    data-anim=""
                  >
                    &ldquo;They shipped our AI agent pipeline in three weeks. The system handles 80%
                    of our support tickets automatically. We couldn&apos;t have imagined this speed
                    without them.&rdquo;
                  </p>
                  <div data-anim="">
                    <SlideButton href="/contact" text="Let's talk" />
                  </div>
                </div>
                <div className="relative self-start md:self-end" data-anim="">
                  <div className="relative flex items-start">
                    <div className="flex h-[clamp(2.5rem,7vw,9.37rem)] items-end overflow-hidden text-[clamp(1.5rem,7vw,9.37rem)] font-semibold leading-none text-black">
                      <span className="counter-value" data-target="5">
                        0
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold tracking-[0.0675rem] text-gray">
                    YEARS OF EXPERIENCE
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[32.5rem] flex-1" data-anim="fade">
            <Image
              src="/assets/images/about.jpg"
              alt="DevInvicta Team"
              width={900}
              height={1200}
              sizes="(max-width: 768px) 100vw, 32.5rem"
              className="h-auto w-full rounded-card object-cover [filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
