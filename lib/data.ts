export interface Project {
  slug: string;
  name: string;
  category: string;
  location: string;
  year: number;
  description: string;
  longDescription: string;
  area: string;
  image: string;
  images: string[];
  featured: boolean;
  tags: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  details: string[];
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "casa-mineral",
    name: "Casa Mineral",
    category: "Residencial",
    location: "Ciudad de México",
    year: 2024,
    description:
      "Residencia unifamiliar que explora la interacción entre la piedra natural y la luz natural a través de planos escalonados.",
    longDescription:
      "Casa Mineral surge de un diálogo profundo entre el terreno y el programa habitable. La materialidad de piedra volcánica y concreto expuesto crea una paleta honesta que responde al paisaje urbano circundante. Los planos escalonados generan terrazas que se convierten en extensiones del espacio interior, difuminando la frontera entre adentro y afuera.",
    area: "420 m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    ],
    featured: true,
    tags: ["Residencial", "Piedra", "Sustentable"],
  },
  {
    slug: "torre-azur",
    name: "Torre Azur",
    category: "Comercial",
    location: "Guadalajara",
    year: 2023,
    description:
      "Edificio de oficinas de 22 niveles con fachada de vidrio de doble piel que optimiza el confort térmico sin sacrificar la transparencia.",
    longDescription:
      "Torre Azur redefine la tipología de torre corporativa en el corredor Américas de Guadalajara. La fachada de doble piel actúa como un regulador climático pasivo, reduciendo en un 35% el consumo energético respecto a edificios convencionales. El lobby de triple altura recibe al visitante con una instalación escultórica de acero corten que referencia los Altos de Jalisco.",
    area: "18,400 m²",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a2c80?w=1200&q=85",
    ],
    featured: true,
    tags: ["Comercial", "Sustentable", "Vidrio"],
  },
  {
    slug: "pabellon-horizonte",
    name: "Pabellón Horizonte",
    category: "Cultural",
    location: "Monterrey",
    year: 2023,
    description:
      "Centro de artes contemporáneas que abraza la topografía del Cerro de la Silla como elemento generador del proyecto.",
    longDescription:
      "El Pabellón Horizonte nace de una lectura atenta de su entorno excepcional. La Sierra Madre Oriental dicta la geometría del edificio: planos inclinados que replican las crestas montañosas y espacios que enmarcan deliberadamente las vistas al Cerro de la Silla. El resultado es un diálogo entre artificio y naturaleza que honra el paisaje regiomontano.",
    area: "3,200 m²",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    ],
    featured: true,
    tags: ["Cultural", "Concreto", "Paisaje"],
  },
  {
    slug: "residencia-bosque",
    name: "Residencia Bosque",
    category: "Residencial",
    location: "Valle de Bravo",
    year: 2022,
    description:
      "Casa de fin de semana integrada al bosque de pinos mediante una estructura de madera laminada y vidrio de piso a techo.",
    longDescription:
      "Residencia Bosque es un ejercicio de mínima intervención. La premisa era simple: tocar la tierra lo menos posible. Cuatro pilotes elevados sostienen la estructura de madera laminada cruzada que se extiende entre los pinos como un puente habitable. Los interiores replican la calidez del exterior con madera local y piedra del río.",
    area: "280 m²",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    ],
    featured: false,
    tags: ["Residencial", "Madera", "Naturaleza"],
  },
  {
    slug: "centro-civico-lumia",
    name: "Centro Cívico Lumia",
    category: "Institucional",
    location: "Puebla",
    year: 2022,
    description:
      "Centro comunitario que integra servicios municipales, biblioteca pública y espacios de coworking bajo una única cubierta ondulada.",
    longDescription:
      "Lumia propone repensar el equipamiento cívico como catalizador de comunidad. La cubierta sinuosa de concreto blanco —que hace referencia al talavera local— unifica programas heterogéneos bajo un gesto urbano contundente. El atrio central funciona como plaza cubierta, activa los 365 días del año con talleres, exposiciones y mercados.",
    area: "5,800 m²",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    ],
    featured: false,
    tags: ["Institucional", "Cívico", "Concreto"],
  },
  {
    slug: "hotel-piedra",
    name: "Hotel Piedra",
    category: "Hotelero",
    location: "Los Cabos",
    year: 2021,
    description:
      "Boutique hotel de 32 suites esculpido en la roca del desierto de Baja California con vistas directas al Mar de Cortés.",
    longDescription:
      "Hotel Piedra es fruto de una conversación íntima con el desierto. Las 32 suites se excavan en la roca calcárea existente, minimizando el impacto visual y maximizando el vínculo con el paisaje. La paleta de materiales —piedra local, madera de mezquite y hierro oxidado— hace de este hotel una extensión natural del entorno desértico.",
    area: "4,100 m²",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
    ],
    featured: false,
    tags: ["Hotelero", "Desierto", "Lujo"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// ─── TEAM ─────────────────────────────────────────────────────────────────
export const team: TeamMember[] = [
  {
    name: "Carlos Somaz",
    role: "Fundador & Director Creativo",
    bio: "Egresado de la UNAM con maestría en el Berlage Institute. Más de 15 años transformando el paisaje arquitectónico latinoamericano.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Ana Ruiz",
    role: "Directora de Diseño",
    bio: "Arquitecta por la Iberoamericana con posgrado en Harvard GSD. Especialista en diseño bioclimático y arquitectura sustentable.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Miguel Torres",
    role: "Director de Proyectos",
    bio: "Ingeniero civil y arquitecto con 12 años de experiencia en proyectos de gran escala en México, Colombia y España.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Laura Chen",
    role: "Diseñadora Senior",
    bio: "Arquitecta con doble nacionalidad mexicana-canadiense. Especialista en diseño de interiores y experiencia de usuario espacial.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    number: "01",
    title: "Arquitectura Residencial",
    description:
      "Diseñamos hogares que reflejan la identidad de quienes los habitan. Desde pequeñas viviendas hasta grandes residencias, cada proyecto es un mundo propio.",
    details: [
      "Vivienda unifamiliar",
      "Conjuntos habitacionales",
      "Renovación y restauración",
      "Diseño de interiores residencial",
    ],
  },
  {
    number: "02",
    title: "Arquitectura Comercial",
    description:
      "Espacios de trabajo que potencian la productividad y la creatividad. Oficinas, hoteles y centros comerciales que se convierten en referencias urbanas.",
    details: [
      "Torres de oficinas",
      "Hoteles y resorts",
      "Centros comerciales",
      "Espacios de coworking",
    ],
  },
  {
    number: "03",
    title: "Arquitectura Cultural",
    description:
      "Museos, teatros y centros comunitarios que enriquecen el tejido social. Equipamientos culturales que perduran como patrimonio de las ciudades.",
    details: [
      "Museos y galerías",
      "Teatros y auditorios",
      "Centros culturales",
      "Equipamiento educativo",
    ],
  },
  {
    number: "04",
    title: "Urbanismo & Planeación",
    description:
      "Visión integral del territorio para crear ciudades más habitables, sostenibles y justas. Desde masterplans hasta espacios públicos de escala barrial.",
    details: [
      "Planes maestros",
      "Diseño de espacio público",
      "Regeneración urbana",
      "Consultoría territorial",
    ],
  },
];

// ─── STATS ────────────────────────────────────────────────────────────────
export const stats = [
  { value: "15", label: "Años de experiencia" },
  { value: "+120", label: "Proyectos completados" },
  { value: "8", label: "Premios internacionales" },
  { value: "3", label: "Países" },
];
