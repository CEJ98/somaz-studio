import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    openGraph: {
      title: `${t('metaTitle')} | Somaz Studio`,
      description: t('ogDesc'),
    },
    alternates: {
      canonical: `https://somazstudio.com/${locale}/contact`,
      languages: { en: 'https://somazstudio.com/en/contact', es: 'https://somazstudio.com/es/contact' },
    },
  }
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://somazstudio.com/${locale}/contact` },
    ],
  }

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageFade className="min-h-screen pt-28 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-14 md:mb-20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t('getInTouch')}</p>
            <h1 className="font-serif font-light leading-[0.9]" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              <span className="block italic text-foreground/60">{t('letsTalk1')}</span>
              <span className="block font-semibold text-foreground">{t('letsTalk2')}</span>
            </h1>
          </div>

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
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">{t('emailLabel')}</p>
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
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">{t('whatsappLabel')}</p>
                  <a
                    href="https://wa.me/17865377682"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl text-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    +1 (786) 537-7682
                  </a>
                </div>

                <div className="border-b border-border/40 pb-8 mb-8">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">{t('followLabel')}</p>
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
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-3">{t('locationLabel')}</p>
                  <p className="font-sans text-sm text-foreground/40 leading-relaxed">
                    {t('locationValue')}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </PageFade>
    </>
  )
}
