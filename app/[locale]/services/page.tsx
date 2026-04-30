import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { pickBySlug } from '@/data/imageLibrary'
import ServiceItem from '@/components/ServiceItem'
import { services } from '@/data/services'
import { seoLandings } from '@/data/seo-landings'
import { testimonials } from '@/data/testimonials'
import { Link } from '@/i18n/navigation'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'
import { buildAlternates, metadataBase } from '@/lib/seo'
import ServicesComparison from '@/components/ServicesComparison'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: t('metaTitle'), description: t('ogDesc') },
    alternates: buildAlternates('/services', locale as 'en' | 'es'),
  }
}

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'services' })
  const heroImg = pickBySlug('interior-luxury-03')
  const featuredLandings = seoLandings.filter((landing) =>
    ['architecture-studio', 'architectural-visualization', 'interior-architecture', 'architecture-in-miami'].includes(landing.slug)
  )

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long does a 3D visualization take?', acceptedAnswer: { '@type': 'Answer', text: 'Delivery time depends on the package. Essential (1 view) takes 48–72 hours. Standard (3 views) takes 5–7 business days. Premium (5+ views) is scoped per project.' } },
        { '@type': 'Question', name: 'Do you work with clients outside Miami?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We work with clients across the US, Latin America, and internationally. Most deliverables are shared digitally.' } },
        { '@type': 'Question', name: 'What files do I need to provide?', acceptedAnswer: { '@type': 'Answer', text: 'For 3D visualization we need floor plans (PDF or CAD), elevation drawings if available, and any reference images. For interior design projects, a site visit or detailed measurements are also helpful.' } },
        { '@type': 'Question', name: 'Can I request changes after delivery?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All packages include at least one round of revisions. Additional revision rounds require a written fee adjustment or change order depending on scope.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `https://somazstudio.com/${locale}/services` },
      ],
    },
  ])

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
         
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {heroImg ? (
          <Image
            src={heroImg.src}
            alt="Somaz Studio — architectural visualization and interior design services"
            fill
            placeholder="blur"
            blurDataURL={heroImg.blurDataURL}
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <Image
            src="/services/3d-visualization.jpg"
            alt="Somaz Studio — architectural visualization and interior design services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        <div className="relative z-10 w-full px-6 md:px-10 pt-28 md:pt-32 pb-14">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t('whatWeDo')}</p>
            <h1 className="font-serif font-light italic text-foreground" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              {t('heading')}
            </h1>
            <p className="font-sans text-[18px] text-foreground/90 mt-6 max-w-3xl leading-relaxed">{t('subheading')}</p>
            <p className="font-sans text-[16px] text-foreground/70 max-w-2xl leading-relaxed mt-4 mb-8">{t('audienceLine')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=architecture"
                className="inline-flex min-h-12 items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {t('startProject')}
                <Icon name="north_east" size={14} />
              </Link>
              <Link
                href="/services/architecture"
                className="inline-flex min-h-12 items-center gap-3 border border-foreground/30 px-8 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-foreground/75 hover:border-accent hover:text-accent transition-all duration-300"
              >
                {locale === 'es' ? 'Ver arquitectura' : 'View architecture'}
                <Icon name="arrow_right_alt" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PageFade className="pb-28 px-6 md:px-10 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="architectural-line mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/30 mb-16">
            {[
              {
                label: locale === 'es' ? 'Arquitectura' : 'Architecture',
                body: locale === 'es'
                  ? 'Concepto, desarrollo, documentación base y coordinación para proyectos que necesitan una dirección arquitectónica sólida.'
                  : 'Concept, development, base documentation, and coordination for projects that need strong architectural direction.',
              },
              {
                label: locale === 'es' ? 'Interiores' : 'Interiors',
                body: locale === 'es'
                  ? 'Distribución, materiales, mobiliario y atmósfera pensados para que el espacio se sienta coherente y bien resuelto.'
                  : 'Layout, materials, furnishing, and atmosphere developed so the space feels coherent and well resolved.',
              },
              {
                label: locale === 'es' ? 'Visualización' : 'Visualization',
                body: locale === 'es'
                  ? 'Imágenes y piezas de presentación para comunicar el proyecto con claridad antes de construir, vender o presentar.'
                  : 'Images and presentation pieces that help communicate the project clearly before it is built, sold, or presented.',
              },
              {
                label: locale === 'es' ? 'Consultoría' : 'Consulting',
                body: locale === 'es'
                  ? 'Revisión y criterio de diseño para equipos o clientes que ya tienen material avanzado pero necesitan mejor dirección.'
                  : 'Design review and judgment for teams or clients who already have material in progress but need stronger direction.',
              },
            ].map((item) => (
              <div key={item.label} className="bg-background p-8">
                <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-accent mb-4">{item.label}</p>
                <p className="font-sans text-[15px] leading-relaxed text-foreground/72">{item.body}</p>
              </div>
            ))}
          </div>

          <div data-testid="services-list">
            {services.map((service) => (
              <ServiceItem key={service.slug} service={service} locale={locale} />
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-border/40">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10">
              {locale === 'es' ? 'Servicios destacados' : 'Featured services'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
              {featuredLandings.map((landing) => (
                <Link key={landing.slug} href={`/services/${landing.slug}`} className="bg-background p-8 group">
                  <p className="font-serif text-2xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {locale === 'es' ? landing.title.es : landing.title.en}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-foreground/65 mt-3 max-w-xl">
                    {locale === 'es' ? landing.metaDescription.es : landing.metaDescription.en}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-5 font-sans text-[10px] tracking-[0.25em] uppercase text-accent">
                    {locale === 'es' ? 'Ver detalle' : 'See details'}
                    <Icon name="north_east" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <ServicesComparison locale={locale} />
        </div>
      </PageFade>

      <PageFade className="pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Testimonials */}
          <div className="mt-20 pt-16 border-t border-border/40">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10">{t('clientVoices')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 mb-16">
              {[testimonials[0], testimonials[1]].map((testimonial, i) => (
                <div key={i} className="bg-background px-8 pt-12 pb-10 relative overflow-hidden">
                  <span
                    className="absolute top-4 left-6 font-serif text-accent/10 select-none pointer-events-none"
                    style={{ fontSize: '70px', lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="font-serif font-light italic text-foreground/65 leading-relaxed mb-8 relative z-10" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}>
                    &ldquo;{locale === 'es' ? testimonial.quote.es : testimonial.quote.en}&rdquo;
                  </p>
                  <div>
                    <p className="font-sans text-sm text-foreground font-medium">{testimonial.name}</p>
                    <p className="font-sans text-[11px] text-foreground/65 tracking-wide mt-1">
                      {locale === 'es' ? testimonial.role.es : testimonial.role.en} — {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-0 pt-16 border-t border-border/40">
            <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10 text-center">{t('faqHeading')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
              {[
                { q: t('faq1Q'), a: t('faq1A') },
                { q: t('faq2Q'), a: t('faq2A') },
                { q: t('faq3Q'), a: t('faq3A') },
                { q: t('faq4Q'), a: t('faq4A') },
              ].map(({ q, a }, i) => (
                <div key={i} className="border-l border-accent/30 pl-6 hover:border-accent/70 transition-colors duration-300 group/faq">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/50 mb-2">0{i + 1}</p>
                  <h2 className="font-serif text-foreground/80 mb-3 group-hover/faq:text-foreground transition-colors duration-300" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', fontWeight: 'normal' }}>{q}</h2>
                  <p className="font-sans font-light text-foreground/65 group-hover/faq:text-foreground/80 text-sm leading-relaxed transition-colors duration-300">{a}</p>
                </div>
              ))}
            </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-border/40 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
              <span className="ghost-text font-serif font-bold leading-none" style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}>?</span>
            </div>
            <div className="relative z-10 text-center py-8">
              <p className="font-serif italic text-foreground/50 mb-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
                {t('ctaQuestion')}
              </p>
              <p className="font-sans font-light text-foreground/65 text-sm mb-10">{t('ctaSubtitle')}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {t('letsTalk')}
                <Icon name="north_east" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </PageFade>
      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/40 px-6 py-4">
        <Link
          href="/contact"
          className="flex min-h-12 items-center justify-center gap-3 w-full bg-accent text-background py-4 font-sans text-[10px] tracking-[0.25em] uppercase"
        >
          {t('letsTalk')}
          <Icon name="north_east" size={16} />
        </Link>
      </div>
    </>
  )
}
