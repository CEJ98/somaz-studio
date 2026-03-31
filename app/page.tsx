'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3)

  const jsonLd = {
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
  }

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- safe: static hardcoded object, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── HERO ── */}
      <section className="noise-overlay relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#F0EDE6 1px, transparent 1px), linear-gradient(90deg, #F0EDE6 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-serif text-foreground opacity-[0.04]"
            style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', lineHeight: 1 }}
          >
            Studio
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="font-sans text-xs tracking-widest uppercase text-accent mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease, delay: 0 }}
          >
            Miami · Global
          </motion.p>

          <motion.h1
            className="font-serif leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease, delay: 0.1 }}
          >
            <span className="font-light text-foreground/70">Space is</span>
            <br />
            <span className="font-semibold text-foreground">the message.</span>
          </motion.h1>

          <motion.div
            className="w-10 h-px bg-accent mb-6 mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.8, ease: ease, delay: 0.2 }}
          />

          <motion.p
            className="font-sans font-light text-foreground/70 max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease, delay: 0.25 }}
          >
            We turn architectural vision into photorealistic reality —<br />
            from Miami to the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300 group"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
            >
              View Our Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-foreground/25 rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-foreground/25" />
        </motion.div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto">
        <AnimatedSection className="flex items-end justify-between mb-14">
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Portfolio</p>
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Selected Work
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 font-sans text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 group"
          >
            All projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: ease }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} priority={i === 0} featured={i === 0} />
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-10 md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground/40 hover:text-foreground transition-colors duration-300"
          >
            See All Projects →
          </Link>
        </AnimatedSection>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Expertise</p>
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              What We Do
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: ease }}
                className="flex items-center gap-6 py-5 border-b border-border group"
              >
                <span className="font-sans text-xs text-foreground/25 font-medium tracking-wider w-8 shrink-0 group-hover:text-accent transition-colors duration-300">
                  {s.number}
                </span>
                <div className="group-hover:translate-x-1 transition-all duration-300">
                  <span className="font-serif text-xl md:text-2xl text-foreground/70 group-hover:text-foreground block">
                    {s.title}
                  </span>
                  <span className="font-sans text-sm text-foreground/40 italic">{s.tagline}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
            >
              Explore Services
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center">
          <AnimatedSection>
            <h2
              className="font-serif text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              <span className="block italic font-light">A Latin American perspective.</span>
              <span className="block font-semibold">A global design language.</span>
            </h2>
          </AnimatedSection>

          <div className="hidden md:flex items-center justify-center px-8">
            <div className="w-px h-16 bg-border" />
          </div>

          <AnimatedSection>
            <p className="font-sans font-light text-foreground/70 text-lg leading-relaxed mb-8">
              Somaz Studio brings together design sensibility and cutting-edge visualization tools
              to transform spaces across Miami, Latin America, and beyond.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 group"
            >
              Our Story
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">What Clients Say</p>
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Trusted by design-forward clients.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
                className="border border-border p-8 flex flex-col justify-between"
              >
                <p className="font-serif text-foreground/70 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-sm text-foreground font-medium">{t.name}</p>
                  <p className="font-sans text-xs text-foreground/40">{t.role} — {t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="bg-surface border-t border-border px-6 md:px-10 py-28 md:py-40">
        <div className="max-w-7xl mx-auto text-center relative overflow-hidden">
          {/* Decorative background character */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-serif text-foreground opacity-[0.03]"
              style={{ fontSize: '20rem', lineHeight: 1 }}
            >
              S
            </span>
          </div>

          <AnimatedSection className="relative z-10">
            <h2
              className="font-serif font-semibold mb-10 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Let&apos;s build something together.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300 group"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
