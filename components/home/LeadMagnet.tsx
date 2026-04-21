'use client'

import { useState } from 'react'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import { trackLead } from '@/components/Analytics'
import { pickBySlug } from '@/data/imageLibrary'

interface Props {
  locale: string
}

export default function LeadMagnet({ locale }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const reduced = useReducedMotion()
  const sideImg = pickBySlug('interior-bedroom-warm-01')

  const isEs = locale === 'es'
  const labels = {
    badge: isEs ? 'Newsletter del Estudio' : 'Studio Newsletter',
    title: isEs ? 'Procesos, materiales y proyectos — al inbox.' : 'Process, materials, and projects — straight to your inbox.',
    desc: isEs
      ? 'Una vez al mes: un proyecto en detalle, materiales que estamos usando, y un proceso de diseño paso a paso. Sin ruido.'
      : 'Once a month: one project in depth, materials we are exploring, and a step-by-step design process. No noise.',
    placeholder: isEs ? 'tu@email.com' : 'your@email.com',
    cta: isEs ? 'Suscribirme' : 'Subscribe',
    success: isEs ? '¡Listo! Te llega el primer envío pronto.' : 'Done! First issue lands soon.',
    error: isEs ? 'Hubo un error. Probá de nuevo o escribinos a hola@somazstudio.com' : 'Something went wrong. Try again or write to hola@somazstudio.com',
    privacy: isEs ? 'Sin spam. Cancelá cuando quieras.' : 'No spam. Unsubscribe anytime.',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home-newsletter' }),
      })
      if (!res.ok) throw new Error('failed')
      trackLead({ source: 'home-newsletter' })
      toast.success(labels.success)
      setEmail('')
    } catch {
      toast.error(labels.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-t border-border/50 bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Visual side */}
        {sideImg && (
          <m.div
            className="relative h-64 md:h-auto min-h-[320px] overflow-hidden"
            initial={reduced ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
          >
            <Image
              src={sideImg.src}
              alt={sideImg.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={sideImg.blurDataURL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="absolute bottom-6 left-6">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-background/80 bg-foreground/30 backdrop-blur-sm px-3 py-1.5">
                Somaz Studio · Miami
              </span>
            </div>
          </m.div>
        )}

        {/* Form side */}
        <div className="px-8 md:px-12 py-16 md:py-20 flex flex-col justify-center">
          <m.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="mb-8"
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
              {labels.badge}
            </p>
            <h2
              className="font-serif font-light italic text-foreground/80 mb-5"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              {labels.title}
            </h2>
            <p className="font-sans font-light text-sm text-foreground/65 leading-relaxed">
              {labels.desc}
            </p>
          </m.div>

          <m.form
            onSubmit={handleSubmit}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={labels.placeholder}
                className="flex-1 bg-background border border-border/50 px-4 py-3.5 font-sans text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-accent transition-colors duration-300"
                aria-label="Email"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? '...' : labels.cta}
                {!loading && <Icon name="north_east" size={14} />}
              </button>
            </div>
            <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-foreground/35">
              {labels.privacy}
            </p>
          </m.form>
        </div>
      </div>
    </section>
  )
}
