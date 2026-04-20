import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { pickBySlug } from '@/data/imageLibrary'
import ServiceItem from '@/components/ServiceItem'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { Link } from '@/i18n/navigation'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'
import { buildAlternates, metadataBase } from '@/lib/seo'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import ServicesComparison from '@/components/ServicesComparison'
import ParallaxStorySection from '@/components/ParallaxStorySection'

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

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Somaz Studio',
      url: 'https://somazstudio.com/services',
      description: 'Full-service 3D visualization, interior design, conceptual design, and consulting.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '6',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          reviewBody: 'We sent the renders to the bank and they approved the financing on the first submission. The images spoke for themselves.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Michael Kriger' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
        {
          '@type': 'Review',
          reviewBody: 'Sofía understood exactly what we wanted from the very first call. The renders were so precise that we barely changed anything once construction started.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Paula Marchetti' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
        {
          '@type': 'Review',
          reviewBody: 'Four days from brief to final renders. Every floor, every angle, exactly the industrial aesthetic we needed for launch. Exceptional work.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Tomás Mazzucco' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
        {
          '@type': 'Review',
          reviewBody: 'The cabin interiors felt warm and real even before we broke ground. Guests ask if the photos are from the actual finished space — they are, but so were the renders.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Valentina Ríos' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
        {
          '@type': 'Review',
          reviewBody: 'We were nervous about designing a home remotely, but Somaz made every decision feel grounded. The floor plan, the materials, the light — all considered from day one.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Carolina Vega' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
        {
          '@type': 'Review',
          reviewBody: 'Somaz is the only visualization studio that thinks like a designer, not just a renderer. That difference shows in every image.',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Diego Ferraro' },
          itemReviewed: { '@type': 'Organization', name: 'Somaz Studio' },
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Visualization', description: 'Photorealistic architectural renders from blueprints and plans.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Design', description: 'Full interior design from concept to material specification.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conceptual Design', description: 'Spatial concept development and design direction.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design Consulting', description: 'Expert design guidance billed hourly.' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long does a 3D visualization take?', acceptedAnswer: { '@type': 'Answer', text: 'Delivery time depends on the package. Essential (1 view) takes 48–72 hours. Standard (3 views) takes 5–7 business days. Premium (5+ views) is scoped per project.' } },
        { '@type': 'Question', name: 'Do you work with clients outside Miami?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — we are a remote-first studio and work with clients across the US, Latin America, and internationally. All deliveries are digital.' } },
        { '@type': 'Question', name: 'What files do I need to provide?', acceptedAnswer: { '@type': 'Answer', text: 'For 3D visualization we need floor plans (PDF or CAD), elevation drawings if available, and any reference images. For interior design projects, a site visit or detailed measurements are also helpful.' } },
        { '@type': 'Question', name: 'Can I request changes after delivery?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All packages include at least one round of revisions. Additional revision rounds can be added at an hourly rate.' } },
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative z-10 w-full px-6 md:px-10 pt-28 md:pt-32 pb-14">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t('whatWeDo')}</p>
            <h1 className="font-serif font-light italic text-foreground" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              {t('heading')}
            </h1>
            <p className="font-sans font-light text-foreground/90 mt-6 max-w-xl leading-relaxed">{t('subheading')}</p>
            <Link
              href="/contact?type=consult"
              className="inline-flex items-center gap-3 mt-8 border border-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase text-accent hover:bg-accent hover:text-background transition-all duration-300"
            >
              {t('freeConsult')}
              <Icon name="north_east" size={14} />
            </Link>
          </div>
        </div>
      </section>
      <PageFade className="pb-28 px-6 md:px-10 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="architectural-line mb-4" />

          <div>
            {services.map((service) => (
              <ServiceItem key={service.slug} service={service} locale={locale} />
            ))}
          </div>

          {/* Comparison table */}
          <ServicesComparison locale={locale} />
        </div>
      </PageFade>

      {/* Editorial story break */}
      <ParallaxStorySection
        imageSlug="interior-living-luxury-01"
        eyebrow={locale === 'es' ? 'Nuestro enfoque' : 'Our approach'}
        title={locale === 'es' ? 'Cada espacio comienza\ncon un brief.' : 'Every space starts\nwith a brief.'}
        body={locale === 'es'
          ? 'No fabricamos renders — interpretamos espacios. Cada proyecto parte de entender qué quiere decir el espacio antes de decidir cómo se ve.'
          : "We don't manufacture renders — we interpret spaces. Every project starts from understanding what the space wants to say before deciding how it looks."}
        align="right"
        height="80vh"
        overlay={0.6}
      />

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
                    <p className="font-sans text-[11px] text-foreground/35 tracking-wide mt-1">
                      {locale === 'es' ? testimonial.role.es : testimonial.role.en} — {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After Slider */}
          <BeforeAfterSlider
            beforeSrc="/services/before-slider.jpg"
            afterSrc="/services/after-slider.jpg"
            beforeLabel={locale === 'es' ? 'Plano técnico' : 'Blueprint'}
            afterLabel={locale === 'es' ? 'Render final' : 'Final render'}
            caption={locale === 'es' ? 'De la documentación técnica al render fotorrealista — el mismo proyecto, dos mundos.' : 'From technical documentation to photorealistic render — same project, two worlds.'}
            locale={locale}
          />

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
                  <p className="font-serif text-foreground/80 mb-3 group-hover/faq:text-foreground transition-colors duration-300" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>{q}</p>
                  <p className="font-sans font-light text-foreground/40 group-hover/faq:text-foreground/55 text-sm leading-relaxed transition-colors duration-300">{a}</p>
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
              <p className="font-sans font-light text-foreground/30 text-sm mb-10">{t('ctaSubtitle')}</p>
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
          className="flex items-center justify-center gap-3 w-full bg-accent text-background py-4 font-sans text-[10px] tracking-[0.25em] uppercase"
        >
          {t('letsTalk')}
          <Icon name="north_east" size={16} />
        </Link>
      </div>
    </>
  )
}
