import Link from "next/link";
import { ExternalLink, Globe, Share2 } from "lucide-react";

const footerLinks = {
  navegacion: [
    { href: "/proyectos", label: "Proyectos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ],
  servicios: [
    { href: "/servicios#residencial", label: "Residencial" },
    { href: "/servicios#comercial", label: "Comercial" },
    { href: "/servicios#cultural", label: "Cultural" },
    { href: "/servicios#urbanismo", label: "Urbanismo" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading font-semibold text-3xl tracking-[0.12em] uppercase">
              Somaz{" "}
              <span className="font-light text-gold">Studio</span>
            </Link>
            <p className="mt-4 text-paper/50 font-body text-sm leading-relaxed max-w-xs">
              Diseñamos espacios que inspiran, perduran y transforman la manera
              en que vivimos. Arquitectura con propósito.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-paper/20 flex items-center justify-center text-paper/50 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <Share2 size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-paper/20 flex items-center justify-center text-paper/50 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <Globe size={15} />
              </a>
              <a
                href="#"
                aria-label="Behance"
                className="w-10 h-10 border border-paper/20 flex items-center justify-center text-paper/50 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label text-paper/30 mb-6">Navegación</p>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/60 font-body text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-paper/30 mb-6">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@somazstudio.mx"
                  className="text-paper/60 font-body text-sm hover:text-gold transition-colors duration-200"
                >
                  hola@somazstudio.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+525512345678"
                  className="text-paper/60 font-body text-sm hover:text-gold transition-colors duration-200"
                >
                  +52 55 1234 5678
                </a>
              </li>
              <li className="text-paper/40 font-body text-sm leading-relaxed">
                Av. Presidente Masaryk 111
                <br />
                Polanco, Ciudad de México
                <br />
                CP 11560
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-paper/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-paper/30 font-body text-xs">
            © {new Date().getFullYear()} Somaz Studio. Todos los derechos
            reservados.
          </p>
          <p className="text-paper/20 font-body text-xs">
            Diseño & Desarrollo — Somaz Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
