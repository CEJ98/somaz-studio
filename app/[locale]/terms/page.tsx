import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageFade from '@/components/PageFade'
import { Link } from '@/i18n/navigation'
import { buildAlternates, metadataBase } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'legal.terms' })
  return {
    metadataBase,
    title: t('metaTitle'),
    description: t('metaDesc'),
    robots: { index: false, follow: false },
    alternates: buildAlternates('/terms', locale as 'en' | 'es'),
  }
}

export default async function TermsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const tl = await getTranslations({ locale, namespace: 'legal' })
  const t = await getTranslations({ locale, namespace: 'legal.terms' })

  return (
    <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{tl('label')}</p>
        <h1 className="font-serif font-light text-foreground mb-16" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {t('title')}
        </h1>

        <div className="architectural-line mb-12" />

        <div className="space-y-10 font-sans font-light text-foreground/55 leading-relaxed">
          <p className="font-sans text-xs text-foreground/30 tracking-widest uppercase">
            {t('lastUpdated')}
          </p>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s1title')}</h2>
            <p>{t('s1body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s2title')}</h2>
            <p>{t('s2body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s3title')}</h2>
            <p>{t('s3body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s4title')}</h2>
            <p>{t('s4body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s5title')}</h2>
            <p>{t('s5body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s6title')}</h2>
            <p>{t('s6body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s7title')}</h2>
            <p>{t('s7body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s8title')}</h2>
            <p>{t('s8body')}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">{t('s9title')}</h2>
            <p>
              {t('s9body').replace('hola@somazstudio.com', '').trim()}{' '}
              <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">
                hola@somazstudio.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="architectural-line mt-16 mb-8" />
        <Link
          href="/"
          className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-accent transition-colors duration-300"
        >
          {tl('backHome')}
        </Link>
      </div>
    </PageFade>
  )
}
