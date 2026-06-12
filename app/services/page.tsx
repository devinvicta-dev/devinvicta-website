import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ServicesHero from '@/components/services/ServicesHero'
import StrategyFeaturesSection from '@/components/services/StrategyFeaturesSection'
import ServicesAccordionSection from '@/components/services/ServicesAccordionSection'
import ServicesWorkSection from '@/components/services/ServicesWorkSection'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import Footer from '@/components/layout/Footer'
import AnimWrapper from '@/components/ui/AnimWrapper'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services')
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function ServicesPage() {
  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      <ServicesHero />
      <StrategyFeaturesSection />
      <ServicesAccordionSection />
      <ServicesWorkSection />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
