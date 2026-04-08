import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const PAGES = ['/en', '/en/services', '/en/contact']

for (const path of PAGES) {
  test(`axe — ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('load')
    await page.waitForTimeout(800)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    const critical = results.violations.filter((v) => v.impact === 'critical')
    const serious = results.violations.filter((v) => v.impact === 'serious')

    if (critical.length + serious.length > 0) {
      console.error('Axe violations:', JSON.stringify([...critical, ...serious], null, 2))
    }

    expect(critical, 'critical violations').toHaveLength(0)
    expect(serious, 'serious violations').toHaveLength(0)
  })
}
