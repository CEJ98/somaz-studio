import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import ProjectPageClient from '@/components/ProjectPageClient'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.brief,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.brief,
    creator: { '@type': 'Organization', name: 'Somaz Studio' },
    locationCreated: project.location,
    dateCreated: String(project.year),
    genre: project.category,
    image: `https://somazstudio.com${project.coverImage}`,
    url: `https://somazstudio.com/work/${project.slug}`,
  }

  // Safe: jsonLd is built entirely from static data in data/projects.ts, no user input
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectPageClient project={project} allProjects={projects} />
    </>
  )
}
