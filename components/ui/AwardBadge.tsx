import { cn } from '@/lib/utils'

/**
 * Live-text circular "seal" badge.
 *
 * Renders the ring of text ("AWARD WINNING SOLUTIONS · SINCE 2024 ·") as real,
 * selectable SVG <textPath> wrapped around a circle — so the year stays editable
 * text (replaces the old vectorized Webflow SVG where "2012" was outline paths).
 *
 * Uses the site body font (Inter Tight via --font-inter-tight) and pure black,
 * on a transparent background, sized via the className passed by the consumer.
 */
export default function AwardBadge({
  className,
  text = 'AWARD WINNING SOLUTIONS · SINCE 2024 · ',
  ...props
}: React.ComponentProps<'svg'> & { text?: string }) {
  // A circle centered at 56,56 with r=44 inside a 112x112 box.
  const ringPath = 'M 56,12 a 44,44 0 1,1 0,88 a 44,44 0 1,1 0,-88'

  return (
    <svg
      viewBox="0 0 112 112"
      role="img"
      aria-label={text.replace(/\s*·\s*/g, ' ').trim()}
      className={cn('block', className)}
      {...props}
    >
      <defs>
        <path id="award-badge-ring" d={ringPath} fill="none" />
      </defs>
      <text
        fill="#000000"
        style={{
          fontFamily: 'var(--font-inter-tight), "Inter Tight", sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
        }}
      >
        <textPath href="#award-badge-ring" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  )
}
