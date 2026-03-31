import type { Metadata } from 'next'
import ServiceItem from '@/components/ServiceItem'
import { services } from '@/data/services'
import Link from 'next/link'
import PageFade from '@/components/PageFade'

export const metadata: Metadata = {
  title: 'Design Services',
  description:
    'Full-service 3D visualization, interior design, conceptual design, and consulting. Clear packages, remote delivery, global reach.',
  openGraph: {
    title: 'Design Services | Somaz Studio',
    description: '3D visualization, interior design, conceptual design & consulting. Based in Miami, delivering globally.',
  },
}

export default function ServicesPage() {
  return (
    <PageFade className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">What We Do</p>
          <h1 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Services
          </h1>
          <p className="font-sans font-light text-foreground/40 text-lg mt-6 max-w-xl leading-relaxed">
            Every project is different. These packages give you a starting point — we'll tailor the scope to your specific needs.
          </p>
        </div>

        {/* Services list */}
        <div>
          {services.map((service) => (
            <ServiceItem key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-border text-center">
          <p className="font-serif text-foreground/70 text-2xl mb-8">
            Not sure which service fits your project?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300 group"
          >
            Let's Talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </PageFade>
  )
}
