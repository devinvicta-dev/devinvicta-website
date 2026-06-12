'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const OPTIONS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
] as const

/** Compact PT/EN language selector (no flags). Persists choice in a cookie. */
export default function LocaleSwitcher({ light = false }: { light?: boolean }) {
  const active = useLocale()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const select = (code: string) => {
    if (code === active) return
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000;samesite=lax`
      router.refresh()
    })
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-[length:var(--fs-h6)] font-medium',
        pending && 'opacity-60'
      )}
      aria-label="Language"
    >
      {OPTIONS.map((o, i) => (
        <span key={o.code} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => select(o.code)}
            aria-pressed={active === o.code}
            className={cn(
              'cursor-pointer transition-opacity hover:opacity-100',
              light ? 'text-black' : 'text-white',
              active === o.code ? 'opacity-100' : 'opacity-40'
            )}
          >
            {o.label}
          </button>
          {i === 0 && <span className={light ? 'text-black/25' : 'text-white/25'}>/</span>}
        </span>
      ))}
    </div>
  )
}
