'use client'

import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { t as tl } from '@/lib/locale'

interface Props {
  locale: string
}

const faqs = [
  {
    q: {
      en: 'How long does a photorealistic render take?',
      es: '¿Cuánto tarda un render fotorrealista?',
    },
    a: {
      en: 'Standard delivery is 48–72 hours for a single view. Complex projects or 3+ views typically take 5–7 business days. Rush delivery (24h) is available for Essential packages.',
      es: 'La entrega estándar es de 48–72 horas para una sola vista. Proyectos complejos o 3+ vistas suelen tomar 5–7 días hábiles. Entrega urgente (24h) disponible para el paquete Esencial.',
    },
  },
  {
    q: {
      en: 'Do you work with projects outside Miami?',
      es: '¿Trabajan con proyectos fuera de Miami?',
    },
    a: {
      en: 'Yes — we work globally. All we need are your blueprints, reference images, and a 30-minute briefing call. We have completed projects across 8+ countries.',
      es: 'Sí — trabajamos globalmente. Solo necesitamos tus planos, imágenes de referencia y una llamada de briefing de 30 minutos. Hemos completado proyectos en más de 8 países.',
    },
  },
  {
    q: {
      en: 'What do I need to get started?',
      es: '¿Qué necesito para empezar?',
    },
    a: {
      en: 'A floor plan or sketch, reference images for style direction, and a brief description of the space. That is enough to begin. We handle the rest in the briefing call.',
      es: 'Un plano o boceto, imágenes de referencia para la dirección de estilo y una breve descripción del espacio. Con eso es suficiente para comenzar. Manejamos el resto en la llamada de briefing.',
    },
  },
  {
    q: {
      en: 'What is the revision process?',
      es: '¿Cuál es el proceso de revisiones?',
    },
    a: {
      en: 'Every project includes 2 rounds of revisions. Additional revisions are billed at our hourly rate. We use a structured feedback form to make revisions fast and precise.',
      es: 'Cada proyecto incluye 2 rondas de revisiones. Las revisiones adicionales se cobran a nuestra tarifa por hora. Usamos un formulario de feedback estructurado para hacer las revisiones rápidas y precisas.',
    },
  },
  {
    q: {
      en: 'Do you offer full interior design or only visualization?',
      es: '¿Ofrecen diseño de interiores completo o solo visualización?',
    },
    a: {
      en: 'Both. Our 3D Visualization service focuses on rendering existing plans. Our Interior Design service includes space planning, material selection, furniture layouts, and mood boards — delivered remotely.',
      es: 'Ambos. Nuestro servicio de Visualización 3D se enfoca en renderizar planos existentes. Nuestro servicio de Diseño de Interiores incluye planificación espacial, selección de materiales, distribución de mobiliario y mood boards — entregado de forma remota.',
    },
  },
  {
    q: {
      en: 'How is a project scoped and quoted?',
      es: '¿Cómo se cotiza un proyecto?',
    },
    a: {
      en: 'Every project is quoted after a short briefing call. Scope depends on number of views, complexity of the space, and delivery timeline. You receive a detailed estimate within 24h — no hidden fees, no surprises.',
      es: 'Cada proyecto se cotiza después de una breve llamada de briefing. El alcance depende de la cantidad de vistas, complejidad del espacio y tiempo de entrega. Recibís una cotización detallada en 24h — sin costos ocultos.',
    },
  },
]

export default function FAQSection({ locale }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduced = useReducedMotion()

  const labelText = locale === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'
  const headingText = locale === 'es' ? 'Respondemos tus dudas.' : 'We answer your questions.'
  const ctaText = locale === 'es' ? '¿Más preguntas? Hablemos.' : 'Still have questions? Let\'s talk.'

  return (
    <section className="border-t border-border/50">
      <div className="px-6 md:px-10 py-28 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* Left — header */}
          <div className="lg:col-span-1">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
              {labelText}
            </p>
            <h2
              className="font-serif font-light italic text-foreground/70 mb-12"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
            >
              {headingText}
            </h2>
            <Link
              href="/contact"
              className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-300"
            >
              {ctaText}
            </Link>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border/30">
                <button
                  id={`faq-btn-${i}`}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-serif text-xl text-foreground/85">
                    {tl(faq.q, locale)}
                  </span>
                  <m.span
                    className="text-accent text-2xl leading-none shrink-0"
                    aria-hidden="true"
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    +
                  </m.span>
                </button>
                <m.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === i ? 'auto' : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="font-sans font-light text-foreground/65 leading-relaxed text-sm pb-6">
                    {tl(faq.a, locale)}
                  </p>
                </m.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
