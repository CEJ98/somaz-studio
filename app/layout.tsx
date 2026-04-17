import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { bodoniModa, dmSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://somazstudio.com'),
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={`${bodoniModa.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  )
}
