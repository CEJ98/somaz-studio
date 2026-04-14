import { describe, it, expect } from 'vitest'
import { services } from '@/data/services'

describe('services data', () => {
  it('has at least one service', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('all slugs are unique', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all LocaleString fields have en and es', () => {
    for (const s of services) {
      expect(s.title.en).toBeTruthy()
      expect(s.title.es).toBeTruthy()
      expect(s.tagline.en).toBeTruthy()
      expect(s.tagline.es).toBeTruthy()
      expect(s.description.en).toBeTruthy()
      expect(s.description.es).toBeTruthy()
    }
  })
})
