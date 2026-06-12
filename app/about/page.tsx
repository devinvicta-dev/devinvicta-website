import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutHero from '@/components/about/AboutHero'
import PartnersSection from '@/components/about/PartnersSection'
import StatsSection from '@/components/about/StatsSection'
import MissionSection from '@/components/about/MissionSection'
import ServicesDarkSection from '@/components/about/ServicesDarkSection'
import ValuesBentoSection from '@/components/about/ValuesBentoSection'
import MilestonesSection from '@/components/about/MilestonesSection'
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
      <MilestonesSection />
      <ApproachSection />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
