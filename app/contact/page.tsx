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
    <PageFade className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Get in Touch</p>
          <h1 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Let&apos;s talk about<br />your project.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — contact info */}
          <div>
            <div className="space-y-10">
              <div className="border-b border-border pb-8">
                <p className="font-sans text-xs tracking-widest uppercase text-foreground/25 mb-3">Email</p>
                <a
                  href="mailto:hola@somazstudio.com"
                  className="group font-serif text-xl text-foreground hover:text-accent transition-colors duration-300"
                >
                  <span className="relative inline-block">
                    hola@somazstudio.com
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent/40 w-0 group-hover:w-full transition-all duration-[400ms]" />
                  </span>
                </a>
              </div>

              <div className="border-b border-border pb-8">
                <p className="font-sans text-xs tracking-widest uppercase text-foreground/25 mb-3">WhatsApp</p>
                <a
                  href="https://wa.me/17865377682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors duration-300"
                >
                  +1 (786) 537-7682
                </a>
              </div>

              <div className="border-b border-border pb-8">
                <p className="font-sans text-xs tracking-widest uppercase text-foreground/25 mb-4">Follow</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://instagram.com/somazstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-2"
                  >
                    <span>Instagram</span>
                    <span className="text-foreground/25">@somazstudio</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/somazstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    LinkedIn — Somaz Studio
                  </a>
                </div>
              </div>

              <div>
                <p className="font-sans text-sm text-foreground/40 leading-relaxed">
                  Based in Miami, FL.<br />Available worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </PageFade>
  )
}
