'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/data/projects'

const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectPageClient({ project, allProjects }: Props) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -120])

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const galleryImages = project.images.slice(1)

  const infoCols = [
    { label: 'Category', value: project.category, accent: true },
    { label: 'Location', value: project.location },
    { label: 'Year', value: String(project.year) },
    ...(project.area ? [{ label: 'Area', value: project.area }] : []),
  ]

  return (
    <div className="min-h-screen">
      {/* Hero — 75vh full viewport */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="font-sans text-[11px] tracking-widest uppercase text-accent mb-4">
                {project.category}
              </p>
              <h1
                className="font-serif font-semibold text-foreground"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info bar — 4 columns */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8"
          >
            {infoCols.map(({ label, value, accent }) => (
              <div key={label}>
                <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/25 mb-2">
                  {label}
                </p>
                <p className={`font-sans text-sm ${accent ? 'text-accent' : 'text-foreground/70'}`}>
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Description — centered, Cormorant Italic */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="font-serif italic text-foreground/70 text-center leading-relaxed"
          style={{ fontSize: 'clamp(18px, 2.2vw, 22px)' }}
        >
          {project.description}
        </motion.p>
      </div>

      {/* Editorial Gallery */}
      {galleryImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {galleryImages.map((img, i) => {
              const isFullWidth = i === 0 || (galleryImages.length % 2 === 1 && i === galleryImages.length - 1)
              return (
                <motion.div
                  key={img}
                  className={`relative overflow-hidden ${isFullWidth ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — view ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes={isFullWidth ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Next Project — full width with background image */}
      {nextProject && (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group relative block w-full h-[50vh] overflow-hidden"
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/70 group-hover:bg-background/60 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/40 mb-4">
              Next Project
            </p>
            <h2
              className="font-serif font-semibold text-foreground mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {nextProject.title}
            </h2>
            <p className="font-sans text-sm text-foreground/40">
              {nextProject.category} — {nextProject.location}
            </p>
            <span className="inline-block mt-6 font-sans text-xs tracking-widest uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Project →
            </span>
          </div>
        </Link>
      )}

      {/* Bottom CTA + Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            All Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-xs tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
          >
            Start a Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
