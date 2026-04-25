import { test, expect } from '@playwright/test'

test.describe('Home EN', () => {
  test('loads and hero is visible', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/en')
    await expect(page.locator('h1, [data-testid="hero"]').first()).toBeVisible()
    expect(errors.filter((e) => !e.includes('favicon') && !e.includes('MIME') && !e.includes('Refused to') && !e.includes('500'))).toHaveLength(0)
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
    expect(errors.filter((e) => !e.includes('favicon') && !e.includes('MIME') && !e.includes('Refused to') && !e.includes('500'))).toHaveLength(0)
  })
})

test.describe('/services', () => {
  test('shows services and comparison', async ({ page }) => {
    await page.goto('/en/services')
    await expect(page.getByTestId('services-list')).toBeVisible()
    await expect(page.getByTestId('services-comparison')).toBeVisible()
    await expect(page.getByRole('heading', { name: /3d visualization/i })).toBeVisible()
  })
})

test.describe('/contact', () => {
  test('form renders all required fields and submit button', async ({ page }) => {
    await page.goto('/en/contact')
    await page.waitForLoadState('load')
    // Verificar que el form tiene todos sus campos y botón de submit
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="project_type"]')).toBeVisible()
    await expect(page.locator('select[name="timeline"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
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
    expect(errors.filter((e) => !e.includes('favicon') && !e.includes('MIME') && !e.includes('Refused to') && !e.includes('500'))).toHaveLength(0)
  })
})
