import { getLocale } from 'next-intl/server'
import { cormorant, dmSans } from '@/lib/fonts'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  )
}
