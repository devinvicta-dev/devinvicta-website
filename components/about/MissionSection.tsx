import Image from 'next/image'
import WordScrub from '@/components/ui/WordScrub'

export default function MissionSection() {
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
            We build intelligent, scalable software that generates real value for businesses,
            pairing technological innovation with technical rigor and a focus on client results.
          </WordScrub>
          <p className="text-base text-dark-gray leading-[1.7]" data-anim>
            Our vision is to be the European reference in AI software development, recognised for
            technical excellence, regulatory compliance and the ability to transform businesses.
          </p>
        </div>
        <div className="hidden md:flex flex-col gap-6 items-start" data-anim>
          <div className="relative w-full h-[clamp(420px,50vw,620px)]">
            <Image
              src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=700&h=900&fit=crop&q=80"
              alt="Minimalist modern architecture"
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
