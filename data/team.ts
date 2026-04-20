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
    role: { en: 'Architect & Interior Designer', es: 'Arquitecta & Diseñadora de Interiores' },
    bio: {
      en: 'Founder of Somaz Studio. Architecture graduate from Argentina, based in Miami, FL. Specialized in 3D visualization and interior design for residential and commercial projects across the US and Latin America. She started Somaz Studio in 2022 with a simple belief: that good visualization changes how clients make decisions. Every project starts with understanding how a space will be lived in before thinking about how it will look.',
      es: 'Fundadora de Somaz Studio. Arquitecta graduada en Argentina, con base en Miami, FL. Especializada en visualización 3D y diseño de interiores para proyectos residenciales y comerciales en EE.UU. y Latinoamérica. Creó Somaz Studio en 2022 con una convicción simple: que la visualización bien hecha cambia cómo los clientes toman decisiones. Cada proyecto empieza por entender cómo va a vivirse el espacio antes de pensar cómo se va a ver.',
    },
    image: '/team/sofia-mazzucco.jpg',
  },
]
