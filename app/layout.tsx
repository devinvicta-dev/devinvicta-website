import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import '@/styles/globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-tight',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://devinvicta.com'),
  title: 'DevInvicta | AI Agents, Web & Mobile',
  description:
    'AI agents, web platforms and mobile apps engineered to scale, automate, and outperform.',
  openGraph: {
    title: 'DevInvicta | AI Agents, Web & Mobile',
    description:
      'AI agents, web platforms and mobile apps engineered to scale, automate, and outperform.',
    url: 'https://devinvicta.com',
    siteName: 'DevInvicta',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevInvicta | AI Agents, Web & Mobile',
    description:
      'AI agents, web platforms and mobile apps engineered to scale, automate, and outperform.',
  },
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
