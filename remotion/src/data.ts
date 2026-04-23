export interface ReelProject {
  title: string
  slug: string
  category: string
  location: string
  year: number
  coverImage: string
  images: string[]
}

export const projects: ReelProject[] = [
  {
    title: 'Casa M',
    slug: 'casa-m',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2025,
    coverImage: '/projects/casa-m/01.jpg',
    images: [
      '/projects/casa-m/01.jpg',
      '/projects/casa-m/02.jpg',
      '/projects/casa-m/03.jpg',
    ],
  },
  {
    title: 'Casa T',
    slug: 'casa-tiago',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2025,
    coverImage: '/projects/casa-tiago/01.jpg',
    images: [
      '/projects/casa-tiago/01.jpg',
      '/projects/casa-tiago/cover.jpg',
      '/projects/casa-tiago/02.jpg',
    ],
  },
]

export const getProject = (slug: string): ReelProject => {
  const p = projects.find((x) => x.slug === slug)
  if (!p) throw new Error(`Project not found: ${slug}`)
  return p
}
