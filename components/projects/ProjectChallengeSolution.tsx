import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { getService } from '@/lib/services'
import type { Project } from '@/data/projects'

export default function ProjectChallengeSolution({ project }: { project: Project }) {
  const t = useTranslations('projects')
  const tServices = useTranslations('services')

  const related = (project.services ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* sidebar: project meta */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <dl className="flex flex-col gap-6">
              <div data-anim>
                <dt className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
                  {t('detail.discipline')}
                </dt>
                <dd className="mt-2 text-h5 font-semibold tracking-[-0.01em] text-black">
                  {t(`items.${project.slug}.category`)}
                </dd>
              </div>
              <div data-anim>
                <dt className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
                  {t('detail.type')}
                </dt>
                <dd className="mt-2 text-h5 font-semibold tracking-[-0.01em] text-black">
                  {t('detail.typeValue')}
                </dd>
              </div>
              {project.website ? (
                <div data-anim>
                  <Link
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sub font-semibold text-brand-accent transition-opacity duration-300 hover:opacity-70"
                  >
                    {t('detail.visitWebsite')}
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              ) : null}
            </dl>
          </aside>

          {/* right editorial column */}
          <div className="flex flex-col">
            {/* challenge */}
            <span
              data-anim
              className="text-sub font-medium tracking-[0.08em] text-brand-accent uppercase"
            >
              {t('detail.challengeLabel')}
            </span>
            <p data-anim className="mt-5 text-body leading-[1.75] text-dark-gray">
              {t(`items.${project.slug}.challenge`)}
            </p>

            {/* solution */}
            <span
              data-anim
              className="mt-12 text-sub font-medium tracking-[0.08em] text-brand-accent uppercase"
            >
              {t('detail.solutionLabel')}
            </span>
            <h2
              data-anim
              className="mt-3 text-h3 leading-[1.2] font-semibold tracking-[-0.03em] text-black"
            >
              {t(`items.${project.slug}.category`)}
            </h2>
            <p data-anim className="mt-5 text-body leading-[1.75] text-dark-gray">
              {t(`items.${project.slug}.solution`)}
            </p>

            {/* related services */}
            {related.length ? (
              <>
                <h4
                  data-anim
                  className="mt-12 text-h4 leading-[1.3] font-semibold tracking-[-0.02em] text-black"
                >
                  {t('detail.relatedServices')}
                </h4>
                <ul className="mt-6 flex flex-col gap-3">
                  {related.map((s) => (
                    <li key={s.slug} data-anim>
                      <Link
                        href={`/service-detail/${s.slug}`}
                        className="group flex items-center justify-between rounded-pill bg-white px-6 py-4 text-button font-semibold text-black ring-1 ring-black/10 transition-colors duration-300 hover:bg-black hover:text-white"
                      >
                        {tServices(`definitions.${s.slug}.title`)}
                        <span className="transition-colors duration-300 group-hover:text-white">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Separator className="bg-black/10" />
    </section>
  )
}
