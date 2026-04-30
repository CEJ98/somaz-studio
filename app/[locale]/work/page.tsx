import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import WorkClient from '@/components/WorkClient'
import { buildAlternates, metadataBase } from '@/lib/seo'
import { projects } from '@/data/projects'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'work' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: {
      title: `${t('metaTitle')} | Somaz Studio`,
      description: t('ogDesc'),
    },
    alternates: buildAlternates('/work', locale as 'en' | 'es'),
  }
}

export default async function WorkPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `https://somazstudio.com/${locale}/work` },
      ],
    },
    {
      '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Somaz Studio Portfolio',
        url: `https://somazstudio.com/${locale}/work`,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://somazstudio.com/${locale}/work/${project.slug}`,
          name: project.title,
          description: project.outcome_metric[locale as 'en' | 'es'] ?? project.outcome_metric.en,
        })),
      },
    ])

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
         
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <WorkClient />
    </>
  )
}
