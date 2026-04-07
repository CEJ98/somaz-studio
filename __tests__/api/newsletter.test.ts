import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/newsletter/route'

vi.mock('@/lib/rate-limit', () => ({
  checkNewsletterRateLimit: vi.fn().mockResolvedValue(false),
}))

vi.mock('@/lib/resend', () => ({
  getResend: vi.fn().mockReturnValue(null),
}))

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  })
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Email required')
  })

  it('returns 200 on successful subscription', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 429 when rate limited', async () => {
    const { checkNewsletterRateLimit } = await import('@/lib/rate-limit')
    vi.mocked(checkNewsletterRateLimit).mockResolvedValueOnce(true)
    const res = await POST(makeRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(429)
  })
})
