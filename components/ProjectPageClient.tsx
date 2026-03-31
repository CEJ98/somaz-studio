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
  const heroY = useTransform(scrollY, [0, 700], [0, -140])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3])

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
      {/* Hero — full viewport */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover scale-110"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

        {/* Title overlay — bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">
                {project.category}
              </p>
              <h1
                className="font-serif font-light leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
              >
                <span className="block text-foreground/60 italic">The</span>
                <span className="block font-semibold text-foreground">{project.title}</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Info bar — 4 columns with architectural lines */}
      <div className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {infoCols.map(({ label, value, accent }, i) => (
              <div key={label} className={`py-8 ${i < infoCols.length - 1 ? 'md:border-r border-border/30 md:pr-8 md:mr-0' : ''} ${i > 0 ? 'md:pl-8' : ''}`}>
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-2">
                  {label}
                </p>
                <p className={`font-sans text-sm ${accent ? 'text-accent' : 'text-foreground/60'}`}>
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Description — centered, Cormorant Italic */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="font-serif italic text-foreground/65 text-center leading-relaxed"
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
        >
          {project.description}
        </motion.p>
      </div>

      {/* Gallery — editorial grid */}
      {galleryImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {galleryImages.map((img, i) => {
              const isFullWidth =
                i === 0 || (galleryImages.length % 2 === 1 && i === galleryImages.length - 1)
              return (
                <motion.div
                  key={img}
                  className={`relative overflow-hidden ${
                    isFullWidth ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease }}
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

      {/* Next Project */}
      {nextProject && (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group relative block w-full h-[55vh] overflow-hidden"
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/70 group-hover:bg-background/55 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-5">
              Next Project
            </p>
            <h2
              className="font-serif font-light text-foreground mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
            >
              {nextProject.title}
            </h2>
            <p className="font-sans text-sm text-foreground/35">
              {nextProject.category} — {nextProject.location}
            </p>
            <span className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] tracking-[0.25em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Project
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>north_east</span>
            </span>
          </div>
        </Link>
      )}

      {/* Bottom navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/35 hover:text-foreground transition-colors duration-300 group"
          >
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1" style={{ fontSize: '16px' }}>arrow_back</span>
            All Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          >
            Start a Project
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>north_east</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
