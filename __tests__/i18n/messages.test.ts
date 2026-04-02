import { describe, it, expect } from 'vitest'
import en from '@/messages/en.json'
import es from '@/messages/es.json'

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return getKeys(value as Record<string, unknown>, path)
    }
    return [path]
  })
}

describe('i18n messages', () => {
  it('en.json and es.json have the same keys', () => {
    const enKeys = getKeys(en).sort()
    const esKeys = getKeys(es).sort()
    expect(enKeys).toEqual(esKeys)
  })

  it('no empty translation values', () => {
    const check = (obj: Record<string, unknown>, lang: string, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'string') {
          expect(value.trim(), `${lang}:${path} is empty`).not.toBe('')
        } else if (typeof value === 'object' && value !== null) {
          check(value as Record<string, unknown>, lang, path)
        }
      }
    }
    check(en, 'en')
    check(es, 'es')
  })
})
