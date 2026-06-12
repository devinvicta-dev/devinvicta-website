import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
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
  const t = await getTranslations('services')
  if (!service) return { title: t('detail.meta.fallbackTitle') }
  const title = `${t(`definitions.${slug}.title`)} | DevInvicta`
  const description = t(`definitions.${slug}.intro`)
  return {
    title,
    description,
    alternates: { canonical: `/service-detail/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `https://devinvicta.com/service-detail/${slug}`,
      siteName: 'DevInvicta',
      locale: 'pt_PT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const t = await getTranslations('services')
  const serviceName = t(`definitions.${slug}.title`)
  const serviceDescription = t(`definitions.${slug}.intro`)
  const serviceUrl = `https://devinvicta.com/service-detail/${slug}`

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'DevInvicta',
      url: 'https://devinvicta.com',
    },
    url: serviceUrl,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devinvicta.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://devinvicta.com/services',
      },
      { '@type': 'ListItem', position: 3, name: serviceName, item: serviceUrl },
    ],
  }

  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceDetailHero service={service} />
      <ServiceDetailBody service={service} />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
