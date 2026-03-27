import type { Metadata } from 'next'
import WorkClient from '@/components/WorkClient'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Selected projects by Somaz Studio — 3D visualization, interior design, and conceptual design across Miami, Latin America, and beyond.',
  openGraph: {
    title: 'Our Work | Somaz Studio',
    description: 'A curated selection of 3D visualization, interior design, and conceptual design projects.',
  },
}

export default function WorkPage() {
  return <WorkClient />
}
