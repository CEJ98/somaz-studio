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
      description: 'Miami-based design studio with Latin American roots. Specializing in 3D visualization, interior design, and spatial concept development.',
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
      jobTitle: 'Space Designer & Interior Designer',
      description: 'Founder of Somaz Studio. Space designer and interior designer based in Miami, FL, with over 5 years of experience in 3D architectural visualization and interior design. Projects across the US, Latin America, and the Middle East.',
      url: `https://somazstudio.com/${locale}/about`,
      image: 'https://somazstudio.com/about-hero.jpg',
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
        // eslint-disable-next-line react/no-danger
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
                Somaz Studio es un estudio de diseño y visualización 3D con sede en Miami, Florida, fundado en 2022 por Sofía Mazzucco, diseñadora de espacios e interiorista con más de cinco años de experiencia en visualización arquitectónica fotorrealista. El estudio trabaja de forma completamente remota con clientes en Estados Unidos, Latinoamérica, Europa y Medio Oriente.
              </p>
              <p>
                Nos especializamos en tres áreas principales: visualización 3D arquitectónica, diseño de interiores y diseño conceptual. Para proyectos de visualización, el flujo de trabajo incluye modelado 3D, iluminación realista, selección de materiales digitales y renderizado fotorrealista — todo entregado en formatos de alta resolución listos para presentaciones a inversores, HOAs, instituciones bancarias o clientes finales.
              </p>
              <p>
                Nuestro enfoque combina sensibilidad latinoamericana con los estándares del mercado de Miami: renders precisos que cumplen con los requisitos de permisos de construcción en el sur de Florida, presentaciones profesionales para desarrolladores residenciales y comerciales, y paquetes visuales completos para agencias de bienes raíces.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Proceso y entregables
              </h3>
              <p>
                El proceso comienza con una consulta de 30 minutos para alinear visión, alcance y cronograma. El cliente provee planos en PDF o CAD, imágenes de referencia y una descripción del espacio. A partir de ahí, el estudio se encarga de todo: modelado del espacio, paleta de materiales, propuesta de mobiliario, iluminación y renders finales.
              </p>
              <p>
                El paquete Essential (1 vista fotorrealista) se entrega en 48 a 72 horas. El paquete Standard (3 vistas) en 5 a 7 días hábiles. Para proyectos con fechas críticas, el servicio Rush de 24 horas está disponible. Todos los paquetes incluyen al menos una ronda de revisiones; rondas adicionales se facturan por hora.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Proyectos y mercados
              </h3>
              <p>
                Somaz Studio ha completado más de 50 proyectos en más de 8 países, incluyendo residencias de lujo en Miami, desarrollos comerciales en Argentina y proyectos de hospitalidad en múltiples mercados. Los proyectos en Miami incluyen Casa Mariano (Brickell, 2025) y Casa Kriger (Coral Gables, 2025), ambos con renders utilizados en presentaciones de financiamiento bancario.
              </p>
              <p>
                El estudio trabaja con arquitectos, desarrolladores inmobiliarios, constructores, diseñadores de interiores y propietarios de viviendas que buscan visualizar sus proyectos antes de construirlos. La facturación se realiza en dólares estadounidenses para todos los mercados internacionales. Somaz Studio LLC es una sociedad de responsabilidad limitada registrada en Florida, operando globalmente.
              </p>
            </article>
          ) : (
            <article className="font-sans font-light text-foreground/65 leading-relaxed space-y-6" style={{ fontSize: '0.9375rem' }}>
              <h2 className="font-serif font-light italic text-foreground/80 mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                About Somaz Studio
              </h2>
              <p>
                Somaz Studio is a 3D visualization and interior design studio based in Miami, Florida, founded in 2022 by Sofía Mazzucco — a space designer and interior designer with over five years of experience in photorealistic architectural visualization. The studio operates as a fully remote practice, serving clients across the United States, Latin America, Europe, and the Middle East.
              </p>
              <p>
                The studio specializes in three core disciplines: 3D architectural visualization, interior design, and conceptual design. The 3D visualization workflow encompasses space modeling, realistic lighting setup, digital material selection, and photorealistic rendering — all delivered in high-resolution formats suitable for investor presentations, HOA reviews, bank financing submissions, and client approvals.
              </p>
              <p>
                Our approach fuses Latin American design sensibility with the exacting standards of the Miami market: renders precise enough to support South Florida building permit applications, professional presentation packages for residential and commercial developers, and complete visual suites for real estate agencies and brokers.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Process and deliverables
              </h3>
              <p>
                Every project begins with a 30-minute consultation to align on vision, scope, and timeline. The client provides floor plans in PDF or CAD format, reference images, and a brief description of the space. From there, the studio handles everything: space modeling, material palette development, furniture layout, lighting design, and final renders.
              </p>
              <p>
                The Essential package (1 photorealistic view) is delivered in 48 to 72 hours. The Standard package (3 views) takes 5 to 7 business days. For projects with critical deadlines, a 24-hour Rush service is available. All packages include at least one revision round; additional rounds are billed at an hourly rate.
              </p>
              <h3 className="font-serif text-foreground/75 mt-10 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                Projects and markets
              </h3>
              <p>
                Somaz Studio has completed over 50 projects across more than 8 countries, including luxury residences in Miami, commercial developments in Argentina, and hospitality projects in multiple markets. Miami projects include Casa Mariano (Brickell, 2025) and Casa Kriger (Coral Gables, 2025) — both with renders prepared for bank financing presentations.
              </p>
              <p>
                The studio collaborates with architects, real estate developers, builders, interior designers, and homeowners who want to visualize their projects before construction begins. Billing is in US dollars for all international markets. Somaz Studio LLC is a registered Florida limited liability company operating globally.
              </p>
            </article>
          )}
        </div>
      </section>
    </>
  )
}
