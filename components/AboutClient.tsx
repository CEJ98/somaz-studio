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
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CounterStat({ value, suffix = '', label }: { value: string; suffix?: string; label: string }) {
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
      <p className="font-serif font-light text-accent" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}{suffix}
      </p>
      <p className="font-sans text-[10px] text-foreground/35 tracking-[0.25em] mt-3 uppercase">{label}</p>
    </div>
  )
}

const differentiators = [
  {
    label: 'Latin American Roots',
    description: 'Our design sensibility draws from a rich Latin American heritage — warmth, texture, and a deep understanding of how culture shapes space.',
  },
  {
    label: 'Concept to Render',
    description: 'We handle the full creative arc: from initial spatial concept through material selection, furniture layout, and photorealistic visualization.',
  },
  {
    label: 'Remote-First Studio',
    description: 'Built for a borderless world. We collaborate with clients across 8+ countries using a process that is clear, fast, and location-independent.',
  },
]

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero — philosophy quote */}
      <section className="px-6 md:px-10 pb-28 md:pb-40 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Our Story
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
            >
              <h1
                className="font-serif leading-[0.9] mb-12"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
              >
                <span className="block font-light italic text-foreground/60">Miami studio.</span>
                <span className="block font-semibold text-foreground">Global reach.</span>
              </h1>
              <p className="font-sans font-light text-foreground/55 leading-relaxed max-w-lg">
                Somaz Studio was founded in Miami with a clear purpose: bring Latin American design sensibility
                to a global market. We specialize in architectural visualization, interior design, and spatial
                concept development — working remotely with clients across the US, Latin America, and beyond.
              </p>
            </motion.div>

            <motion.div
              className="md:col-span-4 md:col-start-9 flex flex-col justify-end pb-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
            >
              <div className="architectural-line mb-8" />
              <blockquote
                className="font-serif italic text-foreground/40 leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
              >
                &ldquo;Design is not decoration — it is the language space speaks.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-6 md:px-10 py-28 md:py-40 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">Why Somaz</p>
            <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              What sets us apart.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {differentiators.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.12}>
                <div className="relative border-t border-border/40 pt-10 pb-12 md:pr-16 overflow-hidden">
                  <span
                    className="absolute -top-6 -right-4 font-serif font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
                    style={{ fontSize: '160px' }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent/60 mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-5">{item.label}</h3>
                  <p className="font-sans font-light text-foreground/50 leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 py-28 md:py-40 border-b border-border/40 bg-surface/20">
        <div className="max-w-7xl mx-auto">
          <div className="architectural-line mb-20" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: '50', suffix: '+', label: 'Projects delivered' },
              { value: '8', suffix: '+', label: 'Countries served' },
              { value: 'EN/ES', suffix: '', label: 'Bilingual team' },
              { value: '100', suffix: '%', label: 'Remote capability' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <CounterStat value={stat.value} suffix={stat.suffix} label={stat.label} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="ghost-text font-serif font-bold leading-none"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
          >
            WORK
          </span>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8">Let&apos;s build together</p>
            <h2
              className="font-serif font-light text-foreground mb-12 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Ready to start your<br />
              <span className="italic text-foreground/60">next project?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              Get in Touch
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>north_east</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
