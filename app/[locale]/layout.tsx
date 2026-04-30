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
import SiteAnalytics from '@/components/Analytics'
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd'
import ServiceJsonLd from '@/components/seo/ServiceJsonLd'
import MotionProvider from '@/components/MotionProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://somazstudio.com'),
  title: {
    default: 'Somaz Studio | Architecture, Interiors & Visualization — Miami and Argentina',
    template: '%s | Somaz Studio',
  },
  description: 'Architecture, interiors, and visualization studio based in Miami. Residential, commercial, and hospitality projects with a clear and contemporary approach.',
  keywords: ['architecture studio Miami', 'interior design Miami', 'architectural visualization', 'Argentina architecture studio', 'residential hospitality development design'],
  authors: [{ name: 'Somaz Studio' }],
  openGraph: {
    type: 'website',
    url: 'https://somazstudio.com',
    siteName: 'Somaz Studio',
    title: 'Somaz Studio — Architecture, Interiors & Visualization',
    description: 'Architecture · Interiors · Visualization for residential, commercial, and hospitality projects.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Somaz Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somaz Studio',
    description: 'Architecture · Interiors · Visualization for residential, commercial, and hospitality projects.',
    images: ['/og-image.jpg'],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://somazstudio.com',
    languages: {
      en: 'https://somazstudio.com/en',
      es: 'https://somazstudio.com/es',
      'x-default': 'https://somazstudio.com',
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
      <MotionProvider>
      <>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:tracking-widest focus:uppercase"
          >
            Skip to content
          </a>
          <SiteAnalytics />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
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
          <LocalBusinessJsonLd />
          <ServiceJsonLd />
      </>
      </MotionProvider>
    </NextIntlClientProvider>
  )
}
