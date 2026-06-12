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

export default function HomePage() {
  return (
    <AnimWrapper as="main">
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
