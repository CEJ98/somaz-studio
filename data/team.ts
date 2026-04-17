import type { LocaleString } from '@/lib/locale'

export interface TeamMember {
  name: string
  role: LocaleString
  bio: LocaleString
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Sofía Mazzucco',
    role: { en: 'Space Designer & Interior Designer', es: 'Space Designer & Diseñadora de Interiores' },
    bio: {
      en: 'Founder of Somaz Studio. Based in Miami, FL — with over 5 years of experience in spatial design, 3D architectural visualization, and interior design across residential and commercial projects in the US, Argentina, and the Middle East. Founded Somaz Studio in 2022 to bring a Latin American design perspective to global markets, with a focus on photorealistic visualization and high-end interior design. Has delivered 50+ projects across 8+ countries, combining precise technical execution with a deeply human understanding of how space is lived.',
      es: 'Fundadora de Somaz Studio. Con base en Miami, FL — más de 5 años de experiencia en diseño espacial, visualización arquitectónica 3D y diseño de interiores en proyectos residenciales y comerciales en EE. UU., Argentina y Medio Oriente. Fundó Somaz Studio en 2022 para llevar una perspectiva de diseño latinoamericano a mercados globales, con foco en visualización fotorrealista y diseño de interiores de alto nivel. Ha entregado más de 50 proyectos en más de 8 países, combinando ejecución técnica precisa con una comprensión profundamente humana de cómo se vive el espacio.',
    },
    image: '/team/sofia-mazzucco.jpg',
  },
]
