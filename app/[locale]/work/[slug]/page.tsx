import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { locales } from '@/i18n/config'
import { t } from '@/lib/locale'
import ProjectPageClient from '@/components/ProjectPageClient'
import { buildAlternates, metadataBase } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const brief = t(project.brief, locale)
  const ogImage = `https://somazstudio.com${project.coverImage}`
  return {
    title: project.title,
    description: brief,
    openGraph: {
      title: `${project.title} | Somaz Studio`,
      description: brief,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 800, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Somaz Studio`,
      description: brief,
      images: [ogImage],
    },
    alternates: buildAlternates(`/work/${slug}`, locale as 'en' | 'es'),
  }
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const { locale, slug } = params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: t(project.brief, locale),
      creator: { '@type': 'Organization', name: 'Somaz Studio' },
      locationCreated: project.location,
      dateCreated: String(project.year),
      genre: project.category,
      image: `https://somazstudio.com${project.coverImage}`,
      url: `https://somazstudio.com/${locale}/work/${project.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `https://somazstudio.com/${locale}/work` },
        { '@type': 'ListItem', position: 3, name: project.title, item: `https://somazstudio.com/${locale}/work/${project.slug}` },
      ],
    },
  ])

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ProjectPageClient project={project} allProjects={projects} locale={locale} />
    </>
  )
}
