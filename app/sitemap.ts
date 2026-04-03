import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { posts } from '@/data/posts'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://somazstudio.com'

  const staticPaths = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/work', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/blog', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date('2025-01-01'),
      changeFrequency,
      priority,
    }))
  )

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/work/${p.slug}`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  )

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((p) => ({
      url: `${base}/${locale}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }))
  )

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
