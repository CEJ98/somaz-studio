import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { locales } from '@/i18n/config'
import { buildAlternates, metadataBase } from '@/lib/seo'
import { t } from '@/lib/locale'
import { getSeoLanding, seoLandings } from '@/data/seo-landings'
import { posts } from '@/data/posts'
import { projects } from '@/data/projects'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) => seoLandings.map((landing) => ({ locale, slug: landing.slug })))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const landing = getSeoLanding(slug)
  if (!landing) return {}

  return {
    metadataBase,
    title: t(landing.metaTitle, locale),
    description: t(landing.metaDescription, locale),
    openGraph: {
      title: `${t(landing.metaTitle, locale)} | Somaz Studio`,
      description: t(landing.metaDescription, locale),
    },
    alternates: buildAlternates(`/services/${slug}`, locale as 'en' | 'es'),
  }
}

export default async function SeoLandingPage(props: Props) {
  const { locale, slug } = await props.params
  const landing = getSeoLanding(slug)
  if (!landing) notFound()

  const relatedPosts = posts.filter((post) => landing.relatedPostSlugs.includes(post.slug))
  const relatedProjects = projects.filter((project) => landing.relatedProjectSlugs.includes(project.slug))
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faq.map((item) => ({
      '@type': 'Question',
      name: t(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answer, locale),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t(landing.heroEyebrow, locale)}</p>
            <h1 className="font-serif font-light text-foreground leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.75rem)' }}>
              {t(landing.heroTitle, locale)}
            </h1>
            <p className="font-sans text-[18px] leading-relaxed text-foreground/80 mt-6 max-w-3xl">
              {t(landing.heroBody, locale)}
            </p>
          </div>

          <div className="architectural-line mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-20">
            <div className="md:col-span-4">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t(landing.proofTitle, locale)}</p>
              <div className="space-y-4">
                {landing.proofPoints.map((point) => (
                  <p key={point.en} className="font-sans text-[15px] leading-relaxed text-foreground/72">
                    {t(point, locale)}
                  </p>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t(landing.audienceTitle, locale)}</p>
              <p className="font-sans text-[15px] leading-relaxed text-foreground/72">
                {t(landing.audienceBody, locale)}
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{t(landing.scopeTitle, locale)}</p>
              <div className="space-y-3">
                {landing.scopeItems.map((item) => (
                  <p key={item.en} className="font-sans text-[15px] leading-relaxed text-foreground/72">
                    {t(item, locale)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="border-t border-border/40 pt-10">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
                {locale === 'es' ? 'Lecturas relacionadas' : 'Related reading'}
              </p>
              <div className="space-y-5">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <p className="font-serif text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {t(post.title, locale)}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-foreground/65 mt-2">
                      {t(post.excerpt, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border/40 pt-10">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
                {locale === 'es' ? 'Casos relacionados' : 'Related cases'}
              </p>
              <div className="space-y-5">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                    <p className="font-serif text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {project.title}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-foreground/65 mt-2">
                      {t(project.outcome_metric, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-16 mb-20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8 text-center">
              {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 max-w-5xl mx-auto">
              {landing.faq.map((item, index) => (
                <div key={item.question.en} className="border-l border-accent/30 pl-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/50 mb-2">0{index + 1}</p>
                  <h2 className="font-serif text-foreground/80 mb-3" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', fontWeight: 'normal' }}>
                    {t(item.question, locale)}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-foreground/65">
                    {t(item.answer, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/40 pt-16 text-center">
            <p className="font-serif italic text-foreground/55 mb-2" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)' }}>
              {t(landing.ctaTitle, locale)}
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/65 max-w-2xl mx-auto mb-10">
              {t(landing.ctaBody, locale)}
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {locale === 'es' ? 'Iniciar proyecto' : 'Start a project'}
              <Icon name="north_east" size={14} />
            </Link>
          </div>
        </div>
      </PageFade>
    </>
  )
}
