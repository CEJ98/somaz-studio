import { Ratelimit, type Duration } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Serverless-safe rate limiting using Upstash Redis.
// Falls back to in-memory if env vars are not configured.

function createRateLimiter(maxRequests: number, window: Duration) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    return new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(maxRequests, window),
      analytics: true,
    })
  }

  // Fallback: in-memory (partial protection in serverless)
  return null
}

// Contact form: 5 per hour
const contactLimiter = createRateLimiter(5, '1 h')

// In-memory fallback maps
const memoryMaps = {
  contact: new Map<string, { count: number; resetAt: number }>(),
}

function memoryCheck(map: Map<string, { count: number; resetAt: number }>, ip: string, max: number): boolean {
  const now = Date.now()
  const entry = map.get(ip)
  if (!entry || now > entry.resetAt) {
    map.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  if (entry.count >= max) return true
  entry.count++
  return false
}

export async function checkContactRateLimit(ip: string): Promise<boolean> {
  if (contactLimiter) {
    const { success } = await contactLimiter.limit(ip)
    return !success
  }
  return memoryCheck(memoryMaps.contact, ip, 5)
}
