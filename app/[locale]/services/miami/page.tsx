import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { buildAlternates, metadataBase } from '@/lib/seo'
import PageFade from '@/components/PageFade'
import ParallaxStorySection from '@/components/ParallaxStorySection'
import { pickBySlug } from '@/data/imageLibrary'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const isEs = locale === 'es'
  return {
    metadataBase,
    title: isEs
      ? 'Visualización 3D y Diseño de Interiores en Miami | Somaz Studio'
      : '3D Visualization & Interior Design in Miami | Somaz Studio',
    description: isEs
      ? 'Estudio de diseño y visualización 3D con base en Miami. Renders fotorrealistas, diseño de interiores y consultoría para proyectos residenciales y comerciales.'
      : 'Miami-based design and 3D visualization studio. Photorealistic renders, interior design, and consulting for residential and commercial projects.',
    alternates: buildAlternates('/services/miami', locale as 'en' | 'es'),
  }
}

export default async function MiamiServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const { locale } = params
  const isEs = locale === 'es'

  const labels = {
    badge: 'Miami, FL',
    heading: isEs ? 'El estudio de diseño de Miami para proyectos premium.' : "Miami's design studio for premium projects.",
    sub: isEs
      ? 'Visualización 3D fotorrealista, diseño de interiores y consultoría — para constructores, desarrolladores y clientes residenciales en el sur de Florida.'
      : 'Photorealistic 3D visualization, interior design, and consulting — for builders, developers, and residential clients across South Florida.',
    cta: isEs ? 'Iniciar proyecto' : 'Start a project',
    consult: isEs ? 'Consulta de 15 min' : '15-min consult',
    whyTitle: isEs ? 'Por qué clientes en Miami eligen Somaz' : 'Why Miami clients choose Somaz',
    why: isEs
      ? [
          { t: 'Local presence', d: 'Sede en Miami, equipo bilingüe y conocimiento del clima, código y estética del sur de Florida.' },
          { t: 'Permit-ready renders', d: 'Renders precisos para presentaciones a HOAs, bancos y autoridades de permisos.' },
          { t: 'Turnaround rápido', d: 'Essential en 48–72h. Rush 24h disponible para deadlines críticos.' },
        ]
      : [
          { t: 'Local presence', d: 'Miami-based, bilingual team with full understanding of South Florida climate, code, and aesthetic.' },
          { t: 'Permit-ready renders', d: 'Precise renders for HOA reviews, bank financing submissions, and permit applications.' },
          { t: 'Fast turnaround', d: 'Essential package in 48–72h. 24h Rush available for critical deadlines.' },
        ],
    workTitle: isEs ? 'Proyectos recientes en Miami' : 'Recent Miami projects',
    viewProject: isEs ? 'Ver proyecto' : 'View project',
    finalQ: isEs ? '¿Listo para ver tu proyecto antes de construirlo?' : 'Ready to see your project before you build it?',
    finalSub: isEs ? 'Respuesta en menos de 24 horas hábiles.' : 'Response within 24 business hours.',
  }

  const projects = [
    { slug: 'casa-m', name: 'Casa Mariano', location: 'Miami, FL', year: 2025, cover: '/projects/casa-mariano-miami/cover.jpg' },
    { slug: 'casa-k', name: 'Casa Kriger', location: 'Miami, FL', year: 2025, cover: '/projects/casa-kriger-miami/02.jpg' },
  ]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Somaz Studio',
    description: 'Miami-based 3D visualization, interior design, and conceptual design studio.',
    url: `https://somazstudio.com/${locale}/services/miami`,
    telephone: '+1-786-537-7682',
    email: 'hola@somazstudio.com',
    image: 'https://somazstudio.com/og-image.jpg',
    address: { '@type': 'PostalAddress', addressLocality: 'Miami', addressRegion: 'FL', addressCountry: 'US' },
    areaServed: [
      { '@type': 'City', name: 'Miami' },
      { '@type': 'City', name: 'Miami Beach' },
      { '@type': 'City', name: 'Coral Gables' },
      { '@type': 'City', name: 'Brickell' },
      { '@type': 'AdministrativeArea', name: 'South Florida' },
    ],
    priceRange: '$$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '6', bestRating: '5', worstRating: '1' },
  })

  const libraryHero = pickBySlug('interior-living-luxury-01')

  return (
    <>
      {/* JSON-LD structured data — static literal, safe */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {libraryHero ? (
          <Image
            src={libraryHero.src}
            alt="Somaz Studio — 3D visualization and interior design in Miami"
            fill
            priority
            placeholder="blur"
            blurDataURL={libraryHero.blurDataURL}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <Image
            src="/projects/casa-mariano-miami/cover.jpg"
            alt="Somaz Studio — 3D visualization and interior design in Miami"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="relative z-10 w-full px-6 md:px-10 pt-28 md:pt-32 pb-16">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{labels.badge}</p>
            <h1 className="font-serif font-light italic text-foreground" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}>
              {labels.heading}
            </h1>
            <p className="font-sans font-light text-foreground/85 mt-6 max-w-2xl leading-relaxed">{labels.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {labels.cta}
                <Icon name="north_east" size={14} />
              </Link>
              <a
                href="https://wa.me/17865377682?text=Hi%20Somaz%20Studio%2C%20I%27m%20in%20Miami%20and%20would%20like%20a%2015-min%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-6 py-3 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
              >
                {labels.consult}
                <Icon name="chat" size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PageFade className="pb-28 px-6 md:px-10 pt-20">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10">{labels.whyTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 mb-24">
            {labels.why.map((item, i) => (
              <div key={i} className="bg-background p-8">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/50 mb-3">0{i + 1}</p>
                <p className="font-serif text-foreground mb-3" style={{ fontSize: '1.2rem' }}>{item.t}</p>
                <p className="font-sans font-light text-sm text-foreground/55 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 pt-16">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10">{labels.workTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={p.cover}
                      alt={`${p.name} — ${p.location}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="font-serif italic text-foreground text-lg">{p.name}</p>
                      <p className="font-sans text-[11px] text-foreground/45 tracking-wide mt-1">{p.location} · {p.year}</p>
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent inline-flex items-center gap-1">
                      {labels.viewProject}
                      <Icon name="north_east" size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </PageFade>

      <ParallaxStorySection
        imageSlug="exterior-modern-01"
        eyebrow="South Florida"
        title={isEs ? 'Proyectos que hablan\npor sí solos.' : 'Projects that speak\nfor themselves.'}
        body={isEs
          ? 'Desde Brickell hasta Coral Gables — renders que convencen a bancos, HOAs y clientes antes de que se pose la primera piedra.'
          : 'From Brickell to Coral Gables — renders that convince banks, HOAs, and clients before the first stone is laid.'}
        align="left"
        height="70vh"
        overlay={0.62}
      />

      <PageFade className="pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mt-20 pt-16 border-t border-border/40 text-center">
            <p className="font-serif italic text-foreground/55 mb-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              {labels.finalQ}
            </p>
            <p className="font-sans font-light text-foreground/35 text-sm mb-10">{labels.finalSub}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {labels.cta}
              <Icon name="north_east" size={16} />
            </Link>
          </div>
        </div>
      </PageFade>
    </>
  )
}
