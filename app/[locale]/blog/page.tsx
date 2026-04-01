import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import BlogClient from '@/components/BlogClient'
import { posts } from '@/data/posts'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('ogTitle'), description: t('ogDesc') },
    alternates: {
      canonical: `https://somazstudio.com/${locale}/blog`,
      languages: { en: 'https://somazstudio.com/en/blog', es: 'https://somazstudio.com/es/blog' },
    },
  }
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params

  const jsonLd = JSON.stringify({
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
  })

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <BlogClient posts={posts} locale={locale} />
    </>
  )
}
