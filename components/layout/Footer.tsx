import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="bg-ivory pt-14 md:pt-28">
      <div className="mx-auto flex max-w-page flex-col items-start gap-10 px-5 pb-10 md:px-8 md:pb-20 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[28rem] flex-1 flex-col gap-6">
          <span
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0a0a0a',
            }}
          >
            DevInvicta
          </span>
          <p className="text-[0.9375rem] leading-[1.6] text-gray">
            AI agents, web platforms and mobile apps engineered to scale, automate and outperform.
          </p>
          <div className="flex gap-2.5">
            <a
              href="https://www.linkedin.com/company/devinvicta/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/20 [transition:background_0.3s] hover:bg-black"
            >
              <img
                src="/assets/svgs/social-li.svg"
                alt="LinkedIn"
                className="w-4 group-hover:invert"
              />
            </a>
            <a
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/20 [transition:background_0.3s] hover:bg-black"
            >
              <img
                src="/assets/svgs/social-ig.svg"
                alt="Instagram"
                className="w-4 group-hover:invert"
              />
            </a>
            <a
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/20 [transition:background_0.3s] hover:bg-black"
            >
              <img
                src="/assets/svgs/social-x.svg"
                alt="X / Twitter"
                className="w-4 group-hover:invert"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-[2.8125rem] md:flex-nowrap">
          <div className="flex flex-col gap-[1.875rem]">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">Quick links</h6>
            <Link
              href="/"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              About
            </Link>
            <Link
              href="/#reviews"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="block text-[0.9375rem] text-gray [transition:color_0.2s,transform_0.2s] hover:translate-x-[0.4rem] hover:text-black"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">Services</h6>
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
            <h6 className="mb-2 text-[0.9375rem] font-semibold text-black">Contact</h6>
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
        <span className="block text-[clamp(4rem,12vw,12rem)] font-extrabold leading-none tracking-[-0.1rem] text-black">
          DevInvicta
        </span>
      </div>
      <Separator className="mx-auto max-w-page bg-black/10" />
      <div className="mx-auto flex max-w-page justify-between px-5 pt-[1.875rem] pb-[2.8125rem] text-sm text-gray md:px-8">
        <span>&copy; 2025 DevInvicta. All rights reserved.</span>
      </div>
    </footer>
  )
}
