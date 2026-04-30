import type { LocaleString } from '@/lib/locale'

export interface Post {
  title: LocaleString
  slug: string
  date: string
  excerpt: LocaleString
  content: LocaleString
  category: 'Commercial Intent' | 'Process' | 'Projects' | 'Case Study' | 'Design Thinking'
  coverImage: string
  seoIntent?: 'commercial' | 'authority' | 'case-study'
  primaryService?: 'Architecture' | '3D Visualization' | 'Interior Design' | 'Conceptual Design' | 'Design Consulting'
  primaryAudience?: 'Developer' | 'Hospitality' | 'Homeowner' | 'Architect Partner'
  primaryMarket?: 'Global' | 'Miami' | 'Argentina'
  ctaVariant?: 'start-project' | 'strategy-consult' | 'view-case'
  relatedSlugs?: string[]
  relatedProjectSlugs?: string[]
  relatedLandingSlugs?: string[]
}

export const posts: Post[] = [
  {
    title: {
      en: 'Why Light Is the First Material We Choose',
      es: 'Por Qué la Luz Es el Primer Material que Elegimos',
    },
    slug: 'why-light-is-the-first-material',
    date: '2024-11-20',
    category: 'Design Thinking',
    coverImage: '/blog/why-light-is-the-first-material.jpg',
    excerpt: {
      en: 'Before we select a finish or specify a fixture, we design the light. Here is how we approach natural and artificial lighting as a foundational material in every project.',
      es: 'Antes de seleccionar un acabado o especificar una luminaria, diseñamos la luz. Así es como abordamos la iluminación natural y artificial como material fundacional en cada proyecto.',
    },
    content: {
      en: `Every project at Somaz Studio begins with the same question: how does light enter this space?

Before we discuss finishes, furniture, or even layout, we map the sun path and the quality of natural light available. In Miami this means understanding the intensity of direct south-facing light and the softness of reflected northern exposure. In Argentina's interior, it means working with longer golden hours and lower sun angles.

Light is not a decorative element. It is the primary shaping force of how a space is perceived. A room rendered with flat, uniform lighting looks clinical and lifeless. The same room with raking light across a textured wall becomes something to inhabit.

In our 3D visualization work, we treat every artificial light source as a deliberate decision — not a technical necessity but a compositional choice. We ask: what should this light reveal? What should it leave in shadow? What mood does it need to reinforce?

This thinking carries directly into interior design projects. We specify fixtures based on the quality of light they produce — diffuse or directional, warm or neutral, narrow or wide beam — before we consider their form or cost.

The result is spaces that feel inhabited before a single piece of furniture has been placed.`,
      es: `Cada proyecto en Somaz Studio comienza con la misma pregunta: ¿cómo entra la luz en este espacio?

Antes de hablar de acabados, mobiliario o incluso distribución, trazamos el recorrido solar y la calidad de la luz natural disponible. En Miami esto significa entender la intensidad de la luz directa orientada al sur y la suavidad de la exposición norte reflejada. En el interior de Argentina, implica trabajar con horas doradas más largas y ángulos de sol más bajos.

La luz no es un elemento decorativo. Es la fuerza principal que da forma a cómo se percibe un espacio. Una habitación renderizada con iluminación plana y uniforme parece clínica y sin vida. La misma habitación con luz rasante sobre una pared texturada se convierte en algo habitable.

En nuestro trabajo de visualización 3D, tratamos cada fuente de luz artificial como una decisión deliberada — no una necesidad técnica sino una elección compositiva. Nos preguntamos: ¿qué debe revelar esta luz? ¿Qué debe dejar en sombra? ¿Qué atmósfera necesita reforzar?

Este pensamiento se traslada directamente a los proyectos de diseño de interiores. Especificamos luminarias según la calidad de luz que producen — difusa o direccional, cálida o neutra, haz estrecho o amplio — antes de considerar su forma o costo.

El resultado son espacios que se sienten habitados antes de que se haya colocado un solo mueble.`,
    },
  },
  {
    title: {
      en: 'From Concept to Render: Our Process in Four Phases',
      es: 'Del Concepto al Render: Nuestro Proceso en Cuatro Fases',
    },
    slug: 'from-concept-to-render-process',
    date: '2024-09-08',
    category: 'Process',
    coverImage: '/blog/from-concept-to-render-process.jpg',
    excerpt: {
      en: 'A transparent look at how we move from a client brief to a final deliverable — the decisions we make, the tools we use, and where most projects go wrong.',
      es: 'Una mirada transparente a cómo pasamos de un brief de cliente a un entregable final — las decisiones que tomamos, las herramientas que usamos y dónde fallan la mayoría de los proyectos.',
    },
    content: {
      en: `Most 3D visualization briefs arrive as a floor plan, a reference image, and a budget. Our job is to close the gap between what exists on paper and what the client sees in their mind.

Phase 1 is discovery. We ask more questions than most clients expect: What is the purpose of this space? Who inhabits it? What do you want them to feel within thirty seconds of entering? The answers to these questions drive every decision that follows.

Phase 2 is massing and light. We block out the space in 3D without any surface detail — just volumes, openings, and a light study. This is the phase where fundamental spatial decisions are made and where changes are cheapest. We always present this to clients before moving forward.

Phase 3 is materiality. We select and apply surfaces, textures, and finishes. This is where the project gains its character. We source materials from real manufacturers so that what appears in the render can actually be built.

Phase 4 is final rendering and delivery. We produce the agreed number of views at full resolution, optimize for the intended use (print, presentation, digital), and deliver in the agreed formats with all source files.

The places where projects fail are almost always in Phase 1 — when the brief is rushed or assumptions go unchallenged. We take Phase 1 seriously because it saves everyone time.`,
      es: `La mayoría de los briefs de visualización 3D llegan como un plano, una imagen de referencia y un presupuesto. Nuestro trabajo es cerrar la brecha entre lo que existe en papel y lo que el cliente ve en su mente.

La Fase 1 es el descubrimiento. Hacemos más preguntas de las que la mayoría de los clientes espera: ¿Cuál es el propósito de este espacio? ¿Quién lo habita? ¿Qué quieres que sientan a los treinta segundos de entrar? Las respuestas a estas preguntas guían cada decisión que sigue.

La Fase 2 es el volumen y la luz. Bloqueamos el espacio en 3D sin ningún detalle de superficie — solo volúmenes, aperturas y un estudio de luz. Esta es la fase donde se toman las decisiones espaciales fundamentales y donde los cambios son más económicos. Siempre presentamos esto a los clientes antes de avanzar.

La Fase 3 es la materialidad. Seleccionamos y aplicamos superficies, texturas y acabados. Aquí es donde el proyecto gana su carácter. Obtenemos materiales de fabricantes reales para que lo que aparece en el render pueda construirse.

La Fase 4 es el renderizado final y la entrega. Producimos el número acordado de vistas en resolución completa, optimizamos para el uso previsto (impresión, presentación, digital) y entregamos en los formatos acordados con todos los archivos fuente.

Los proyectos fallan casi siempre en la Fase 1 — cuando el brief se apresura o las suposiciones no se cuestionan. Tomamos la Fase 1 en serio porque le ahorra tiempo a todos.`,
    },
  },
  {
    title: {
      en: 'Casa Estancita: Designing for Silence',
      es: 'Casa Estancita: Diseñar para el Silencio',
    },
    slug: 'casa-estancita-designing-for-silence',
    date: '2024-06-15',
    category: 'Projects',
    coverImage: '/blog/casa-estancita-designing-for-silence.jpg',
    excerpt: {
      en: 'A residential project in rural Argentina became an exercise in restraint — how to design a space that feels quiet, unhurried, and deeply connected to its landscape.',
      es: 'Un proyecto residencial en la Argentina rural se convirtió en un ejercicio de contención — cómo diseñar un espacio que se sienta tranquilo, sin prisa y profundamente conectado a su paisaje.',
    },
    content: {
      en: `Casa Estancita sits on a working cattle ranch in the Pampas. The brief was simple: a family home that feels like it belongs to the land, not imposed on it.

The challenge with rural residential projects is resisting the temptation to fill the space with visual interest. The landscape outside is already extraordinary. The interior's job is to frame it, not compete with it.

We started with palette restraint: natural linen, unsealed concrete, aged timber, raw leather. Nothing that requires maintenance, nothing that ages badly. Colors drawn directly from the surrounding grassland and sky.

The floor plan is organized around a single extended living space that opens entirely to the south-facing terrace. The kitchen, dining, and living areas share an uninterrupted view. The bedrooms are deliberately narrow — spaces for sleeping, not for lingering.

Artificial lighting was reduced to the minimum necessary: a single warm pendant over the dining table, concealed strip lights under the kitchen counters, reading lights in the bedrooms. At night the space recedes and the horizon becomes the artwork.

The client's feedback after the first render: "It looks like it's been there for fifty years." That was exactly the intent.`,
      es: `Casa Estancita se asienta sobre un establecimiento ganadero en la Pampa. El brief era simple: una casa familiar que se sienta como parte de la tierra, no impuesta sobre ella.

El desafío con los proyectos residenciales rurales es resistir la tentación de llenar el espacio de interés visual. El paisaje exterior ya es extraordinario. El trabajo del interior es enmarcarlo, no competir con él.

Comenzamos con contención en la paleta: lino natural, hormigón sin sellar, madera envejecida, cuero sin procesar. Nada que requiera mantenimiento, nada que envejezca mal. Colores extraídos directamente de las praderas circundantes y el cielo.

La planta se organiza en torno a un único espacio de estar extendido que se abre completamente a la terraza orientada al sur. La cocina, el comedor y el living comparten una vista ininterrumpida. Los dormitorios son deliberadamente estrechos — espacios para dormir, no para detenerse.

La iluminación artificial se redujo al mínimo necesario: un único colgante cálido sobre la mesa del comedor, tiras ocultas bajo las mesadas de la cocina, lámparas de lectura en los dormitorios. Por la noche el espacio se retira y el horizonte se convierte en la obra de arte.

El comentario del cliente tras el primer render: "Parece que lleva cincuenta años ahí." Esa era exactamente la intención.`,
    },
  },
  {
    title: {
      en: '3D Architectural Visualization for Real Estate Developers',
      es: 'Visualización 3D Arquitectónica para Desarrolladores Inmobiliarios',
    },
    slug: '3d-visualization-real-estate-developers',
    date: '2024-05-10',
    category: 'Design Thinking',
    coverImage: '/blog/3d-visualization-real-estate-developers.jpg',
    excerpt: {
      en: 'How photorealistic renders help developers close funding, sell units, and get permits faster — and why quality visualization is an investment, not an expense.',
      es: 'Cómo los renders fotorrealistas ayudan a los desarrolladores a cerrar financiamiento, vender unidades y obtener permisos más rápido — y por qué la visualización de calidad es una inversión, no un gasto.',
    },
    content: {
      en: `In real estate development, time is capital. Every week between land acquisition and sales launch costs money. 3D architectural visualization compresses that timeline in three specific ways.

First, pre-sales. Buyers in Miami, Buenos Aires, and Santiago are increasingly comfortable purchasing off-plan — but only when the visuals are convincing. A photorealistic render that shows the finished space, in context, with real materials and accurate lighting, converts interest into deposits.

Second, investor presentations. We have seen clients close funding rounds weeks ahead of schedule after presenting our renders. Investors respond to certainty, and a well-executed visualization communicates that the team has a clear, detailed vision.

Third, permit applications. Municipal review boards process hundreds of submissions. Projects with high-quality exterior renders and contextual site views stand out. They communicate professionalism and reduce the number of follow-up questions.

The cost of a professional visualization package — typically $1,200 to $3,000 for a residential project — is negligible compared to the carrying costs of delays. One of our clients calculated that closing funding three weeks early saved them over $40,000 in interest alone.

The key is working with a studio that understands architecture, not just software. Technically accurate renders that misread spatial proportions or lighting conditions actually damage credibility. The visualization must feel inevitable — like the building already exists.`,
      es: `En el desarrollo inmobiliario, el tiempo es capital. Cada semana entre la adquisición del terreno y el lanzamiento de ventas cuesta dinero. La visualización 3D arquitectónica comprime ese cronograma de tres maneras específicas.

Primero, preventas. Los compradores en Miami, Buenos Aires y Santiago están cada vez más cómodos comprando sobre plano — pero solo cuando los visuales son convincentes. Un render fotorrealista que muestra el espacio terminado, en contexto, con materiales reales e iluminación precisa, convierte el interés en reservas.

Segundo, presentaciones a inversores. Hemos visto clientes cerrar rondas de financiamiento semanas antes de lo previsto tras presentar nuestros renders. Los inversores responden a la certeza, y una visualización bien ejecutada comunica que el equipo tiene una visión clara y detallada.

Tercero, solicitudes de permisos. Las juntas de revisión municipal procesan cientos de presentaciones. Los proyectos con renders exteriores de alta calidad y vistas contextuales del sitio se destacan. Comunican profesionalismo y reducen la cantidad de preguntas de seguimiento.

El costo de un paquete de visualización profesional — típicamente $1,200 a $3,000 para un proyecto residencial — es insignificante comparado con los costos de mantener demoras. Uno de nuestros clientes calculó que cerrar el financiamiento tres semanas antes le ahorró más de $40,000 solo en intereses.

La clave es trabajar con un estudio que entienda arquitectura, no solo software. Renders técnicamente precisos que malinterpretan proporciones espaciales o condiciones de iluminación en realidad dañan la credibilidad. La visualización debe sentirse inevitable — como si el edificio ya existiera.`,
    },
  },
  {
    title: {
      en: 'How Renders Accelerate Permit Approvals',
      es: 'Cómo los Renders Aceleran la Aprobación de Permisos',
    },
    slug: 'renders-accelerate-permit-approvals',
    date: '2024-04-22',
    category: 'Process',
    coverImage: '/blog/renders-accelerate-permit-approvals.jpg',
    excerpt: {
      en: 'Municipal boards respond to clarity. Here is how we prepare visualization packages that reduce review cycles and minimize objections.',
      es: 'Las juntas municipales responden a la claridad. Así es como preparamos paquetes de visualización que reducen los ciclos de revisión y minimizan objeciones.',
    },
    content: {
      en: `Permit applications are communication exercises. The faster a review board understands what you are proposing, the faster they approve it.

Most applications include floor plans, elevations, and site plans — technical documents that architects understand but board members often struggle to interpret. Adding photorealistic renders to the package changes the dynamic entirely.

A well-composed exterior render shows the building in its actual context — neighboring structures, street trees, the angle of afternoon light. It answers questions before they are asked: How tall is it relative to the house next door? Does it block the neighbor's view? How does the material palette fit the neighborhood?

For interior work, renders demonstrate that the proposed layout meets code requirements for natural light, egress, and accessibility — not through abstract measurements, but through visible, intuitive images.

We have worked on projects in Miami-Dade County, Buenos Aires province, and several Argentine municipalities. In every case, the feedback from the permitting office was the same: the renders made the application clearer and easier to evaluate.

The practical advice: include at least two exterior views (street-level and aerial context) and one interior view of the primary living space. Use realistic materials, not conceptual sketches. Show the project in daylight, not dramatic nighttime lighting. The goal is clarity, not spectacle.`,
      es: `Las solicitudes de permisos son ejercicios de comunicación. Cuanto más rápido una junta de revisión entiende lo que estás proponiendo, más rápido lo aprueba.

La mayoría de las solicitudes incluyen plantas, elevaciones y planos de sitio — documentos técnicos que los arquitectos entienden pero que los miembros de la junta a menudo tienen dificultad para interpretar. Agregar renders fotorrealistas al paquete cambia la dinámica por completo.

Un render exterior bien compuesto muestra el edificio en su contexto real — estructuras vecinas, árboles de la calle, el ángulo de la luz de la tarde. Responde preguntas antes de que se formulen: ¿Qué tan alto es en relación a la casa de al lado? ¿Bloquea la vista del vecino? ¿Cómo se integra la paleta de materiales al barrio?

Para trabajo interior, los renders demuestran que la distribución propuesta cumple los requisitos de código para luz natural, salidas y accesibilidad — no a través de medidas abstractas, sino a través de imágenes visibles e intuitivas.

Hemos trabajado en proyectos en Miami-Dade County, provincia de Buenos Aires y varios municipios argentinos. En todos los casos, la respuesta de la oficina de permisos fue la misma: los renders hicieron la solicitud más clara y fácil de evaluar.

El consejo práctico: incluir al menos dos vistas exteriores (nivel de calle y contexto aéreo) y una vista interior del espacio principal. Usar materiales realistas, no bocetos conceptuales. Mostrar el proyecto de día, no con iluminación nocturna dramática. El objetivo es claridad, no espectáculo.`,
    },
  },
  {
    title: {
      en: 'Interior Design Miami: Trends Shaping Residential Spaces',
      es: 'Diseño de Interiores en Miami: Tendencias que Definen los Espacios Residenciales',
    },
    slug: 'interior-design-miami-trends',
    date: '2024-03-18',
    category: 'Design Thinking',
    coverImage: '/blog/interior-design-miami-trends.jpg',
    excerpt: {
      en: 'What we are seeing in Miami residential interiors — from biophilic integration to material honesty — and what it means for clients planning their next project.',
      es: 'Lo que estamos viendo en interiores residenciales de Miami — desde integración biofílica hasta honestidad material — y qué significa para clientes que planean su próximo proyecto.',
    },
    content: {
      en: `Miami's residential design market has shifted noticeably in the last two years. Clients are moving away from the high-gloss, overtly luxury aesthetic that defined the city's interiors for a decade.

The strongest trend we are seeing is material honesty. Clients want to see the actual surface — the grain of the wood, the texture of the plaster, the imperfections in hand-laid tile. This does not mean rustic. It means authentic. A polished concrete floor with visible aggregate reads as sophisticated, not unfinished.

Biophilic design has moved from trend to expectation. Indoor-outdoor transitions are no longer a luxury — they are the baseline. Our projects consistently include operable glass walls, planted interior courtyards, and natural ventilation strategies. In Miami's climate, this is not just aesthetic — it is functional.

Color palettes have cooled. The warm beiges and golds that dominated five years ago are giving way to earthy greens, warm grays, and terracotta tones. Accent colors are drawn from natural materials rather than applied as paint.

Furniture is trending toward smaller, more intentional pieces. The oversized sectional is being replaced by curated groupings of chairs, side tables, and standalone pieces that create intimate conversation areas rather than a single dominant focal point.

For clients planning a project: the interiors that will age best are the ones that commit to a material palette and a spatial idea, rather than chasing a specific visual trend.`,
      es: `El mercado de diseño residencial de Miami ha cambiado notablemente en los últimos dos años. Los clientes se están alejando de la estética de alto brillo y lujo ostentoso que definió los interiores de la ciudad durante una década.

La tendencia más fuerte que estamos viendo es la honestidad material. Los clientes quieren ver la superficie real — la veta de la madera, la textura del yeso, las imperfecciones de la baldosa colocada a mano. Esto no significa rústico. Significa auténtico. Un piso de hormigón pulido con agregado visible se lee como sofisticado, no inconcluso.

El diseño biofílico pasó de tendencia a expectativa. Las transiciones interior-exterior ya no son un lujo — son la base. Nuestros proyectos consistentemente incluyen muros de vidrio operables, patios interiores plantados y estrategias de ventilación natural. En el clima de Miami, esto no es solo estético — es funcional.

Las paletas de color se han enfriado. Los beiges cálidos y dorados que dominaron hace cinco años están dando paso a verdes terrosos, grises cálidos y tonos terracota. Los colores de acento se extraen de materiales naturales en lugar de aplicarse como pintura.

El mobiliario tiende hacia piezas más pequeñas e intencionales. El seccional sobredimensionado está siendo reemplazado por agrupaciones curadas de sillas, mesas auxiliares y piezas independientes que crean áreas de conversación íntimas en lugar de un único punto focal dominante.

Para clientes que planean un proyecto: los interiores que mejor envejecerán son los que se comprometen con una paleta material y una idea espacial, en lugar de perseguir una tendencia visual específica.`,
    },
  },
  {
    title: {
      en: 'The Business Case for Remote Design Services',
      es: 'El Argumento de Negocio para los Servicios de Diseño Remoto',
    },
    slug: 'business-case-remote-design',
    date: '2024-02-05',
    category: 'Process',
    coverImage: '/blog/business-case-remote-design.jpg',
    excerpt: {
      en: 'How remote-first design studios deliver better results at lower cost — and why geography no longer determines the quality of your project.',
      es: 'Cómo los estudios de diseño remote-first entregan mejores resultados a menor costo — y por qué la geografía ya no determina la calidad de tu proyecto.',
    },
    content: {
      en: `When we started Somaz Studio as a remote-first practice, clients were skeptical. How can you design a space you have never visited? How do you select materials you cannot touch?

Three years and fifty projects later, the model has proven itself. Here is why.

First, the talent pool. A local-only studio is limited to designers within commuting distance. A remote studio draws from the entire profession. Our team has deep experience in Latin American residential design and Miami's specific climate and market — a combination that is rare in any single geography.

Second, the economics. We do not maintain a showroom or a warehouse of material samples. Our clients do not pay for that overhead. The savings are passed directly to the project budget — which means better materials, more render views, or faster timelines.

Third, the tools. Modern 3D visualization software, cloud-based collaboration platforms, and high-resolution video calls have eliminated the practical barriers to remote design. We share real-time 3D walkthroughs with clients. We source materials digitally from manufacturer libraries with full specification data. We conduct site analysis using satellite imagery, sun path tools, and local climate data.

The one thing we cannot do remotely is the final construction observation. For that, we partner with local contractors and architects who handle on-site execution. We provide them with detailed specifications, material schedules, and reference renders so that the finished space matches the design.

The result: clients in Miami, Buenos Aires, Santiago, Montevideo, and Bogotá receive the same quality of design work — regardless of where our team sits.`,
      es: `Cuando iniciamos Somaz Studio como una práctica remote-first, los clientes eran escépticos. ¿Cómo pueden diseñar un espacio que nunca visitaron? ¿Cómo seleccionan materiales que no pueden tocar?

Tres años y cincuenta proyectos después, el modelo se ha demostrado. He aquí por qué.

Primero, el pool de talento. Un estudio solo local está limitado a diseñadores dentro de la distancia de viaje. Un estudio remoto recurre a toda la profesión. Nuestro equipo tiene profunda experiencia en diseño residencial latinoamericano y el clima y mercado específico de Miami — una combinación que es rara en cualquier geografía individual.

Segundo, la economía. No mantenemos un showroom ni un depósito de muestras de materiales. Nuestros clientes no pagan por esos gastos generales. Los ahorros se pasan directamente al presupuesto del proyecto — lo que significa mejores materiales, más vistas de render, o cronogramas más rápidos.

Tercero, las herramientas. El software moderno de visualización 3D, las plataformas de colaboración en la nube y las videollamadas en alta resolución han eliminado las barreras prácticas para el diseño remoto. Compartimos recorridos 3D en tiempo real con los clientes. Obtenemos materiales digitalmente de bibliotecas de fabricantes con datos de especificación completos. Realizamos análisis de sitio usando imágenes satelitales, herramientas de trayectoria solar y datos climáticos locales.

Lo único que no podemos hacer remotamente es la observación final de construcción. Para eso, nos asociamos con contratistas y arquitectos locales que manejan la ejecución en sitio. Les proporcionamos especificaciones detalladas, cronogramas de materiales y renders de referencia para que el espacio terminado coincida con el diseño.

El resultado: clientes en Miami, Buenos Aires, Santiago, Montevideo y Bogotá reciben la misma calidad de trabajo de diseño — sin importar dónde se sienta nuestro equipo.`,
    },
  },
  {
    title: {
      en: 'Choosing Materials That Photograph Well — And Age Better',
      es: 'Elegir Materiales que Fotografían Bien — y Envejecen Mejor',
    },
    slug: 'materials-photograph-age-well',
    date: '2024-01-12',
    category: 'Design Thinking',
    coverImage: '/blog/materials-photograph-age-well.jpg',
    excerpt: {
      en: 'The materials that look best in renders are often the same ones that improve with time. Here is how we think about material selection across visualization and interior design.',
      es: 'Los materiales que se ven mejor en renders son a menudo los mismos que mejoran con el tiempo. Así es como pensamos la selección de materiales en visualización y diseño de interiores.',
    },
    content: {
      en: `There is a direct correlation between materials that render well in 3D and materials that age gracefully in real life. Both reward texture, depth, and natural variation.

Smooth, uniform surfaces — high-gloss lacquer, flawless marble, seamless glass — are technically demanding to render because they require perfect reflections and zero imperfections. In reality, they show every fingerprint, scratch, and dust particle. They look immaculate on day one and degraded by month six.

Textured, natural materials — brushed timber, honed stone, raw linen, hand-troweled plaster — are forgiving in both contexts. In a render, they create visual richness and depth. In a built space, they develop patina. A timber floor that darkens with foot traffic becomes more beautiful, not less.

When we work on interior design projects, material selection is the decision with the longest consequences. Paint can be changed in a weekend. Furniture can be replaced in a month. But the floor, the wall surfaces, and the countertops define the space for a decade or more.

Our process: we select materials from real manufacturers, verify availability and lead times, and render them under the specific lighting conditions of the project. The client sees exactly what they are committing to — not an idealized version, but a realistic one.

The materials we specify most frequently: engineered oak in natural or fumed finishes, porcelain tile that replicates natural stone, micro-cement for walls and floors, solid brass hardware, and natural fiber textiles. Each of these renders beautifully and ages with dignity.`,
      es: `Existe una correlación directa entre los materiales que se renderizan bien en 3D y los que envejecen con gracia en la vida real. Ambos recompensan la textura, la profundidad y la variación natural.

Las superficies lisas y uniformes — laca de alto brillo, mármol impecable, vidrio sin juntas — son técnicamente exigentes para renderizar porque requieren reflejos perfectos y cero imperfecciones. En realidad, muestran cada huella digital, rayón y partícula de polvo. Se ven inmaculadas el día uno y degradadas para el mes seis.

Los materiales texturados y naturales — madera cepillada, piedra afinada, lino crudo, yeso aplicado a mano — son más tolerantes en ambos contextos. En un render, crean riqueza visual y profundidad. En un espacio construido, desarrollan pátina. Un piso de madera que se oscurece con el tránsito se vuelve más bello, no menos.

Cuando trabajamos en proyectos de diseño de interiores, la selección de materiales es la decisión con las consecuencias más largas. La pintura se puede cambiar en un fin de semana. El mobiliario se puede reemplazar en un mes. Pero el piso, las superficies de las paredes y las mesadas definen el espacio por una década o más.

Nuestro proceso: seleccionamos materiales de fabricantes reales, verificamos disponibilidad y tiempos de entrega, y los renderizamos bajo las condiciones de iluminación específicas del proyecto. El cliente ve exactamente a qué se está comprometiendo — no una versión idealizada, sino una realista.

Los materiales que especificamos con más frecuencia: roble engineered en acabados naturales o ahumados, porcelanato que replica piedra natural, microcemento para paredes y pisos, herrajes de bronce macizo y textiles de fibra natural. Cada uno de estos se renderiza bellamente y envejece con dignidad.`,
    },
  },
  {
    title: {
      en: 'What Clients Get Wrong About 3D Visualization Briefs',
      es: 'Lo que los Clientes Hacen Mal en los Briefs de Visualización 3D',
    },
    slug: 'common-visualization-brief-mistakes',
    date: '2023-12-01',
    category: 'Process',
    coverImage: '/blog/common-visualization-brief-mistakes.jpg',
    excerpt: {
      en: 'After fifty projects, we have noticed patterns in how briefs go wrong. Here are the five most common mistakes and how to avoid them.',
      es: 'Después de cincuenta proyectos, hemos notado patrones en cómo los briefs salen mal. Aquí están los cinco errores más comunes y cómo evitarlos.',
    },
    content: {
      en: `The quality of a 3D visualization is directly proportional to the quality of the brief. After working on over fifty projects, we have identified the five most common mistakes clients make — and how to avoid them.

Mistake 1: Sending reference images without context. A Pinterest board with thirty images tells us what you like visually, but not what you need functionally. Better: send five images with notes explaining what specifically you respond to in each one — is it the material palette? The spatial proportions? The lighting mood?

Mistake 2: Requesting too many views. More views does not mean better communication. Three strategically chosen views — one exterior establishing shot, one primary interior, one detail — communicate more effectively than eight unfocused renders.

Mistake 3: Delaying material decisions. When clients say "just use something similar for now," the render becomes a placeholder that has to be redone later. Material selection should happen before rendering begins, not after.

Mistake 4: Underestimating the value of context. An exterior render without landscape, neighboring buildings, or sky context looks like a 3D model floating in space. Context is what makes a render feel real.

Mistake 5: Treating visualization as the last step. The most effective use of 3D visualization is during the design process — to test ideas, evaluate options, and make spatial decisions. When visualization is relegated to "make the finished design look pretty," its value is reduced by ninety percent.

The best briefs we receive are short, specific, and honest about what the visualization needs to accomplish.`,
      es: `La calidad de una visualización 3D es directamente proporcional a la calidad del brief. Después de trabajar en más de cincuenta proyectos, hemos identificado los cinco errores más comunes que cometen los clientes — y cómo evitarlos.

Error 1: Enviar imágenes de referencia sin contexto. Un tablero de Pinterest con treinta imágenes nos dice qué te gusta visualmente, pero no qué necesitas funcionalmente. Mejor: enviar cinco imágenes con notas explicando qué específicamente te atrae de cada una — ¿es la paleta material? ¿Las proporciones espaciales? ¿La atmósfera de iluminación?

Error 2: Solicitar demasiadas vistas. Más vistas no significa mejor comunicación. Tres vistas estratégicamente elegidas — una toma exterior de establecimiento, un interior principal, un detalle — comunican más efectivamente que ocho renders sin enfoque.

Error 3: Retrasar las decisiones de materiales. Cuando los clientes dicen "usá algo similar por ahora," el render se convierte en un placeholder que tiene que rehacerse después. La selección de materiales debe ocurrir antes de que comience el renderizado, no después.

Error 4: Subestimar el valor del contexto. Un render exterior sin paisaje, edificios vecinos o contexto de cielo parece un modelo 3D flotando en el espacio. El contexto es lo que hace que un render se sienta real.

Error 5: Tratar la visualización como el último paso. El uso más efectivo de la visualización 3D es durante el proceso de diseño — para testear ideas, evaluar opciones y tomar decisiones espaciales. Cuando la visualización se relega a "hacer que el diseño terminado se vea lindo," su valor se reduce en un noventa por ciento.

Los mejores briefs que recibimos son cortos, específicos y honestos sobre lo que la visualización necesita lograr.`,
    },
  },
  {
    title: {
      en: 'Designing Commercial Spaces That Build Brand Identity',
      es: 'Diseñar Espacios Comerciales que Construyen Identidad de Marca',
    },
    slug: 'commercial-spaces-brand-identity',
    date: '2023-11-05',
    category: 'Projects',
    coverImage: '/blog/commercial-spaces-brand-identity.jpg',
    excerpt: {
      en: 'How we approach commercial interior design differently from residential — and why brand alignment is the first design constraint, not the last.',
      es: 'Cómo abordamos el diseño de interiores comercial de manera diferente al residencial — y por qué la alineación de marca es la primera restricción de diseño, no la última.',
    },
    content: {
      en: `Commercial interior design operates under a fundamentally different set of constraints than residential. In a home, the client is the inhabitant. In a commercial space, the client's customer is the inhabitant — and the space must communicate the brand before anyone reads a sign.

When we designed the Iron Fitness Gym in Argentina, the brand brief was clear: industrial, uncompromising, raw. Every material decision was tested against that identity. Polished concrete floors — yes, they reinforce the industrial language. Exposed ductwork painted matte black — yes, it communicates rawness without appearing unfinished.

The mistake most commercial projects make is treating brand identity as a layer applied on top of generic architecture — logos on walls, brand colors on accent walls, themed furniture. This approach feels superficial because it is.

True brand-aligned design starts with the spatial experience. How does a customer move through the space? What do they see first? What do they touch? What do they hear? These sensory decisions communicate brand values far more effectively than any graphic element.

For retail, the critical metric is dwell time. For hospitality, it is return frequency. For fitness, it is motivation and energy. Each of these requires a different spatial strategy — and the visualization phase is where we test those strategies before committing to construction.

Our approach: we develop the brand-spatial concept first, visualize it in 3D, test it with the client, and only then move to detailed design development. The renders are not illustrations of a finished design — they are design tools.`,
      es: `El diseño de interiores comercial opera bajo un conjunto fundamentalmente diferente de restricciones que el residencial. En una casa, el cliente es el habitante. En un espacio comercial, el cliente del cliente es el habitante — y el espacio debe comunicar la marca antes de que alguien lea un cartel.

Cuando diseñamos el Iron Fitness Gym en Argentina, el brief de marca era claro: industrial, sin concesiones, crudo. Cada decisión de materiales se testeó contra esa identidad. Pisos de hormigón pulido — sí, refuerzan el lenguaje industrial. Conductos expuestos pintados de negro mate — sí, comunican crudeza sin parecer inconcluso.

El error que cometen la mayoría de los proyectos comerciales es tratar la identidad de marca como una capa aplicada sobre arquitectura genérica — logos en paredes, colores de marca en paredes de acento, mobiliario temático. Este enfoque se siente superficial porque lo es.

El diseño verdaderamente alineado con la marca comienza con la experiencia espacial. ¿Cómo se mueve un cliente por el espacio? ¿Qué ve primero? ¿Qué toca? ¿Qué escucha? Estas decisiones sensoriales comunican valores de marca mucho más efectivamente que cualquier elemento gráfico.

Para retail, la métrica crítica es el tiempo de permanencia. Para hospitalidad, es la frecuencia de retorno. Para fitness, es motivación y energía. Cada uno requiere una estrategia espacial diferente — y la fase de visualización es donde testeamos esas estrategias antes de comprometerse con la construcción.

Nuestro enfoque: desarrollamos primero el concepto marca-espacio, lo visualizamos en 3D, lo testeamos con el cliente, y solo entonces pasamos al desarrollo de diseño detallado. Los renders no son ilustraciones de un diseño terminado — son herramientas de diseño.`,
    },
  },
  {
    title: {
      en: 'How Architect-Led Remote Design Works',
      es: 'Cómo Funciona el Diseño Remoto Liderado por Arquitectura',
    },
    slug: 'how-architect-led-remote-design-works',
    date: '2026-04-27',
    category: 'Commercial Intent',
    coverImage: '/blog/from-concept-to-render-process.jpg',
    excerpt: {
      en: 'How Somaz scopes, designs, coordinates, and delivers remote projects without losing architectural clarity.',
      es: 'Cómo Somaz define, diseña, coordina y entrega proyectos en remoto sin perder claridad arquitectónica.',
    },
    content: {
      en: `Remote design fails when it tries to imitate a local office instead of building a process that actually works in distributed collaboration.

At Somaz, remote work starts with scope clarity. Before drawing a plan or defining a material, we need to understand the project, who makes decisions, and what the next real milestone is.

The second layer is design direction. We do not begin with image production. We begin with spatial decisions: what the project needs to achieve, how circulation should work, what material language makes sense, and what kind of package will help it move.

The third layer is packaging. A remote project stays efficient when the deliverables are built to align people. That means presentations for owners, visual material for investors or boards, and packages that help builders, consultants, or technical teams understand the design intent without guessing.

The last layer is coordination. Some projects stay fully inside the studio. Others later need another technical or local team. The value is not pretending every project works the same way. The value is keeping the design clear from the start so the next step is easier.`,
      es: `El diseño remoto falla cuando intenta imitar a una oficina local en lugar de construir un proceso que realmente funcione en colaboración distribuida.

En Somaz, el trabajo remoto empieza por la claridad de alcance. Antes de dibujar una planta o definir un material, necesitamos entender el proyecto, quién toma decisiones y cuál es el siguiente hito real.

La segunda capa es la dirección de diseño. No empezamos por producir imágenes. Empezamos por decisiones espaciales: qué necesita lograr el proyecto, cómo debe funcionar la circulación, qué lenguaje material tiene sentido y qué tipo de paquete lo va a ayudar a avanzar.

La tercera capa es el packaging. Un proyecto remoto se mantiene eficiente cuando los entregables están armados para alinear personas. Eso significa presentaciones para owners, material visual para inversores o boards y paquetes que ayuden a builders, consultores o equipos técnicos a entender la intención de diseño sin adivinar.

La última capa es la coordinación. Algunos proyectos se resuelven completos dentro del estudio. Otros después necesitan otro equipo técnico o local. El valor no está en fingir que todos funcionan igual. El valor está en dejar el diseño claro desde el principio para que el siguiente paso sea más fácil.`,
    },
    seoIntent: 'commercial',
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    ctaVariant: 'start-project',
    relatedSlugs: ['what-somaz-delivers-before-local-permit-submission', 'business-case-remote-design'],
    relatedProjectSlugs: ['casa-m', 'cabanas-terraciello'],
    relatedLandingSlugs: ['architecture-studio', 'remote-architecture-studio'],
  },
  {
    title: {
      en: 'What Somaz Delivers Before Local Permit Submission',
      es: 'Qué Entrega Somaz Antes de una Submission Local de Permiso',
    },
    slug: 'what-somaz-delivers-before-local-permit-submission',
    date: '2026-04-26',
    category: 'Commercial Intent',
    coverImage: '/blog/renders-accelerate-permit-approvals.jpg',
    excerpt: {
      en: 'A clear explanation of the package Somaz prepares before another technical or review stage begins.',
      es: 'Una explicación clara del paquete que Somaz prepara antes de que empiece otra etapa técnica o de revisión.',
    },
    content: {
      en: `One of the most important distinctions in multi-market projects is understanding what the design studio delivers before another review or technical stage begins.

Somaz prepares the design direction, interiors when they are in scope, visualization, presentation material, and the base package that helps the project move with clarity. That package can support owner approvals, investor presentations, HOA reviews, and early conversations with consultants or technical teams.

The value of the Somaz package is that it reduces friction before the next layer starts. The project arrives to the next reviewer, consultant, or collaborator with stronger visual logic, a clearer design narrative, and better internal alignment among stakeholders.

If the package is built correctly, the review process becomes easier because the intent is already legible. That is the commercial point: fewer assumptions, fewer contradictory interpretations, and a cleaner handoff into whatever comes next.`,
      es: `Una de las distinciones más importantes en proyectos entre mercados es entender qué entrega el estudio antes de que empiece otra etapa técnica o de revisión.

Somaz prepara la dirección de diseño, interiores cuando están dentro del alcance, visualización, material de presentación y el paquete base que ayuda a que el proyecto avance con claridad. Ese paquete puede apoyar aprobaciones del owner, presentaciones a inversores, revisiones de HOA y conversaciones tempranas con consultores o equipos técnicos.

El valor del paquete Somaz está en que reduce fricción antes de que empiece la siguiente capa. El proyecto llega al próximo revisor, consultor o colaborador con una lógica visual más fuerte, una narrativa de diseño más clara y mejor alineación interna entre stakeholders.

Si el paquete está bien armado, el proceso de revisión se vuelve más fácil porque la intención ya es legible. Ese es el punto comercial: menos supuestos, menos interpretaciones contradictorias y un handoff más limpio hacia lo que sigue.`,
    },
    seoIntent: 'commercial',
    primaryService: 'Architecture',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    ctaVariant: 'strategy-consult',
    relatedSlugs: ['how-architect-led-remote-design-works', 'renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-m', 'casa-k'],
    relatedLandingSlugs: ['permit-presentation-packages', 'architect-led-design-with-local-partners'],
  },
  {
    title: {
      en: 'Architectural Visualization for Developers',
      es: 'Visualización Arquitectónica para Developers',
    },
    slug: 'architectural-visualization-for-developers',
    date: '2026-04-25',
    category: 'Commercial Intent',
    coverImage: '/blog/3d-visualization-real-estate-developers.jpg',
    excerpt: {
      en: 'Why developers use visualization to shorten decision cycles, support funding, and prepare projects for boards, partners, and pre-sales.',
      es: 'Por qué los developers usan visualización para acortar ciclos de decisión, apoyar financiamiento y preparar proyectos para boards, partners y preventa.',
    },
    content: {
      en: `Developers do not buy visualization because they need pretty images. They buy it because unclear projects get stuck.

The right visualization package helps a project move in three directions at once. First, it helps internal decisions happen faster. Owners, partners, and investors can react to something concrete instead of debating abstract drawings for weeks.

Second, visualization improves external communication. Sales teams, lender conversations, and stakeholder presentations become stronger when the project is shown with real spatial logic, credible light, and material choices that feel buildable.

Third, developers use visualization to reduce friction with review bodies. Boards, HOAs, and local authorities are rarely persuaded by technical drawings alone. A clear exterior view, context shot, or interior spatial image can make the proposal easier to evaluate and defend.

The important distinction is this: the package only works when it is rooted in architectural judgment. Images that look polished but misread the actual space make the project weaker, not stronger. That is why developer-facing visualization has to begin with the project logic, not the rendering software.`,
      es: `Los developers no compran visualización porque necesiten imágenes lindas. La compran porque los proyectos poco claros se traban.

El paquete correcto de visualización ayuda a que el proyecto avance en tres direcciones al mismo tiempo. Primero, permite que las decisiones internas sucedan más rápido. Owners, socios e inversores pueden reaccionar frente a algo concreto en vez de debatir dibujos abstractos durante semanas.

Segundo, mejora la comunicación externa. Los equipos comerciales, las conversaciones con lenders y las presentaciones a stakeholders se vuelven más fuertes cuando el proyecto se muestra con lógica espacial real, luz creíble y elecciones materiales que se sienten construibles.

Tercero, los developers usan visualización para reducir fricción con organismos de revisión. Boards, HOAs y autoridades locales rara vez se convencen solo con dibujos técnicos. Una vista exterior clara, una toma de contexto o una imagen interior espacial pueden volver la propuesta más fácil de evaluar y defender.

La distinción importante es esta: el paquete solo funciona cuando está apoyado en criterio arquitectónico. Imágenes pulidas que leen mal el espacio real debilitan el proyecto en vez de fortalecerlo. Por eso la visualización orientada a developers tiene que empezar desde la lógica del proyecto, no desde el software de render.`,
    },
    seoIntent: 'commercial',
    primaryService: '3D Visualization',
    primaryAudience: 'Developer',
    primaryMarket: 'Global',
    ctaVariant: 'start-project',
    relatedSlugs: ['renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-k', 'iron-fitness-gym'],
    relatedLandingSlugs: ['architectural-visualization', 'permit-presentation-packages'],
  },
  {
    title: {
      en: 'Interior Architecture for Hospitality Projects',
      es: 'Interior Architecture para Proyectos de Hospitality',
    },
    slug: 'interior-architecture-for-hospitality-projects',
    date: '2026-04-24',
    category: 'Commercial Intent',
    coverImage: '/blog/commercial-spaces-brand-identity.jpg',
    excerpt: {
      en: 'How interior architecture helps hospitality projects align brand, guest experience, layout, materials, and operations before execution.',
      es: 'Cómo la interior architecture ayuda a proyectos de hospitality a alinear marca, experiencia del huésped, layout, materiales y operación antes de ejecutar.',
    },
    content: {
      en: `Hospitality projects fail when they are treated like styled residential spaces with a brand moodboard on top.

Interior architecture in hospitality has to solve operational flow, guest perception, brand identity, maintenance, lighting, furniture logic, and material aging at the same time. When those layers are disconnected, the result may photograph well but it does not perform.

Somaz approaches hospitality interiors as a system. The spatial sequence, material palette, lighting temperature, furniture scale, and visual storytelling all need to reinforce the same promise. The goal is not just to make a place look premium. The goal is to make it feel coherent, usable, and commercially strong.

This matters especially in boutique hospitality, where the guest experience is the brand. The first impression, the transition between public and private zones, and the consistency between visuals and on-site reality all affect reviews, repeat visits, and pricing power.

That is why interior architecture has to begin early, before contractors and late-stage selections force the project into compromises it never intended to make.`,
      es: `Los proyectos de hospitality fallan cuando se los trata como espacios residenciales estilizados con un moodboard de marca por encima.

La interior architecture en hospitality tiene que resolver al mismo tiempo flujo operativo, percepción del huésped, identidad de marca, mantenimiento, iluminación, lógica de equipamiento y envejecimiento de materiales. Cuando esas capas están desconectadas, el resultado puede fotografiar bien pero no performa.

Somaz aborda los interiores de hospitality como un sistema. La secuencia espacial, la paleta material, la temperatura de luz, la escala del mobiliario y la narrativa visual tienen que reforzar la misma promesa. El objetivo no es solo que el lugar se vea premium. El objetivo es que se sienta coherente, usable y comercialmente fuerte.

Esto importa especialmente en hospitality boutique, donde la experiencia del huésped es la marca. La primera impresión, la transición entre zonas públicas y privadas y la consistencia entre los visuales y la realidad en sitio afectan reviews, retorno y poder de precio.

Por eso la interior architecture tiene que empezar temprano, antes de que contratistas y selecciones tardías fuercen al proyecto a compromisos que nunca quiso hacer.`,
    },
    seoIntent: 'commercial',
    primaryService: 'Interior Design',
    primaryAudience: 'Hospitality',
    primaryMarket: 'Global',
    ctaVariant: 'strategy-consult',
    relatedSlugs: ['materials-photograph-age-well'],
    relatedProjectSlugs: ['cabanas-terraciello', 'iron-fitness-gym'],
    relatedLandingSlugs: ['interior-architecture'],
  },
  {
    title: {
      en: 'Full-Scope Architecture in Argentina',
      es: 'Arquitectura Integral en Argentina',
    },
    slug: 'full-scope-architecture-in-argentina',
    date: '2026-04-23',
    category: 'Commercial Intent',
    coverImage: '/blog/casa-estancita-designing-for-silence.jpg',
    excerpt: {
      en: 'What a more complete architecture process looks like in Argentina and why that continuity matters.',
      es: 'Qué significa un proceso de arquitectura más completo en Argentina y por qué esa continuidad importa.',
    },
    content: {
      en: `Clients often assume an architecture studio works the same way everywhere. In practice, the process changes depending on the project and market.

In Argentina, Somaz can often work with more continuity between concept, development, interior architecture, documentation, and coordination inside one process.

This matters because the project does not need to split too early between design intent and technical preparation. The same design logic can carry through more of the work, which usually produces better continuity in layout, material systems, and spatial hierarchy.

It also changes the commercial conversation. Instead of selling isolated services, Somaz can build a phased architectural scope with clearer continuity between concept and execution planning.`,
      es: `Muchas veces se asume que un estudio de arquitectura funciona igual en todos lados. En la práctica, el proceso cambia según el proyecto y el mercado.

En Argentina, Somaz muchas veces puede trabajar con más continuidad entre concepto, desarrollo, interior architecture, documentación y coordinación dentro de un mismo proceso.

Esto importa porque el proyecto no necesita dividirse demasiado temprano entre intención de diseño y preparación técnica. La misma lógica de diseño puede recorrer más etapas del trabajo, lo que normalmente produce mejor continuidad en layout, sistemas materiales y jerarquía espacial.

También cambia la conversación comercial. En lugar de vender servicios aislados, Somaz puede construir un alcance arquitectónico por fases con continuidad más clara entre concepto y planificación de ejecución.`,
    },
    seoIntent: 'commercial',
    primaryService: 'Architecture',
    primaryAudience: 'Homeowner',
    primaryMarket: 'Argentina',
    ctaVariant: 'start-project',
    relatedSlugs: ['from-concept-to-render-process'],
    relatedProjectSlugs: ['casa-estancita', 'cabana-concepcion'],
    relatedLandingSlugs: ['architecture-in-argentina'],
  },
  {
    title: {
      en: 'Case Study: Miami Permit Presentation Package',
      es: 'Caso de Estudio: Paquete de Presentación para Permiso en Miami',
    },
    slug: 'case-study-miami-permit-presentation-package',
    date: '2026-04-22',
    category: 'Case Study',
    coverImage: '/blog/renders-accelerate-permit-approvals.jpg',
    excerpt: {
      en: 'How Somaz structured visualization and presentation material to help a Miami residential project be understood clearly.',
      es: 'Cómo Somaz estructuró visualización y material de presentación para que un proyecto residencial en Miami se entendiera con claridad.',
    },
    content: {
      en: `The brief was not simply to produce exterior images. The real need was to prepare a package that would help the project be understood clearly during a Miami review process.

Somaz focused on three deliverables. First, street-level exterior views that made the scale, massing, and material language legible. Second, context imagery that showed how the house sat inside its neighborhood condition. Third, selected interior and transition views that made the use of the project easier to understand for non-design stakeholders.

The package was not treated as an isolated render service. It was structured as a communication layer inside a broader review workflow. That meant every image had to support architectural clarity rather than visual drama.

The result was a cleaner review process and stronger alignment between client expectations, the local technical path, and the way the project was presented externally.

This is exactly where Somaz is most useful in review-sensitive work: by making the proposal easier to understand before it reaches the next stage.`,
      es: `El brief no era simplemente producir imágenes exteriores. La necesidad real era preparar un paquete que ayudara a que el proyecto se entendiera con claridad dentro de una revisión en Miami.

Somaz se enfocó en tres entregables. Primero, vistas exteriores a nivel calle que volvieran legible la escala, la volumetría y el lenguaje material. Segundo, imágenes de contexto que mostraran cómo se insertaba la casa en su condición de barrio. Tercero, vistas interiores y de transición seleccionadas que hicieran más fácil de entender el uso del proyecto para stakeholders no diseñadores.

El paquete no se trató como un servicio de render aislado. Se estructuró como una capa de comunicación dentro de un workflow de revisión más amplio. Eso significó que cada imagen tenía que apoyar claridad arquitectónica y no drama visual.

El resultado fue un proceso de revisión más limpio y una alineación más fuerte entre expectativas del cliente, la ruta técnica local y la forma en que el proyecto se presentaba externamente.

Ahí es exactamente donde Somaz resulta más útil en trabajo sensible a revisión: al volver la propuesta más fácil de entender antes de que llegue a la siguiente etapa.`,
    },
    seoIntent: 'case-study',
    primaryService: '3D Visualization',
    primaryAudience: 'Developer',
    primaryMarket: 'Miami',
    ctaVariant: 'view-case',
    relatedSlugs: ['what-somaz-delivers-before-local-permit-submission', 'renders-accelerate-permit-approvals'],
    relatedProjectSlugs: ['casa-m', 'casa-k'],
    relatedLandingSlugs: ['permit-presentation-packages', 'architecture-in-miami'],
  },
]

export const postsByDateDesc = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
