import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimWrapper from '@/components/ui/AnimWrapper'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import ProjectChallengeSolution from '@/components/projects/ProjectChallengeSolution'
import { Separator } from '@/components/ui/separator'
import { getProject, projectSlugs } from '@/data/projects'

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  const t = await getTranslations('projects')
  if (!project) return { title: t('meta.fallbackTitle') }
  return {
    title: `${t(`items.${slug}.title`)} | DevInvicta`,
    description: t(`items.${slug}.solution`),
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const t = await getTranslations('projects')

  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      {/* hero — typographic, on the light background */}
      <section className="relative bg-transparent">
        <Navbar light />
        <div className="mx-auto max-w-page px-5 pt-24 md:pt-28 pb-10 md:px-8">
          <Link
            data-anim
            href="/projects"
            className="inline-flex items-center gap-2 text-sub font-medium tracking-[0.08em] text-dark-gray uppercase transition-colors duration-300 hover:text-black"
          >
            <span aria-hidden>←</span> {t('detail.allProjects')}
          </Link>
          <span
            data-anim
            className="mt-8 block text-sub font-medium tracking-[0.08em] text-fiery-red uppercase"
          >
            {t(`items.${slug}.category`)}
          </span>
          <h1
            data-anim
            className="mt-4 max-w-[18ch] text-h1 leading-[0.95] font-semibold tracking-[-0.044em] text-black"
          >
            {t(`items.${slug}.title`)}
          </h1>
        </div>

        <div className="mx-auto max-w-page px-5 md:px-8">
          <div className="grid grid-cols-1 gap-3 py-6 text-sub font-medium tracking-[0.08em] text-dark-gray uppercase sm:grid-cols-3">
            <span data-anim>{t('detail.projectDetails')}</span>
            <span data-anim className="sm:text-center">
              {t('detail.caseStudy')}
            </span>
            <span data-anim className="sm:text-right">
              {t('detail.fallbackClient')}
            </span>
          </div>
          <Separator className="bg-black/10" />
        </div>
      </section>

      <ProjectChallengeSolution project={project} />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
