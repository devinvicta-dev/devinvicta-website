import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimWrapper from '@/components/ui/AnimWrapper'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import ProjectCard from '@/components/projects/ProjectCard'
import { Separator } from '@/components/ui/separator'
import { PROJECTS } from '@/data/projects'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('projects')
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function ProjectsPage() {
  const t = await getTranslations('projects')
  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      <section className="relative overflow-hidden bg-transparent">
        <Navbar light />
        <div className="mx-auto max-w-page px-5 pt-24 md:pt-28 pb-20 md:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h1
              data-anim
              className="text-h1 leading-[0.9] font-semibold tracking-[-0.044em] text-black"
            >
              {t('list.title')}
            </h1>
            <p data-anim className="max-w-sm text-body leading-[1.625] text-dark-gray lg:pb-3">
              {t('list.intro')}
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <div className="mb-8 flex items-center justify-between text-sub font-medium tracking-[0.08em] text-dark-gray uppercase">
              <span data-anim>{t('list.caseStudies')}</span>
              <span data-anim>{String(PROJECTS.length).padStart(2, '0')}</span>
            </div>
            <Separator className="bg-black/10" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
