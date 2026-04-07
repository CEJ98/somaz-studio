import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'legal' })
  const tp = await getTranslations({ locale, namespace: 'legal.privacy' })
  return {
    title: tp('title'),
    description: 'Privacy Policy for Somaz Studio LLC — how we collect, use, and protect your information.',
    robots: { index: false, follow: false },
    alternates: buildAlternates('/privacy', locale as 'en' | 'es'),
  }
}

export default async function PrivacyPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'legal' })
  const tp = await getTranslations({ locale, namespace: 'legal.privacy' })

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">{t('label')}</p>
      <h1 className="font-serif font-light text-foreground mb-2 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
        {tp('title')}
      </h1>
      <p className="font-sans text-xs text-foreground/30 mb-12">{tp('lastUpdated')}</p>

      <div className="architectural-line mb-12" />

      <div className="space-y-10 font-sans text-sm text-foreground/60 leading-relaxed">

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s1title')}</h2>
          <p>
            {tp('s1body').replace('hola@somazstudio.com', '').trim()}{' '}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s2title')}</h2>
          <p className="mb-3">{tp('s2intro')}</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>{tp('s2li1')}</li>
            <li>{tp('s2li2')}</li>
          </ul>
          <p className="mt-3">{tp('s2outro')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s3title')}</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>{tp('s3li1')}</li>
            <li>{tp('s3li2')}</li>
            <li>{tp('s3li3')}</li>
          </ul>
          <p className="mt-3">{tp('s3outro')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s4title')}</h2>
          <p>{tp('s4body')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s5title')}</h2>
          <p>{tp('s5body')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s6title')}</h2>
          <p className="mb-3">{tp('s6intro')}</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>{tp('s6li1')}</li>
            <li>{tp('s6li2')}</li>
            <li>{tp('s6li3')}</li>
            <li>{tp('s6li4')}</li>
          </ul>
          <p className="mt-3">
            {tp('s6outro').replace('hola@somazstudio.com', '').trim()}{' '}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s7title')}</h2>
          <p>{tp('s7body')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s8title')}</h2>
          <p>{tp('s8body')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s9title')}</h2>
          <p>{tp('s9body')}</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">{tp('s10title')}</h2>
          <p>
            {tp('s10body').split('hola@somazstudio.com')[0]}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>
            {tp('s10body').split('hola@somazstudio.com')[1]}
          </p>
        </section>

      </div>

      <div className="architectural-line mt-16 mb-8" />
      <Link
        href="/"
        className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-accent transition-colors duration-300"
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
