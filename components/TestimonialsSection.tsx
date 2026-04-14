'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Icon } from '@/components/icons'
import { testimonials, type Testimonial } from '@/data/testimonials'
import { t } from '@/lib/locale'
import { ease } from '@/lib/motion'

export default function TestimonialsSection() {
  const locale = useLocale() as 'en' | 'es'
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  const testimonial: Testimonial = testimonials[active]

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  if (reduced) {
    return (
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <Quote testimonial={testimonial} locale={locale} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto relative">
        {/* Section label */}
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-16 text-center">
          Client Stories
        </p>

        {/* Quote */}
        <div className="relative h-[300px] md:h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0 flex flex-col justify-between"
            >
              {/* Opening quote mark */}
              <span className="font-serif text-accent/30 text-8xl leading-none -mt-6 select-none">"</span>

              {/* Text */}
              <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/85 leading-relaxed text-center px-4">
                "{t(testimonial.quote, locale)}"
              </p>

              {/* Attribution */}
              <footer className="text-center mt-4">
                <p className="font-sans text-sm font-medium text-foreground/90 tracking-wide">
                  {testimonial.name}
                </p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/45 mt-1">
                  {t(testimonial.role, locale)} — {testimonial.location}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-accent transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <Icon name="arrow_back" size={16} className="text-foreground/50" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-accent w-6' : 'bg-foreground/25 hover:bg-foreground/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-accent transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <Icon name="arrow_forward" size={16} className="text-foreground/50" />
          </button>
        </div>
      </div>
    </section>
  )
}

function Quote({ testimonial, locale }: { testimonial: Testimonial; locale: 'en' | 'es' }) {
  return (
    <blockquote className="flex flex-col justify-between h-full">
      <span className="font-serif text-accent/30 text-8xl leading-none -mt-6 select-none">"</span>
      <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/85 leading-relaxed text-center px-4">
        "{t(testimonial.quote, locale)}"
      </p>
      <footer className="text-center mt-4">
        <p className="font-sans text-sm font-medium text-foreground/90 tracking-wide">
          {testimonial.name}
        </p>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/45 mt-1">
          {t(testimonial.role, locale)} — {testimonial.location}
        </p>
      </footer>
    </blockquote>
  )
}
