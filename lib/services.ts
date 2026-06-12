// Structural source of truth for the service-detail pages (`/service-detail/[slug]`).
//
// All *display* copy (titles, intros, bullets, features, closing copy) lives in
// the `services` locale namespace under `services.definitions.<slug>` so it can
// be translated (EN/PT). This file keeps only the locale-independent structure:
// slugs, image/video assets, the static "years" range, and the fixed counts for
// the bullet/feature lists (so components can map over them type-safely).

const CDN = 'https://cdn.prod.website-files.com'

// Shared looping video assets for the in-page video card + media band.
const VIDEO = {
  mp4: `${CDN}/691d92c72b801c04cbc08bec/694a4265ca26a17c56fab6fc_8303104-hd_1920_1080_24fps_mp4.mp4`,
  webm: `${CDN}/691d92c72b801c04cbc08bec/694a4265ca26a17c56fab6fc_8303104-hd_1920_1080_24fps_webm.webm`,
}

export interface Service {
  slug: string
  /** wide hero banner */
  heroImage: string
  years: string
  video: { mp4: string; webm: string; poster: string }
  /** number of process bullets defined in the locale for this service */
  bulletCount: number
  /** the fixed leading numbers for the feature grid (e.g. '01'…'04') */
  featureNums: string[]
}

type ServiceSeed = {
  slug: string
  heroImage: string
  poster: string
  bulletCount: number
  featureNums: string[]
}

const SEED: ServiceSeed[] = [
  {
    slug: 'web-development',
    heroImage:
      'https://images.unsplash.com/photo-1565626424178-c699f6601afd?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1565626424178-c699f6601afd?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'mobile-apps',
    heroImage:
      'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'ai-agents-llm',
    heroImage:
      'https://images.unsplash.com/photo-1602410086232-0cdfb78b434f?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1602410086232-0cdfb78b434f?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'ux-ui-design',
    heroImage:
      'https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'ai-automation',
    heroImage:
      'https://images.unsplash.com/photo-1547070451-ce386c65160a?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1547070451-ce386c65160a?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'cloud-backend',
    heroImage:
      'https://images.unsplash.com/photo-1496236436299-cde70e3587cf?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1496236436299-cde70e3587cf?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
  {
    slug: 'outsourcing',
    heroImage:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70',
    bulletCount: 2,
    featureNums: ['01', '02', '03', '04'],
  },
]

export const SERVICES: Service[] = SEED.map(({ poster, ...s }) => ({
  ...s,
  years: '2023 — 2025',
  video: { ...VIDEO, poster },
}))

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug)

export const serviceSlugs = (): string[] => SERVICES.map((s) => s.slug)
