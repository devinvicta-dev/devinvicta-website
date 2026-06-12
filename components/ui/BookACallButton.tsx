import { cn } from '@/lib/utils'

interface BookACallButtonProps {
  /**
   * Visual style. `light` is a white pill for dark backgrounds;
   * `dark` is a black pill for light backgrounds.
   */
  variant?: 'light' | 'dark'
  /** Extra classes, mainly for positioning. */
  className?: string
  /** Override the link target (defaults to `/contact`). */
  href?: string
  /** Override the label (defaults to "Book a call"). */
  label?: string
}

/**
 * "Book a call" CTA pill linking to /contact. Self-contained and accepts a
 * className for positioning, so it can be dropped into hero sections.
 *
 * `variant="light"` for dark backgrounds, `variant="dark"` for light ones.
 * Intentionally static — no motion/animation, only a hover colour change.
 */
export default function BookACallButton({
  variant = 'dark',
  className,
  href = '/contact',
  label = 'Book a call',
}: BookACallButtonProps) {
  const light = variant === 'light'

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-6 py-3',
        'text-base font-semibold leading-[1.2] tracking-[-0.01em] transition-colors duration-200',
        light ? 'bg-white text-black hover:bg-ivory' : 'bg-black text-white hover:bg-purple',
        className
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
