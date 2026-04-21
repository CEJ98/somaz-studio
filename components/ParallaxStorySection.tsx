'use client'

import { useRef, ReactNode } from 'react'
import Image from 'next/image'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { pickBySlug } from '@/data/imageLibrary'

interface Props {
  imageSlug: string
  eyebrow?: string
  title: string
  body?: string
  align?: 'left' | 'right' | 'center'
  height?: string // e.g. '100vh', '120vh'
  overlay?: number // 0..1
  children?: ReactNode
}

export default function ParallaxStorySection({
  imageSlug,
  eyebrow,
  title,
  body,
  align = 'left',
  height = '100vh',
  overlay = 0.55,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const img = pickBySlug(imageSlug)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['-12%', '12%']
  )

  if (!img) return null

  const alignClass =
    align === 'right'
      ? 'items-end text-right'
      : align === 'center'
      ? 'items-center text-center'
      : 'items-start text-left'

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border/40"
      style={{ height }}
    >
      <m.div
        className="absolute inset-0 -top-[12%] -bottom-[12%]"
        style={{ y }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className="object-cover"
        />
      </m.div>

      <div
        className="absolute inset-0"
        style={{ background: `rgba(26,26,26,${overlay})` }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <div className={`flex flex-col ${alignClass} max-w-2xl ${align === 'right' ? 'ml-auto' : align === 'center' ? 'mx-auto' : ''}`}>
          {eyebrow && (
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">
              {eyebrow}
            </p>
          )}
          <h2
            className="font-serif font-light text-background leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            {title}
          </h2>
          {body && (
            <p className="font-sans font-light text-background/80 leading-relaxed text-base md:text-lg max-w-xl">
              {body}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
