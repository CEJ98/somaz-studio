import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'

vi.mock('@/lib/rate-limit', () => ({
  checkContactRateLimit: vi.fn().mockResolvedValue(false),
}))

vi.mock('@/lib/resend', () => ({
  getResend: vi.fn().mockReturnValue(null),
}))

const mockInsert = vi.fn().mockResolvedValue({ error: null })
vi.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}))

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  })
}

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+1234567890',
  project_type: '3D Visualization',
  budget: '$5K – $15K',
  sqft: '200',
  message: 'Test message',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
  })

  it('returns 400 when required fields are missing', async () => {
    const res = await POST(makeRequest({ name: 'Test' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Missing required fields')
  })

  it('returns 200 on successful submission', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 500 when Supabase fails', async () => {
    mockInsert.mockResolvedValueOnce({ error: { message: 'db error' } })
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(500)
  })

  it('returns 429 when rate limited', async () => {
    const { checkContactRateLimit } = await import('@/lib/rate-limit')
    vi.mocked(checkContactRateLimit).mockResolvedValueOnce(true)
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(429)
  })
})
