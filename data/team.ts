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
      en: 'Architect with a refined eye for space, materiality, and light. Passionate about the intersection of Latin American design culture and contemporary visualization. Based in Miami, working globally.',
      es: 'Arquitecta con sensibilidad para el espacio, la materialidad y la luz. Apasionada por la intersección entre la cultura de diseño latinoamericana y la visualización contemporánea. Con base en Miami, trabajando globalmente.',
    },
    image: '/team/sofia-mazzucco.jpg',
  },
]
