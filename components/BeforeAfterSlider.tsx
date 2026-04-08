'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ease } from '@/lib/motion'

interface Props {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
  project?: string
  locale?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Wireframe',
  afterLabel = 'Render',
  caption,
  project,
  locale = 'en',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(40) // percent
  const [dragging, setDragging] = useState(false)
  const reduced = useReducedMotion()

  const clamp = (v: number) => Math.min(95, Math.max(5, v))

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = clamp(((clientX - rect.left) / rect.width) * 100)
    setPosition(pct)
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setDragging(true)
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updatePosition(e.clientX)
    const onTouch = (e: TouchEvent) => updatePosition(e.touches[0].clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, updatePosition])

  return (
    <motion.section
      className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40"
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-accent/50 block" />
            {locale === 'es' ? 'Ve la diferencia' : 'See the difference'}
          </p>
          <h2
            className="font-serif font-light italic text-foreground/80"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {locale === 'es' ? 'Del plano a la realidad.' : 'From blueprint to reality.'}
          </h2>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video select-none overflow-hidden"
          style={{ cursor: dragging ? 'ew-resize' : 'col-resize' }}
          onMouseDown={(e) => { e.preventDefault(); updatePosition(e.clientX); setDragging(true) }}
          onTouchStart={onTouchStart}
        >
          {/* After (Render) — full width base */}
          <div className="absolute inset-0">
            <Image
              src={afterSrc}
              alt="Photorealistic 3D render"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              draggable={false}
            />
          </div>

          {/* Before (Wireframe) — clipped */}
          <div
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeSrc}
              alt="Wireframe / clay render"
              fill
              className="object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.05) brightness(0.6)' }}
              sizes="(max-width: 768px) 100vw, 80vw"
              draggable={false}
            />
            {/* Architectural grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(201,169,110,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,169,110,0.06) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute inset-y-0 z-20 pointer-events-none w-px bg-accent"
            style={{ left: `${position}%`, boxShadow: '0 0 12px rgba(201,169,110,0.4)' }}
          />

          {/* Drag handle */}
          <div
            className="absolute z-30 top-1/2 flex items-center justify-center"
            style={{
              left: `${position}%`,
              transform: 'translate(-50%, -50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #C9A96E',
              background: '#1C1C1A',
              boxShadow: dragging ? '0 0 20px rgba(201,169,110,0.5)' : '0 0 10px rgba(201,169,110,0.2)',
              cursor: 'ew-resize',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M5 1L1 5L5 9" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 1L15 5L11 9" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Labels */}
          <div className="absolute bottom-5 left-5 z-20 bg-background/80 backdrop-blur-sm px-4 py-2 pointer-events-none">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/80">{beforeLabel}</span>
          </div>
          <div className="absolute bottom-5 right-5 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 pointer-events-none">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-accent">{afterLabel}</span>
          </div>
        </div>

        {/* Caption */}
        {(caption || project) && (
          <div className="flex items-start justify-between border-t border-border/30 pt-5 mt-2">
            {caption && (
              <p className="font-sans text-xs font-light text-foreground/50 max-w-xl leading-relaxed">
                {caption}
              </p>
            )}
            {project && (
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/35 shrink-0 ml-8">
                {project}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.section>
  )
}
