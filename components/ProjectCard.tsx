'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Project } from '@/data/projects'
import { ease } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  priority?: boolean
  featured?: boolean
  aspectRatio?: string
  isWide?: boolean
  onView?: (project: Project) => void
}

export default function ProjectCard({ project, priority = false, featured = false, aspectRatio, isWide = false, onView }: ProjectCardProps) {
  const tc = useTranslations('categories')
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const handleClick = (e: React.MouseEvent) => {
    if (onView) {
      e.preventDefault()
      onView(project)
    }
  }

  const resolvedAspect = aspectRatio ?? (featured ? 'aspect-[16/9]' : 'aspect-[4/3]')

  return (
    <div
      className="group block relative overflow-hidden bg-surface cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div ref={cardRef} className={`relative overflow-hidden ${resolvedAspect}`}>
        {/* Curtain reveal */}
        <m.div
          className="absolute inset-0 bg-surface z-10 origin-top pointer-events-none"
          initial={{ scaleY: reduced ? 0 : 1 }}
          animate={inView ? { scaleY: 0 } : {}}
          transition={{ duration: 1.1, ease }}
          aria-hidden="true"
        />

        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes={isWide ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 672px'}
          className={`object-cover transition-all duration-700 ease-out ${
            hovered
              ? 'scale-[1.04] grayscale-0'
              : 'scale-100 grayscale-[35%]'
          }`}
          priority={priority}
        />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-6 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(to top, rgba(248,246,242,0.96) 0%, rgba(248,246,242,0.6) 55%, transparent 100%)' }}
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-2">
            {tc(project.category)}
          </p>
          <div className="overflow-hidden">
            <h3 className={`font-serif text-xl md:text-2xl font-semibold text-foreground transition-transform duration-500 ${hovered ? 'translate-y-0' : 'translate-y-full'}`}>
              {project.title}
            </h3>
          </div>
          <div className="overflow-hidden mt-1">
            <p className={`font-sans text-sm text-foreground/60 transition-transform duration-500 delay-75 ${hovered ? 'translate-y-0' : 'translate-y-full'}`}>
              {project.location} — {project.year}
            </p>
          </div>
        </div>

        {/* Glow on hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ boxShadow: 'inset 0 0 60px rgba(138,122,90,0.08)' }}
        />

        {/* Accent line bottom */}
        <div className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-700 ease-out ${hovered ? 'w-full' : 'w-0'}`} />
      </div>

      {/* Mobile info (below image, no hover on touch) */}
      <div className="p-4 md:hidden">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">
          {tc(project.category)}
        </p>
        <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
        <p className="font-sans text-sm text-foreground/65">
          {project.location} — {project.year}
        </p>
      </div>
    </div>
  )
}
