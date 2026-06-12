import { cn } from '@/lib/utils'

interface SlideButtonProps {
  href?: string
  text: string
  className?: string
  /** White pill for dark sections. */
  variant?: 'default' | 'white'
  /** Render as a real <button> (e.g. form submit) instead of an anchor. */
  type?: 'submit' | 'button'
  disabled?: boolean
  /** Stretch to fill the container width. */
  full?: boolean
}

/**
 * Canonical pill button for the whole project. Black by default, white on dark
 * sections (`variant="white"`). Subtle opacity hover, no other motion.
 *
 * Use everywhere a CTA appears so every button matches the home "Let's talk".
 */
export default function SlideButton({
  href,
  text,
  className,
  variant = 'default',
  type,
  disabled,
  full,
}: SlideButtonProps) {
  const white = variant === 'white'

  const outer = cn(
    'inline-block cursor-pointer opacity-100 transition-opacity duration-200 ease-in-out hover:opacity-75 disabled:opacity-60',
    full && 'w-full',
    className
  )

  const pill = cn(
    'flex items-center justify-center gap-[0.6875rem] rounded-pill px-[1.375rem] py-[0.55rem]',
    white ? 'bg-white' : 'bg-black',
    full && 'w-full'
  )

  const label = cn(
    'block whitespace-nowrap text-base font-semibold leading-[1.2]',
    white ? 'text-black' : 'text-white'
  )

  const inner = (
    <div className={pill}>
      <div className="flex w-full items-center justify-center gap-[0.6875rem]">
        <div className="flex max-h-[1.4em] overflow-hidden">
          <span className={label}>{text}</span>
        </div>
      </div>
    </div>
  )

  if (type) {
    return (
      <button type={type} disabled={disabled} className={outer}>
        {inner}
      </button>
    )
  }

  return (
    <a href={href} className={outer}>
      {inner}
    </a>
  )
}
