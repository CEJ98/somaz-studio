import { describe, it, expect } from 'vitest'
import { projects, categories } from '@/data/projects'

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('all slugs are unique', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all categories are valid', () => {
    const valid = categories.filter((c) => c !== 'All')
    for (const p of projects) {
      expect(valid).toContain(p.category)
    }
  })

  it('all sizes are valid', () => {
    for (const p of projects) {
      expect(['large', 'medium', 'small']).toContain(p.size)
    }
  })

  it('all LocaleString fields have en and es', () => {
    for (const p of projects) {
      expect(p.description.en).toBeTruthy()
      expect(p.description.es).toBeTruthy()
      expect(p.brief.en).toBeTruthy()
      expect(p.brief.es).toBeTruthy()
      if (p.outcome) {
        expect(p.outcome.en).toBeTruthy()
        expect(p.outcome.es).toBeTruthy()
      }
    }
  })

  it('all projects have a cover image and at least one gallery image', () => {
    for (const p of projects) {
      expect(p.coverImage).toBeTruthy()
      expect(p.images.length).toBeGreaterThan(0)
    }
  })
})

describe('categories', () => {
  it('includes All and at least one real category', () => {
    expect(categories).toContain('All')
    expect(categories.length).toBeGreaterThan(1)
  })
})
