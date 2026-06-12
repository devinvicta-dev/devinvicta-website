import type { Metadata } from 'next'
import AnimWrapper from '@/components/ui/AnimWrapper'
import ContactHero from '@/components/contact/ContactHero'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contact | DevInvicta',
  description:
    'Let’s connect. Reach out to DevInvicta about AI agents, web platforms and mobile apps. Tell us about your project and budget and we’ll get back to you.',
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
