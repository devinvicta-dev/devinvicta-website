import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import { getTranslations } from 'next-intl/server'
import { faqItems } from '@/data/faq'
import HeroSection from '@/components/home/HeroSection'
import LogosSection from '@/components/home/LogosSection'
import AboutSection from '@/components/home/AboutSection'
import CardsSection from '@/components/home/CardsSection'
import ServiceV1Section from '@/components/home/ServiceV1Section'
import ServiceV2Section from '@/components/home/ServiceV2Section'
import ReviewsSection from '@/components/home/ReviewsSection'
import FaqSection from '@/components/home/FaqSection'
import ServicesCtaSection from '@/components/services/ServicesCtaSection'
import Footer from '@/components/layout/Footer'
import AnimWrapper from '@/components/ui/AnimWrapper'
import CounterInit from '@/components/ui/CounterInit'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home')
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: { canonical: '/' },
  }
}

export default async function HomePage(): Promise<ReactElement> {
  const t = await getTranslations('home')

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ key }) => ({
      '@type': 'Question',
      name: t(`faq.items.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.items.${key}.answer`),
      },
    })),
  }

  return (
    <AnimWrapper as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CounterInit />
      <HeroSection />
      <LogosSection />
      <AboutSection />
      <CardsSection />
      <ServiceV1Section />
      <ServiceV2Section />
      <ReviewsSection />
      <FaqSection />
      <ServicesCtaSection />
      <Footer />
    </AnimWrapper>
  )
}
