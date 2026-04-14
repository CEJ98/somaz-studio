import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'
import { buildAlternates, metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: {
      title: `${t('metaTitle')} | Somaz Studio`,
      description: t('ogDesc'),
    },
    alternates: buildAlternates('/contact', locale as 'en' | 'es'),
  }
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://somazstudio.com/${locale}/contact` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://somazstudio.com/#business',
      name: 'Somaz Studio',
      description: '3D visualization, interior design, and conceptual design studio based in Miami, FL. Working globally.',
      url: 'https://somazstudio.com',
      telephone: '+17865377682',
      email: 'hola@somazstudio.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+17865377682',
        email: 'hola@somazstudio.com',
        availableLanguage: ['English', 'Spanish'],
        contactOption: 'TollFree',
      },
      sameAs: [
        'https://instagram.com/somazstudio',
        'https://linkedin.com/company/somazstudio',
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
      <PageFade className="min-h-screen pb-24">
        <section className="relative min-h-[45vh] flex items-end overflow-hidden">
          {/* Video background */}
          <div className="absolute inset-0">
            <video
              src="/media/contact-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover opacity-40"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>

          <div className="relative z-10 w-full px-6 md:px-10 pt-28 md:pt-32 pb-16">
            <div className="max-w-7xl mx-auto">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t('getInTouch')}</p>
              <h1 className="font-serif font-light leading-[0.9]" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
                <span className="block italic text-foreground/60">{t('letsTalk1')}</span>
                <span className="block font-semibold text-foreground">{t('letsTalk2')}</span>
              </h1>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
          <div className="architectural-line mb-14" />

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 mb-14 max-w-sm">
            <div>
              <p className="font-serif text-2xl font-light text-foreground/80">40+</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/25 mt-1">{t('stat1')}</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-foreground/80">8</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/25 mt-1">{t('stat2')}</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-accent">24h</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/25 mt-1">{t('stat3')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            <div className="md:col-span-4">
              <div className="space-y-0">
                <div className="border-b border-border/40 pb-8 mb-8">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-4">{t('emailLabel')}</p>
                  <a
                    href="mailto:hola@somazstudio.com"
                    className="group font-serif text-xl text-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    <span className="relative inline-block">
                      hola@somazstudio.com
                      <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-500" />
                    </span>
                  </a>
                </div>

                <div className="border-b border-border/40 pb-8 mb-8">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-4">{t('whatsappLabel')}</p>
                  <a
                    href="https://wa.me/17865377682"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat via WhatsApp at +1 786 537-7682"
                    className="font-serif text-xl text-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    +1 (786) 537-7682
                  </a>
                </div>

                <div className="border-b border-border/40 pb-8 mb-8">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-4">{t('followLabel')}</p>
                  <div className="flex flex-col gap-4">
                    <a
                      href="https://instagram.com/somazstudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300"
                    >
                      <Icon name="photo_camera" size={16} />
                      {t('instagramHandle')}
                    </a>
                    <a
                      href="https://linkedin.com/company/somazstudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300"
                    >
                      <Icon name="work" size={16} />
                      {t('linkedinHandle')}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-3">{t('locationLabel')}</p>
                  <p className="font-sans text-sm text-foreground/40 leading-relaxed">
                    {t('locationValue')}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="font-sans text-[11px] tracking-[0.15em] text-foreground/35 mb-8">
                {t('responseNote')}
              </p>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>

              {/* WhatsApp inline */}
              <div className="mt-16 pt-12 border-t border-border/30 text-center">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">
                  {t('orViaWhatsApp')}
                </p>
                <a
                  href="https://wa.me/17865377682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
                  aria-label="Chat via WhatsApp"
                >
                  {t('writeOnWhatsApp')}
                  <Icon name="chat" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageFade>
    </>
  )
}
