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
      en: 'Founder of Somaz Studio. Architect trained in Argentina, now working from Miami. She leads architecture, interiors, and visualization with a practice centered on spatial quality, calm materiality, and clear design decisions.',
      es: 'Fundadora de Somaz Studio. Arquitecta formada en Argentina y hoy trabajando desde Miami. Lidera arquitectura, interiores y visualización con una práctica enfocada en materiales serenos, claridad de proyecto y decisiones de diseño bien resueltas.',
    },
    image: '/team/sofia-mazzucco.jpg',
  },
]
