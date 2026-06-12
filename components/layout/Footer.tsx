import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-ivory pt-14 md:pt-28">
      <div className="mx-auto flex max-w-page flex-col items-start gap-10 px-5 pb-10 md:px-8 md:pb-20 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[28rem] flex-1 flex-col gap-6">
          {}
          <img
            src="/assets/logo/devinvicta.svg"
            alt="DevInvicta"
            className="logo-brand h-auto w-[150px]"
          />
          <p className="text-[0.9375rem] leading-[1.6] text-gray">{t('tagline')}</p>
        </div>
        <div className="flex flex-wrap gap-[2.8125rem] md:flex-nowrap">
          <div className="flex flex-col gap-[1.875rem]">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('quickLinks')}</h6>
            <Link
              href="/"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              {t('links.home')}
            </Link>
            <Link
              href="/about"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              {t('links.about')}
            </Link>
            <Link
              href="/contact"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              {t('links.contact')}
            </Link>
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('services')}</h6>
            <Link
              href="/service-detail/ai-agents-llm"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              AI Agents &amp; LLM
            </Link>
            <Link
              href="/service-detail/web-development"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Web Development
            </Link>
            <Link
              href="/service-detail/mobile-apps"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Mobile Apps
            </Link>
            <Link
              href="/service-detail/cloud-backend"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Cloud &amp; Backend
            </Link>
            <Link
              href="/service-detail/ux-ui-design"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              UX/UI Design
            </Link>
            <Link
              href="/service-detail/ai-automation"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              AI Automation &amp; Workflows
            </Link>
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">{t('contact')}</h6>
            <a
              href="mailto:info@devinvicta.com"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              info@devinvicta.com
            </a>
            <a
              href="tel:+351928144223"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              +351 928 144 223
            </a>
          </div>
        </div>
      </div>
      <Separator className="mx-auto max-w-page bg-black/10" />
      <div className="mx-auto max-w-page overflow-hidden px-5 pt-2 md:px-8">
        {}
        <img
          src="/assets/logo/devinvicta.svg"
          alt="DevInvicta"
          className="logo-brand block h-auto w-full"
        />
      </div>
      <Separator className="mx-auto max-w-page bg-black/10" />
      <div className="mx-auto flex max-w-page justify-between px-5 pt-[1.875rem] pb-[2.8125rem] text-sm text-gray md:px-8">
        <span>{t('copyright')}</span>
      </div>
    </footer>
  )
}
