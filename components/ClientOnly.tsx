'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })
const Analytics = dynamic(() => import('@/components/Analytics'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false })

export function ClientOnlyCursor() {
  return <CustomCursor />
}

export function ClientOnlyWhatsApp() {
  return <WhatsAppButton />
}

export function ClientOnlyAnalytics() {
  return <Analytics />
}

export function ClientOnlyCookieConsent() {
  return <CookieConsent />
}
