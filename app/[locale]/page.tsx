import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomePageClient from '@/components/HomePageClient'
import { buildAlternates } from '@/lib/seo'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a photorealistic render take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard delivery is 48–72 hours for a single view. Complex projects or 3+ views typically take 5–7 business days. Rush delivery (24h) is available for Essential packages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with projects outside Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we work globally. All we need are your blueprints, reference images, and a 30-minute briefing call. We have completed projects across 8+ countries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to get started?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A floor plan or sketch, reference images for style direction, and a brief description of the space. That is enough to begin. We handle the rest in the briefing call.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the revision process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every project includes 2 rounds of revisions. Additional revisions are billed at our hourly rate. We use a structured feedback form to make revisions fast and precise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer full interior design or only visualization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both. Our 3D Visualization service focuses on rendering existing plans. Our Interior Design service includes space planning, material selection, furniture layouts, and mood boards — delivered remotely.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum project price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Essential 3D visualization package starts at $350 for a single photorealistic view with 48–72h delivery. Interior design and conceptual design projects start at $800.',
      },
    },
  ],
}

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
    keywords: ['3D visualization Miami', 'photorealistic renders', 'interior design Miami', 'architectural visualization', 'real estate renders', '3D rendering studio', 'design studio Miami'],
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
      {/* FAQ JSON-LD structured data — static object, no user input */}
      <script type="application/ld+json" suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePageClient locale={locale} />
    </>
  )
}
