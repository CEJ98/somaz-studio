import type { LocaleString } from '@/lib/locale'

export interface SeoLandingFaq {
  question: LocaleString
  answer: LocaleString
}

export interface SeoLanding {
  slug: string
  title: LocaleString
  metaTitle: LocaleString
  metaDescription: LocaleString
  heroEyebrow: LocaleString
  heroTitle: LocaleString
  heroBody: LocaleString
  proofTitle: LocaleString
  proofPoints: LocaleString[]
  audienceTitle: LocaleString
  audienceBody: LocaleString
  scopeTitle: LocaleString
  scopeItems: LocaleString[]
  ctaTitle: LocaleString
  ctaBody: LocaleString
  primaryService: 'Architecture' | '3D Visualization' | 'Interior Design' | 'Conceptual Design' | 'Design Consulting'
  primaryAudience: 'Developer' | 'Hospitality' | 'Homeowner' | 'Architect Partner'
  primaryMarket: 'Global' | 'Miami' | 'Argentina'
  relatedPostSlugs: string[]
  relatedProjectSlugs: string[]
  faq: SeoLandingFaq[]
}

export const seoLandings: SeoLanding[] = [
  {
    slug: 'architecture-studio',
    title: { en: 'Architecture Studio', es: 'Estudio de Arquitectura' },
    metaTitle: { en: 'Architecture Studio for Residential, Hospitality, and Development Projects', es: 'Estudio de Arquitectura para Proyectos Residenciales, Hospitality y Desarrollo' },
    metaDescription: {
      en: 'Architecture studio for residential, hospitality, and development projects. Design, interiors, and visualization for clients working across markets.',
      es: 'Estudio de arquitectura para proyectos residenciales, hospitality y desarrollo. Diseño, interiores y visualización para clientes que trabajan entre mercados.',
    },
    heroEyebrow: { en: 'Architecture Studio', es: 'Estudio de Arquitectura' },
    heroTitle: {
      en: 'An architecture studio built for projects that move across markets.',
      es: 'Un estudio de arquitectura pensado para proyectos que se mueven entre mercados.',
    },
    heroBody: {
      en: 'Somaz works on architecture, interiors, and visualization for residential, hospitality, and development projects. Some projects stay fully inside the studio. Others continue with local technical teams when the next phase requires it.',
      es: 'Somaz trabaja arquitectura, interiores y visualización para proyectos residenciales, hospitality y desarrollo. Algunos proyectos se resuelven por completo dentro del estudio. Otros continúan con equipos técnicos locales cuando la siguiente etapa lo requiere.',
    },
    proofTitle: { en: 'Why this model works', es: 'Por qué este modelo funciona' },
    proofPoints: [
      { en: 'Architectural direction without local-office overhead.', es: 'Dirección arquitectónica sin el overhead de una oficina local grande.' },
      { en: 'Clear packages for clients, builders, and consultants.', es: 'Paquetes claros para clientes, builders y consultores.' },
      { en: 'A clear handoff when another local technical team needs to step in.', es: 'Un handoff claro cuando después debe entrar otro equipo técnico local.' },
    ],
    audienceTitle: { en: 'Built for', es: 'Pensado para' },
    audienceBody: {
      en: 'Developers, hospitality operators, homeowners, and architect partners who need a strong design process and clear deliverables.',
      es: 'Developers, operadores de hospitality, propietarios y arquitectos partners que necesitan un proceso de diseño fuerte y entregables claros.',
    },
    scopeTitle: { en: 'Typical scope', es: 'Alcance típico' },
    scopeItems: [
      { en: 'Concept and schematic design', es: 'Concepto y diseño esquemático' },
      { en: 'Interior architecture and material direction', es: 'Interior architecture y dirección material' },
      { en: 'Visualization and presentation packages', es: 'Visualización y paquetes de presentación' },
      { en: 'Coordination with external technical teams when the project needs it', es: 'Coordinación con equipos técnicos externos cuando el proyecto lo necesita' },
    ],
    ctaTitle: { en: 'Need the right architecture path for your project?', es: '¿Necesitas la ruta arquitectónica correcta para tu proyecto?' },
    ctaBody: { en: 'Start with the project and we will define the right scope and next step.', es: 'Empieza con el proyecto y definiremos el alcance correcto y el siguiente paso.' },
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    relatedPostSlugs: ['how-architect-led-remote-design-works', 'what-somaz-delivers-before-local-permit-submission'],
    relatedProjectSlugs: ['casa-m', 'cabanas-terraciello', 'iron-fitness-gym'],
    faq: [
      {
        question: { en: 'Do you also coordinate with local technical teams?', es: '¿También coordinan con equipos técnicos locales?' },
        answer: { en: 'Yes, when the project reaches a stage that needs local documentation, review, or execution support, Somaz can coordinate the handoff clearly.', es: 'Sí. Cuando el proyecto llega a una etapa que necesita documentación local, revisión o soporte de ejecución, Somaz puede coordinar ese handoff con claridad.' },
      },
      {
        question: { en: 'Is this only for large projects?', es: '¿Esto es solo para proyectos grandes?' },
        answer: { en: 'No. The model works for residential, hospitality, and development projects as long as the scope is clear and the client values a structured process.', es: 'No. El modelo funciona para proyectos residenciales, hospitality y desarrollo siempre que el alcance sea claro y el cliente valore un proceso estructurado.' },
      },
    ],
  },
  {
    slug: 'architect-led-design',
    title: { en: 'Design Direction for Architecture Projects', es: 'Dirección de Diseño para Proyectos de Arquitectura' },
    metaTitle: { en: 'Design Direction for Residential, Hospitality, and Development Projects', es: 'Dirección de Diseño para Proyectos Residenciales, Hospitality y Desarrollo' },
    metaDescription: {
      en: 'Design direction for clients who need clarity before execution. Residential, hospitality, and development projects shaped through concept, space, and materials.',
      es: 'Dirección de diseño para clientes que necesitan claridad antes de ejecutar. Proyectos residenciales, hospitality y de desarrollo pensados desde concepto, espacio y materiales.',
    },
    heroEyebrow: { en: 'Design Direction', es: 'Dirección de Diseño' },
    heroTitle: { en: 'Projects move faster when the design direction is clear from day one.', es: 'Los proyectos avanzan más rápido cuando la dirección de diseño es clara desde el día uno.' },
    heroBody: { en: 'Somaz uses architectural judgment to define scope, space, materials, and presentation before the project gets lost in revisions, consultant noise, or weak packaging.', es: 'Somaz usa criterio arquitectónico para definir alcance, espacio, materiales y presentación antes de que el proyecto se pierda en revisiones, ruido de consultores o paquetes débiles.' },
    proofTitle: { en: 'What this means in practice', es: 'Qué significa esto en la práctica' },
    proofPoints: [
      { en: 'Spatial decisions come before image-making.', es: 'Las decisiones espaciales vienen antes que la producción de imágenes.' },
      { en: 'Material and layout choices support the commercial goal.', es: 'Las decisiones de material y layout apoyan el objetivo comercial.' },
      { en: 'Every deliverable is built to align stakeholders.', es: 'Cada entregable está armado para alinear stakeholders.' },
    ],
    audienceTitle: { en: 'Best fit', es: 'Mejor fit' },
    audienceBody: { en: 'Clients who already know the project matters and do not want to waste months discovering basic design decisions in the middle of execution.', es: 'Clientes que ya entienden que el proyecto importa y no quieren perder meses descubriendo decisiones básicas de diseño en medio de la ejecución.' },
    scopeTitle: { en: 'Typical deliverables', es: 'Entregables típicos' },
    scopeItems: [
      { en: 'Spatial concept and decision logic', es: 'Concepto espacial y lógica de decisión' },
      { en: 'Interior direction and material system', es: 'Dirección interior y sistema de materiales' },
      { en: 'Presentation and alignment package', es: 'Paquete de presentación y alineación' },
    ],
    ctaTitle: { en: 'If the project needs direction before more drawings, start here.', es: 'Si el proyecto necesita dirección antes de más planos, empieza acá.' },
    ctaBody: { en: 'We will tell you whether the right next step is discovery, strategy consult, or phased proposal.', es: 'Te diremos si el siguiente paso correcto es discovery, strategy consult o propuesta por fases.' },
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    relatedPostSlugs: ['how-architect-led-remote-design-works', 'business-case-remote-design'],
    relatedProjectSlugs: ['casa-estancita', 'casa-m', 'casa-k'],
    faq: [
      {
        question: { en: 'How is this different from a render studio?', es: '¿En qué se diferencia de un estudio de renders?' },
        answer: { en: 'The work starts from scope, spatial decisions, and project readiness. Visualization is one tool inside the process, not the whole service.', es: 'El trabajo arranca desde el alcance, las decisiones espaciales y la preparación del proyecto. La visualización es una herramienta dentro del proceso, no todo el servicio.' },
      },
      {
        question: { en: 'Do you also handle interiors?', es: '¿También manejan interiores?' },
        answer: { en: 'Yes. Interiors are part of the process whenever the project needs material, furnishing, and spatial clarity.', es: 'Sí. Los interiores forman parte del proceso cuando el proyecto necesita claridad material, de equipamiento y espacial.' },
      },
    ],
  },
  {
    slug: 'architectural-visualization',
    title: { en: 'Architectural Visualization', es: 'Visualización Arquitectónica' },
    metaTitle: { en: 'Architectural Visualization for Developers, Permits, and Investor Presentations', es: 'Visualización Arquitectónica para Developers, Permisos y Presentaciones a Inversores' },
    metaDescription: {
      en: 'Architectural visualization that helps developers, architects, and owners present projects clearly for permits, investors, and pre-construction marketing.',
      es: 'Visualización arquitectónica que ayuda a developers, arquitectos y propietarios a presentar proyectos con claridad para permisos, inversores y marketing previo a obra.',
    },
    heroEyebrow: { en: 'Visualization', es: 'Visualización' },
    heroTitle: { en: 'Visualization that clarifies the project and helps it move.', es: 'Visualización que aclara el proyecto y ayuda a moverlo.' },
    heroBody: { en: 'Somaz prepares visualization packages for approvals, investor decks, pre-sales, and architectural coordination. The images are built from project logic, not from software tricks.', es: 'Somaz prepara paquetes de visualización para approvals, investor decks, preventa y coordinación arquitectónica. Las imágenes se construyen desde la lógica del proyecto, no desde trucos de software.' },
    proofTitle: { en: 'Used for', es: 'Se usa para' },
    proofPoints: [
      { en: 'Permit and HOA reviews', es: 'Revisiones de permisos y HOA' },
      { en: 'Investor and funding presentations', es: 'Presentaciones a inversores y financiamiento' },
      { en: 'Pre-construction sales and stakeholder alignment', es: 'Venta previa a obra y alineación de stakeholders' },
    ],
    audienceTitle: { en: 'Typical clients', es: 'Clientes típicos' },
    audienceBody: { en: 'Developers, architects, and sales teams that need imagery grounded in real spatial, regulatory, and commercial logic.', es: 'Developers, arquitectos y equipos comerciales que necesitan imágenes apoyadas en lógica espacial, regulatoria y comercial real.' },
    scopeTitle: { en: 'Typical package', es: 'Paquete típico' },
    scopeItems: [
      { en: 'Exterior, interior, and context views', es: 'Vistas exteriores, interiores y de contexto' },
      { en: 'Permit and investor presentation visuals', es: 'Visuales para permisos e inversores' },
      { en: 'Images designed for boards, clients, and stakeholders', es: 'Imágenes pensadas para juntas, clientes y stakeholders' },
    ],
    ctaTitle: { en: 'Need a visualization package that does more than look good?', es: '¿Necesitas un paquete de visualización que haga algo más que verse bien?' },
    ctaBody: { en: 'Send the project and we will define the right package based on approvals, sales, or investor use.', es: 'Envía el proyecto y definiremos el paquete correcto según approvals, ventas o uso con inversores.' },
    primaryService: '3D Visualization',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    relatedPostSlugs: ['architectural-visualization-for-developers', 'renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-m', 'casa-k', 'iron-fitness-gym'],
    faq: [
      {
        question: { en: 'Are these images permit-ready?', es: '¿Estas imágenes sirven para permisos?' },
        answer: { en: 'They are visuals that help a project be understood clearly during review. If another team later handles technical approval or submission, these images support that step.', es: 'Son visuales que ayudan a que un proyecto se entienda con claridad durante revisión. Si después otro equipo maneja la aprobación técnica o la presentación, estas imágenes apoyan ese paso.' },
      },
      {
        question: { en: 'Do you need full CAD files to start?', es: '¿Necesitan archivos CAD completos para empezar?' },
        answer: { en: 'Not always. Existing plans, sketches, references, and a clear objective are enough to scope the right package.', es: 'No siempre. Planos existentes, croquis, referencias y un objetivo claro alcanzan para definir el paquete correcto.' },
      },
    ],
  },
  {
    slug: 'interior-architecture',
    title: { en: 'Interior Architecture', es: 'Interior Architecture' },
    metaTitle: { en: 'Interior Architecture for Hospitality and Premium Residential Projects', es: 'Interior Architecture para Hospitality y Residencial Premium' },
    metaDescription: {
      en: 'Interior architecture for hospitality and premium residential projects. Material systems, layout clarity, furniture logic, and visuals that support execution.',
      es: 'Interior architecture para proyectos de hospitality y residencial premium. Sistemas materiales, claridad de layout, lógica de equipamiento y visuales que apoyan la ejecución.',
    },
    heroEyebrow: { en: 'Interior Architecture', es: 'Interior Architecture' },
    heroTitle: { en: 'Interiors that support the project, the brand, and the way the space will actually be used.', es: 'Interiores que sostienen el proyecto, la marca y la forma real en que se va a usar el espacio.' },
    heroBody: { en: 'Somaz develops interior architecture through spatial logic, material systems, furnishing direction, and visuals that help clients, operators, and contractors stay aligned.', es: 'Somaz desarrolla interior architecture a través de lógica espacial, sistemas materiales, dirección de equipamiento y visuales que ayudan a mantener alineados a clientes, operadores y contratistas.' },
    proofTitle: { en: 'Best used when you need', es: 'Funciona mejor cuando necesitas' },
    proofPoints: [
      { en: 'Hospitality spaces with brand clarity', es: 'Espacios de hospitality con claridad de marca' },
      { en: 'Residential interiors with long-term material logic', es: 'Interiores residenciales con lógica material de largo plazo' },
      { en: 'A stronger package before contractor coordination', es: 'Un paquete más fuerte antes de coordinar con contratistas' },
    ],
    audienceTitle: { en: 'Ideal clients', es: 'Clientes ideales' },
    audienceBody: { en: 'Boutique hospitality operators, developers, and residential clients who want more than decoration and need interiors with architectural discipline.', es: 'Operadores boutique de hospitality, developers y clientes residenciales que quieren algo más que decoración y necesitan interiores con disciplina arquitectónica.' },
    scopeTitle: { en: 'Interior scope', es: 'Alcance interior' },
    scopeItems: [
      { en: 'Layout and circulation decisions', es: 'Decisiones de layout y circulación' },
      { en: 'Material, finish, and lighting system', es: 'Sistema de materiales, terminaciones e iluminación' },
      { en: 'Furniture logic and presentation visuals', es: 'Lógica de equipamiento y visuales de presentación' },
    ],
    ctaTitle: { en: 'If the interior still feels unresolved, that is the real problem to solve.', es: 'Si el interior todavía se siente indefinido, ese es el verdadero problema a resolver.' },
    ctaBody: { en: 'Start the intake and we will tell you whether the right path is interior architecture, concept, or a strategy consult.', es: 'Empieza el intake y te diremos si la ruta correcta es interior architecture, concepto o una strategy consult.' },
    primaryService: 'Interior Design',
    primaryAudience: 'Hospitality',
    primaryMarket: 'Global',
    relatedPostSlugs: ['interior-architecture-for-hospitality-projects', 'materials-photograph-age-well'],
    relatedProjectSlugs: ['cabanas-terraciello', 'casa-estancita', 'cabana-concepcion'],
    faq: [
      {
        question: { en: 'Is this only for built projects?', es: '¿Esto es solo para proyectos construidos?' },
        answer: { en: 'No. Interior architecture is often most valuable before documentation or contractor coordination, when layout, material, and furniture decisions are still open.', es: 'No. Interior architecture suele ser más valiosa antes de la documentación o la coordinación con contratistas, cuando las decisiones de layout, materiales y equipamiento todavía están abiertas.' },
      },
      {
        question: { en: 'Can this be delivered remotely?', es: '¿Esto se puede entregar en remoto?' },
        answer: { en: 'Yes. The process is built for remote collaboration and can later integrate with local contractors, builders, or licensed partners.', es: 'Sí. El proceso está pensado para colaboración remota y luego puede integrarse con contratistas, builders o partners locales.' },
      },
    ],
  },
  {
    slug: 'permit-presentation-packages',
    title: { en: 'Permit Presentation Packages', es: 'Paquetes de Presentación para Permisos' },
    metaTitle: { en: 'Permit Presentation Packages for Review Boards, HOAs, and Local Approvals', es: 'Paquetes de Presentación para Permisos, HOAs y Aprobaciones Locales' },
    metaDescription: {
      en: 'Presentation packages that help clients, architects, and boards understand a project clearly before review.',
      es: 'Paquetes de presentación que ayudan a clientes, arquitectos y juntas a entender un proyecto con claridad antes de una revisión.',
    },
    heroEyebrow: { en: 'Permit Packages', es: 'Paquetes para Permisos' },
    heroTitle: { en: 'Clarity reduces friction in approvals.', es: 'La claridad reduce fricción en los approvals.' },
    heroBody: { en: 'Somaz prepares presentation packages that make a project easier to read for boards, HOAs, clients, and review teams. The goal is simple: reduce ambiguity before the next decision point.', es: 'Somaz prepara paquetes de presentación que vuelven el proyecto más legible para boards, HOAs, clientes y equipos de revisión. El objetivo es simple: reducir ambigüedad antes del siguiente punto de decisión.' },
    proofTitle: { en: 'Typical outcomes', es: 'Resultados típicos' },
    proofPoints: [
      { en: 'Fewer follow-up questions', es: 'Menos preguntas de seguimiento' },
      { en: 'Clearer alignment between owner, partner, and board', es: 'Alineación más clara entre owner, partner y board' },
      { en: 'Stronger visual understanding of the proposal', es: 'Comprensión visual más fuerte de la propuesta' },
    ],
    audienceTitle: { en: 'Used by', es: 'Usado por' },
    audienceBody: { en: 'Developers, homeowners, architect partners, and teams preparing projects for review, permit, or stakeholder approval.', es: 'Developers, propietarios, architect partners y equipos que preparan proyectos para revisión, permiso o aprobación de stakeholders.' },
    scopeTitle: { en: 'Package elements', es: 'Elementos del paquete' },
    scopeItems: [
      { en: 'Street-level and context views', es: 'Vistas a nivel calle y de contexto' },
      { en: 'Interior views that clarify use and flow', es: 'Vistas interiores que aclaran uso y circulación' },
      { en: 'Presentation-ready material for boards and clients', es: 'Material listo para presentar a boards y clientes' },
    ],
    ctaTitle: { en: 'Need clearer approval material before the next review cycle?', es: '¿Necesitas material más claro antes de la próxima revisión?' },
    ctaBody: { en: 'Share the project stage and the approval context. We will scope the right support package.', es: 'Comparte la etapa del proyecto y el contexto de aprobación. Vamos a definir el paquete de soporte correcto.' },
    primaryService: '3D Visualization',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    relatedPostSlugs: ['what-somaz-delivers-before-local-permit-submission', 'renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-m', 'casa-k', 'casa-tiago'],
    faq: [
      {
        question: { en: 'Can this replace the local permit set?', es: '¿Esto reemplaza el permit set local?' },
        answer: { en: 'No. It supports the permit or review process by making the proposal easier to understand. The local permit set and sign-off remain with the properly licensed professional where required.', es: 'No. Apoya el proceso de permiso o revisión haciendo la propuesta más fácil de entender. El permit set local y la firma siguen a cargo del profesional debidamente habilitado cuando corresponde.' },
      },
      {
        question: { en: 'Does this help with HOA review?', es: '¿Esto ayuda con revisiones de HOA?' },
        answer: { en: 'Yes. HOA and neighborhood reviews often respond better to clear exterior and context visuals than to technical drawings alone.', es: 'Sí. Las revisiones de HOA y neighbourhood suelen responder mejor a visuales claros de exterior y contexto que a dibujos técnicos solos.' },
      },
    ],
  },
  {
    slug: 'remote-architecture-studio',
    title: { en: 'Remote Architecture Studio', es: 'Estudio de Arquitectura Remoto' },
    metaTitle: { en: 'Remote Architecture Studio for Global Residential, Hospitality, and Development Projects', es: 'Estudio de Arquitectura Remoto para Proyectos Globales Residenciales, Hospitality y Desarrollo' },
    metaDescription: {
      en: 'Remote-first architecture studio for projects that need strong design direction, clear deliverables, and efficient collaboration across markets.',
      es: 'Estudio de arquitectura remote-first para proyectos que necesitan dirección de diseño sólida, entregables claros y colaboración eficiente entre mercados.',
    },
    heroEyebrow: { en: 'Remote-First Delivery', es: 'Delivery Remote-First' },
    heroTitle: { en: 'Geography should not lower the quality of the project.', es: 'La geografía no debería bajar la calidad del proyecto.' },
    heroBody: { en: 'Somaz is built for remote work: intake, design, interiors, visualization, and coordination. The process stays simple, documented, and easy to share with clients and collaborators.', es: 'Somaz está construido para trabajo remoto: intake, diseño, interiores, visualización y coordinación. El proceso se mantiene simple, documentado y fácil de compartir con clientes y colaboradores.' },
    proofTitle: { en: 'Why clients choose remote-first', es: 'Por qué clientes eligen remote-first' },
    proofPoints: [
      { en: 'Lower overhead than traditional local-only studios', es: 'Menor overhead que estudios solo locales tradicionales' },
      { en: 'Better access to design direction across markets', es: 'Mejor acceso a dirección de diseño entre mercados' },
      { en: 'Packages built for cloud collaboration and local execution', es: 'Paquetes armados para colaboración en nube y ejecución local' },
    ],
    audienceTitle: { en: 'Best fit', es: 'Mejor fit' },
    audienceBody: { en: 'Clients already comfortable working digitally and who care more about strong design direction and structured delivery than about a local showroom.', es: 'Clientes que ya están cómodos trabajando en digital y valoran más una dirección de diseño fuerte y un delivery estructurado que un showroom local.' },
    scopeTitle: { en: 'How it works', es: 'Cómo funciona' },
    scopeItems: [
      { en: 'Digital intake and briefing', es: 'Intake y briefing digital' },
      { en: 'Phased design and presentation packages', es: 'Diseño por fases y paquetes de presentación' },
      { en: 'Coordination with builders, consultants, and external teams', es: 'Coordinación con builders, consultores y equipos externos' },
    ],
    ctaTitle: { en: 'If the project can move remotely, the process should be built for that.', es: 'Si el proyecto puede avanzar en remoto, el proceso también debería estar armado para eso.' },
    ctaBody: { en: 'We will scope the right remote-first path based on the project, team, and next decision.', es: 'Vamos a definir la ruta remote-first correcta según el proyecto, el equipo y la próxima decisión.' },
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    relatedPostSlugs: ['business-case-remote-design', 'how-architect-led-remote-design-works'],
    relatedProjectSlugs: ['casa-estancita', 'casa-m', 'iron-fitness-gym'],
    faq: [
      {
        question: { en: 'What still needs to happen locally?', es: '¿Qué igual tiene que pasar localmente?' },
        answer: { en: 'Site surveys, local permitting, sign-off, and final construction observation typically remain local. Somaz coordinates with the right local team when those layers matter.', es: 'Relevamientos, permisos locales, firma y observación final de obra suelen seguir siendo locales. Somaz coordina con el equipo correcto cuando esas capas importan.' },
      },
      {
        question: { en: 'Is remote only good for visualization?', es: '¿Remoto sirve solo para visualización?' },
        answer: { en: 'No. Remote delivery works for architecture, interiors, concept, and technical preparation when the process is scoped correctly.', es: 'No. El delivery remoto funciona para arquitectura, interiores, concepto y preparación técnica cuando el proceso está bien scopiado.' },
      },
    ],
  },
  {
    slug: 'architecture-in-argentina',
    title: { en: 'Architecture in Argentina', es: 'Arquitectura en Argentina' },
    metaTitle: { en: 'Full-Scope Architecture in Argentina', es: 'Arquitectura Integral en Argentina' },
    metaDescription: {
      en: 'Architecture in Argentina with concept, development, interiors, documentation, and coordination shaped inside one process.',
      es: 'Arquitectura en Argentina con concepto, desarrollo, interiores, documentación y coordinación dentro de un mismo proceso.',
    },
    heroEyebrow: { en: 'Argentina', es: 'Argentina' },
    heroTitle: { en: 'A more complete architecture process for projects in Argentina.', es: 'Un proceso de arquitectura más completo para proyectos en Argentina.' },
    heroBody: { en: 'For projects in Argentina, Somaz can work with broader continuity between concept, development, interiors, documentation, and coordination. The value is a cleaner process and fewer handoffs too early.', es: 'Para proyectos en Argentina, Somaz puede trabajar con más continuidad entre concepto, desarrollo, interiores, documentación y coordinación. El valor está en un proceso más limpio y menos handoffs demasiado temprano.' },
    proofTitle: { en: 'What clients gain', es: 'Qué gana el cliente' },
    proofPoints: [
      { en: 'A single architecture-led line from concept to package', es: 'Una sola línea liderada por arquitectura desde concepto hasta paquete' },
      { en: 'Less fragmentation between design and documentation', es: 'Menos fragmentación entre diseño y documentación' },
      { en: 'Clearer coordination around interior and architectural decisions', es: 'Coordinación más clara entre decisiones interiores y arquitectónicas' },
    ],
    audienceTitle: { en: 'Typical projects', es: 'Proyectos típicos' },
    audienceBody: { en: 'Residential, hospitality, and development work in Argentina that needs architectural scope, design discipline, and clearer coordination.', es: 'Trabajo residencial, hospitality y de desarrollo en Argentina que necesita alcance arquitectónico, disciplina de diseño y coordinación más clara.' },
    scopeTitle: { en: 'Scope can include', es: 'El alcance puede incluir' },
    scopeItems: [
      { en: 'Concept, schematic design, and development', es: 'Concepto, diseño esquemático y desarrollo' },
      { en: 'Interior architecture and material systems', es: 'Interior architecture y sistemas materiales' },
      { en: 'Documentation and technical coordination', es: 'Documentación y coordinación técnica' },
    ],
    ctaTitle: { en: 'If the project is in Argentina, start with the full-scope path.', es: 'Si el proyecto está en Argentina, empieza por la ruta integral.' },
    ctaBody: { en: 'We will confirm the scope and define the right phased proposal for the project.', es: 'Vamos a confirmar el alcance y definir la propuesta por fases correcta para el proyecto.' },
    primaryService: 'Architecture',
    primaryAudience: 'Homeowner',
    primaryMarket: 'Argentina',
    relatedPostSlugs: ['full-scope-architecture-in-argentina', 'from-concept-to-render-process'],
    relatedProjectSlugs: ['casa-estancita', 'cabana-concepcion', 'casa-tiago'],
    faq: [
      {
        question: { en: 'Does this include full architectural work?', es: '¿Esto incluye trabajo arquitectónico integral?' },
        answer: { en: 'Yes. The exact scope is confirmed project by project, but Somaz can work with a more complete architecture process in Argentina.', es: 'Sí. El alcance exacto se confirma proyecto por proyecto, pero Somaz puede trabajar con un proceso arquitectónico más completo en Argentina.' },
      },
      {
        question: { en: 'Can interiors be integrated into the same scope?', es: '¿Se pueden integrar los interiores en el mismo alcance?' },
        answer: { en: 'Yes. Somaz treats architecture and interiors as one coordinated system when the project needs it.', es: 'Sí. Somaz trata arquitectura e interiores como un sistema coordinado cuando el proyecto lo necesita.' },
      },
    ],
  },
  {
    slug: 'architecture-in-miami',
    title: { en: 'Architecture in Miami', es: 'Arquitectura en Miami' },
    metaTitle: { en: 'Architecture in Miami for Residential, Hospitality, and Development Projects', es: 'Arquitectura en Miami para Proyectos Residenciales, Hospitality y Desarrollo' },
    metaDescription: {
      en: 'Architecture, interiors, and visualization for Miami projects that need clear design direction and strong presentation.',
      es: 'Arquitectura, interiores y visualización para proyectos en Miami que necesitan dirección de diseño clara y una presentación fuerte.',
    },
    heroEyebrow: { en: 'Miami', es: 'Miami' },
    heroTitle: { en: 'Architecture in Miami needs clear design from the beginning.', es: 'La arquitectura en Miami necesita un diseño claro desde el principio.' },
    heroBody: { en: 'Somaz works on Miami projects through design direction, interiors, visualization, and presentation packages. The focus is a project that reads clearly to clients, collaborators, and review teams.', es: 'Somaz trabaja proyectos en Miami a través de dirección de diseño, interiores, visualización y paquetes de presentación. El foco está en un proyecto que se entienda con claridad para clientes, colaboradores y equipos de revisión.' },
    proofTitle: { en: 'Why this matters in Miami', es: 'Por qué esto importa en Miami' },
    proofPoints: [
      { en: 'Climate, material, and indoor-outdoor decisions matter early.', es: 'Las decisiones de clima, materiales e interior-exterior importan desde temprano.' },
      { en: 'Boards and local reviews respond to clear presentation.', es: 'Boards y revisiones locales responden a presentaciones claras.' },
      { en: 'Strong design direction reduces late confusion with local teams.', es: 'Una dirección de diseño fuerte reduce confusión tardía con equipos locales.' },
    ],
    audienceTitle: { en: 'Best fit in South Florida', es: 'Mejor fit en South Florida' },
    audienceBody: { en: 'Developers, premium homeowners, and hospitality operators who need a clear architectural direction and a polished package for Miami.', es: 'Developers, propietarios premium y operadores de hospitality que necesitan una dirección arquitectónica clara y un paquete bien resuelto para Miami.' },
    scopeTitle: { en: 'Typical Miami scope', es: 'Alcance típico en Miami' },
    scopeItems: [
      { en: 'Concept and presentation package', es: 'Concepto y paquete de presentación' },
      { en: 'Interiors and visualization aligned to market use', es: 'Interiores y visualización alineados al uso de mercado' },
      { en: 'Coordination with the local team when another technical layer is needed', es: 'Coordinación con el equipo local cuando hace falta otra capa técnica' },
    ],
    ctaTitle: { en: 'If the project is in Miami, start with the design direction first.', es: 'Si el proyecto está en Miami, empieza por la dirección de diseño.' },
    ctaBody: { en: 'We will scope the project around design goals, presentation needs, and the right next step.', es: 'Vamos a definir el proyecto según objetivos de diseño, necesidades de presentación y el siguiente paso correcto.' },
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Miami',
    relatedPostSlugs: ['what-somaz-delivers-before-local-permit-submission', 'renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-m', 'casa-k', 'casa-tiago'],
    faq: [
      {
        question: { en: 'Can Somaz sign plans in Miami?', es: '¿Somaz puede firmar planos en Miami?' },
        answer: { en: 'Some Miami projects need a separate local technical team for later stages. Somaz can coordinate that handoff when needed.', es: 'Algunos proyectos en Miami necesitan un equipo técnico local separado para etapas posteriores. Somaz puede coordinar ese handoff cuando hace falta.' },
      },
      {
        question: { en: 'Is this still useful before the local architect is engaged?', es: '¿Esto sigue siendo útil antes de involucrar al arquitecto local?' },
        answer: { en: 'Yes. Strong design direction and a clearer package usually make the later local coordination more efficient.', es: 'Sí. Una dirección de diseño fuerte y un paquete más claro suelen volver más eficiente la coordinación local posterior.' },
      },
    ],
  },
  {
    slug: 'architect-led-design-with-local-partners',
    title: { en: 'Design Direction with External Technical Teams', es: 'Dirección de Diseño con Equipos Técnicos Externos' },
    metaTitle: { en: 'Design Direction with External Technical Teams', es: 'Dirección de Diseño con Equipos Técnicos Externos' },
    metaDescription: {
      en: 'A design process where Somaz leads concept and presentation while external technical teams support later local stages when needed.',
      es: 'Un proceso de diseño donde Somaz lidera concepto y presentación mientras equipos técnicos externos acompañan etapas locales posteriores cuando hace falta.',
    },
    heroEyebrow: { en: 'Partner Model', es: 'Modelo con Partners' },
    heroTitle: { en: 'One design direction, with the right technical support when the project grows.', es: 'Una sola dirección de diseño, con el soporte técnico correcto cuando el proyecto crece.' },
    heroBody: { en: 'Some projects need another local technical layer later on. Somaz keeps the design line clear and coordinates that transition so the work does not lose coherence.', es: 'Algunos proyectos necesitan después otra capa técnica local. Somaz mantiene clara la línea de diseño y coordina esa transición para que el trabajo no pierda coherencia.' },
    proofTitle: { en: 'Why clients use this model', es: 'Por qué clientes usan este modelo' },
    proofPoints: [
      { en: 'Keeps design intent strong across markets', es: 'Mantiene fuerte la intención de diseño entre mercados' },
      { en: 'Creates a cleaner handoff between concept and technical development', es: 'Crea un handoff más limpio entre concepto y desarrollo técnico' },
    ],
    audienceTitle: { en: 'Best fit', es: 'Mejor fit' },
    audienceBody: { en: 'Clients and architect partners who need a project to move across markets without losing design clarity.', es: 'Clientes y arquitectos partners que necesitan que un proyecto avance entre mercados sin perder claridad de diseño.' },
    scopeTitle: { en: 'How the model is structured', es: 'Cómo se estructura el modelo' },
    scopeItems: [
      { en: 'Somaz leads concept, interiors, and package preparation', es: 'Somaz lidera concepto, interiores y preparación de paquetes' },
      { en: 'An external technical team can later review, adapt, or document the project when needed', es: 'Un equipo técnico externo puede después revisar, adaptar o documentar el proyecto cuando hace falta' },
      { en: 'The handoff stays clear from the beginning', es: 'El handoff queda claro desde el principio' },
    ],
    ctaTitle: { en: 'If your project spans different teams or markets, start here.', es: 'Si tu proyecto cruza equipos o mercados, empieza acá.' },
    ctaBody: { en: 'We will define whether the project needs only Somaz or a later external technical team as well.', es: 'Vamos a definir si el proyecto necesita solo a Somaz o también a un equipo técnico externo más adelante.' },
    primaryService: 'Architecture',
    primaryAudience: 'Architect Partner',
    primaryMarket: 'Global',
    relatedPostSlugs: ['what-somaz-delivers-before-local-permit-submission', 'how-architect-led-remote-design-works'],
    relatedProjectSlugs: ['casa-m', 'iron-fitness-gym', 'cabanas-terraciello'],
    faq: [
      {
        question: { en: 'When do external teams enter the process?', es: '¿Cuándo entran equipos externos en el proceso?' },
        answer: { en: 'Only when the project reaches a stage that needs another technical layer, documentation, or local execution support.', es: 'Solo cuando el proyecto llega a una etapa que necesita otra capa técnica, documentación o soporte local de ejecución.' },
      },
      {
        question: { en: 'Does this make the process slower?', es: '¿Esto vuelve el proceso más lento?' },
        answer: { en: 'Not when it is planned correctly. The goal is to keep the design decisions clear early so later coordination is simpler, not heavier.', es: 'No cuando está bien planificado. El objetivo es dejar claras las decisiones de diseño temprano para que la coordinación posterior sea más simple, no más pesada.' },
      },
    ],
  },
]

export function getSeoLanding(slug: string) {
  return seoLandings.find((landing) => landing.slug === slug)
}
