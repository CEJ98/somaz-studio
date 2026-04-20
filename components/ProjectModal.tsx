'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import { t as tr } from '@/lib/locale'
import type { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const tc = useTranslations('categories')
  const tp = useTranslations('project')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  const navigate = useCallback((dir: 1 | -1) => {
    if (!project) return
    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return project.images.length - 1
      if (next >= project.images.length) return 0
      return next
    })
  }, [project])

  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose, navigate])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors duration-300"
            aria-label="Close"
          >
            <Icon name="close" size={16} className="text-foreground" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55">
            {activeIndex + 1} / {project.images.length}
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-6xl px-6 md:px-16 overflow-y-auto max-h-[90vh] py-14 md:py-16 scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.slug}-${activeIndex}`}
                className="relative aspect-[16/10] overflow-hidden bg-surface"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <Image
                  src={project.images[activeIndex]}
                  alt={`${project.title} — image ${activeIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center hover:text-accent transition-colors duration-300"
                  aria-label="Previous image"
                >
                  <Icon name="arrow_back" size={20} className="text-foreground/50" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center hover:text-accent transition-colors duration-300"
                  aria-label="Next image"
                >
                  <Icon name="arrow_forward" size={20} className="text-foreground/50" />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            {project.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative flex-shrink-0 w-16 h-12 overflow-hidden transition-all duration-300 ${
                      i === activeIndex
                        ? 'ring-1 ring-accent'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Project info */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-2">
                  {tc(project.category)}
                </p>
                <h2 className="font-serif text-2xl font-semibold text-foreground">{project.title}</h2>
                <p className="font-sans text-sm text-foreground/55 mt-1">
                  {project.location} — {project.year}
                  {project.area && ` — ${project.area}`}
                </p>
              </div>
              <Link
                href={`/work/${project.slug}`}
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 hover:text-accent transition-colors duration-300 mt-1"
              >
                {tp('viewProject')}
                <Icon name="north_east" size={12} />
              </Link>
            </div>

            {/* Case study: brief → description → outcome */}
            <div className="mt-8 border-t border-border/30 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/35 mb-3">Brief</p>
                <p className="font-sans font-light text-foreground/60 text-sm leading-relaxed">
                  {tr(project.brief, locale)}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/35 mb-3">Overview</p>
                <p className="font-sans font-light text-foreground/60 text-sm leading-relaxed">
                  {tr(project.description, locale)}
                </p>
                {project.outcome && (
                  <div className="mt-6 border-l-2 border-accent/40 pl-4">
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/60 mb-2">{tp('outcomeLabel')}</p>
                    <p className="font-sans font-light text-foreground/55 text-sm leading-relaxed italic">
                      {tr(project.outcome, locale)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
