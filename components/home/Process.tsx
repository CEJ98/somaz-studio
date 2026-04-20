'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ease } from '@/lib/motion'
import { pickBySlug } from '@/data/imageLibrary'
import AnimatedSection from '@/components/AnimatedSection'

const STEP_IMAGES = [
  'lifestyle-desk-01',
  'interior-detail-warm-01',
  'exterior-modern-01',
]

function StepCard({
  step,
  title,
  description,
  imageSlug,
  index,
}: {
  step: string
  title: string
  description: string
  imageSlug: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const img = pickBySlug(imageSlug)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['8%', '-8%'])

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.18, ease }}
      className="relative border-t border-border/40 pt-10 pb-12 md:pr-10 overflow-hidden group"
    >
      <div className="absolute top-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700" />

      {/* Step number ghost */}
      <p
        className="font-serif font-light text-accent/20 select-none mb-4"
        style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}
      >
        {step}
      </p>

      <h3 className="font-serif text-3xl font-semibold text-foreground mb-5">{title}</h3>
      <p className="font-sans font-light text-foreground/70 leading-relaxed mb-8">{description}</p>

      {/* Image with parallax */}
      {img && (
        <div className="relative h-48 md:h-56 overflow-hidden bg-surface">
          <motion.div className="absolute inset-0 -top-[8%] -bottom-[8%]" style={{ y: imgY }}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              className="object-cover"
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default function Process() {
  const t = useTranslations('home')

  const steps = [
    { step: '01', title: t('step01Title'), description: t('step01Desc') },
    { step: '02', title: t('step02Title'), description: t('step02Desc') },
    { step: '03', title: t('step03Title'), description: t('step03Desc') },
  ]

  return (
    <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('process')}</p>
          <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('howWeWork')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {steps.map((item, i) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              imageSlug={STEP_IMAGES[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
