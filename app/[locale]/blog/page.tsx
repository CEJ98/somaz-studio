import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import BlogClient from '@/components/BlogClient'
import { posts } from '@/data/posts'
import { buildAlternates, metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('ogTitle'), description: t('ogDesc') },
    alternates: buildAlternates('/blog', locale as 'en' | 'es'),
  }
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Somaz Studio Notes',
      description: 'Design thinking, process insights, and project stories from Somaz Studio.',
      url: 'https://somazstudio.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'Somaz Studio',
        url: 'https://somazstudio.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://somazstudio.com/${locale}/blog` },
      ],
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
      <BlogClient posts={posts} locale={locale} />
    </>
  )
}
