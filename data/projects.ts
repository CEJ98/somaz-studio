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
    title: 'Casa Marchetti Concepción',
    slug: 'casa-marchetti-concepcion',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
    ],
    brief: 'Diseño integral de residencia privada.',
    description: 'Proyecto de diseño interior para residencia privada.',
  },
  {
    title: 'Fábrica Marina Mazzucco',
    slug: 'fabrica-marina-mazzucco',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1400&q=80',
    ],
    brief: 'Reconversión de espacio industrial en uso mixto.',
    description: 'Proyecto de diseño conceptual para espacio industrial.',
  },
  {
    title: 'Dúplex Nati Sola',
    slug: 'duplex-nati-sola',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=80',
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1400&q=80',
    ],
    brief: 'Diseño de dúplex residencial.',
    description: 'Proyecto de diseño interior para dúplex residencial.',
  },
  {
    title: 'Tiago',
    slug: 'tiago',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80',
    ],
    brief: 'Proyecto de diseño para cliente privado.',
    description: 'Proyecto de diseño interior para cliente privado.',
  },
  {
    title: 'Complejo Cabañas Terraciello',
    slug: 'complejo-cabanas-terraciello',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1400&q=80',
    ],
    brief: 'Diseño de complejo de cabañas.',
    description: 'Proyecto de diseño para complejo de cabañas.',
  },
  {
    title: 'Casa Roberto Farías',
    slug: 'casa-roberto-farias',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
    ],
    brief: 'Diseño integral de residencia privada.',
    description: 'Proyecto de diseño interior para residencia privada.',
  },
  {
    title: 'Casa Miami Kriger',
    slug: 'casa-miami-kriger',
    category: 'Interior Design',
    location: 'Miami, FL',
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=80',
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1400&q=80',
    ],
    brief: 'Diseño de residencia en Miami.',
    description: 'Proyecto de diseño interior para residencia en Miami, Florida.',
  },
  {
    title: 'Casa Fabi & Gastón',
    slug: 'casa-fabi-gaston',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80',
    ],
    brief: 'Diseño de residencia para cliente privado.',
    description: 'Proyecto de diseño interior para residencia privada.',
  },
  {
    title: 'Casa Estancita Pablito',
    slug: 'casa-estancita-plablito',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1400&q=80',
    ],
    brief: 'Diseño de casa en estancia.',
    description: 'Proyecto de diseño para vivienda en entorno rural.',
  },
  {
    title: 'Casa Mariano en Miami',
    slug: 'casa-mariano-miami',
    category: 'Interior Design',
    location: 'Miami, FL',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1400&q=80',
    ],
    brief: 'Diseño de residencia en Miami.',
    description: 'Proyecto de diseño interior para residencia privada en Miami, Florida.',
  },
  {
    title: 'GYM',
    slug: 'gym',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1400&q=80',
    ],
    brief: 'Diseño y visualización de espacio deportivo.',
    description: 'Proyecto de diseño y visualización 3D para espacio de entrenamiento.',
  },
]

export const categories: ProjectCategory[] = [
  'All',
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
]
