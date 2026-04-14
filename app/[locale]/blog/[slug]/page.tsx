import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { posts } from '@/data/posts'
import { locales } from '@/i18n/config'
import { t } from '@/lib/locale'
import { getTranslations } from 'next-intl/server'
import PageFade from '@/components/PageFade'
import { Icon } from '@/components/icons'
import { buildAlternates } from '@/lib/seo'

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  const ogImage = `https://somazstudio.com${post.coverImage}`
  return {
    title: t(post.title, locale),
    description: t(post.excerpt, locale),
    openGraph: {
      title: `${t(post.title, locale)} | Somaz Studio`,
      description: t(post.excerpt, locale),
      type: 'article',
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 800, alt: t(post.title, locale) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t(post.title, locale)} | Somaz Studio`,
      description: t(post.excerpt, locale),
      images: [ogImage],
    },
    alternates: buildAlternates(`/blog/${slug}`, locale as 'en' | 'es'),
  }
}

export default async function BlogPostPage(props: Props) {
  const { locale, slug } = await props.params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  const tb = await getTranslations({ locale, namespace: 'blog' })

  const localizedTitle = t(post.title, locale)
  const localizedContent = t(post.content, locale)
  const localizedExcerpt = t(post.excerpt, locale)
  const readingTime = Math.ceil(localizedContent.split(/\s+/).length / 200)

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: localizedTitle,
      description: localizedExcerpt,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: `https://somazstudio.com/${locale}/blog/${slug}`,
      image: `https://somazstudio.com${post.coverImage}`,
      articleSection: post.category,
      wordCount: localizedContent.split(' ').length,
      author: {
        '@type': 'Person',
        name: 'Sofía Mazzucco',
        url: 'https://somazstudio.com/en/about',
        jobTitle: 'Architect & Interior Designer',
        worksFor: { '@type': 'Organization', name: 'Somaz Studio', url: 'https://somazstudio.com' },
      },
      publisher: { '@type': 'Organization', name: 'Somaz Studio', url: 'https://somazstudio.com', logo: { '@type': 'ImageObject', url: 'https://somazstudio.com/logos/logo-smz.png' } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Notes', item: `https://somazstudio.com/${locale}/blog` },
        { '@type': 'ListItem', position: 3, name: localizedTitle, item: `https://somazstudio.com/${locale}/blog/${slug}` },
      ],
    },
  ])

  const paragraphs = localizedContent.split('\n\n').filter(Boolean)

  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
         
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors duration-300 mb-12"
          >
            <Icon name="arrow_back" size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {tb('backToNotes')}
          </Link>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-4">{post.category}</p>
          <h1 className="font-serif font-light text-foreground/80 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {localizedTitle}
          </h1>
          <div className="flex items-center gap-4 mb-12">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/25">
              {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <span className="w-px h-3 bg-border/40" aria-hidden="true" />
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/25">
              {readingTime} {locale === 'es' ? 'min de lectura' : 'min read'}
            </p>
          </div>
          <div className="relative aspect-[16/7] overflow-hidden mb-16">
            <Image src={post.coverImage} alt={localizedTitle} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="font-sans font-light text-foreground/60 text-base leading-[1.85]">{para}</p>
            ))}
          </div>
          {/* Prev / Next navigation */}
          {(prevPost || nextPost) && (
            <nav aria-label="Post navigation" className="flex justify-between gap-4 mt-16 pt-8 border-t border-border">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col gap-1 max-w-[45%]">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-foreground/40">← {tb('prevPost')}</span>
                  <span className="font-sans text-sm text-foreground/70 group-hover:text-foreground transition-colors line-clamp-2">
                    {t(prevPost.title, locale)}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col gap-1 max-w-[45%] items-end ml-auto text-right">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-foreground/40">{tb('nextPost')} →</span>
                  <span className="font-sans text-sm text-foreground/70 group-hover:text-foreground transition-colors line-clamp-2">
                    {t(nextPost.title, locale)}
                  </span>
                </Link>
              )}
            </nav>
          )}

          {/* CTA */}
          <div className="mt-20 mb-16 py-16 px-8 border border-border/30 text-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{tb('ctaLabel')}</p>
            <h3
              className="font-serif font-light text-foreground leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              {tb('ctaHeading')}<br />
              <span className="italic text-foreground/60">{tb('ctaHighlight')}</span>
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              {tb('ctaButton')}
              <Icon name="north_east" size={14} />
            </Link>
          </div>

          <div className="architectural-line mb-12" />
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors duration-300"
          >
            <Icon name="arrow_back" size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {tb('allNotes')}
          </Link>
        </div>
      </PageFade>
    </>
  )
}
