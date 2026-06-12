'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const linkClass =
  'text-[2rem] font-semibold text-white/85 tracking-[-0.03em] transition-opacity duration-200 hover:opacity-50'

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[150] flex-col items-center justify-center gap-10 bg-black/[0.96]',
        isOpen ? 'flex' : 'hidden'
      )}
      id="mobile-nav"
    >
      <Link href="/about" className={linkClass} onClick={onClose} data-close-nav>
        About
      </Link>
      <Link href="/services" className={linkClass} onClick={onClose} data-close-nav>
        Services
      </Link>
      <Link href="/contact" className={linkClass} onClick={onClose} data-close-nav>
        Contact
      </Link>
    </div>
  )
}
