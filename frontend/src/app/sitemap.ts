import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/ipo-gmp-today',
    '/upcoming-ipo',
    '/open-ipo',
    '/closed-ipo',
    '/ipo-allotment',
    '/learn',
    '/calculators',
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
