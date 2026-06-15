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
    keywords: [
      'software house Portugal',
      'agentes IA Porto',
      'AI agents Portugal',
      'EU AI Act compliance',
      'desenvolvimento software Porto',
      'web development Portugal',
      'mobile apps Portugal',
      'DevInvicta',
    ],
    authors: [{ name: 'DevInvicta', url: 'https://devinvicta.com' }],
    alternates: {
      canonical: '/',
      languages: {
        'pt-PT': BASE,
        en: BASE,
        'x-default': BASE,
      },
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
        { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: BASE,
      siteName: 'DevInvicta',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: '/cover.png',
          width: 3046,
          height: 2160,
          alt: 'DevInvicta — AI Agents, Web & Mobile Software House',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/cover.png'],
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
    logo: 'https://devinvicta.com/android-chrome-512x512.png',
    description:
      'AI-focused software house building custom, scalable software (AI agents, web platforms and mobile apps) with responsible AI and EU AI Act compliance.',
    email: 'info@devinvicta.com',
    telephone: '+351928144223',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Porto',
      addressRegion: 'Norte',
      addressCountry: 'PT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.1579,
      longitude: -8.6291,
    },
    areaServed: [
      { '@type': 'Country', name: 'Portugal' },
      { '@type': 'Place', name: 'European Union' },
    ],
    founder: { '@type': 'Person', name: 'José Neves' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'DevInvicta Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agents Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Platform Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'EU AI Act Compliance Consulting' } },
      ],
    },
    sameAs: ['https://www.linkedin.com/company/devinvicta/'],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevInvicta',
    url: 'https://devinvicta.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://devinvicta.com/?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang={locale} className={interTight.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
