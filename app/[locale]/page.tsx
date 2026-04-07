import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomePageClient from '@/components/HomePageClient'
import { buildAlternates } from '@/lib/seo'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://somazstudio.com',
  name: 'Somaz Studio',
  description: '3D visualization, interior design, and conceptual design studio based in Miami, FL. Working globally.',
  url: 'https://somazstudio.com',
  telephone: '+17865377682',
  email: 'hola@somazstudio.com',
  priceRange: '$$$',
  image: 'https://somazstudio.com/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  sameAs: [
    'https://instagram.com/somazstudio',
    'https://linkedin.com/company/somazstudio',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '6',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Michael Kriger' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Somaz Studio turned our blueprints into renders so realistic that investors thought we were showing photos of a finished project. We closed funding two months ahead of schedule.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Paula Marchetti' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'They redesigned our penthouse remotely — every material, every detail felt intentional. The finished space matched the renders almost perfectly.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Tomás Mazzucco' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Fast, precise, and incredibly professional. Our gym rebranding needed photorealistic visuals in under a week — Somaz delivered in four days.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Rodrigo Estévez' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'The 3D visualization helped us sell 60% of units before breaking ground.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Carolina Vega' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Their conceptual design process helped us discover possibilities we never considered. What started as a simple renovation became the home we always dreamed of.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Diego Ferraro' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'The attention to lighting in their renders is unmatched. Every scene looked like a photograph from a design magazine.',
    },
  ],
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: {
      title: t('metaTitle'),
      description: t('ogDesc'),
    },
    alternates: buildAlternates('', locale as 'en' | 'es'),
  }
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const jsonLd = JSON.stringify(localBusinessJsonLd)
  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script type="application/ld+json" suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <HomePageClient locale={locale} />
    </>
  )
}
