import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">404</p>
      <h1
        className="font-serif font-semibold text-foreground mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        Page not found.
      </h1>
      <p className="font-sans font-light text-foreground/40 mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Let us help you find your way.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300"
        >
          Start a Project
        </Link>
      </div>
    </div>
  )
}
