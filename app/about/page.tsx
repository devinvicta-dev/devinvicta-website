import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutHero from '@/components/about/AboutHero'
import PartnersSection from '@/components/about/PartnersSection'
import StatsSection from '@/components/about/StatsSection'
import MissionSection from '@/components/about/MissionSection'
import ServicesDarkSection from '@/components/about/ServicesDarkSection'
import ValuesBentoSection from '@/components/about/ValuesBentoSection'
import ApproachSection from '@/components/about/ApproachSection'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import Footer from '@/components/layout/Footer'
import AnimWrapper from '@/components/ui/AnimWrapper'
import AboutAnimInit from '@/components/about/AboutAnimInit'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: { canonical: '/about' },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: 'https://devinvicta.com/about',
      siteName: 'DevInvicta',
      locale: 'pt_PT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  }
}

export default function AboutPage() {
  return (
    <AnimWrapper as="main">
      <AboutAnimInit />
      <AboutHero />
      <PartnersSection />
      <StatsSection />
      <MissionSection />
      <ServicesDarkSection />
      <ValuesBentoSection />
      <ApproachSection />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
