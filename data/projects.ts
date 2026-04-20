import type { LocaleString } from '@/lib/locale'

export type ProjectCategory = 'All' | '3D Visualization' | 'Interior Design' | 'Conceptual Design'

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
}

export const projects: Project[] = [
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
    title: 'Casa Tiago',
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
    coverImage: '/projects/casa-estancita/cover.jpg',
    images: [
      '/projects/casa-estancita/cover.jpg',
      '/projects/casa-estancita/01.jpg',
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
    coverImage: '/projects/cabanas-terraciello/cover.jpg',
    images: [
      '/projects/cabanas-terraciello/cover.jpg',
      '/projects/cabanas-terraciello/01.jpg',
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
    coverImage: '/projects/casa-kriger-miami/01.jpg',
    images: [
      '/projects/casa-kriger-miami/cover.jpg',
      '/projects/casa-kriger-miami/01.jpg',
      '/projects/casa-kriger-miami/02.jpg',
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
    coverImage: '/projects/cabana-concepcion/cover.jpg',
    images: [
      '/projects/cabana-concepcion/cover.jpg',
      '/projects/cabana-concepcion/01.jpg',
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
    coverImage: '/projects/duplex-nati-sola/cover.jpg',
    images: [
      '/projects/duplex-nati-sola/cover.jpg',
      '/projects/duplex-nati-sola/01.jpg',
    ],
    brief: {
      en: 'Conceptual design for a compact modern duplex with efficient spatial organization.',
      es: 'Diseño conceptual para un dúplex moderno compacto con organización espacial eficiente.',
    },
    description: {
      en: "A duplex housing study exploring compact, efficient spatial planning for a contemporary residential typology. The conceptual work included volumetric studies, floor plan optimization, and isometric representations that communicate the project's spatial logic. The design prioritizes natural light, cross-ventilation, and a clear vertical separation of private and shared programs.",
      es: 'Un estudio de vivienda dúplex que explora la planificación espacial compacta y eficiente para una tipología residencial contemporánea. El trabajo conceptual incluyó estudios volumétricos, optimización de plantas y representaciones isométricas que comunican la lógica espacial del proyecto. El diseño prioriza la luz natural, la ventilación cruzada y una clara separación vertical entre programas privados y compartidos.',
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
    coverImage: '/projects/tres-patios/cover.jpg',
    images: [
      '/projects/tres-patios/cover.jpg',
      '/projects/tres-patios/01.jpg',
      '/projects/tres-patios/02.jpg',
    ],
    brief: {
      en: 'Conceptual residential design organized around three interior patios.',
      es: 'Diseño residencial conceptual organizado en torno a tres patios interiores.',
    },
    description: {
      en: 'A conceptual residential project structured around three patios that organize the program and bring natural light deep into the plan. The design explores the relationship between enclosed outdoor space and interior living, using the patios as the primary organizing element of the spatial sequence.',
      es: 'Un proyecto residencial conceptual estructurado en torno a tres patios que organizan el programa y llevan luz natural al interior de la planta. El diseño explora la relación entre el espacio exterior contenido y la vida interior, utilizando los patios como elemento organizador principal de la secuencia espacial.',
    },
    size: 'small',
  },
]

export const categories: ProjectCategory[] = [
  'All',
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
]
