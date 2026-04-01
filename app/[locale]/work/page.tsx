import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import WorkClient from '@/components/WorkClient'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'work' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: {
      title: `${t('metaTitle')} | Somaz Studio`,
      description: t('ogDesc'),
    },
    alternates: {
      canonical: `https://somazstudio.com/${locale}/work`,
      languages: { en: 'https://somazstudio.com/en/work', es: 'https://somazstudio.com/es/work' },
    },
  }
}

export default async function WorkPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  return <WorkClient locale={locale} />
}
