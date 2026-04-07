import { describe, it, expect } from 'vitest'
import { buildAlternates } from '@/lib/seo'

const ROUTES = [
  '/',
  '/work',
  '/services',
  '/about',
  '/contact',
  '/blog',
  '/privacy',
  '/terms',
]

describe('hreflang alternates', () => {
  it('every route has canonical, en, es, and x-default', () => {
    for (const route of ROUTES) {
      const alternates = buildAlternates(route)
      expect(alternates.canonical, `${route}: missing canonical`).toBeTruthy()
      expect(alternates.languages?.en, `${route}: missing en`).toBeTruthy()
      expect(alternates.languages?.es, `${route}: missing es`).toBeTruthy()
      expect(alternates.languages?.['x-default'], `${route}: missing x-default`).toBeTruthy()
    }
  })

  it('en and es point to different locale prefixes', () => {
    const a = buildAlternates('/services')
    expect(a.languages?.en).toContain('/en/')
    expect(a.languages?.es).toContain('/es/')
  })

  it('x-default matches en URL', () => {
    const a = buildAlternates('/about')
    expect(a.languages?.['x-default']).toBe(a.languages?.en)
  })
})
