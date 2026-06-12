'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import LocaleSwitcher from './LocaleSwitcher'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const linkClass =
  'text-[2rem] font-semibold text-white/85 tracking-[-0.03em] transition-opacity duration-200 hover:opacity-50'

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations('nav')
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[150] flex-col items-center justify-center gap-10 bg-black/[0.96]',
          isOpen ? 'flex' : 'hidden'
        )}
        id="mobile-nav"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/80 transition-opacity hover:opacity-50"
          aria-label="Close menu"
        >
          <X className="h-8 w-8" />
        </button>
        <Link href="/about" className={linkClass} onClick={onClose} data-close-nav>
          {t('about')}
        </Link>
        <Link href="/services" className={linkClass} onClick={onClose} data-close-nav>
          {t('services')}
        </Link>
        <Link href="/projects" className={linkClass} onClick={onClose} data-close-nav>
          {t('projects')}
        </Link>
        <Link href="/contact" className={linkClass} onClick={onClose} data-close-nav>
          {t('contact')}
        </Link>
        <LocaleSwitcher />
      </div>
    </>
  )
}
