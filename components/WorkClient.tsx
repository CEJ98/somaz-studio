'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/ProjectCard'
import { projects, categories, type ProjectCategory } from '@/data/projects'
import { ease } from '@/lib/motion'

const sizeToSpan: Record<string, string> = {
  large: 'md:col-span-8',
  medium: 'md:col-span-6',
  small: 'md:col-span-4',
}

export default function WorkClient({ locale: _locale }: { locale: string }) {
  const tw = useTranslations('work')
  const tc = useTranslations('categories')
  const [active, setActive] = useState<ProjectCategory>('All')
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

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
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{tw('portfolio')}</p>
          <h1
            className="font-serif font-light italic text-foreground/80"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            {tw('selectedWork')}
          </h1>
        </motion.div>

        {/* Architectural separator */}
        <div className="architectural-line mb-10" />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`font-sans text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-300 ${
                active === cat
                  ? 'border-accent text-accent'
                  : 'border-border/50 text-foreground/35 hover:border-foreground/30 hover:text-foreground/60'
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
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/20 mb-10"
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
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className={`${sizeToSpan[project.size] || 'md:col-span-4'} transition-opacity duration-500 ${
                  hoveredSlug && hoveredSlug !== project.slug ? 'opacity-30' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <ProjectCard project={project} priority={i < 3} featured={project.featured} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
