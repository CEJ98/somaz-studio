import type { LocaleString } from '@/lib/locale'

export interface Service {
  number: string
  title: LocaleString
  slug: string
  tagline: LocaleString
  description: LocaleString
}

export const services: Service[] = [
  {
    number: '01',
    title: { en: '3D Visualization', es: 'Visualización 3D' },
    slug: '3d-visualization',
    tagline: { en: 'See it before it exists.', es: 'Visualízalo antes de que exista.' },
    description: {
      en: 'Turn blueprints into photorealistic images before construction begins. We help you sell, present, and get approved faster.',
      es: 'Convierte planos en imágenes fotorrealistas antes de que empiece la construcción. Te ayudamos a vender, presentar y obtener aprobaciones más rápido.',
    },
  },
  {
    number: '02',
    title: { en: 'Interior Design', es: 'Diseño de Interiores' },
    slug: 'interior-design',
    tagline: { en: 'Spaces that feel inevitable.', es: 'Espacios que se sienten inevitables.' },
    description: {
      en: 'Full interior design service: space planning, material selection, furniture layout, and mood boards — delivered remotely, executed anywhere.',
      es: 'Servicio completo de diseño de interiores: planificación espacial, selección de materiales, distribución de mobiliario y mood boards — entregado de forma remota, ejecutado en cualquier lugar.',
    },
  },
  {
    number: '03',
    title: { en: 'Conceptual Design', es: 'Diseño Conceptual' },
    slug: 'conceptual-design',
    tagline: { en: 'The vision, before the plans.', es: 'La visión, antes de los planos.' },
    description: {
      en: 'From idea to spatial concept. We develop the vision for your residential or commercial project — without the overhead of a full architecture firm.',
      es: 'De la idea al concepto espacial. Desarrollamos la visión para tu proyecto residencial o comercial — sin la carga de una firma de arquitectura completa.',
    },
  },
  {
    number: '04',
    title: { en: 'Design Consulting', es: 'Consultoría de Diseño' },
    slug: 'design-consulting',
    tagline: { en: 'Expert guidance, on demand.', es: 'Asesoría experta, cuando la necesitas.' },
    description: {
      en: 'Expert guidance on spatial decisions, material selections, and design direction. Available as hourly sessions or monthly retainer.',
      es: 'Orientación experta en decisiones espaciales, selección de materiales y dirección de diseño. Disponible por sesiones por hora o retainer mensual.',
    },
  },
]
