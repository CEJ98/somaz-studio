export type ProjectCategory = 'All' | '3D Visualization' | 'Interior Design' | 'Conceptual Design'

export interface Project {
  title: string
  slug: string
  category: Exclude<ProjectCategory, 'All'>
  location: string
  year: number
  area?: string
  coverImage: string
  images: string[]
  description: string
  brief: string
}

export const projects: Project[] = [
  {
    title: 'Casa Brickell',
    slug: 'casa-brickell',
    category: 'Interior Design',
    location: 'Miami, FL',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
    ],
    brief: 'Full interior design for a luxury residence in Brickell.',
    description:
      'A 3,200 sqft penthouse in the heart of Brickell, Miami. The brief called for a warm, sophisticated palette that balanced the urban energy of the city with the calm of a private retreat. We worked with natural stone, custom millwork, and curated furniture pieces to create a space that feels both refined and livable.',
  },
  {
    title: 'Torre Conceptual',
    slug: 'torre-conceptual',
    category: '3D Visualization',
    location: 'Buenos Aires, Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1400&q=80',
    ],
    brief: 'Photorealistic visualization for a mixed-use tower proposal.',
    description:
      'A mixed-use tower proposal for the Puerto Madero waterfront in Buenos Aires. We delivered a full set of photorealistic renderings — exterior, lobby, and amenity floors — that helped the developer secure pre-sales 8 months before groundbreaking.',
  },
  {
    title: 'Penthouse NW',
    slug: 'penthouse-nw',
    category: 'Interior Design',
    location: 'Miami, FL',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=80',
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1400&q=80',
    ],
    brief: 'Minimalist penthouse design for a private client.',
    description:
      'A full interior design project for a top-floor residence in Wynwood, Miami. The client wanted a dark, gallery-like atmosphere with museum-quality lighting. We developed a concept around raw concrete, brushed metal, and bespoke furniture — all specified and delivered remotely.',
  },
  {
    title: 'Lobby Comercial',
    slug: 'lobby-comercial',
    category: '3D Visualization',
    location: 'Bogotá, Colombia',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1400&q=80',
    ],
    brief: 'Corporate lobby visualization for permit approval process.',
    description:
      'A corporate headquarters lobby in the financial district of Bogotá. The visualization was developed to support the permit approval process and investor presentations. We delivered 4 photorealistic views and a 30-second fly-through animation within 5 business days.',
  },
  {
    title: 'Estudio Residencial',
    slug: 'estudio-residencial',
    category: 'Conceptual Design',
    location: 'Miami, FL',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80',
    ],
    brief: 'Conceptual design for a live/work artist studio in Miami.',
    description:
      'A concept for a live/work artist studio in Little Haiti, Miami. The design explores the tension between industrial and domestic, using repurposed materials, flexible spaces, and a strong material palette. The concept was developed in 3 weeks as a pre-design study for a local developer.',
  },
]

export const categories: ProjectCategory[] = [
  'All',
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
]
