'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ease } from '@/lib/motion'
import AnimatedSection from '@/components/AnimatedSection'

export default function Process() {
  const t = useTranslations('home')
  const reduced = useReducedMotion()

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
            <motion.div
              key={item.step}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.2, ease }}
              className="relative border-t border-border/40 pt-10 pb-12 md:pr-16 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700" />
              <p className="font-serif font-light text-accent/25 select-none mb-4" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}>{item.step}</p>
              <h3 className="font-serif text-3xl font-semibold text-foreground mb-5">{item.title}</h3>
              <p className="font-sans font-light text-foreground/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
