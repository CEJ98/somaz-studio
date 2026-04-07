import { test, expect } from '@playwright/test'

test.describe('Home EN', () => {
  test('loads and hero is visible', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/en')
    await expect(page.locator('h1, [data-testid="hero"]').first()).toBeVisible()
    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0)
  })
})

test.describe('Home ES', () => {
  test('loads and hero is visible', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/es')
    await expect(page.locator('h1, [data-testid="hero"]').first()).toBeVisible()
    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0)
  })
})

test.describe('/services', () => {
  test('shows PricingTable', async ({ page }) => {
    await page.goto('/en/services')
    // PricingTable renders a 3-col grid with pricing cards
    await expect(page.locator('.grid.sm\\:grid-cols-3').first()).toBeVisible()
  })
})

test.describe('/contact', () => {
  test('form accepts input and submits (mocked)', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }),
    )
    await page.goto('/en/contact')
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.selectOption('select[name="project_type"]', { index: 1 })
    await page.selectOption('select[name="budget"]', { index: 1 })
    await page.fill('textarea[name="message"]', 'Hello from smoke test')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/thank-you/, { timeout: 10000 })
  })
})

test.describe('/work/[slug]', () => {
  test('first project loads without error', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/en/work/casa-marchetti')
    await expect(page.locator('h1').first()).toBeVisible()
    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0)
  })
})
