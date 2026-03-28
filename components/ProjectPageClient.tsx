'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/data/projects'

const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectPageClient({ project, allProjects }: Props) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const galleryImages = project.images.slice(1)

  const metaCells = [
    { key: 'project', label: 'Project', value: project.title, serif: true },
    { key: 'category', label: 'Category', value: project.category, accent: true },
    { key: 'location', label: 'Location', value: project.location },
    { key: 'year', label: 'Year', value: String(project.year) },
    ...(project.area ? [{ key: 'area', label: 'Area', value: project.area }] : []),
  ]

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero with parallax */}
      <div className="relative w-full aspect-[16/7] mb-16 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: ease }}
          className="mb-10"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            All Work
          </Link>
        </motion.div>

        {/* Meta cells */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16 pb-12 border-b border-border">
          {metaCells.map(({ key, label, value, serif, accent }) => (
            <div
              key={key}
              className={`pb-2 border-b-2 transition-all duration-300 cursor-default ${
                hoveredCell === key ? 'border-accent' : 'border-transparent'
              }`}
              onMouseEnter={() => setHoveredCell(key)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <p className="font-sans text-xs tracking-widest uppercase text-foreground/30 mb-2">{label}</p>
              {serif ? (
                <p className="font-serif text-xl">{value}</p>
              ) : accent ? (
                <p className="font-sans text-sm text-accent">{value}</p>
              ) : (
                <p className="font-sans text-sm">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h1 className="font-serif font-semibold text-foreground mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {project.title}
            </h1>
            <p className="font-sans font-light text-foreground/60 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-16 space-y-4">
            {/* First image: full width */}
            <motion.div
              className="relative w-full aspect-[16/7] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: ease }}
            >
              <Image
                src={galleryImages[0]}
                alt={`${project.title} — view 2`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>

            {/* Remaining images: horizontal scroll on mobile, 2-col grid on desktop */}
            {galleryImages.length > 1 && (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6">
                  {galleryImages.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] w-[80vw] flex-shrink-0 snap-start overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} — view ${i + 3}`}
                        fill
                        className="object-cover"
                        sizes="80vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Desktop: 2-col grid */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {galleryImages.slice(1).map((img, i) => (
                    <motion.div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} — view ${i + 3}`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Next Project */}
        {nextProject && (
          <div className="mb-16 pt-16 border-t border-border">
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/30 mb-8">Next Project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="relative w-full md:w-64 aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image
                  src={nextProject.coverImage}
                  alt={nextProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-accent mb-2">{nextProject.category}</p>
                <h3 className="font-serif font-semibold text-foreground mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  {nextProject.title}
                </h3>
                <p className="font-sans text-sm text-foreground/40">{nextProject.location} — {nextProject.year}</p>
                <span className="inline-block mt-4 font-sans text-sm text-foreground/50 group-hover:text-foreground transition-colors duration-300">
                  View project →
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-border">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            All Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
          >
            Start a Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
