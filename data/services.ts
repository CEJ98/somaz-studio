import type { LocaleString } from '@/lib/locale'

export interface ServicePackage {
  name: LocaleString
  price: LocaleString
  description?: LocaleString
  features?: LocaleString[]
}

export interface Service {
  number: string
  title: LocaleString
  slug: string
  tagline: LocaleString
  description: LocaleString
  packages: ServicePackage[]
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
    packages: [
      {
        name: { en: 'Essential', es: 'Esencial' },
        price: { en: 'from $350', es: 'desde $350' },
        description: { en: '1 view, 48–72h delivery', es: '1 vista, entrega en 48–72h' },
        features: [
          { en: '1 photorealistic view', es: '1 vista fotorrealista' },
          { en: '48–72h delivery', es: 'Entrega en 48–72h' },
          { en: '2 revision rounds', es: '2 rondas de revisión' },
          { en: 'High-res PNG delivery', es: 'Entrega PNG alta resolución' },
        ],
      },
      {
        name: { en: 'Standard', es: 'Estándar' },
        price: { en: 'from $1,200', es: 'desde $1,200' },
        description: { en: '3 views + post-production', es: '3 vistas + postproducción' },
        features: [
          { en: '3 photorealistic views', es: '3 vistas fotorrealistas' },
          { en: 'Post-production included', es: 'Postproducción incluida' },
          { en: '5–7 day delivery', es: 'Entrega en 5–7 días' },
          { en: '2 revision rounds', es: '2 rondas de revisión' },
        ],
      },
      {
        name: { en: 'Premium', es: 'Premium' },
        price: { en: 'from $3,000', es: 'desde $3,000' },
        description: { en: '5+ views, animation-ready', es: '5+ vistas, listo para animación' },
        features: [
          { en: '5+ views, any angle', es: '5+ vistas, cualquier ángulo' },
          { en: 'Animation-ready scene', es: 'Escena lista para animación' },
          { en: 'Full post-production', es: 'Postproducción completa' },
          { en: 'Priority scheduling', es: 'Agenda prioritaria' },
        ],
      },
    ],
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
    packages: [
      {
        name: { en: 'Single Room', es: 'Habitación Individual' },
        price: { en: 'from $800', es: 'desde $800' },
        description: { en: 'Concept + mood board + material palette for one room', es: 'Concepto + mood board + paleta de materiales para una habitación' },
        features: [
          { en: 'Concept development', es: 'Desarrollo de concepto' },
          { en: 'Mood board', es: 'Mood board' },
          { en: 'Material palette', es: 'Paleta de materiales' },
          { en: '1 revision round', es: '1 ronda de revisión' },
        ],
      },
      {
        name: { en: 'Full Residence', es: 'Residencia Completa' },
        price: { en: 'from $3,500', es: 'desde $3,500' },
        description: { en: 'Full layout, material spec, furniture plan + 3D renders', es: 'Layout completo, especificación de materiales, plano de mobiliario + renders 3D' },
        features: [
          { en: 'Full layout & space plan', es: 'Layout y plano espacial completo' },
          { en: 'Material spec sheet', es: 'Ficha de especificaciones' },
          { en: 'Furniture plan', es: 'Plano de mobiliario' },
          { en: '3D renders included', es: 'Renders 3D incluidos' },
        ],
      },
      {
        name: { en: 'Commercial Space', es: 'Espacio Comercial' },
        price: { en: 'from $6,000', es: 'desde $6,000' },
        description: { en: 'Brand-aligned spatial design, signage, lighting plan', es: 'Diseño espacial alineado a marca, señalética, plan de iluminación' },
        features: [
          { en: 'Brand-aligned spatial design', es: 'Diseño espacial alineado a marca' },
          { en: 'Signage & wayfinding', es: 'Señalética y orientación' },
          { en: 'Lighting plan', es: 'Plan de iluminación' },
          { en: 'Full material spec', es: 'Especificación completa de materiales' },
        ],
      },
    ],
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
    packages: [
      {
        name: { en: 'Residential Concept', es: 'Concepto Residencial' },
        price: { en: 'from $2,000', es: 'desde $2,000' },
        description: { en: 'Spatial concept, massing study, material direction', es: 'Concepto espacial, estudio de masas, dirección de materiales' },
        features: [
          { en: 'Spatial concept document', es: 'Documento de concepto espacial' },
          { en: 'Massing study', es: 'Estudio de masas' },
          { en: 'Material direction board', es: 'Board de dirección de materiales' },
          { en: '2 revision rounds', es: '2 rondas de revisión' },
        ],
      },
      {
        name: { en: 'Commercial Concept', es: 'Concepto Comercial' },
        price: { en: 'from $4,500', es: 'desde $4,500' },
        description: { en: 'Brand-driven concept, program layout, presentation deck', es: 'Concepto basado en marca, programa funcional, deck de presentación' },
        features: [
          { en: 'Brand-driven concept', es: 'Concepto basado en marca' },
          { en: 'Program layout', es: 'Programa funcional' },
          { en: 'Presentation deck (PDF)', es: 'Deck de presentación (PDF)' },
          { en: '2 revision rounds', es: '2 rondas de revisión' },
        ],
      },
    ],
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
    packages: [
      {
        name: { en: 'Hourly', es: 'Por Hora' },
        price: { en: '$120/hr', es: '$120/hora' },
        description: { en: '60-min video session, summary + action items', es: 'Sesión de 60 min por video, resumen + pasos a seguir' },
        features: [
          { en: '60-min video session', es: 'Sesión de 60 min por video' },
          { en: 'Written summary & action items', es: 'Resumen escrito y pasos a seguir' },
          { en: 'Recording available on request', es: 'Grabación disponible a pedido' },
          { en: 'Book within 48h', es: 'Reserva con 48h de anticipación' },
        ],
      },
      {
        name: { en: 'Monthly Retainer', es: 'Retainer Mensual' },
        price: { en: 'from $1,200/mo', es: 'desde $1,200/mes' },
        description: { en: '4 sessions/month + async support + priority scheduling', es: '4 sesiones/mes + soporte asincrónico + agenda prioritaria' },
        features: [
          { en: '4 sessions per month', es: '4 sesiones por mes' },
          { en: 'Async support (email/chat)', es: 'Soporte asincrónico (email/chat)' },
          { en: 'Priority scheduling', es: 'Agenda prioritaria' },
          { en: 'Project review included', es: 'Revisión de proyecto incluida' },
        ],
      },
    ],
  },
]
