'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

import ProjectCard from '@/components/ProjectCard'
import { projects, categories, type ProjectCategory } from '@/data/projects'

export default function WorkClient() {
  const [active, setActive] = useState<ProjectCategory>('All')
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Portfolio</p>
          <h1 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Selected Work
          </h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: ease }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`inline-flex items-center font-sans text-xs tracking-widest uppercase px-3 py-1.5 md:px-5 md:py-2.5 border transition-all duration-300 ${
                active === cat
                  ? 'border-accent text-accent'
                  : 'border-border text-foreground/40 hover:border-foreground/40 hover:text-foreground/70'
              }`}
            >
              {active === cat && (
                <span className="inline-block w-1 h-1 rounded-full bg-accent mr-2 mb-0.5" />
              )}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project counter */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: ease }}
          className="font-sans text-xs tracking-widest uppercase text-foreground/30 mb-8"
        >
          Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </motion.p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: ease }}
                className={`transition-opacity duration-300 ${
                  i === 0 ? 'md:col-span-2 lg:col-span-2' : i % 2 !== 0 ? 'md:mt-12' : ''
                } ${hoveredSlug && hoveredSlug !== project.slug ? 'opacity-40' : 'opacity-100'}`}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <ProjectCard project={project} priority={i < 3} featured={i === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
