import type { LocaleString } from '@/lib/locale'

export interface TeamMember {
  name: string
  role: LocaleString
  bio: LocaleString
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Jorge Costilla',
    role: { en: 'Founder & Creative Director', es: 'Fundador & Director Creativo' },
    bio: {
      en: 'Architect and 3D visualization specialist with a passion for turning spatial ideas into photorealistic experiences. Born in Argentina, based in Miami — bridging Latin American design sensibility with a global perspective.',
      es: 'Arquitecto y especialista en visualización 3D con pasión por transformar ideas espaciales en experiencias fotorrealistas. Nacido en Argentina, con base en Miami — conectando la sensibilidad del diseño latinoamericano con una perspectiva global.',
    },
    image: '/team/jorge-costilla.jpg',
  },
]
