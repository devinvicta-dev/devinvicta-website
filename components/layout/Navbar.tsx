'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'
import LocaleSwitcher from './LocaleSwitcher'

export default function Navbar({ light = false }: { light?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('nav')

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const linkColor = light ? 'text-black/75' : 'text-white/80'

  return (
    <>
      <nav
        className="absolute inset-x-0 top-0 z-100 px-5 pb-4 pt-4 md:px-10 md:pb-4 md:pt-8"
        id="navbar"
      >
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="DevInvicta home" className="flex items-center">
            <Image
              src="/assets/logo/devinvicta.svg"
              alt="DevInvicta"
              width={160}
              height={40}
              unoptimized
              className={cn('h-auto w-35 md:w-40', light ? 'logo-brand' : 'logo-brand-light')}
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/about"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              {t('about')}
            </Link>
            <Link
              href="/services"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              {t('services')}
            </Link>
            <Link
              href="/projects"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              {t('projects')}
            </Link>
            <Link
              href="/contact"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              {t('contact')}
            </Link>
            <LocaleSwitcher light={light} />
          </div>
          <button
            className={cn(
              'z-200 flex cursor-pointer flex-col justify-center gap-1.25 border-none bg-transparent p-1.5 md:hidden',
              light && 'text-black'
            )}
            id="hamburger"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] transition-[transform,opacity] duration-300 ease-[ease]',
                light ? 'bg-black/90' : 'bg-white/90',
                menuOpen && 'translate-y-[7px] rotate-45'
              )}
            ></span>
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] transition-[transform,opacity] duration-300 ease-[ease]',
                light ? 'bg-black/90' : 'bg-white/90',
                menuOpen && 'opacity-0'
              )}
            ></span>
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] transition-[transform,opacity] duration-300 ease-[ease]',
                light ? 'bg-black/90' : 'bg-white/90',
                menuOpen && 'translate-y-[-7px] -rotate-45'
              )}
            ></span>
          </button>
        </div>
      </nav>
      <MobileNav isOpen={menuOpen} onClose={closeMenu} />
    </>
  )
}
