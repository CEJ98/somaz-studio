import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomePageClient from '@/components/HomePageClient'
import { buildAlternates, metadataBase } from '@/lib/seo'

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

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    metadataBase,
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
  const t = await getTranslations({ locale, namespace: 'home' })
  return (
    <>
      {/* FAQ JSON-LD structured data — static object, no user input */}
      <script type="application/ld+json" suppressHydrationWarning

        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* SSR-rendered hero text for AI crawlers (ChatGPT, Perplexity, Google AI Overviews).
          The animated Hero below overlays this visually after hydration. */}
      <div className="sr-only">
        <h1>{t('heroLine1')} {t('heroLine2')}</h1>
        <p>{t('heroSubline')}</p>
        <p>{t('badge')}</p>
      </div>
      <HomePageClient locale={locale} />
    </>
  )
}
