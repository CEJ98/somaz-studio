import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { locales } from '@/i18n/config'

import { ClientOnlyCursor, ClientOnlyWhatsApp, ClientOnlyAnalytics, ClientOnlyCookieConsent } from '@/components/ClientOnly'
import ScrollToTop from '@/components/ScrollToTop'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd'
import ServiceJsonLd from '@/components/seo/ServiceJsonLd'

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
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Somaz Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somaz Studio',
    description: 'Miami-based design studio. 3D visualization · Interior design · Spatial concepts.',
    images: ['/og-image.jpg'],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://somazstudio.com/en',
    languages: {
      en: 'https://somazstudio.com/en',
      es: 'https://somazstudio.com/es',
      'x-default': 'https://somazstudio.com/en',
    },
    types: {
      'application/rss+xml': 'https://somazstudio.com/feed.xml',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#F8F6F2',
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
    <NextIntlClientProvider messages={messages}>
      <>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:tracking-widest focus:uppercase"
          >
            Skip to content
          </a>
          <ClientOnlyCursor />
          <ClientOnlyAnalytics />
          <ClientOnlyCookieConsent />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ClientOnlyWhatsApp />
          <ScrollToTop />
          <Toaster
            theme="light"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#EAE7E0',
                border: '1px solid #C8C3B8',
                color: '#1A1A1A',
                fontFamily: 'var(--font-dm-sans)',
              },
            }}
          />
          {process.env.VERCEL === '1' && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
          <OrganizationJsonLd />
          <LocalBusinessJsonLd />
          <ServiceJsonLd />
      </>
    </NextIntlClientProvider>
  )
}
