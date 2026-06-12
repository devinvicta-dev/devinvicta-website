import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import '@/styles/globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

const BASE = 'https://devinvicta.com'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-tight',
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home')
  const locale = await getLocale()
  const ogLocale = locale === 'pt' ? 'pt_PT' : 'en_US'

  return {
    metadataBase: new URL(BASE),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: '/',
      languages: {
        'pt-PT': BASE,
        en: BASE,
        'x-default': BASE,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: BASE,
      siteName: 'DevInvicta',
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DevInvicta',
    url: 'https://devinvicta.com',
    description:
      'AI-focused software house building custom, scalable software (AI agents, web platforms and mobile apps) with responsible AI and EU AI Act compliance.',
    email: 'info@devinvicta.com',
    telephone: '+351928144223',
    founder: { '@type': 'Person', name: 'José Neves' },
    sameAs: ['https://www.linkedin.com/company/devinvicta/'],
  }

  return (
    <html lang={locale} className={interTight.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
