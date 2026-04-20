'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ease } from '@/lib/motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import TestimonialsSection from '@/components/TestimonialsSection'

export default function SocialProof() {
  const t = useTranslations('home')
  const reduced = useReducedMotion()

  const stats = [
    { value: 50, suffix: '+', label: t('statsProjects'), hint: t('statsProjectsHint') },
    { value: 8,  suffix: '+', label: t('statsCountries'), hint: 'AR · US · MX · CO · PE · UY · ES · UAE' },
    { value: 24, suffix: 'h', label: t('statsResponse'), hint: t('statsResponseHint') },
  ]

  return (
    <>
      <section className="border-t border-border/50">
        <div className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-px bg-border/30">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className="bg-background px-8 py-12 text-center"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-foreground/60">{stat.label}</p>
                  <p className="font-sans text-[9px] tracking-[0.15em] text-foreground/30 mt-2 hidden md:block">{stat.hint}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
    </>
  )
}
