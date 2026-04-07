'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Post } from '@/data/posts'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'

interface Props {
  posts: Post[]
  locale: string
}

export default function BlogClient({ posts, locale }: Props) {
  const tb = useTranslations('blog')
  return (
    <div className="min-h-screen pt-32 pb-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mb-20"
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{tb('label')}</p>
          <h1
            className="font-serif font-light text-foreground/80"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            <span className="block italic text-foreground/60">{tb('heading1')}</span>
            <span className="block font-semibold">{tb('heading2')}</span>
          </h1>
        </motion.div>

        <div className="architectural-line mb-16" />

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-y-16">
          {posts.map((post, i) => {
            const isFirst = i === 0
            return (
              <motion.article
                key={post.slug}
                className={isFirst ? 'md:col-span-12' : 'md:col-span-6'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className={`relative overflow-hidden mb-6 ${isFirst ? 'aspect-[16/6]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={post.coverImage}
                      alt={tl(post.title, locale)}
                      fill
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                      sizes={isFirst ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent">{post.category}</p>
                    <span className="w-px h-3 bg-border/60" aria-hidden="true" />
                    <p className="font-sans text-[10px] tracking-[0.15em] text-foreground/65">
                      {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <h2 className={`font-serif text-foreground/85 group-hover:text-foreground transition-colors duration-300 mb-3 leading-tight ${isFirst ? 'font-light text-3xl md:text-4xl' : 'font-light text-2xl'}`}>
                    {tl(post.title, locale)}
                  </h2>
                  <p className="font-sans font-light text-foreground/70 text-sm leading-relaxed max-w-lg">
                    {tl(post.excerpt, locale)}
                  </p>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
