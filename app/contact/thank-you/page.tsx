import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Message Sent',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Message Sent</p>
      <h1
        className="font-serif font-semibold text-foreground mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        Thank you.
      </h1>
      <p className="font-sans font-light text-foreground/40 mb-4 max-w-md leading-relaxed">
        We&apos;ve received your message and will get back to you within 24–48 hours.
      </p>
      <p className="font-sans text-sm text-foreground/25 mb-12">
        In the meantime, feel free to explore our work or reach us directly at{' '}
        <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors">
          hola@somazstudio.com
        </a>
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
        >
          View Our Work
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <a
          href="https://wa.me/17865377682"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300 group"
        >
          WhatsApp Us
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  )
}
