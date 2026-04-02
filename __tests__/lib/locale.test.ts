import { describe, it, expect } from 'vitest'
import { t } from '@/lib/locale'

describe('t()', () => {
  const field = { en: 'Hello', es: 'Hola' }

  it('returns Spanish when locale is "es"', () => {
    expect(t(field, 'es')).toBe('Hola')
  })

  it('returns English when locale is "en"', () => {
    expect(t(field, 'en')).toBe('Hello')
  })

  it('falls back to English for unknown locales', () => {
    expect(t(field, 'fr')).toBe('Hello')
    expect(t(field, '')).toBe('Hello')
  })
})
