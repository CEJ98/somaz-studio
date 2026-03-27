export interface ServicePackage {
  name: string
  price: string
  description?: string
}

export interface Service {
  number: string
  title: string
  slug: string
  tagline: string
  description: string
  packages: ServicePackage[]
}

export const services: Service[] = [
  {
    number: '01',
    title: '3D Visualization',
    slug: '3d-visualization',
    tagline: 'See it before it exists.',
    description:
      'Turn blueprints into photorealistic images before construction begins. We help you sell, present, and get approved faster.',
    packages: [
      {
        name: 'Essential',
        price: 'from $350',
        description: '1 view, 48–72h delivery',
      },
      {
        name: 'Standard',
        price: 'from $1,200',
        description: '3 views + post-production',
      },
      {
        name: 'Premium',
        price: 'from $3,000',
        description: '5+ views, animation-ready',
      },
    ],
  },
  {
    number: '02',
    title: 'Interior Design',
    slug: 'interior-design',
    tagline: 'Spaces that feel inevitable.',
    description:
      'Full interior design service: space planning, material selection, furniture layout, and mood boards — delivered remotely, executed anywhere.',
    packages: [
      {
        name: 'Single Room',
        price: 'from $800',
      },
      {
        name: 'Full Residence',
        price: 'from $3,500',
      },
      {
        name: 'Commercial Space',
        price: 'from $6,000',
      },
    ],
  },
  {
    number: '03',
    title: 'Conceptual Design',
    slug: 'conceptual-design',
    tagline: 'The vision, before the plans.',
    description:
      'From idea to spatial concept. We develop the vision for your residential or commercial project — without the overhead of a full architecture firm.',
    packages: [
      {
        name: 'Residential Concept',
        price: 'from $2,000',
      },
      {
        name: 'Commercial Concept',
        price: 'from $4,500',
      },
    ],
  },
  {
    number: '04',
    title: 'Design Consulting',
    slug: 'design-consulting',
    tagline: 'Expert guidance, on demand.',
    description:
      'Expert guidance on spatial decisions, material selections, and design direction. Available as hourly sessions or monthly retainer.',
    packages: [
      {
        name: 'Hourly',
        price: '$120/hr',
      },
      {
        name: 'Monthly Retainer',
        price: 'from $1,200/mo',
      },
    ],
  },
]
