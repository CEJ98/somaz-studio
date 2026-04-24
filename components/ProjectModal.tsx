'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import type { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const tc = useTranslations('categories')
  const tp = useTranslations('project')
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
        <m.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <m.div
            className="absolute inset-0 bg-background/98"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
            <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/70">
              <span className="text-accent">{tc(project.category)}</span>
              <span className="mx-3 text-foreground/30">/</span>
              <span>{project.title}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} <span className="text-foreground/30">—</span> {String(project.images.length).padStart(2, '0')}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-accent transition-colors duration-300"
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-24 py-20 md:py-24">
            <AnimatePresence mode="wait">
              <m.div
                key={`${project.slug}-${activeIndex}`}
                className="relative w-full h-full"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <Image
                  src={project.images[activeIndex]}
                  alt={`${project.title} — ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </m.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-foreground/50 hover:text-accent transition-colors duration-300"
                aria-label="Previous image"
              >
                <Icon name="arrow_back" size={22} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-foreground/50 hover:text-accent transition-colors duration-300"
                aria-label="Next image"
              >
                <Icon name="arrow_forward" size={22} />
              </button>
            </>
          )}

          {/* Bottom bar: meta + view full project */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50">
              {project.location} <span className="text-foreground/30 mx-2">—</span> {project.year}
              {project.area && <><span className="text-foreground/30 mx-2">—</span>{project.area}</>}
            </p>
            <Link
              href={`/work/${project.slug}`}
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/70 hover:text-accent transition-colors duration-300"
            >
              {tp('viewProject')}
              <Icon name="north_east" size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
