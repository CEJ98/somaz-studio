import { describe, it, expect } from 'vitest'
import { posts } from '@/data/posts'

describe('posts data', () => {
  it('has at least one post', () => {
    expect(posts.length).toBeGreaterThan(0)
  })

  it('all slugs are unique', () => {
    const slugs = posts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all dates are valid ISO format', () => {
    for (const p of posts) {
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(new Date(p.date).toString()).not.toBe('Invalid Date')
    }
  })

  it('all categories are valid', () => {
    const valid = ['Commercial Intent', 'Process', 'Projects', 'Case Study', 'Design Thinking']
    for (const p of posts) {
      expect(valid).toContain(p.category)
    }
  })

  it('all LocaleString fields have en and es', () => {
    for (const p of posts) {
      expect(p.title.en).toBeTruthy()
      expect(p.title.es).toBeTruthy()
      expect(p.excerpt.en).toBeTruthy()
      expect(p.excerpt.es).toBeTruthy()
      expect(p.content.en).toBeTruthy()
      expect(p.content.es).toBeTruthy()
    }
  })
})
