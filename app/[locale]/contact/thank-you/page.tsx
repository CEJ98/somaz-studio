import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ThankYouContent from '@/components/ThankYouContent'
import { metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'thankyou' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    robots: { index: false, follow: false },
  }
}

export default function ThankYouPage() {
  return <ThankYouContent />
}
