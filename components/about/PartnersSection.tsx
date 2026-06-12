import WordScrub from '@/components/ui/WordScrub'

export default function PartnersSection() {
  return (
    <section className="bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:24px_24px] py-14 md:py-28 bg-ivory">
      <div className="mx-auto max-w-page px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div data-anim>
          <p className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-dark-gray pt-[0.4rem]">
            Our Mission
          </p>
        </div>
        <div>
          <WordScrub
            className="text-[clamp(1.3rem,2.5vw,2rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-black"
            as="p"
          >
            We engineer software that scales, performs and ships, turning complex technical
            challenges into intelligent systems that accelerate your business from day one.
          </WordScrub>
        </div>
      </div>
    </section>
  )
}
