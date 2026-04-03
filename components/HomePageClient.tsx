'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'

// Static JSON-LD — no user input, safe for dangerouslySetInnerHTML
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Somaz Studio',
  description: 'Miami-based design studio specializing in 3D visualization, interior design, and spatial concepts.',
  url: 'https://somazstudio.com',
  email: 'hola@somazstudio.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: 'Worldwide',
  serviceType: ['3D Visualization', 'Interior Design', 'Conceptual Design', 'Design Consulting'],
  sameAs: [
    'https://instagram.com/somazstudio',
    'https://linkedin.com/company/somazstudio',
  ],
})

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

  const steps = [
    { step: '01', title: t('step01Title'), description: t('step01Desc') },
    { step: '02', title: t('step02Title'), description: t('step02Desc') },
    { step: '03', title: t('step03Title'), description: t('step03Desc') },
  ]

  return (
    <>
      {/* JSON-LD structured data — static object, no user input */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden flex flex-col justify-end">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <video
            src="https://gzfxdkrgeaadvabxitjk.supabase.co/storage/v1/object/public/media/hero-reel.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-28"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            {t('badge')}
          </motion.p>

          <h1 className="font-serif leading-[0.9] tracking-tight mb-8" style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}>
            <div className="overflow-hidden">
              <motion.span
                className="block font-light text-foreground/60 italic"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.3 }}
              >
                {t('heroLine1')}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block font-semibold text-foreground"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.42 }}
              >
                {t('heroLine2')}
              </motion.span>
            </div>
          </h1>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.65 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {t('viewOurWork')}
              <Icon name="north_east" size={16} />
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground border-b border-foreground/20 pb-0.5 hover:border-foreground transition-all duration-300"
            >
              {t('startProject')}
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
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/30 [writing-mode:vertical-lr]">
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
            className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            {t('allProjects')}
            <Icon name="arrow_right_alt" size={14} />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {selectedProjects[0] && (
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
            >
              <Link href={`/work/${selectedProjects[0].slug}`} className="group block relative overflow-hidden aspect-[4/5]">
                <Image
                  src={selectedProjects[0].coverImage}
                  alt={selectedProjects[0].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{selectedProjects[0].category}</p>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{selectedProjects[0].title}</h3>
                  <p className="font-sans text-sm text-foreground/60">{selectedProjects[0].location} — {selectedProjects[0].year}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </Link>
            </motion.div>
          )}

          <div className="md:col-span-5 flex flex-col gap-3">
            {selectedProjects[1] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                <Link href={`/work/${selectedProjects[1].slug}`} className="group block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={selectedProjects[1].coverImage}
                    alt={selectedProjects[1].title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{selectedProjects[1].category}</p>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{selectedProjects[1].title}</h3>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
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
                <Link href={`/work/${selectedProjects[2].slug}`} className="group block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={selectedProjects[2].coverImage}
                    alt={selectedProjects[2].title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{selectedProjects[2].category}</p>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{selectedProjects[2].title}</h3>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
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
              <Link href={`/work/${selectedProjects[3].slug}`} className="group block relative overflow-hidden aspect-[16/7]">
                <Image
                  src={selectedProjects[3].coverImage}
                  alt={selectedProjects[3].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 67vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{selectedProjects[3].category}</p>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{selectedProjects[3].title}</h3>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </Link>
            </motion.div>
          )}
        </div>

        <AnimatedSection className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-foreground/15 text-foreground/50 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          >
            {t('viewAllProjects')}
            <Icon name="arrow_right_alt" size={14} />
          </Link>
        </AnimatedSection>
      </section>

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
              <p className="font-sans font-light text-foreground/50 leading-relaxed mb-8">
                {t('approachParagraph')}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-accent border-b border-foreground/20 pb-0.5 hover:border-accent transition-all duration-300"
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
                  <span className="font-sans text-[10px] text-foreground/20 tracking-widest w-8 shrink-0 pt-1 group-hover:text-accent transition-colors duration-300">
                    {s.number}
                  </span>
                  <div className="flex-1 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="font-serif text-xl text-foreground/70 group-hover:text-foreground block mb-1 transition-colors duration-300">
                      {tl(s.title, locale)}
                    </span>
                    <span className="font-sans text-sm font-light text-foreground/35 italic">{tl(s.tagline, locale)}</span>
                  </div>
                  <Icon name="arrow_right_alt" size={18} className="text-foreground/10 group-hover:text-accent transition-colors duration-300 mt-0.5" />
                </motion.div>
              ))}
              <AnimatedSection className="mt-8" delay={0.3}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-accent transition-colors duration-300"
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
          <AnimatedSection className="mb-20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('process')}</p>
            <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {t('howWeWork')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                className="relative border-t border-border/40 pt-10 pb-12 md:pr-16 overflow-hidden"
              >
                <span
                  className="absolute -top-4 -right-2 font-serif font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
                  style={{ fontSize: '100px' }}
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent/70 mb-6">{item.step}</p>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-5">{item.title}</h3>
                <p className="font-sans font-light text-foreground/50 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('testimonials')}</p>
            <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {t('whatClientsSay')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="relative bg-background px-8 pt-14 pb-10 flex flex-col justify-between overflow-hidden"
              >
                <span
                  className="absolute top-4 left-6 font-serif text-accent/10 select-none pointer-events-none"
                  style={{ fontSize: '80px', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="relative font-serif text-foreground/65 text-lg leading-relaxed italic mb-10">
                  &ldquo;{tl(testimonial.quote, locale)}&rdquo;
                </p>
                <div className="border-t border-border/40 pt-6">
                  <p className="font-sans text-sm text-foreground font-medium">{testimonial.name}</p>
                  <p className="font-sans text-[11px] text-foreground/35 tracking-wide mt-1">{tl(testimonial.role, locale)} — {testimonial.location}</p>
                  {testimonial.projectSlug && (
                    <Link
                      href={`/work/${testimonial.projectSlug}`}
                      className="inline-flex items-center gap-1.5 mt-3 font-sans text-[9px] tracking-[0.2em] uppercase text-accent/60 hover:text-accent transition-colors duration-300"
                    >
                      {t('viewProject')}
                      <Icon name="north_east" size={10} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 px-6 md:px-10 py-32 md:py-48 bg-surface/20 relative overflow-hidden">
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {t('startProject')}
                <Icon name="north_east" size={16} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
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
