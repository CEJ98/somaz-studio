import { describe, it, expect } from 'vitest'
import { siteConfig } from '@/lib/site-config'

describe('siteConfig', () => {
  it('has all required fields', () => {
    expect(siteConfig.name).toBe('Somaz Studio')
    expect(siteConfig.email).toContain('@')
    expect(siteConfig.domain).toMatch(/^https:\/\//)
    expect(siteConfig.phone).toBeTruthy()
    expect(siteConfig.address.locality).toBe('Miami')
  })

  it('has valid URLs', () => {
    const urls = [siteConfig.domain, siteConfig.whatsapp, siteConfig.instagram, siteConfig.linkedin, siteConfig.logo]
    for (const url of urls) {
      expect(() => new URL(url)).not.toThrow()
    }
  })

  it('has valid geo coordinates', () => {
    expect(siteConfig.geo.latitude).toBeGreaterThan(-90)
    expect(siteConfig.geo.latitude).toBeLessThan(90)
    expect(siteConfig.geo.longitude).toBeGreaterThan(-180)
    expect(siteConfig.geo.longitude).toBeLessThan(180)
  })
})
