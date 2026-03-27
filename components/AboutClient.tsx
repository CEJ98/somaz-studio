'use client'

import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CounterStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())
  const isNumeric = /^\d+$/.test(value)

  useEffect(() => {
    if (inView && isNumeric) {
      animate(count, parseInt(value), { duration: 1.5, ease: 'easeOut' })
    }
  }, [inView, value, count, isNumeric])

  return (
    <div ref={ref}>
      <p className="font-serif font-semibold text-accent" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}
      </p>
      <p className="font-sans text-sm text-foreground/40 tracking-wide mt-2 uppercase">{label}</p>
    </div>
  )
}

const differentiators = [
  {
    label: 'Bilingual',
    description:
      'We work fluently in Spanish and English, making collaboration seamless for Latin American clients.',
  },
  {
    label: 'Remote-native',
    description:
      'Our workflow is built for remote collaboration. Clear processes, fast turnaround, no location barriers.',
  },
  {
    label: 'AI-enhanced',
    description:
      'We integrate AI tools to accelerate delivery without sacrificing quality or design integrity.',
  },
]

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 md:px-10 pb-24 md:pb-32 border-b border-border">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute left-0 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden md:block" />
          <motion.p
            className="font-sans text-xs tracking-widest uppercase text-accent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="font-serif font-semibold text-foreground leading-tight mb-12"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: ease }}
          >
            Miami studio.<br />Global reach.
          </motion.h1>
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: ease }}
          >
            <p className="font-sans font-light text-foreground/60 text-lg leading-relaxed">
              Somaz Studio was founded in Miami with a clear purpose: bring Latin American design sensibility
              to a global market. We specialize in architectural visualization, interior design, and spatial
              concept development — working remotely with clients across the US, Latin America, and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Why Somaz</p>
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              What sets us apart
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {differentiators.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.12}>
                <div className="relative border-t border-border pt-8 pb-10 md:pr-12">
                  <span className="absolute top-4 right-0 font-serif text-[8rem] leading-none text-foreground/[0.03] select-none pointer-events-none font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{item.label}</h3>
                  <p className="font-sans font-light text-foreground/60 leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: '50+', label: 'Projects delivered' },
              { value: '3', label: 'Countries' },
              { value: '2', label: 'Languages' },
              { value: '100%', label: 'Remote capability' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <CounterStat value={stat.value} label={stat.label} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-serif font-semibold text-foreground mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Ready to start your project?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-10 py-5 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
            >
              Get in Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
