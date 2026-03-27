import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface mt-32">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-semibold tracking-[0.12em] text-foreground mb-4">
              SOMAZ
            </p>
            <p className="font-sans text-sm text-foreground/50 leading-relaxed">
              Miami, FL — Working globally.
            </p>
            <a
              href="mailto:hola@somazstudio.com"
              className="font-sans text-xs text-foreground/40 hover:text-accent transition-colors duration-300 mt-2 inline-block"
            >
              hola@somazstudio.com
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/40 mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {[
                { href: '/work', label: 'Work' },
                { href: '/services', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/40 mb-6">
              Follow
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/somazstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
                >
                  Instagram
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/somazstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
                >
                  LinkedIn
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-foreground/30">
            © {new Date().getFullYear()} Somaz Studio LLC. Miami, FL.
          </p>
          <p className="font-sans text-xs text-foreground/20 italic max-w-md leading-relaxed">
            Somaz Studio provides design and visualization services. We are not a licensed architecture firm.
          </p>
        </div>
      </div>
    </footer>
  )
}
