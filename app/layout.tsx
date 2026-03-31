import type { Metadata } from 'next'
import './globals.css'
import { cormorant, dmSans } from '@/lib/fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://somazstudio.com'),
  title: {
    default: 'Somaz Studio | 3D Visualization & Interior Design — Miami',
    template: '%s | Somaz Studio',
  },
  description:
    'Miami-based design studio specializing in 3D visualization, interior design, and spatial concepts. Working globally.',
  keywords: ['3D visualization', 'interior design', 'Miami', 'design studio', 'architectural visualization'],
  authors: [{ name: 'Somaz Studio' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://somazstudio.com',
    siteName: 'Somaz Studio',
    title: 'Somaz Studio — 3D Visualization & Interior Design',
    description:
      'Miami-based design studio. 3D visualization · Interior design · Spatial concepts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Somaz Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somaz Studio',
    description: 'Miami-based design studio. 3D visualization · Interior design · Spatial concepts.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
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
      </body>
    </html>
  )
}
