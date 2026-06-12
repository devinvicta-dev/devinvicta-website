import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { Project } from '@/data/projects'

/**
 * Editorial project card for the `/projects` listing. Typographic, no imagery —
 * a kicker (category), the title, and a one-line summary of the solution, on a
 * white panel that inverts to black on hover (matching the service sidebar).
 */
export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('projects')

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-anim
      className="group flex flex-col justify-between gap-12 rounded-panel bg-white p-7 ring-1 ring-black/10 transition-colors duration-300 hover:bg-black md:p-9"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="text-sub font-medium tracking-[0.08em] text-dark-gray uppercase transition-colors duration-300 group-hover:text-white/70">
          {t(`items.${project.slug}.category`)}
        </span>
        <span
          aria-hidden
          className="text-h5 leading-none text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
        >
          →
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-h4 leading-[1.1] font-semibold tracking-[-0.03em] text-black transition-colors duration-300 group-hover:text-white">
          {t(`items.${project.slug}.title`)}
        </h2>
        <p className="text-body leading-[1.6] text-dark-gray transition-colors duration-300 group-hover:text-white/70">
          {t(`items.${project.slug}.solution`)}
        </p>
      </div>
    </Link>
  )
}
