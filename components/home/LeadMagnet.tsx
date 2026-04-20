'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'

interface Props {
  locale: string
}

export default function LeadMagnet({ locale }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const reduced = useReducedMotion()

  const isEs = locale === 'es'
  const labels = {
    badge: isEs ? 'Recurso Gratuito' : 'Free Resource',
    title: isEs ? 'Brief Template para tu próximo proyecto.' : 'Brief template for your next project.',
    desc: isEs
      ? 'PDF editable de 6 páginas con todo lo que necesitamos para empezar — planos, referencias, paleta, timeline. Te lo enviamos al instante.'
      : '6-page editable PDF with everything we need to start — plans, references, palette, timeline. Sent to your inbox instantly.',
    placeholder: isEs ? 'tu@email.com' : 'your@email.com',
    cta: isEs ? 'Enviar PDF' : 'Send PDF',
    success: isEs ? '¡Listo! Revisá tu inbox en los próximos minutos.' : 'Done! Check your inbox in the next few minutes.',
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
        body: JSON.stringify({ email, source: 'lead-magnet-brief-template' }),
      })
      if (!res.ok) throw new Error('failed')
      toast.success(labels.success)
      setEmail('')
    } catch {
      toast.error(labels.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-t border-border/50 px-6 md:px-10 py-24 md:py-32 bg-surface/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
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
        </motion.div>

        <motion.form
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
        </motion.form>
      </div>
    </section>
  )
}
