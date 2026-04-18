'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import { projects, categories, type Project, type ProjectCategory } from '@/data/projects'

type ProjectMarket = 'All' | 'Miami' | 'LATAM'
const markets: ProjectMarket[] = ['All', 'Miami', 'LATAM']
function getMarket(location: string): 'Miami' | 'LATAM' {
  return location.toLowerCase().includes('miami') ? 'Miami' : 'LATAM'
}
import { ease } from '@/lib/motion'

const editorialPattern = [
  { span: 'md:col-span-12', aspect: 'aspect-[21/9]' },
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/5]' },
] as const

export default function WorkClient() {
  const tw = useTranslations('work')
  const tc = useTranslations('categories')
  const [active, setActive] = useState<ProjectCategory>('All')
  const [activeMarket, setActiveMarket] = useState<ProjectMarket>('All')
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const reduced = useReducedMotion()
  const ctaVideoRef = useRef<HTMLDivElement>(null)
  const [ctaVideoVisible, setCtaVideoVisible] = useState(false)

  useEffect(() => {
    const el = ctaVideoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCtaVideoVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = projects.filter((p) => {
    const matchesCategory = active === 'All' || p.category === active
    const matchesMarket = activeMarket === 'All' || getMarket(p.location) === activeMarket
    return matchesCategory && matchesMarket
  })

  return (
    <div className="min-h-screen pb-28">
      {/* Hero section with background image */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/work-hero.jpg"
            alt="Selected portfolio work — 3D visualization and interior design projects"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-10 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{tw('portfolio')}</p>
              <h1
                className="font-serif font-light italic text-foreground/80"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
              >
                {tw('selectedWork')}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-10 pt-12">
      <div className="max-w-7xl mx-auto">

        {/* Architectural separator */}
        <div className="architectural-line mb-10" />

        {/* Editorial intro */}
        <p className="font-serif font-light italic text-foreground/65 mb-10 max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}>
          {tw('intro')}
        </p>

        {/* Market filter */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {markets.map((market) => (
            <button
              key={market}
              onClick={() => setActiveMarket(market)}
              aria-pressed={activeMarket === market}
              className={`font-sans text-[10px] tracking-[0.25em] uppercase px-4 py-2 transition-all duration-300 ${
                activeMarket === market
                  ? 'text-foreground bg-foreground/8 border-b border-foreground/40'
                  : 'text-foreground/40 hover:text-foreground/70'
              }`}
            >
              {market === 'All' ? tw('marketAll') : market}
            </button>
          ))}
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`font-sans text-[10px] tracking-[0.25em] uppercase px-4 py-3 border transition-all duration-300 ${
                active === cat
                  ? 'border-accent text-accent'
                  : 'border-border/50 text-foreground/55 hover:border-foreground/30 hover:text-foreground/80'
              }`}
            >
              {active === cat && (
                <span className="inline-block w-1 h-1 rounded-full bg-accent mr-2 mb-0.5" />
              )}
              {tc(cat)}
            </button>
          ))}
        </motion.div>

        {/* Project counter */}
        <motion.p
          key={filtered.length}
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 mb-10"
        >
          {filtered.length} {filtered.length === 1 ? tw('projectSingular') : tw('projectPlural')}
        </motion.p>

        {/* Editorial Grid — 12 columns */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.05, ease }}
                className={`${editorialPattern[i % 3].span} transition-opacity duration-500 ${
                  hoveredSlug && hoveredSlug !== project.slug ? 'opacity-30' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <ProjectCard project={project} priority={i === 0} aspectRatio={editorialPattern[i % 3].aspect} onView={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA section */}
        <div ref={ctaVideoRef} className="mt-24 pt-16 border-t border-border/40 text-center relative overflow-hidden">
          {ctaVideoVisible && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/media/work-cta-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover hidden md:block"
            >
              <source src="/media/work-cta.webm" type="video/webm" />
              <source src="/media/work-cta.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
          <div className="relative z-10 py-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">{tw('ctaLabel')}</p>
          <p className="font-serif font-light italic text-foreground mb-10" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {tw('ctaHeading')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
          >
            {tw('ctaButton')}
            <Icon name="north_east" size={14} />
          </Link>
          </div>
        </div>
      </div>
      </div>

      <ProjectModal key={selectedProject?.slug ?? ''} project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
