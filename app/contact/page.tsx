import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AnimWrapper from '@/components/ui/AnimWrapper'
import ContactHero from '@/components/contact/ContactHero'
import Footer from '@/components/layout/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact')
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: { canonical: '/contact' },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: 'https://devinvicta.com/contact',
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

export default function ContactPage() {
  return (
    <AnimWrapper
      as="main"
      className="bg-ivory bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1.6px)] [background-size:24px_24px]"
    >
      <ContactHero />
      <Footer />
    </AnimWrapper>
  )
}
