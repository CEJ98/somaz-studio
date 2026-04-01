'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })

export function ClientOnlyCursor() {
  return <CustomCursor />
}

export function ClientOnlyWhatsApp() {
  return <WhatsAppButton />
}
