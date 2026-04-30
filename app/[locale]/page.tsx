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
      name: 'How does Somaz start a project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every project starts with a short first contact. From there we define the clearest next step based on the project and its stage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with projects outside Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Somaz works with clients in Miami, Argentina, and other markets through a remote process that keeps communication and deliverables clear.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to get started?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A brief description of the project, any plans or sketches you already have, and a few reference images are enough to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the revision process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every project includes 2 rounds of revisions. Additional revisions require a written scope adjustment or change order. We use a structured feedback form to keep revisions fast and precise.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Somaz deliver directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Somaz works across architecture, interiors, visualization, and presentation material, depending on what the project needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a project scoped and quoted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Projects are scoped in phases rather than public hourly pricing. Scope, deliverables, revision rounds, exclusions, fees, and partner coordination are defined in writing before production starts.',
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
    keywords: ['architecture studio Miami', 'interior design Miami', 'architectural visualization', 'hospitality interiors', 'residential architecture', 'commercial design studio'],
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
