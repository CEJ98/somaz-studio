'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ease } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  priority?: boolean
  featured?: boolean
}

export default function ProjectCard({ project, priority = false, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block relative overflow-hidden bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={cardRef} className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {/* Curtain reveal */}
        <motion.div
          className="absolute inset-0 bg-surface z-10 origin-top pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={inView ? { scaleY: 0 } : {}}
          transition={{ duration: 1.1, ease }}
          aria-hidden="true"
        />

        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
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
          style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.85) 0%, transparent 60%)' }}
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-2">
            {project.category}
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

        {/* Accent line bottom */}
        <div className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-700 ease-out ${hovered ? 'w-full' : 'w-0'}`} />
      </div>

      {/* Mobile info (below image, no hover on touch) */}
      <div className="p-4 md:hidden">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mb-1">
          {project.category}
        </p>
        <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
        <p className="font-sans text-sm text-foreground/40">
          {project.location} — {project.year}
        </p>
      </div>
    </Link>
  )
}
