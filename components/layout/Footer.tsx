import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-ivory pt-14 md:pt-28">
      <div className="mx-auto flex max-w-page flex-col items-start gap-10 px-5 pb-10 md:px-8 md:pb-20 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-112 flex-1 flex-col gap-6">
          <Image
            src="/assets/logo/devinvicta.svg"
            alt="DevInvicta"
            width={220}
            height={37}
            unoptimized
            className="logo-brand h-auto w-55"
          />
          <p className="text-[0.9375rem] leading-[1.6] text-gray">{t('tagline')}</p>
        </div>
        <div className="flex flex-wrap gap-11.25 md:flex-nowrap">
          <div className="flex flex-col gap-7.5">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('quickLinks')}</h6>
            <Link
              href="/"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              {t('links.home')}
            </Link>
            <Link
              href="/about"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              {t('links.about')}
            </Link>
            <Link
              href="/contact"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              {t('links.contact')}
            </Link>
          </div>
          <div className="flex flex-col gap-7.5">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('services')}</h6>
            <Link
              href="/service-detail/ai-agents-llm"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              AI Agents &amp; LLM
            </Link>
            <Link
              href="/service-detail/web-development"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              Web Development
            </Link>
            <Link
              href="/service-detail/mobile-apps"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              Mobile Apps
            </Link>
            <Link
              href="/service-detail/cloud-backend"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              Cloud &amp; Backend
            </Link>
            <Link
              href="/service-detail/ux-ui-design"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              UX/UI Design
            </Link>
            <Link
              href="/service-detail/ai-automation"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              AI Automation &amp; Workflows
            </Link>
            <Link
              href="/service-detail/outsourcing"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              Outsourcing
            </Link>
          </div>
          <div className="flex flex-col gap-7.5">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('contact')}</h6>
            <a
              href="mailto:info@devinvicta.com"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              info@devinvicta.com
            </a>
            <a
              href="tel:+351928277832"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-1.6 hover:text-black"
            >
              +351 928 277 832
            </a>
          </div>
        </div>
      </div>
      <Separator className="mx-auto max-w-page bg-black/10" />
      <div className="mx-auto flex max-w-page justify-between px-5 pt-7.5 pb-11.25 text-sm text-gray md:px-8">
        <span>{t('copyright', { year: new Date().getFullYear() })}</span>
      </div>
    </footer>
  )
}
