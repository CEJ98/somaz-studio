import type { LocaleString } from '@/lib/locale'

export interface Service {
  number: string
  title: LocaleString
  slug: string
  tagline: LocaleString
  description: LocaleString
  idealFor: LocaleString
  deliverables: LocaleString[]
  deliveryModel: LocaleString
  regions: string[]
  includesSignoff: boolean
}

export const services: Service[] = [
  {
    number: '00',
    title: { en: 'Architecture', es: 'Arquitectura' },
    slug: 'architecture',
    tagline: { en: 'Architecture with clear direction.', es: 'Arquitectura con dirección clara.' },
    description: {
      en: 'Architectural design for residential, commercial, and hospitality projects, from the first concept to the presentation package.',
      es: 'Diseño arquitectónico para proyectos residenciales, comerciales y hospitality, desde la idea inicial hasta el paquete final de presentación.',
    },
    idealFor: {
      en: 'Clients who need a clear spatial concept, stronger design decisions, and better coordination as the project grows.',
      es: 'Clientes que necesitan un concepto espacial claro, mejores decisiones de diseño y una coordinación más sólida a medida que el proyecto avanza.',
    },
    deliverables: [
      { en: 'Concept design and schematic packages', es: 'Concepto arquitectónico y paquetes esquemáticos' },
      { en: 'Design development and interior architecture', es: 'Design development e interior architecture' },
      { en: 'Presentation packages and technical coordination', es: 'Paquetes de presentación y coordinación técnica' },
    ],
    deliveryModel: {
      en: 'Scope is defined project by project, keeping the design process clear from concept through delivery.',
      es: 'El alcance se define según cada proyecto, manteniendo el proceso claro desde el concepto hasta la entrega.',
    },
    regions: ['Argentina', 'United States', 'International'],
    includesSignoff: true,
  },
  {
    number: '01',
    title: { en: '3D Visualization', es: 'Visualización 3D' },
    slug: '3d-visualization',
    tagline: { en: 'See it before it exists.', es: 'Visualízalo antes de que exista.' },
    description: {
      en: 'Turn blueprints into photorealistic images before construction begins. We help you sell, present, and get approved faster.',
      es: 'Convierte planos en imágenes fotorrealistas antes de que empiece la construcción. Te ayudamos a vender, presentar y obtener aprobaciones más rápido.',
    },
    idealFor: {
      en: 'Teams and clients who need strong imagery to present a project before construction begins.',
      es: 'Equipos y clientes que necesitan imágenes claras y fuertes para presentar un proyecto antes de construir.',
    },
    deliverables: [
      { en: 'Photorealistic still renders', es: 'Renders fotorrealistas' },
      { en: 'Permit and investor presentation visuals', es: 'Visuales para permisos e inversores' },
      { en: 'Exterior, interior, and context views', es: 'Vistas exteriores, interiores y de contexto' },
    ],
    deliveryModel: {
      en: 'Standalone worldwide service delivered remotely from plans, references, and briefing materials.',
      es: 'Servicio independiente global, entregado de forma remota a partir de planos, referencias y briefing.',
    },
    regions: ['Worldwide'],
    includesSignoff: false,
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
    idealFor: {
      en: 'Residential and hospitality clients who need a clear material direction, furnishing strategy, and spatial cohesion.',
      es: 'Clientes residenciales y hospitality que necesitan dirección material clara, estrategia de equipamiento y cohesión espacial.',
    },
    deliverables: [
      { en: 'Space planning and furniture layouts', es: 'Planificación espacial y layout de mobiliario' },
      { en: 'Material palette and finish direction', es: 'Paleta de materiales y dirección de terminaciones' },
      { en: 'Mood boards and specification packages', es: 'Mood boards y paquetes de especificación' },
    ],
    deliveryModel: {
      en: 'A flexible service that can support both remote work and local execution teams.',
      es: 'Un servicio flexible que puede acompañar tanto procesos remotos como equipos de ejecución locales.',
    },
    regions: ['Worldwide'],
    includesSignoff: false,
  },
  {
    number: '03',
    title: { en: 'Conceptual Design', es: 'Diseño Conceptual' },
    slug: 'conceptual-design',
    tagline: { en: 'The vision, before the plans.', es: 'La visión, antes de los planos.' },
    description: {
      en: 'From the first idea to a strong spatial concept. We shape the vision before technical development begins.',
      es: 'De la idea al concepto espacial. Definimos la visión del proyecto antes de entrar en desarrollo técnico.',
    },
    idealFor: {
      en: 'Early-stage projects that need clarity before drawings, budgeting, or the next design phase.',
      es: 'Proyectos en etapa temprana que necesitan claridad antes de dibujar, presupuestar o avanzar a la siguiente fase.',
    },
    deliverables: [
      { en: 'Spatial concept and massing studies', es: 'Concepto espacial y estudios de volumetría' },
      { en: 'Floor plan logic and design narrative', es: 'Lógica de planta y narrativa de diseño' },
      { en: 'Visual boards and stakeholder-ready presentation', es: 'Boards visuales y presentación para stakeholders' },
    ],
    deliveryModel: {
      en: 'Best used as the first phase of architecture, interiors, or development work.',
      es: 'Ideal como primera fase de arquitectura, interiores o desarrollo.',
    },
    regions: ['Worldwide'],
    includesSignoff: false,
  },
  {
    number: '04',
    title: { en: 'Design Consulting', es: 'Consultoría de Diseño' },
    slug: 'design-consulting',
    tagline: { en: 'Expert guidance, on demand.', es: 'Asesoría experta, cuando la necesitas.' },
    description: {
      en: 'Strategic guidance on spatial decisions, material choices, and design direction when a project needs sharper judgment.',
      es: 'Acompañamiento estratégico para decisiones espaciales, materiales y dirección de diseño cuando un proyecto necesita más criterio.',
    },
    idealFor: {
      en: 'Teams or owners who already have drawings but need sharper design judgment, review, or strategic input.',
      es: 'Equipos o propietarios que ya tienen planos pero necesitan criterio de diseño, revisión o input estratégico más sólido.',
    },
    deliverables: [
      { en: 'Design review and decision support', es: 'Revisión de diseño y soporte de decisiones' },
      { en: 'Material and layout feedback', es: 'Feedback de materiales y layout' },
      { en: 'Ongoing advisor or sprint-based sessions', es: 'Sesiones puntuales o acompañamiento continuo' },
    ],
    deliveryModel: {
      en: 'Remote-first consulting delivered through scoped sessions, advisory sprints, or retainers with written outcomes.',
      es: 'Consultoría remote-first entregada mediante sesiones con alcance definido, advisory sprints o retainers con resultados escritos.',
    },
    regions: ['Worldwide'],
    includesSignoff: false,
  },
]
