'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { posts } from '@/data/posts'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import MagneticButton from '@/components/MagneticButton'
import MarqueeStrip from '@/components/MarqueeStrip'
import FAQSection from '@/components/FAQSection'
import TestimonialsSection from '@/components/TestimonialsSection'


function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? { duration: 0 } : { duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePageClient({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const reduced = useReducedMotion()
  const selectedProjects = projects.slice(0, 4)
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 600], reduced ? [1, 1] : [1, 1.08])
  const heroOpacity = useTransform(scrollY, [0, 500], reduced ? [1, 1] : [1, 0])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], reduced ? [1, 1] : [1, 0])

  // Defer video mount until after LCP — avoids competing for bandwidth on initial load
  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVideoReady(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const steps = [
    { step: '01', title: t('step01Title'), description: t('step01Desc') },
    { step: '02', title: t('step02Title'), description: t('step02Desc') },
    { step: '03', title: t('step03Title'), description: t('step03Desc') },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] min-h-[700px] overflow-hidden flex flex-col justify-end">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          {/* Poster como Next/Image para que sirva WebP/AVIF con priority */}
          <Image
            src="/media/hero-home-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={75}
          />
          {/* Video hero — se monta 1.2s después del LCP para no competir por ancho de banda */}
          {videoReady && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/media/hero-home-mobile.webm" media="(max-width: 767px)" type="video/webm" />
              <source src="/media/hero-home-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
              <source src="/media/hero-home.webm" type="video/webm" />
              <source src="/media/hero-home.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-28"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            {t('badge')}
          </motion.p>

          <motion.h1
            className="font-serif leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
            }}
          >
            <div className="overflow-hidden">
              {t('heroLine1').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em] font-light text-foreground/60 italic"
                  variants={reduced ? {} : {
                    hidden: { y: '110%', opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden">
              {t('heroLine2').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em] font-semibold text-foreground"
                  variants={reduced ? {} : {
                    hidden: { y: '110%', opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <motion.p
            className="font-sans text-sm font-light text-foreground/75 leading-relaxed mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.58 }}
          >
            {t('heroSubline')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.65 }}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {t('startProject')}
                <Icon name="north_east" size={16} />
              </Link>
            </MagneticButton>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-6 py-3 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t('viewOurWork')}
              <Icon name="north_east" size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-8 md:right-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/55 [writing-mode:vertical-lr]">
            {t('scroll')}
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
        <AnimatedSection className="flex items-end justify-between mb-16">
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('selectedWork')}</p>
            <h2 className="font-serif font-light italic text-foreground/80" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {t('spacesTagline')}
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-300"
          >
            {t('allProjects')}
            <Icon name="arrow_right_alt" size={14} />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-12">
          {selectedProjects[0] && (
            <motion.div
              className="md:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
            >
              <Link href={`/work/${selectedProjects[0].slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] mb-5">
                  <Image
                    src={selectedProjects[0].coverImage}
                    alt={selectedProjects[0].title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selectedProjects[0].category}</p>
                    <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selectedProjects[0].title}</h3>
                    <p className="font-sans text-[11px] text-foreground/55 mt-1">{selectedProjects[0].location} — {selectedProjects[0].year}</p>
                  </div>
                  <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '3rem', lineHeight: 1 }}>01</span>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="md:col-span-4 flex flex-col gap-12">
            {selectedProjects[1] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                <Link href={`/work/${selectedProjects[1].slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-4">
                    <Image
                      src={selectedProjects[1].coverImage}
                      alt={selectedProjects[1].title}
                      fill
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selectedProjects[1].category}</p>
                      <h3 className="font-serif text-lg text-foreground group-hover:text-accent/80 transition-colors duration-300">{selectedProjects[1].title}</h3>
                      <p className="font-sans text-[11px] text-foreground/55 mt-1">{selectedProjects[1].location} — {selectedProjects[1].year}</p>
                    </div>
                    <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>02</span>
                  </div>
                </Link>
              </motion.div>
            )}
            {selectedProjects[2] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
              >
                <Link href={`/work/${selectedProjects[2].slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-4">
                    <Image
                      src={selectedProjects[2].coverImage}
                      alt={selectedProjects[2].title}
                      fill
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selectedProjects[2].category}</p>
                      <h3 className="font-serif text-lg text-foreground group-hover:text-accent/80 transition-colors duration-300">{selectedProjects[2].title}</h3>
                      <p className="font-sans text-[11px] text-foreground/55 mt-1">{selectedProjects[2].location} — {selectedProjects[2].year}</p>
                    </div>
                    <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>03</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {selectedProjects[3] && (
            <motion.div
              className="md:col-start-3 md:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              <Link href={`/work/${selectedProjects[3].slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[16/7] mb-5">
                  <Image
                    src={selectedProjects[3].coverImage}
                    alt={selectedProjects[3].title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 67vw"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selectedProjects[3].category}</p>
                    <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selectedProjects[3].title}</h3>
                    <p className="font-sans text-[11px] text-foreground/55 mt-1">{selectedProjects[3].location} — {selectedProjects[3].year}</p>
                  </div>
                  <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '3rem', lineHeight: 1 }}>04</span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        <AnimatedSection className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          >
            {t('viewAllProjects')}
            <Icon name="arrow_right_alt" size={14} />
          </Link>
        </AnimatedSection>
      </section>

      <MarqueeStrip />

      {/* PHILOSOPHY / EXPERTISE */}
      <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            <AnimatedSection className="md:col-span-5">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8">{t('ourApproach')}</p>
              <blockquote
                className="font-serif italic text-foreground/70 leading-tight mb-10"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                {t('designQuote')}
              </blockquote>
              <p className="font-sans font-light text-foreground/70 leading-relaxed mb-8">
                {t('approachParagraph')}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/65 hover:text-accent border-b border-foreground/30 pb-0.5 hover:border-accent transition-all duration-300"
              >
                {t('ourStory')}
                <Icon name="north_east" size={14} />
              </Link>
            </AnimatedSection>

            <div className="md:col-span-7 md:col-start-6">
              <div className="architectural-line mb-12 hidden md:block" />
              {services.map((s, i) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                  className="flex items-start gap-6 py-6 border-b border-border/40 group"
                >
                  <span className="font-sans text-[10px] text-foreground/65 tracking-widest w-8 shrink-0 pt-1 group-hover:text-accent transition-colors duration-300">
                    {s.number}
                  </span>
                  <div className="flex-1 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="font-serif text-xl text-foreground/85 group-hover:text-foreground block mb-1 transition-colors duration-300">
                      {tl(s.title, locale)}
                    </span>
                    <span className="font-sans text-sm font-light text-foreground/60 italic">{tl(s.tagline, locale)}</span>
                  </div>
                  <Icon name="arrow_right_alt" size={18} className="text-foreground/55 group-hover:text-accent transition-colors duration-300 mt-0.5" />
                </motion.div>
              ))}
              <AnimatedSection className="mt-8" delay={0.3}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 hover:text-accent transition-colors duration-300"
                >
                  {t('exploreServices')}
                  <Icon name="north_east" size={14} />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('process')}</p>
            <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {t('howWeWork')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.2, ease }}
                className="relative border-t border-border/40 pt-10 pb-12 md:pr-16 overflow-hidden group"
              >
                <div className="absolute top-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700" />
                <p className="font-serif font-light text-accent/25 select-none mb-4" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}>{item.step}</p>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-5">{item.title}</h3>
                <p className="font-sans font-light text-foreground/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border/50 px-6 md:px-10 py-20 md:py-28 bg-surface/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-px bg-border/30">
            {[
              { value: 50, suffix: '+', label: t('statsProjects') },
              { value: 8,  suffix: '+', label: t('statsCountries') },
              { value: 24, suffix: 'h', label: t('statsResponse') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="bg-background px-8 py-12 text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-foreground/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* LATEST NOTES */}
      <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex items-end justify-between mb-16">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('latestNotes')}</p>
              <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                {t('insightsTagline')}
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-300"
            >
              {t('viewAllNotes')}
              <Icon name="arrow_right_alt" size={14} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden mb-5">
                    <Image
                      src={post.coverImage}
                      alt={tl(post.title, locale)}
                      fill
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent/80 mb-2">{post.category}</p>
                  <h3 className="font-serif text-lg font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300 mb-2 line-clamp-2">
                    {tl(post.title, locale)}
                  </h3>
                  <p className="font-sans text-sm text-foreground/65 line-clamp-2">{tl(post.excerpt, locale)}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-10 flex justify-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t('viewAllNotes')}
              <Icon name="arrow_right_alt" size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <FAQSection locale={locale} />

      {/* CTA */}
      <section className="border-t border-border/50 px-6 md:px-10 py-32 md:py-48 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-surface/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="ghost-text font-serif font-bold leading-none"
            style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
          >
            SOMAZ
          </span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8">{t('startConversation')}</p>
            <h2
              className="font-serif font-light text-foreground leading-tight mb-12"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              {t('readyToBring')}<br />
              <span className="italic text-foreground/60">{t('visionToLife')}</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
                >
                  {t('startProject')}
                  <Icon name="north_east" size={16} />
                </Link>
              </MagneticButton>
              <Link
                href="/work"
                className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/75 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
              >
                {t('viewOurWorkCta')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
