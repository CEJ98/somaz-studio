import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/en/contact/thank-you', '/es/contact/thank-you'],
    },
    host: 'https://somazstudio.com',
    sitemap: 'https://somazstudio.com/sitemap.xml',
  }
}
