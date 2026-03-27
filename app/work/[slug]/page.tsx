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

  return <ProjectPageClient project={project} allProjects={projects} />
}
