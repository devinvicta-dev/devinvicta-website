import type { MetadataRoute } from 'next'
import { serviceSlugs } from '@/lib/services'

const BASE = 'https://devinvicta.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/services', '/contact']
  const serviceRoutes = serviceSlugs().map((slug) => `/service-detail/${slug}`)

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path.startsWith('/service-detail') ? 0.6 : 0.8,
  }))
}
