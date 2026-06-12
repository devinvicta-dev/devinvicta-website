// Structural source of truth for the Projects (case studies) pages.
//
// The listing page (`/projects`) and the detail page (`/projects/[slug]`) both
// render from this array. Display copy (title, category, client, challenge,
// solution) lives in the `projects` locale namespace under
// `projects.items.<slug>` so it can be translated (EN/PT). This file keeps only
// the locale-independent structure: the slug and the related service slugs.

export interface Project {
  slug: string
  /** Related service slugs from `lib/services.ts` to cross-link. */
  services?: string[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'europacolon',
    services: ['web-development', 'cloud-backend', 'ai-agents-llm', 'ux-ui-design'],
  },
  {
    slug: 'vmoove',
    services: ['web-development', 'cloud-backend', 'ai-automation'],
  },
  {
    slug: 'confidential-project',
    services: ['web-development', 'ai-agents-llm', 'cloud-backend'],
  },
  {
    slug: 'ecommerce',
    services: ['web-development', 'cloud-backend', 'ai-automation'],
  },
  {
    slug: 'fraud',
    services: ['ai-agents-llm', 'ai-automation', 'cloud-backend'],
  },
  {
    slug: 'insurance',
    services: ['web-development', 'ai-automation', 'cloud-backend'],
  },
  {
    slug: 'manufacturing',
    services: ['ai-agents-llm', 'ai-automation', 'cloud-backend'],
  },
  {
    slug: 'maritime',
    services: ['web-development', 'ai-automation', 'cloud-backend'],
  },
  {
    slug: 'automotive',
    services: ['mobile-apps', 'ai-agents-llm', 'cloud-backend'],
  },
]

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug)

export const projectSlugs = (): string[] => PROJECTS.map((p) => p.slug)
