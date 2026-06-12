import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AnimWrapper from '@/components/ui/AnimWrapper'
import ServiceDetailHero from '@/components/services/detail/ServiceDetailHero'
import ServiceDetailBody from '@/components/services/detail/ServiceDetailBody'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import Footer from '@/components/layout/Footer'
import { getService, serviceSlugs } from '@/lib/services'

export function generateStaticParams() {
  return serviceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service | DevInvicta' }
  return {
    title: `${service.title} | DevInvicta`,
    description: service.intro,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      <ServiceDetailHero service={service} />
      <ServiceDetailBody service={service} />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
