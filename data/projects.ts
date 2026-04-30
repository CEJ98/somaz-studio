import type { LocaleString } from '@/lib/locale'

export type ProjectCategory = 'All' | '3D Visualization' | 'Interior Design' | 'Conceptual Design'
export type ProjectMarket = 'Miami' | 'Argentina' | 'LATAM'
export type ClientType = 'Developer' | 'Homeowner' | 'Architect' | 'Hospitality' | 'Commercial'
export type ServiceType = 'Architecture' | '3D Visualization' | 'Interior Design' | 'Conceptual Design'
export type ProjectUseCase =
  | 'Permits & Approvals'
  | 'Investor & Pre-Sales'
  | 'Interior Architecture'
  | 'Brand & Marketing'
  | 'Concept Clarity'

export interface Project {
  title: string
  slug: string
  category: Exclude<ProjectCategory, 'All'>
  location: string
  year: number
  area?: string
  coverImage: string
  images: string[]
  description: LocaleString
  brief: LocaleString
  outcome?: LocaleString
  featured?: boolean
  size: 'large' | 'medium' | 'small'
  market: ProjectMarket
  service: ServiceType
  client_type: ClientType
  use_case: ProjectUseCase
  outcome_metric: LocaleString
  regulatory_context: LocaleString
  challenge?: LocaleString
  scope?: LocaleString
  deliverables?: LocaleString[]
  anchor_case?: boolean
  related_post_slugs?: string[]
  related_landing_slugs?: string[]
}

type BaseProject = Omit<Project, 'market' | 'service' | 'client_type' | 'use_case' | 'outcome_metric' | 'regulatory_context'>

const baseProjects: BaseProject[] = [
  // ── Full-width (large) ─────────────────────────────────────────────
  {
    title: 'Iron Fitness Gym',
    slug: 'iron-fitness-gym',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/iron-fitness-gym/01.jpg',
    images: [
      '/projects/iron-fitness-gym/01.jpg',
      '/projects/iron-fitness-gym/cover.jpg',
      '/projects/iron-fitness-gym/02.jpg',
    ],
    brief: {
      en: 'Commercial 3D visualization for a multi-level fitness center.',
      es: 'Visualización 3D comercial para un centro fitness de múltiples niveles.',
    },
    description: {
      en: "A high-impact commercial gym spread across three levels. The visualization package covered the exterior façade and all interior training floors, emphasizing the bold materiality and the program's vertical circulation. The renders were used for marketing and investor presentations ahead of the facility's opening.",
      es: 'Un gimnasio comercial de alto impacto distribuido en tres niveles. El paquete de visualización cubrió la fachada exterior y todos los pisos de entrenamiento interiores, enfatizando la materialidad rotunda y la circulación vertical del programa. Los renders se usaron para marketing y presentaciones ante inversores previo a la apertura.',
    },
    outcome: {
      en: 'Renders delivered in 4 days — used for marketing launch and investor pitch deck.',
      es: 'Renders entregados en 4 días — usados para lanzamiento de marketing y pitch deck para inversores.',
    },
    size: 'large',
  },
  {
    title: 'Casa M',
    slug: 'casa-m',
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
    brief: {
      en: 'Photorealistic visualization for a single-story Miami residence.',
      es: 'Visualización fotorrealista para una residencia de una sola planta en Miami.',
    },
    description: {
      en: "A single-story home designed for the Miami climate — wide overhangs, tropical landscaping, and a seamless indoor-outdoor connection. The visualization focused on the exterior envelope, pool terrace, and the transition between the main living spaces and the garden. Renders were used for the client's permit application and social media launch.",
      es: 'Una vivienda de planta baja diseñada para el clima de Miami — aleros amplios, paisajismo tropical y una conexión interior-exterior sin interrupciones. La visualización se centró en el cerramiento exterior, la terraza con piscina y la transición entre los espacios principales y el jardín. Los renders se usaron para la solicitud de permisos y el lanzamiento en redes sociales.',
    },
    outcome: {
      en: 'Renders used for permit application — approved on first submission.',
      es: 'Renders usados para solicitud de permisos — aprobados en la primera presentación.',
    },
    size: 'large',
  },
  {
    title: 'Casa T',
    slug: 'casa-tiago',
    category: '3D Visualization',
    location: 'Argentina',
    year: 2025,
    coverImage: '/projects/casa-tiago/01.jpg',
    images: [
      '/projects/casa-tiago/01.jpg',
      '/projects/casa-tiago/cover.jpg',
      '/projects/casa-tiago/02.jpg',
    ],
    brief: {
      en: 'Visualization for a contemporary mountain residence with an outdoor living focus.',
      es: 'Visualización para una residencia contemporánea de montaña con énfasis en los espacios exteriores.',
    },
    description: {
      en: "A residential project set against a dramatic mountain backdrop. The design centers on a generous outdoor living program — a fire pit terrace, pool, and landscaped garden — that extends the house into the landscape. We delivered renders of the exterior from multiple angles, emphasizing the building's integration with the terrain and the quality of the outdoor spaces.",
      es: 'Un proyecto residencial con un dramático telón de fondo montañoso. El diseño gira en torno a un generoso programa de vida exterior — una terraza con fogón, piscina y jardín paisajístico — que extiende la casa hacia el paisaje. Entregamos renders del exterior desde múltiples ángulos, enfatizando la integración del edificio con el terreno y la calidad de los espacios exteriores.',
    },
    size: 'large',
  },

  // ── Half-width pairs (medium / small → 6col) ───────────────────────
  {
    title: 'Casa Estancita',
    slug: 'casa-estancita',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    area: '180 m²',
    coverImage: '/projects/casa-estancita/01.jpg',
    images: [
      '/projects/casa-estancita/01.jpg',
      '/projects/casa-estancita/cover.jpg',
      '/projects/casa-estancita/02.jpg',
      '/projects/casa-estancita/03.jpg',
      '/projects/casa-estancita/04.jpg',
      '/projects/casa-estancita/05.jpg',
      '/projects/casa-estancita/06.jpg',
    ],
    brief: {
      en: 'Interior design for a warm, countryside residence with an artisan material palette.',
      es: 'Diseño de interiores para una residencia campestre cálida con una paleta de materiales artesanales.',
    },
    featured: true,
    description: {
      en: 'A countryside residence that draws on natural materials — exposed wood, stone, and warm textiles — to create an atmosphere of relaxed sophistication. The interior design covered the full living, dining, and bedroom program, with custom furniture specifications and a carefully curated lighting scheme. The project balances the informality of rural living with considered, precise design decisions.',
      es: 'Una residencia campestre que recurre a materiales naturales — madera vista, piedra y textiles cálidos — para crear una atmósfera de sofisticación relajada. El diseño de interiores cubrió todo el programa de living, comedor y dormitorios, con especificaciones de mobiliario a medida y un esquema de iluminación cuidadosamente curado. El proyecto equilibra la informalidad del campo con decisiones de diseño precisas e intencionadas.',
    },
    size: 'medium',
  },
  {
    title: 'Cabañas Terraciello',
    slug: 'cabanas-terraciello',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/cabanas-terraciello/01.jpg',
    images: [
      '/projects/cabanas-terraciello/01.jpg',
      '/projects/cabanas-terraciello/cover.jpg',
      '/projects/cabanas-terraciello/02.jpg',
      '/projects/cabanas-terraciello/03.jpg',
    ],
    brief: {
      en: 'Interior design for a cabin complex with a rustic-modern aesthetic.',
      es: 'Diseño de interiores para un complejo de cabañas con estética rústico-moderna.',
    },
    description: {
      en: 'A collection of guest cabins in a natural setting, designed to offer a premium hospitality experience without departing from the rawness of the landscape. The interior concept combines exposed timber, stone, and artisan textiles with deliberate contemporary details — warm lighting, carefully chosen furniture, and a restrained color palette. Each cabin was treated as a self-contained environment that feels both sheltered and connected to the outdoors.',
      es: 'Una colección de cabañas para huéspedes en un entorno natural, diseñadas para ofrecer una experiencia de hospitalidad premium sin alejarse de la crudeza del paisaje. El concepto interior combina madera vista, piedra y textiles artesanales con detalles contemporáneos deliberados — iluminación cálida, mobiliario cuidadosamente seleccionado y una paleta de colores contenida. Cada cabaña fue tratada como un entorno autónomo que se siente resguardado y conectado al exterior.',
    },
    size: 'medium',
  },
  {
    title: 'Casa K',
    slug: 'casa-k',
    category: '3D Visualization',
    location: 'Miami, FL',
    year: 2025,
    coverImage: '/projects/casa-kriger-miami/02.jpg',
    images: [
      '/projects/casa-kriger-miami/02.jpg',
      '/projects/casa-kriger-miami/cover.jpg',
      '/projects/casa-kriger-miami/01.jpg',
    ],
    brief: {
      en: 'Exterior visualization for a modern two-story residence in Miami.',
      es: 'Visualización exterior para una residencia moderna de dos plantas en Miami.',
    },
    description: {
      en: 'A two-story modern residence in Miami with a strong geometric language and a palette of concrete, glass, and tropical greenery. We delivered exterior visualization views highlighting the volumetric composition of the façade and the relationship between the ground-floor entertainment area and the upper-level private program.',
      es: 'Una residencia moderna de dos plantas en Miami con un lenguaje geométrico rotundo y una paleta de hormigón, vidrio y vegetación tropical. Entregamos vistas de visualización exterior que destacan la composición volumétrica de la fachada y la relación entre el área de entretenimiento en planta baja y el programa privado en planta alta.',
    },
    outcome: {
      en: 'Funding closed 3 weeks ahead of schedule after investor presentations with our renders.',
      es: 'Financiamiento cerrado 3 semanas antes de lo previsto tras presentaciones a inversores con nuestros renders.',
    },
    size: 'medium',
  },
  {
    title: 'Cabaña Concepción',
    slug: 'cabana-concepcion',
    category: 'Interior Design',
    location: 'Concepción del Uruguay, Argentina',
    year: 2024,
    coverImage: '/projects/cabana-concepcion/01.jpg',
    images: [
      '/projects/cabana-concepcion/01.jpg',
      '/projects/cabana-concepcion/cover.jpg',
      '/projects/cabana-concepcion/02.jpg',
      '/projects/cabana-concepcion/03.jpg',
    ],
    brief: {
      en: 'Interior design for a cabin in the Entre Ríos countryside.',
      es: 'Diseño de interiores para una cabaña en el campo entrerriano.',
    },
    description: {
      en: 'A cabin project in the Entre Ríos countryside, designed around natural materials and a warm, intimate atmosphere. The interior combines exposed wood, stone, and artisan textiles to create a self-contained space that feels connected to the surrounding landscape.',
      es: 'Un proyecto de cabaña en el campo de Entre Ríos, diseñado en torno a materiales naturales y una atmósfera cálida e íntima. El interior combina madera vista, piedra y textiles artesanales para crear un espacio autónomo que se siente conectado al paisaje circundante.',
    },
    size: 'medium',
  },
  {
    title: 'Casa F&G',
    slug: 'casa-f-g',
    category: 'Interior Design',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/casa-fabi-gaston/cover.jpg',
    images: [
      '/projects/casa-fabi-gaston/cover.jpg',
      '/projects/casa-fabi-gaston/01.jpg',
      '/projects/casa-fabi-gaston/02.jpg',
    ],
    brief: {
      en: 'Residential interior design for a private family home.',
      es: 'Diseño de interiores residencial para una vivienda familiar privada.',
    },
    description: {
      en: "An interior design project for a private family residence, focused on creating cohesive, livable spaces that reflect the client's personal aesthetic. The scope covered the main social areas and private program, with attention to material continuity, furniture selection, and lighting design.",
      es: 'Un proyecto de diseño de interiores para una residencia familiar privada, enfocado en crear espacios cohesivos y habitables que reflejan la estética personal del cliente. El alcance cubrió las áreas sociales principales y el programa privado, con atención a la continuidad de materiales, selección de mobiliario y diseño de iluminación.',
    },
    size: 'small',
  },
  {
    title: 'Dúplex Mia',
    slug: 'duplex-mia',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2024,
    area: '120 m²',
    coverImage: '/projects/duplex-nati-sola/01.jpg',
    images: [
      '/projects/duplex-nati-sola/01.jpg',
      '/projects/duplex-nati-sola/cover.jpg',
    ],
    brief: {
      en: 'Conceptual design for a compact modern duplex with efficient spatial organization.',
      es: 'Diseño conceptual para un dúplex moderno compacto con una distribución eficiente.',
    },
    description: {
      en: "A duplex housing study exploring compact, efficient spatial planning for a contemporary residential typology. The conceptual work included volumetric studies, floor plan optimization, and isometric representations that communicate the project's spatial logic. The design prioritizes natural light, cross-ventilation, and a clear vertical separation of private and shared programs.",
      es: 'Un estudio de vivienda dúplex que explora una distribución compacta y eficiente para una tipología residencial contemporánea. El trabajo conceptual incluyó estudios volumétricos, optimización de plantas y representaciones isométricas que comunican la lógica del proyecto. El diseño prioriza la luz natural, la ventilación cruzada y una clara separación vertical entre programas privados y compartidos.',
    },
    size: 'small',
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
    brief: {
      en: 'Commercial visualization for an industrial production and retail facility.',
      es: 'Visualización comercial para una instalación industrial de producción y venta al público.',
    },
    description: {
      en: "A combined production and retail facility for a food brand. The visualization conveys the building's dual identity — a clean, brand-forward retail frontage and an efficient industrial rear. The renders were used for planning submissions and as part of the brand's commercial rollout materials.",
      es: 'Una instalación combinada de producción y venta para una marca de alimentos. La visualización transmite la doble identidad del edificio — una fachada comercial limpia y orientada a la marca, y una zona industrial eficiente en la parte trasera. Los renders se usaron para presentaciones de planificación y como parte de los materiales de lanzamiento comercial de la marca.',
    },
    size: 'small',
  },
  {
    title: 'Tres Patios',
    slug: 'tres-patios',
    category: 'Conceptual Design',
    location: 'Argentina',
    year: 2024,
    coverImage: '/projects/tres-patios/01.jpg',
    images: [
      '/projects/tres-patios/01.jpg',
      '/projects/tres-patios/cover.jpg',
      '/projects/tres-patios/02.jpg',
    ],
    brief: {
      en: 'Conceptual residential design organized around three interior patios.',
      es: 'Diseño residencial conceptual organizado en torno a tres patios interiores.',
    },
    description: {
      en: 'A conceptual residential project structured around three patios that organize the program and bring natural light deep into the plan. The design explores the relationship between enclosed outdoor space and interior living, using the patios as the primary organizing element of the spatial sequence.',
      es: 'Un proyecto residencial conceptual estructurado en torno a tres patios que organizan el programa y llevan luz natural al interior de la planta. El diseño explora la relación entre el exterior contenido y la vida interior, utilizando los patios como elemento organizador principal del recorrido.',
    },
    size: 'small',
  },
]

const projectMetadata: Record<string, Pick<Project, 'market' | 'service' | 'client_type' | 'use_case' | 'outcome_metric' | 'regulatory_context'> & Partial<Pick<Project, 'challenge' | 'scope' | 'deliverables' | 'anchor_case' | 'related_post_slugs' | 'related_landing_slugs'>>> = {
  'iron-fitness-gym': {
    market: 'Argentina',
    service: '3D Visualization',
    client_type: 'Commercial',
    use_case: 'Brand & Marketing',
    outcome_metric: {
      en: 'Used for planning review and commercial rollout.',
      es: 'Usado para revisión de planificación y lanzamiento comercial.',
    },
    regulatory_context: {
      en: 'Visualization support for a commercial facility without jurisdictional sign-off by Somaz.',
      es: 'Soporte visual para una instalación comercial, enfocado en presentación y claridad del proyecto.',
    },
    challenge: {
      en: 'Translate an industrial fitness concept into commercial imagery that could align brand identity, planning review, and launch materials.',
      es: 'Traducir un concepto fitness industrial en imágenes comerciales capaces de alinear identidad de marca, revisión de planificación y materiales de lanzamiento.',
    },
    scope: {
      en: 'Commercial visualization package for facade, interiors, circulation, and brand-facing presentation views.',
      es: 'Paquete de visualización comercial para fachada, interiores, circulación y vistas de presentación orientadas a marca.',
    },
    deliverables: [
      { en: 'Exterior hero view for rollout', es: 'Vista hero exterior para lanzamiento' },
      { en: 'Interior views across training floors', es: 'Vistas interiores de los pisos de entrenamiento' },
      { en: 'Commercial presentation imagery for stakeholders', es: 'Imágenes comerciales de presentación para equipos de decisión' },
    ],
    anchor_case: true,
    related_post_slugs: ['interior-architecture-for-hospitality-projects', 'architectural-visualization-for-developers'],
    related_landing_slugs: ['architectural-visualization', 'interior-architecture'],
  },
  'casa-m': {
    market: 'Miami',
    service: '3D Visualization',
    client_type: 'Developer',
    use_case: 'Permits & Approvals',
    outcome_metric: {
      en: 'Permit application approved on first submission.',
      es: 'Solicitud de permiso aprobada en la primera presentación.',
    },
    regulatory_context: {
      en: 'Visualization package prepared to support a Miami review and presentation process.',
      es: 'Paquete de visualización preparado para apoyar un proceso de revisión y presentación en Miami.',
    },
    challenge: {
      en: 'Make a Miami residential project easier to understand during review and decision-making.',
      es: 'Volver más legible un proyecto residencial en Miami durante revisión y toma de decisiones.',
    },
    scope: {
      en: 'Permit-support visualization package focused on exterior envelope, context, pool terrace, and key indoor-outdoor transitions.',
      es: 'Paquete de visualización de soporte para permisos enfocado en envolvente exterior, contexto, terraza de piscina y transiciones interior-exterior clave.',
    },
    deliverables: [
      { en: 'Street-level exterior views', es: 'Vistas exteriores a nivel calle' },
      { en: 'Context and massing visuals for review', es: 'Visuales de contexto y volumetría para revisión' },
      { en: 'Presentation imagery for client and technical team alignment', es: 'Imágenes de presentación para alinear cliente y equipo técnico' },
    ],
    anchor_case: true,
    related_post_slugs: ['what-somaz-delivers-before-local-permit-submission', 'case-study-miami-permit-presentation-package'],
    related_landing_slugs: ['permit-presentation-packages', 'architecture-in-miami'],
  },
  'casa-tiago': {
    market: 'Argentina',
    service: '3D Visualization',
    client_type: 'Homeowner',
    use_case: 'Concept Clarity',
    outcome_metric: {
      en: 'Exterior package delivered for pre-construction decision-making.',
      es: 'Paquete exterior entregado para toma de decisiones preconstrucción.',
    },
    regulatory_context: {
      en: 'Pre-construction visualization with no direct signing responsibility by Somaz.',
      es: 'Visualización preobra sin responsabilidad de firma directa por parte de Somaz.',
    },
  },
  'casa-estancita': {
    market: 'Argentina',
    service: 'Interior Design',
    client_type: 'Homeowner',
    use_case: 'Interior Architecture',
    outcome_metric: {
      en: 'Full interior direction package for a countryside residence.',
      es: 'Paquete integral de dirección interior para una residencia de campo.',
    },
    regulatory_context: {
      en: 'Interior design scope delivered directly within Argentina.',
      es: 'Alcance de diseño interior entregado directamente dentro de Argentina.',
    },
    challenge: {
      en: 'Shape a countryside home that felt warm and refined without turning the interiors into a purely decorative exercise.',
      es: 'Dar forma a una casa de campo cálida y refinada sin convertir el interior en un ejercicio puramente decorativo.',
    },
    scope: {
      en: 'Interior architecture direction across shared and private spaces, with material continuity, furniture logic, and presentation support for execution decisions.',
      es: 'Dirección de arquitectura interior en espacios sociales y privados, con continuidad material, lógica de mobiliario y soporte de presentación para decisiones de ejecución.',
    },
    deliverables: [
      { en: 'Interior layout and atmosphere direction', es: 'Dirección de layout interior y atmósfera' },
      { en: 'Material and furniture selection logic', es: 'Lógica de selección de materiales y mobiliario' },
      { en: 'Client-facing package for decision alignment', es: 'Paquete para alinear decisiones con el cliente' },
    ],
  },
  'cabanas-terraciello': {
    market: 'Argentina',
    service: 'Interior Design',
    client_type: 'Hospitality',
    use_case: 'Interior Architecture',
    outcome_metric: {
      en: 'Interior concept aligned across a multi-cabin hospitality project.',
      es: 'Concepto interior alineado en un proyecto de hospitality de múltiples cabañas.',
    },
    regulatory_context: {
      en: 'Interior design package coordinated with the local execution team.',
      es: 'Paquete de interiorismo coordinado con el equipo local de ejecución.',
    },
    challenge: {
      en: 'Create a hospitality interior concept that felt premium and consistent across multiple cabins without losing the raw character of the landscape.',
      es: 'Crear un concepto interior de hospitality que se sintiera premium y consistente en múltiples cabañas sin perder el carácter crudo del paisaje.',
    },
    scope: {
      en: 'Interior architecture direction across guest cabins, material palette, lighting logic, and hospitality-facing presentation material.',
      es: 'Dirección de arquitectura interior para cabañas de huéspedes, paleta material, lógica de iluminación y material de presentación orientado a hospitality.',
    },
    deliverables: [
      { en: 'Material and furnishing direction', es: 'Dirección material y de equipamiento' },
      { en: 'Lighting and atmosphere logic', es: 'Lógica de iluminación y atmósfera' },
      { en: 'Presentation package for local execution alignment', es: 'Paquete de presentación para alinear la ejecución local' },
    ],
    anchor_case: true,
    related_post_slugs: ['interior-architecture-for-hospitality-projects'],
    related_landing_slugs: ['interior-architecture', 'architecture-in-argentina'],
  },
  'casa-k': {
    market: 'Miami',
    service: '3D Visualization',
    client_type: 'Developer',
    use_case: 'Investor & Pre-Sales',
    outcome_metric: {
      en: 'Investor presentations helped close funding ahead of schedule.',
      es: 'Las presentaciones a inversores ayudaron a cerrar financiamiento antes de lo previsto.',
    },
    regulatory_context: {
      en: 'Visualization package used alongside a local licensed architect and development team.',
      es: 'Paquete de visualización usado junto a un arquitecto local matriculado y el equipo de desarrollo.',
    },
    challenge: {
      en: 'Give a residential development proposal enough clarity to support investor conversations and move decision-making faster.',
      es: 'Dar suficiente claridad a una propuesta residencial para apoyar conversaciones con inversores y acelerar la toma de decisiones.',
    },
    scope: {
      en: 'Investor-facing visualization package focused on exterior composition, development positioning, and presentation-ready residential imagery.',
      es: 'Paquete de visualización orientado a inversores, enfocado en composición exterior, posicionamiento del desarrollo e imágenes residenciales listas para presentación.',
    },
    deliverables: [
      { en: 'Hero exterior views for investor-facing decks', es: 'Vistas hero exteriores para decks frente a inversores' },
      { en: 'Residential imagery for stakeholder alignment', es: 'Imágenes residenciales para alinear decisiones' },
      { en: 'Presentation-ready visuals for development conversations', es: 'Visuales listos para presentación en conversaciones de desarrollo' },
    ],
    anchor_case: true,
    related_post_slugs: ['architectural-visualization-for-developers', 'how-architect-led-remote-design-works'],
    related_landing_slugs: ['architectural-visualization', 'remote-architecture-studio'],
  },
  'cabana-concepcion': {
    market: 'Argentina',
    service: 'Interior Design',
    client_type: 'Hospitality',
    use_case: 'Interior Architecture',
    outcome_metric: {
      en: 'Warm hospitality concept translated into a build-ready interior direction.',
      es: 'Concepto cálido de hospitality traducido en una dirección interior lista para construir.',
    },
    regulatory_context: {
      en: 'Interior design project delivered for local execution in Argentina.',
      es: 'Proyecto de interiorismo entregado para ejecución local en Argentina.',
    },
  },
  'casa-f-g': {
    market: 'Argentina',
    service: 'Interior Design',
    client_type: 'Homeowner',
    use_case: 'Interior Architecture',
    outcome_metric: {
      en: 'Cohesive residential interior strategy across social and private areas.',
      es: 'Estrategia interior residencial coherente en áreas sociales y privadas.',
    },
    regulatory_context: {
      en: 'Interior design scope delivered without separate permit-signing obligations by Somaz.',
      es: 'Alcance de interiorismo entregado sin obligaciones separadas de firma de permisos por parte de Somaz.',
    },
  },
  'duplex-mia': {
    market: 'Argentina',
    service: 'Conceptual Design',
    client_type: 'Developer',
    use_case: 'Concept Clarity',
    outcome_metric: {
      en: 'Spatial concept clarified the project before executive documentation.',
      es: 'La idea principal quedó clara antes de avanzar con la documentación ejecutiva.',
    },
    regulatory_context: {
      en: 'Conceptual architecture phase suitable for later technical development and local sign-off.',
      es: 'Fase de arquitectura conceptual apta para posterior desarrollo técnico y firma local.',
    },
  },
  'fabrica-nutrar': {
    market: 'Argentina',
    service: '3D Visualization',
    client_type: 'Commercial',
    use_case: 'Brand & Marketing',
    outcome_metric: {
      en: 'Commercial imagery aligned planning and brand rollout materials.',
      es: 'Las imágenes comerciales alinearon la planificación y los materiales de lanzamiento de marca.',
    },
    regulatory_context: {
      en: 'Visualization support for planning and rollout, separate from formal architectural sign-off.',
      es: 'Soporte visual para planificación y lanzamiento, separado de la firma arquitectónica formal.',
    },
  },
  'tres-patios': {
    market: 'Argentina',
    service: 'Conceptual Design',
    client_type: 'Homeowner',
    use_case: 'Concept Clarity',
    outcome_metric: {
      en: 'Three-patio concept established the architectural logic before technical development.',
      es: 'El concepto de tres patios estableció la lógica arquitectónica antes del desarrollo técnico.',
    },
    regulatory_context: {
      en: 'Concept design phase intended to move into full-scope Argentine architecture.',
      es: 'Fase conceptual pensada para avanzar hacia arquitectura integral en Argentina.',
    },
  },
}

export const projects: Project[] = baseProjects.map((project) => ({
  ...project,
  ...projectMetadata[project.slug],
}))

export const categories: ProjectCategory[] = [
  'All',
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
]
