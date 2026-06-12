import type { MetadataRoute } from 'next'
import { serviceSlugs } from '@/lib/services'
import { projectSlugs } from '@/data/projects'

const BASE = 'https://devinvicta.com'

const PRIORITY: Record<string, number> = {
  '/': 1.0,
  '/services': 0.9,
  '/about': 0.8,
  '/projects': 0.7,
  '/contact': 0.7,
}

function altLanguages(path: string) {
  const url = `${BASE}${path}`
  return {
    'pt-PT': url,
    en: url,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/services',
    '/about',
    '/projects',
    '/contact',
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY[path] ?? 0.7,
    alternates: { languages: altLanguages(path) },
  }))

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs().map((slug) => {
    const path = `/service-detail/${slug}`
    return {
      url: `${BASE}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages: altLanguages(path) },
    }
  })

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs().map((slug) => {
    const path = `/projects/${slug}`
    return {
      url: `${BASE}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: { languages: altLanguages(path) },
    }
  })

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
