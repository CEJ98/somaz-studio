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
    <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">What We Do</p>
          <h1 className="font-serif font-light italic text-foreground/80" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
            Services
          </h1>
          <p className="font-sans font-light text-foreground/35 mt-6 max-w-xl leading-relaxed">
            Every project is different. These packages give you a starting point — we'll tailor the scope to your specific needs.
          </p>
        </div>

        <div className="architectural-line mb-4" />

        {/* Services list */}
        <div>
          {services.map((service) => (
            <ServiceItem key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-16 border-t border-border/40 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span className="ghost-text font-serif font-bold leading-none" style={{ fontSize: '20vw' }}>
              ?
            </span>
          </div>
          <div className="relative z-10 text-center py-8">
            <p className="font-serif italic text-foreground/50 mb-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Not sure which service fits your project?
            </p>
            <p className="font-sans font-light text-foreground/30 text-sm mb-10">
              Tell us about your vision — we'll figure it out together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              Let&apos;s Talk
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>north_east</span>
            </Link>
          </div>
        </div>
      </div>
    </PageFade>
  )
}
