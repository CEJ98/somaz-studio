import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutClient from '@/components/AboutClient'
import { buildAlternates, metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('ogTitle'), description: t('ogDesc') },
    alternates: buildAlternates('/about', locale as 'en' | 'es'),
  }
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
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
      '@type': 'Person',
      name: 'Sofía Mazzucco',
      jobTitle: 'Space Designer & Interior Designer',
      description: 'Founder of Somaz Studio. Space designer and interior designer based in Miami, FL, with over 5 years of experience in 3D architectural visualization and interior design. Projects across the US, Latin America, and the Middle East.',
      url: `https://somazstudio.com/${locale}/about`,
      image: 'https://somazstudio.com/about-hero.jpg',
      email: 'hola@somazstudio.com',
      telephone: '+17865377682',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
      sameAs: [
        'https://instagram.com/somazstudio',
        'https://linkedin.com/company/somazstudio',
        'https://tiktok.com/@somazstudio',
      ],
      worksFor: {
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
        { '@type': 'ListItem', position: 2, name: 'About', item: `https://somazstudio.com/${locale}/about` },
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
      <AboutClient />
    </>
  )
}
