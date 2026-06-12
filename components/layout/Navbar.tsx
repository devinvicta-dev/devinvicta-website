'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'

export default function Navbar({ light = false }: { light?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
        className="absolute inset-x-0 top-0 z-[100] px-5 pb-4 pt-4 md:px-10 md:pb-4 md:pt-8"
        id="navbar"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              'text-[1.1rem] font-extrabold tracking-[-0.03em]',
              light ? 'text-black' : 'text-white'
            )}
          >
            DevInvicta
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/about"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              About
            </Link>
            <Link
              href="/services"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={cn(
                'relative text-[length:var(--fs-h6)] font-medium transition-opacity duration-[250ms] hover:opacity-50',
                linkColor
              )}
            >
              Contact
            </Link>
          </div>
          <button
            className="z-[200] flex cursor-pointer flex-col justify-center gap-[5px] border-none bg-transparent p-1.5 md:hidden"
            id="hamburger"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] bg-white/90 transition-all duration-300 ease-[ease]',
                menuOpen && 'translate-y-[7px] rotate-45'
              )}
            ></span>
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] bg-white/90 transition-all duration-300 ease-[ease]',
                menuOpen && 'opacity-0'
              )}
            ></span>
            <span
              className={cn(
                'block h-0.5 w-5 rounded-[2px] bg-white/90 transition-all duration-300 ease-[ease]',
                menuOpen && '-translate-y-[7px] -rotate-45'
              )}
            ></span>
          </button>
        </div>
      </nav>
      <MobileNav isOpen={menuOpen} onClose={closeMenu} />
    </>
  )
}
