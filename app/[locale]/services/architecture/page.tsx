import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { buildAlternates, metadataBase } from '@/lib/seo'
import PageFade from '@/components/PageFade'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const isEs = locale === 'es'
  return {
    metadataBase,
    title: isEs
      ? 'Arquitectura | Somaz Studio'
      : 'Architecture | Somaz Studio',
    description: isEs
      ? 'Servicio de arquitectura de Somaz Studio para proyectos residenciales, comerciales y hospitality.'
      : 'Somaz Studio architecture service for residential, commercial, and hospitality projects.',
    alternates: buildAlternates('/services/architecture', locale as 'en' | 'es'),
    openGraph: {
      title: isEs
        ? 'Arquitectura | Somaz Studio'
        : 'Architecture | Somaz Studio',
      description: isEs
        ? 'Arquitectura, interiores y visualización con una dirección clara desde el concepto hasta la entrega.'
        : 'Architecture, interiors, and visualization with clear direction from concept to delivery.',
    },
  }
}

export default async function ArchitecturePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const isEs = locale === 'es'

  const copy = isEs
    ? {
        eyebrow: 'Arquitectura',
        title: 'Arquitectura con claridad, criterio y buena presentación.',
        intro: 'Somaz Studio desarrolla proyectos residenciales, comerciales y hospitality desde la primera idea hasta los materiales necesarios para presentarlos y seguir avanzando.',
        primaryCta: 'Iniciar proyecto',
        secondaryCta: 'Ver servicios',
        modelTitle: 'Como trabajamos',
        model1Title: 'Concepto',
        model1Body: 'Definimos la idea general, la distribución y las decisiones que ordenan todo lo que sigue.',
        model2Title: 'Desarrollo',
        model2Body: 'Bajamos el proyecto a plantas, criterios interiores, materialidad y piezas de presentación claras.',
        model3Title: 'Coordinación',
        model3Body: 'Preparamos la información para que el proyecto pueda presentarse, coordinarse o seguir avanzando con el equipo correspondiente.',
        deliverablesTitle: 'Qué entrega Somaz',
        deliverables: [
          'Concepto arquitectónico y paquetes esquemáticos',
          'Desarrollo de diseño e interiores',
          'Visuales y piezas de presentación',
          'Documentación base para coordinación',
          'Seguimiento de decisiones y consultores',
        ],
        faqTitle: 'Preguntas frecuentes',
        faqs: [
          ['¿Qué tipo de proyectos toman?', 'Principalmente residenciales, comerciales y hospitality donde la arquitectura, los interiores y la presentación del proyecto tienen que trabajar juntos.'],
          ['¿Trabajan por fases?', 'Sí. Definimos cada etapa por escrito para que el alcance, los entregables y los tiempos estén claros desde el inicio.'],
          ['¿También hacen interiores?', 'Sí. Cuando el proyecto lo pide, desarrollamos arquitectura e interiores como una misma dirección de diseño.'],
          ['¿Pueden sumarse a un proyecto ya empezado?', 'Sí. Podemos entrar para revisar, ordenar o reforzar una etapa que ya está en curso.'],
        ],
      }
    : {
        eyebrow: 'Architecture',
        title: 'Architecture with clarity, judgment, and strong presentation.',
        intro: 'Somaz Studio develops residential, commercial, and hospitality projects from the first idea through the material needed to present and move them forward.',
        primaryCta: 'Start a project',
        secondaryCta: 'View services',
        modelTitle: 'How we work',
        model1Title: 'Concept',
        model1Body: 'We define the main idea, the layout, and the decisions that organize everything that follows.',
        model2Title: 'Development',
        model2Body: 'We turn the project into plans, interior direction, material decisions, and clear presentation pieces.',
        model3Title: 'Coordination',
        model3Body: 'We prepare the information so the project can be presented, coordinated, or developed further with the right team.',
        deliverablesTitle: 'What Somaz delivers',
        deliverables: [
          'Concept design and schematic packages',
          'Design development and interior architecture',
          'Visuals and presentation material',
          'Base documentation for coordination',
          'Consultant coordination and decision tracking',
        ],
        faqTitle: 'Frequently asked questions',
        faqs: [
          ['What kind of projects do you take on?', 'Mostly residential, commercial, and hospitality projects where architecture, interiors, and presentation need to work together.'],
          ['Do you work in phases?', 'Yes. Each stage is scoped in writing so deliverables, timing, and responsibilities stay clear from the start.'],
          ['Do you also design interiors?', 'Yes. When the project needs it, we develop architecture and interiors as one design direction.'],
          ['Can you join a project already in progress?', 'Yes. We can step in to review, organize, or strengthen a phase that is already underway.'],
        ],
      }

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? 'Arquitectura' : 'Architecture',
    provider: { '@type': 'Organization', name: 'Somaz Studio', '@id': 'https://somazstudio.com/#business' },
    areaServed: ['Miami', 'Argentina', 'International'],
    url: `https://somazstudio.com/${locale}/services/architecture`,
    description: copy.intro,
  })

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageFade className="pb-28">
        <section className="px-6 md:px-10 pt-32 md:pt-40 pb-18 border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-accent mb-6">{copy.eyebrow}</p>
            <h1 className="font-serif font-light text-foreground leading-[0.95] max-w-5xl" style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}>
              {copy.title}
            </h1>
            <p className="font-sans text-[18px] text-foreground/78 leading-relaxed max-w-3xl mt-8">{copy.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/contact?type=architecture" className="inline-flex min-h-12 items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[12px] uppercase tracking-[0.18em]">
                {copy.primaryCta}
                <Icon name="north_east" size={14} />
              </Link>
              <Link href="/services" className="inline-flex min-h-12 items-center gap-3 border border-foreground/30 text-foreground/75 px-8 py-4 font-sans text-[12px] uppercase tracking-[0.18em]">
                {copy.secondaryCta}
                <Icon name="arrow_right_alt" size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-20 md:py-24">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-accent mb-8">{copy.modelTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
              {[
                { title: copy.model1Title, body: copy.model1Body },
                { title: copy.model2Title, body: copy.model2Body },
                { title: copy.model3Title, body: copy.model3Body },
              ].map((item) => (
                <div key={item.title} className="bg-background p-8">
                  <h2 className="font-serif text-[28px] leading-tight text-foreground mb-4">{item.title}</h2>
                  <p className="font-sans text-[15px] leading-relaxed text-foreground/72">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8 md:py-12 border-t border-border/30 border-b border-border/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-accent mb-6">{copy.deliverablesTitle}</p>
              <div className="space-y-4">
                {copy.deliverables.map((item) => (
                  <p key={item} className="font-sans text-[16px] text-foreground/75 leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-accent mb-6">{copy.faqTitle}</p>
              <div className="space-y-8">
                {copy.faqs.map(([question, answer]) => (
                  <div key={question}>
                    <h3 className="font-serif text-[28px] leading-tight text-foreground mb-3">{question}</h3>
                    <p className="font-sans text-[15px] leading-relaxed text-foreground/72">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageFade>
    </>
  )
}
