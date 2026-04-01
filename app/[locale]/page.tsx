import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomePageClient from '@/components/HomePageClient'

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
    alternates: {
      canonical: `https://somazstudio.com/${locale}`,
      languages: {
        en: 'https://somazstudio.com/en',
        es: 'https://somazstudio.com/es',
      },
    },
  }
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  return <HomePageClient locale={locale} />
}
