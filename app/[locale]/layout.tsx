import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import { cormorant, dmSans } from '@/lib/fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { locales } from '@/i18n/config'

import { ClientOnlyCursor, ClientOnlyWhatsApp } from '@/components/ClientOnly'

export const metadata: Metadata = {
  metadataBase: new URL('https://somazstudio.com'),
  title: {
    default: 'Somaz Studio | 3D Visualization & Interior Design — Miami',
    template: '%s | Somaz Studio',
  },
  description: 'Miami-based design studio specializing in 3D visualization, interior design, and spatial concepts. Working globally.',
  keywords: ['3D visualization', 'interior design', 'Miami', 'design studio', 'architectural visualization'],
  authors: [{ name: 'Somaz Studio' }],
  openGraph: {
    type: 'website',
    url: 'https://somazstudio.com',
    siteName: 'Somaz Studio',
    title: 'Somaz Studio — 3D Visualization & Interior Design',
    description: 'Miami-based design studio. 3D visualization · Interior design · Spatial concepts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somaz Studio',
    description: 'Miami-based design studio. 3D visualization · Interior design · Spatial concepts.',
  },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const { locale } = params
  if (!locales.includes(locale as (typeof locales)[number])) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:tracking-widest focus:uppercase"
          >
            Skip to content
          </a>
          <ClientOnlyCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ClientOnlyWhatsApp />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#2E2E2B',
                border: '1px solid #3A3A37',
                color: '#F0EDE6',
                fontFamily: 'var(--font-dm-sans)',
              },
            }}
          />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
