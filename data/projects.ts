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
  featured?: boolean
  size: 'large' | 'medium' | 'small'
}

export const projects: Project[] = [
  {
    title: 'Casa Marchetti',
    slug: 'casa-marchetti',
    category: '3D Visualization',
    location: 'Concepción del Uruguay, Argentina',
    year: 2024,
    coverImage: '/projects/casa-marchetti/cover.jpg',
    images: [
      '/projects/casa-marchetti/cover.jpg',
      '/projects/casa-marchetti/01.jpg',
      '/projects/casa-marchetti/02.jpg',
      '/projects/casa-marchetti/03.jpg',
      '/projects/casa-marchetti/04.jpg',
    ],
    brief: 'Full 3D visualization for a private residence in the Entre Ríos countryside.',
    description:
      'A residential project set in the rolling landscape of Concepción del Uruguay. The design integrates large glass openings that frame the surrounding terrain, creating a continuous dialogue between interior space and the natural environment. We delivered a complete set of photorealistic renders covering the exterior, main living areas, and key architectural details.',
    featured: true,
    size: 'large',
  },
  {
    title: 'Iron Fitness Gym',
    slug: 'iron-fitness-gym',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/iron-fitness-gym/cover.jpg',
    images: [
      '/projects/iron-fitness-gym/cover.jpg',
      '/projects/iron-fitness-gym/01.jpg',
      '/projects/iron-fitness-gym/02.jpg',
      '/projects/iron-fitness-gym/03.jpg',
      '/projects/iron-fitness-gym/04.jpg',
    ],
    brief: 'Commercial 3D visualization for a multi-level fitness center.',
    description:
      "A high-impact commercial gym spread across three levels. The visualization package covered the exterior façade and all interior training floors, emphasizing the bold materiality and the program's vertical circulation. The renders were used for marketing and investor presentations ahead of the facility's opening.",
    size: 'medium',
  },
  {
    title: 'Casa Estancita',
    slug: 'casa-estancita',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    area: '180 m²',
    coverImage: '/projects/casa-estancita/cover.jpg',
    images: [
      '/projects/casa-estancita/cover.jpg',
      '/projects/casa-estancita/01.jpg',
      '/projects/casa-estancita/02.jpg',
      '/projects/casa-estancita/03.jpg',
      '/projects/casa-estancita/04.jpg',
      '/projects/casa-estancita/05.jpg',
      '/projects/casa-estancita/06.jpg',
    ],
    brief: 'Interior design for a warm, countryside residence with an artisan material palette.',
    description:
      'A countryside residence that draws on natural materials — exposed wood, stone, and warm textiles — to create an atmosphere of relaxed sophistication. The interior design covered the full living, dining, and bedroom program, with custom furniture specifications and a carefully curated lighting scheme. The project balances the informality of rural living with considered, precise design decisions.',
    size: 'small',
  },
  {
    title: 'Casa Mariano — Miami',
    slug: 'casa-mariano-miami',
    category: '3D Visualization',
    location: 'Miami, FL',
    year: 2025,
    area: '320 m²',
    coverImage: '/projects/casa-mariano-miami/cover.jpg',
    images: [
      '/projects/casa-mariano-miami/cover.jpg',
      '/projects/casa-mariano-miami/01.jpg',
      '/projects/casa-mariano-miami/02.jpg',
      '/projects/casa-mariano-miami/03.jpg',
      '/projects/casa-mariano-miami/04.jpg',
    ],
    brief: 'Photorealistic visualization for a single-story Miami residence.',
    description:
      "A single-story home designed for the Miami climate — wide overhangs, tropical landscaping, and a seamless indoor-outdoor connection. The visualization focused on the exterior envelope, pool terrace, and the transition between the main living spaces and the garden. Renders were used for the client's permit application and social media launch.",
    size: 'large',
  },
  {
    title: 'Casa Kriger — Miami',
    slug: 'casa-kriger-miami',
    category: '3D Visualization',
    location: 'Miami, FL',
    year: 2025,
    coverImage: '/projects/casa-kriger-miami/cover.jpg',
    images: [
      '/projects/casa-kriger-miami/cover.jpg',
      '/projects/casa-kriger-miami/01.jpg',
    ],
    brief: 'Exterior visualization for a modern two-story residence in Miami.',
    description:
      'A two-story modern residence in Miami with a strong geometric language and a palette of concrete, glass, and tropical greenery. We delivered exterior visualization views highlighting the volumetric composition of the façade and the relationship between the ground-floor entertainment area and the upper-level private program.',
    size: 'small',
  },
  {
    title: 'Cabañas Terraciello',
    slug: 'cabanas-terraciello',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/cabanas-terraciello/cover.jpg',
    images: [
      '/projects/cabanas-terraciello/cover.jpg',
      '/projects/cabanas-terraciello/01.jpg',
      '/projects/cabanas-terraciello/02.jpg',
      '/projects/cabanas-terraciello/03.jpg',
      '/projects/cabanas-terraciello/04.jpg',
    ],
    brief: 'Interior design for a cabin complex with a rustic-modern aesthetic.',
    description:
      'A collection of guest cabins in a natural setting, designed to offer a premium hospitality experience without departing from the rawness of the landscape. The interior concept combines exposed timber, stone, and artisan textiles with deliberate contemporary details — warm lighting, carefully chosen furniture, and a restrained color palette. Each cabin was treated as a self-contained environment that feels both sheltered and connected to the outdoors.',
    size: 'medium',
  },
  {
    title: 'Dúplex Nati Sola',
    slug: 'duplex-nati-sola',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2024,
    area: '120 m²',
    coverImage: '/projects/duplex-nati-sola/cover.jpg',
    images: [
      '/projects/duplex-nati-sola/cover.jpg',
      '/projects/duplex-nati-sola/01.jpg',
      '/projects/duplex-nati-sola/02.jpg',
      '/projects/duplex-nati-sola/03.jpg',
      '/projects/duplex-nati-sola/04.jpg',
    ],
    brief: 'Conceptual design for a compact modern duplex with efficient spatial organization.',
    description:
      "A duplex housing study exploring compact, efficient spatial planning for a contemporary residential typology. The conceptual work included volumetric studies, floor plan optimization, and isometric representations that communicate the project's spatial logic. The design prioritizes natural light, cross-ventilation, and a clear vertical separation of private and shared programs.",
    size: 'medium',
  },
  {
    title: 'Fábrica Nutrar',
    slug: 'fabrica-nutrar',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/fabrica-nutrar/cover.jpg',
    images: [
      '/projects/fabrica-nutrar/cover.jpg',
      '/projects/fabrica-nutrar/01.jpg',
    ],
    brief: 'Commercial visualization for an industrial production and retail facility.',
    description:
      "A combined production and retail facility for a food brand. The visualization conveys the building's dual identity — a clean, brand-forward retail frontage and an efficient industrial rear. The renders were used for planning submissions and as part of the brand's commercial rollout materials.",
    size: 'small',
  },
  {
    title: 'Casa Tiago',
    slug: 'casa-tiago',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2025,
    coverImage: '/projects/casa-tiago/cover.jpg',
    images: [
      '/projects/casa-tiago/cover.jpg',
      '/projects/casa-tiago/01.jpg',
      '/projects/casa-tiago/02.jpg',
      '/projects/casa-tiago/03.jpg',
    ],
    brief: 'Visualization for a contemporary mountain residence with an outdoor living focus.',
    description:
      "A residential project set against a dramatic mountain backdrop. The design centers on a generous outdoor living program — a fire pit terrace, pool, and landscaped garden — that extends the house into the landscape. We delivered renders of the exterior from multiple angles, emphasizing the building's integration with the terrain and the quality of the outdoor spaces.",
    size: 'medium',
  },
  {
    title: 'Casa Fabi & Gastón',
    slug: 'casa-fabi-gaston',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/casa-fabi-gaston/cover.jpg',
    images: [
      '/projects/casa-fabi-gaston/cover.jpg',
      '/projects/casa-fabi-gaston/01.jpg',
    ],
    brief: 'Residential interior design for a private family home.',
    description:
      "An interior design project for a private family residence, focused on creating cohesive, livable spaces that reflect the client's personal aesthetic. The scope covered the main social areas and private program, with attention to material continuity, furniture selection, and lighting design.",
    size: 'small',
  },
]

export const categories: ProjectCategory[] = [
  'All',
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
]
