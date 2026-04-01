import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ServiceItem from '@/components/ServiceItem'
import { services } from '@/data/services'
import { Link } from '@/i18n/navigation'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: { title: `${t('metaTitle')} | Somaz Studio`, description: t('ogDesc') },
    alternates: {
      canonical: `https://somazstudio.com/${locale}/services`,
      languages: { en: 'https://somazstudio.com/en/services', es: 'https://somazstudio.com/es/services' },
    },
  }
}

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'services' })

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Somaz Studio',
      url: 'https://somazstudio.com/services',
      description: 'Full-service 3D visualization, interior design, conceptual design, and consulting.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: [
          { '@type': 'Offer', price: '350', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '350', priceCurrency: 'USD', minPrice: '350' }, itemOffered: { '@type': 'Service', name: '3D Visualization', description: 'Photorealistic architectural renders from blueprints and plans.' } },
          { '@type': 'Offer', price: '1200', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '1200', priceCurrency: 'USD', minPrice: '1200' }, itemOffered: { '@type': 'Service', name: 'Interior Design', description: 'Full interior design from concept to material specification.' } },
          { '@type': 'Offer', price: '800', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '800', priceCurrency: 'USD', minPrice: '800' }, itemOffered: { '@type': 'Service', name: 'Conceptual Design', description: 'Spatial concept development and design direction.' } },
          { '@type': 'Offer', price: '120', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '120', priceCurrency: 'USD', unitText: 'HOUR' }, itemOffered: { '@type': 'Service', name: 'Design Consulting', description: 'Expert design guidance billed hourly.' } },
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t('whatWeDo')}</p>
            <h1 className="font-serif font-light italic text-foreground/80" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              {t('heading')}
            </h1>
            <p className="font-sans font-light text-foreground/35 mt-6 max-w-xl leading-relaxed">{t('subheading')}</p>
          </div>

          <div className="architectural-line mb-4" />

          <div>
            {services.map((service) => (
              <ServiceItem key={service.slug} service={service} locale={locale} />
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 pt-16 border-t border-border/40">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10">{t('faqHeading')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl">
              {[
                { q: t('faq1Q'), a: t('faq1A') },
                { q: t('faq2Q'), a: t('faq2A') },
                { q: t('faq3Q'), a: t('faq3A') },
                { q: t('faq4Q'), a: t('faq4A') },
              ].map(({ q, a }, i) => (
                <div key={i} className="border-l border-border/30 pl-6">
                  <p className="font-serif text-foreground/80 mb-3" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>{q}</p>
                  <p className="font-sans font-light text-foreground/40 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
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
    </>
  )
}
