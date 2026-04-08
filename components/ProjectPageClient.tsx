'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useCallback } from 'react'
import type { Project } from '@/data/projects'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'

function useCategoryLabel() {
  const tc = useTranslations('categories')
  return (category: string) => tc(category)
}

interface Props {
  project: Project
  allProjects: Project[]
  locale: string
}

function Lightbox({
  images,
  initialIndex,
  onClose,
  projectTitle,
  tp,
}: {
  images: string[]
  initialIndex: number
  onClose: () => void
  projectTitle: string
  tp: ReturnType<typeof useTranslations>
}) {
  const [current, setCurrent] = useState(initialIndex)

  const goNext = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length])
  const goPrev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, goNext, goPrev])

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-300"
        aria-label={tp('closeGallery')}
      >
        <Icon name="close" size={24} />
      </button>

      {/* Counter */}
      <p className="absolute top-6 left-6 font-sans text-[10px] tracking-[0.25em] text-foreground/55">
        {current + 1} {tp('imageOf')} {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 md:left-8 z-10 text-foreground/55 hover:text-foreground transition-colors duration-300"
          aria-label="Previous"
        >
          <Icon name="arrow_back" size={28} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 md:right-8 z-10 text-foreground/55 hover:text-foreground transition-colors duration-300"
          aria-label="Next"
        >
          <Icon name="arrow_forward" size={28} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={current}
        className="relative w-[90vw] h-[80vh] max-w-6xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return
          const diff = e.changedTouches[0].clientX - touchStart
          if (Math.abs(diff) > 60) {
            diff > 0 ? goPrev() : goNext()
          }
          setTouchStart(null)
        }}
      >
        <Image
          src={images[current]}
          alt={`${projectTitle} — ${current + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>
    </motion.div>
  )
}

export default function ProjectPageClient({ project, allProjects, locale }: Props) {
  const tp = useTranslations('project')
  const catLabel = useCategoryLabel()
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], reduced ? [0, 0] : [0, -140])
  const heroOpacity = useTransform(scrollY, [0, 500], reduced ? [1, 1] : [1, 0.3])

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]

  const galleryImages = project.images.slice(1)
  const allImages = project.images

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const infoCols = [
    { label: tp('categoryLabel'), value: catLabel(project.category), accent: true },
    { label: tp('locationLabel'), value: project.location },
    { label: tp('yearLabel'), value: String(project.year) },
    ...(project.area ? [{ label: tp('areaLabel'), value: project.area }] : []),
  ]

  return (
    <div className="min-h-screen">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            projectTitle={project.title}
            tp={tp}
          />
        )}
      </AnimatePresence>

      {/* Hero — full viewport */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover cursor-zoom-in"
            priority
            fetchPriority="high"
            sizes="100vw"
            onClick={() => setLightboxIndex(0)}
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
                {catLabel(project.category)}
              </p>
              <h1
                className="font-serif font-light leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
              >
                <span className="block text-foreground/60 italic">{tp('thePrefix')}</span>
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
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/55 mb-2">
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
          {tl(project.description, locale)}
        </motion.p>
      </div>

      {/* Outcome */}
      {project.outcome && (
        <motion.div
          className="max-w-3xl mx-auto px-6 md:px-10 pb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent/60 mb-3">{tp('outcomeLabel')}</p>
          <p className="font-sans text-sm text-foreground/65 leading-relaxed">{tl(project.outcome, locale)}</p>
        </motion.div>
      )}

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
                  className={`relative overflow-hidden cursor-zoom-in ${
                    isFullWidth ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease }}
                  onClick={() => setLightboxIndex(i + 1)}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — view ${i + 2}`}
                    fill
                    className="object-cover hover:scale-[1.02] transition-transform duration-500"
                    sizes={isFullWidth ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Previous / Next Project */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Prev */}
        {prevProject && prevProject.slug !== project.slug && (
          <Link
            href={`/work/${prevProject.slug}`}
            className="group relative block w-full h-[45vh] overflow-hidden"
          >
            <Image
              src={prevProject.coverImage}
              alt={prevProject.title}
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-background/70 group-hover:bg-background/55 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/65 mb-4">
                {tp('prevProject')}
              </p>
              <h2
                className="font-serif font-light text-foreground mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
              >
                {prevProject.title}
              </h2>
              <p className="font-sans text-sm text-foreground/65">
                {catLabel(prevProject.category)}
              </p>
            </div>
          </Link>
        )}

        {/* Next */}
        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className={`group relative block w-full h-[45vh] overflow-hidden ${
              !prevProject || prevProject.slug === project.slug ? 'md:col-span-2 h-[55vh]' : ''
            }`}
          >
            <Image
              src={nextProject.coverImage}
              alt={nextProject.title}
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
              sizes={!prevProject || prevProject.slug === project.slug ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            />
            <div className="absolute inset-0 bg-background/70 group-hover:bg-background/55 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/65 mb-4">
                {tp('nextProject')}
              </p>
              <h2
                className="font-serif font-light text-foreground mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
              >
                {nextProject.title}
              </h2>
              <p className="font-sans text-sm text-foreground/65">
                {catLabel(nextProject.category)} — {nextProject.location}
              </p>
              <span className="inline-flex items-center gap-2 mt-5 font-sans text-[10px] tracking-[0.25em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tp('viewProject')}
                <Icon name="north_east" size={14} />
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/65 hover:text-foreground transition-colors duration-300 group"
          >
            <Icon name="arrow_back" size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {tp('allWork')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300 group"
          >
            {tp('startProject')}
            <Icon name="north_east" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/40 px-6 py-4">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-3 w-full bg-accent text-background py-4 font-sans text-[10px] tracking-[0.25em] uppercase"
        >
          {tp('startProject')}
          <Icon name="north_east" size={14} />
        </Link>
      </div>
    </div>
  )
}
