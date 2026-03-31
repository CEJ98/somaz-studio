import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import PageFade from '@/components/PageFade'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Start a project with Somaz Studio. Based in Miami, available worldwide.',
  openGraph: {
    title: 'Start a Project | Somaz Studio',
    description: 'Ready to start? Reach out and tell us about your project.',
  },
}

export default function ContactPage() {
  return (
    <PageFade className="min-h-screen pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">Get in Touch</p>
          <h1 className="font-serif font-light leading-[0.9]" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
            <span className="block italic text-foreground/60">Let&apos;s talk about</span>
            <span className="block font-semibold text-foreground">your project.</span>
          </h1>
        </div>

        <div className="architectural-line mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* Left — contact info */}
          <div className="md:col-span-4">
            <div className="space-y-0">
              <div className="border-b border-border/40 pb-8 mb-8">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">Email</p>
                <a
                  href="mailto:hola@somazstudio.com"
                  className="group font-serif text-xl text-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <span className="relative inline-block">
                    hola@somazstudio.com
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-500" />
                  </span>
                </a>
              </div>

              <div className="border-b border-border/40 pb-8 mb-8">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">WhatsApp</p>
                <a
                  href="https://wa.me/17865377682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl text-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  +1 (786) 537-7682
                </a>
              </div>

              <div className="border-b border-border/40 pb-8 mb-8">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-4">Follow</p>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://instagram.com/somazstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_camera</span>
                    Instagram — @somazstudio
                  </a>
                  <a
                    href="https://linkedin.com/company/somazstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>work</span>
                    LinkedIn — Somaz Studio
                  </a>
                </div>
              </div>

              <div>
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/20 mb-3">Location</p>
                <p className="font-sans text-sm text-foreground/40 leading-relaxed">
                  Miami, FL — Global
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageFade>
  )
}
