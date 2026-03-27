import type { Metadata } from 'next'
import AboutClient from '@/components/AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Miami-based design studio with Latin American roots. Specializing in 3D visualization, interior design, and spatial concept development.',
  openGraph: {
    title: 'About Somaz Studio',
    description: 'A Latin American perspective. A global design language. Based in Miami.',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
