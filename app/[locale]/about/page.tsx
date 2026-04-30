import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutClient from '@/components/AboutClient'
import { buildAlternates, metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('ogTitle'), description: t('ogDesc') },
    alternates: buildAlternates('/about', locale as 'en' | 'es'),
  }
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const isEs = locale === 'es'

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Somaz Studio',
      url: 'https://somazstudio.com',
      logo: 'https://somazstudio.com/logos/logo-smz.png',
      email: 'hola@somazstudio.com',
      telephone: '+17865377682',
      description: 'Architecture, interiors, and visualization studio based in Miami, working across residential, commercial, and hospitality projects.',
      foundingDate: '2022',
      areaServed: 'Worldwide',
      sameAs: [
        'https://www.instagram.com/somazstudio',
        'https://www.linkedin.com/company/somazstudio',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sofía Mazzucco',
      jobTitle: 'Architect & Interior Designer',
      description: 'Founder of Somaz Studio. Architect trained in Argentina and now working from Miami, focused on architecture, interiors, and visualization.',
      url: `https://somazstudio.com/${locale}/about`,
      image: 'https://somazstudio.com/team/sofia-mazzucco.jpg',
      email: 'hola@somazstudio.com',
      telephone: '+17865377682',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
      sameAs: [
        'https://www.instagram.com/somazstudio',
        'https://www.linkedin.com/company/somazstudio',
        'https://www.tiktok.com/@somazstudio',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Somaz Studio',
        url: 'https://somazstudio.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `https://somazstudio.com/${locale}/about` },
      ],
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <AboutClient />

      {/* SSR-rendered prose for E-E-A-T and AI crawler indexability (Google AI Overviews, ChatGPT, Perplexity) */}
      <section className="px-6 md:px-10 py-20 border-t border-border/40 bg-surface/30">
        <div className="max-w-3xl mx-auto">
          {isEs ? (
            <article className="font-sans font-light text-foreground/65 leading-relaxed space-y-6" style={{ fontSize: '0.9375rem' }}>
              <h2 className="font-serif font-light italic text-foreground/80 mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Sobre Somaz Studio
              </h2>
              <p>
                Somaz Studio es un estudio de arquitectura, interiores y visualización fundado por Sofía Mazzucco. El estudio desarrolla proyectos residenciales, comerciales y hospitality con atención a la distribución, los materiales y la forma en que cada idea se presenta.
              </p>
              <p>
                La práctica se organiza en tres líneas: arquitectura, interiores y visualización. Somaz las trabaja de forma integrada para que el proyecto mantenga coherencia desde las primeras decisiones hasta la presentación final.
              </p>
              <p>
                Eso se traduce en proyectos donde importan tanto la calidad del diseño como la forma en que se comunica: plantas más claras, mejores decisiones materiales, imágenes más precisas y entregables que ayudan a presentar y coordinar mejor.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Cómo trabaja el estudio
              </h3>
              <p>
                Cada proyecto empieza con una conversación breve para entender el encargo, la etapa en la que está y el tipo de resultado que hace falta. Desde ahí, se define un alcance por fases, con entregables y tiempos claros.
              </p>
              <p>
                Según el proyecto, el trabajo puede incluir arquitectura, interiores, visualización o una combinación de las tres. El objetivo no es sumar capas innecesarias, sino dar al cliente el nivel de definición que el proyecto realmente necesita.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Proyectos y enfoque
              </h3>
              <p>
                Somaz trabaja en proyectos residenciales, hospitality y comerciales donde el diseño necesita sentirse cuidado, contemporáneo y bien resuelto. El estudio colabora con clientes en Miami, Argentina y otros mercados, siempre manteniendo una escala de trabajo cercana y muy atenta al detalle.
              </p>
              <p>
                La meta en todos los casos es la misma: que el proyecto gane claridad, presencia y coherencia, tanto en su diseño como en la manera en que se presenta y se entiende.
              </p>
            </article>
          ) : (
            <article className="font-sans font-light text-foreground/65 leading-relaxed space-y-6" style={{ fontSize: '0.9375rem' }}>
              <h2 className="font-serif font-light italic text-foreground/80 mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                About Somaz Studio
              </h2>
              <p>
                Somaz Studio is an architecture, interiors, and visualization studio founded by Sofía Mazzucco. The practice combines spatial sensitivity, contemporary judgment, and a clear way of working so projects can move forward without noise.
              </p>
              <p>
                The studio works across three lines that constantly inform one another: architecture, interiors, and visualization. Rather than treating them as separate services, Somaz develops them as parts of the same idea so the project stays coherent from concept to final presentation.
              </p>
              <p>
                In practice, that means projects where both the design and the communication of the design matter: clearer plans, stronger material decisions, more precise imagery, and deliverables that help clients present and coordinate with more confidence.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                How the studio works
              </h3>
              <p>
                Each project begins with a short conversation to understand the brief, the stage it is in, and the kind of result it needs. From there, the scope is organized in phases, with clear deliverables and timing.
              </p>
              <p>
                Depending on the project, the work may include architecture, interiors, visualization, or a combination of the three. The goal is not to add unnecessary layers, but to give each project the level of definition it actually needs.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Projects and approach
              </h3>
              <p>
                Somaz works on residential, hospitality, and commercial projects where the design needs to feel considered, contemporary, and well resolved. The studio collaborates with clients in Miami, Argentina, and other markets while keeping a close working scale and a sharp eye for detail.
              </p>
              <p>
                The aim is consistent across all of them: to give the project more clarity, more presence, and more coherence in both its design and the way it is presented.
              </p>
            </article>
          )}
        </div>
      </section>
    </>
  )
}
