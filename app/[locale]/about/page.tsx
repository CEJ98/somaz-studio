import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutClient from '@/components/AboutClient'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('ogTitle'), description: t('ogDesc') },
    alternates: {
      canonical: `https://somazstudio.com/${locale}/about`,
      languages: { en: 'https://somazstudio.com/en/about', es: 'https://somazstudio.com/es/about' },
    },
  }
}

export default function AboutPage() {
  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Somaz Studio',
      url: 'https://somazstudio.com',
      logo: 'https://somazstudio.com/logos/logo-smz.png',
      email: 'hola@somazstudio.com',
      telephone: '+17865377682',
      description: 'Miami-based design studio with Latin American roots. Specializing in 3D visualization, interior design, and spatial concept development.',
      foundingDate: '2022',
      areaServed: 'Worldwide',
      sameAs: [
        'https://instagram.com/somazstudio',
        'https://linkedin.com/company/somazstudio',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://somazstudio.com' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://somazstudio.com/about' },
      ],
    },
  ])

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <AboutClient />
    </>
  )
}
