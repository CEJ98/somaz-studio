'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

interface Props {
  locale: string
}

const markets = [
  'Miami',
  'New York',
  'Buenos Aires',
  'São Paulo',
  'Madrid',
  'Mexico City',
  'Bogotá',
  'Dubai',
]

export default function TrustBar({ locale }: Props) {
  const reduced = useReducedMotion()

  return (
    <section className="border-t border-border/30 px-6 md:px-10 py-10">
      <motion.div
        className="flex flex-wrap items-baseline gap-y-3 gap-x-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/50 mr-6 shrink-0">
          {locale === 'es' ? 'Presente en' : 'Trusted in'}
        </span>
        <span className="flex flex-wrap items-baseline">
          {markets.map((market, i) => (
            <span key={market} className="flex items-baseline">
              <motion.span
                className="font-sans text-[11px] tracking-[0.15em] uppercase text-foreground/60 hover:text-accent transition-colors duration-300 cursor-default"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  delay: reduced ? 0 : i * 0.05,
                }}
              >
                {market}
              </motion.span>
              {i < markets.length - 1 && (
                <span className="text-accent/30 mx-3">·</span>
              )}
            </span>
          ))}
        </span>
      </motion.div>
    </section>
  )
}
