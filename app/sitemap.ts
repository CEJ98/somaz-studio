import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { posts } from '@/data/posts'
import { locales } from '@/i18n/config'

const SITE_LAST_UPDATED = new Date('2025-04-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://somazstudio.com'

  const staticPaths = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1, lastMod: SITE_LAST_UPDATED },
    { path: '/work', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: SITE_LAST_UPDATED },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: SITE_LAST_UPDATED },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.7, lastMod: new Date('2024-06-01') },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8, lastMod: new Date('2024-06-01') },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: new Date('2024-01-01') },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: new Date('2024-01-01') },
    { path: '/blog', changeFrequency: 'monthly' as const, priority: 0.7, lastMod: SITE_LAST_UPDATED },
  ]

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority, lastMod }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: lastMod,
      changeFrequency,
      priority,
    }))
  )

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/work/${p.slug}`,
      lastModified: new Date(p.year, 0, 1),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  )

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((p) => ({
      url: `${base}/${locale}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
