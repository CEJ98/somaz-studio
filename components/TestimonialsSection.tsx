'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { testimonials, type Testimonial } from '@/data/testimonials'
import { t } from '@/lib/locale'
import { ease } from '@/lib/motion'

export default function TestimonialsSection() {
  const locale = useLocale() as 'en' | 'es'
  const tp = useTranslations('project')
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  const testimonial: Testimonial = testimonials[active]

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  if (reduced) {
    return (
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <Quote testimonial={testimonial} locale={locale} viewProjectLabel={tp('viewProject')} />
        </div>
      </section>
    )
  }

  const quoteText = t(testimonial.quote, locale)
  const words = quoteText.split(' ')

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto relative">
        {/* Section label */}
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-16 text-center">
          Client Stories
        </p>

        {/* Quote */}
        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-col items-center"
            >
              {/* Opening quote mark */}
              <motion.span
                className="font-serif text-accent/30 text-8xl leading-none -mt-6 mb-2 select-none self-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                &ldquo;
              </motion.span>

              {/* Word-by-word reveal */}
              <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/85 leading-relaxed text-center px-4 flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
                {words.map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    custom={i}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.035,
                      duration: 0.45,
                      ease,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              {/* Attribution */}
              <motion.footer
                className="text-center mt-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: words.length * 0.035 + 0.1, duration: 0.4, ease }}
              >
                <p className="font-sans text-sm font-medium text-foreground/90 tracking-wide">
                  {testimonial.name}
                </p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 mt-1">
                  {t(testimonial.role, locale)} — {testimonial.location}
                </p>
                {testimonial.projectSlug && (
                  <Link
                    href={`/work/${testimonial.projectSlug}`}
                    className="inline-flex items-center gap-1.5 mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-accent/80 hover:text-accent transition-colors duration-300"
                  >
                    {tp('viewProject')}
                    <Icon name="north_east" size={10} />
                  </Link>
                )}
              </motion.footer>
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
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={i === active
                  ? { scaleY: 1.4, backgroundColor: 'var(--color-accent)' }
                  : { scaleY: 1, backgroundColor: 'rgba(26,26,26,0.25)' }
                }
                transition={{ duration: 0.25, ease }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6' : 'w-1.5 hover:bg-foreground/50'
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

function Quote({ testimonial, locale, viewProjectLabel }: { testimonial: Testimonial; locale: 'en' | 'es'; viewProjectLabel: string }) {
  return (
    <blockquote className="flex flex-col justify-between">
      <span className="font-serif text-accent/30 text-8xl leading-none -mt-6 select-none">&ldquo;</span>
      <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/85 leading-relaxed text-center px-4">
        &ldquo;{t(testimonial.quote, locale)}&rdquo;
      </p>
      <footer className="text-center mt-4">
        <p className="font-sans text-sm font-medium text-foreground/90 tracking-wide">
          {testimonial.name}
        </p>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 mt-1">
          {t(testimonial.role, locale)} — {testimonial.location}
        </p>
        {testimonial.projectSlug && (
          <Link
            href={`/work/${testimonial.projectSlug}`}
            className="inline-flex items-center gap-1.5 mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-accent/80 hover:text-accent transition-colors duration-300"
          >
            {viewProjectLabel}
            <Icon name="north_east" size={10} />
          </Link>
        )}
      </footer>
    </blockquote>
  )
}
