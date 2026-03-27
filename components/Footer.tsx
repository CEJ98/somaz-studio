import Link from "next/link";
import { ExternalLink, Globe, Share2 } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Proyectos" },
  { href: "/about", label: "Nosotros" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
];

const serviceLinks = [
  { href: "/services#arquitectura-residencial", label: "Residencial" },
  { href: "/services#arquitectura-comercial", label: "Comercial" },
  { href: "/services#arquitectura-cultural", label: "Cultural" },
  { href: "/services#urbanismo-planeacion", label: "Urbanismo" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-heading font-semibold text-3xl tracking-[0.3em] uppercase"
            >
              SOMAZ{" "}
              <span className="font-light tracking-[0.15em] text-gold">Studio</span>
            </Link>
            <p className="mt-5 text-paper/45 font-body text-sm leading-relaxed max-w-xs">
              Diseñamos espacios que inspiran, perduran y transforman la manera
              en que vivimos. Arquitectura con propósito desde 2009.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[
                { icon: <Share2 size={14} />, label: "Instagram" },
                { icon: <Globe size={14} />, label: "LinkedIn" },
                { icon: <ExternalLink size={14} />, label: "Behance" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-paper/15 flex items-center justify-center text-paper/40 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label text-paper/25 mb-6">Navegación</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/55 font-body text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-paper/25 mb-6">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@somazstudio.mx"
                  className="text-paper/55 font-body text-sm hover:text-gold transition-colors duration-200"
                >
                  hola@somazstudio.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+525512345678"
                  className="text-paper/55 font-body text-sm hover:text-gold transition-colors duration-200"
                >
                  +52 55 1234 5678
                </a>
              </li>
              <li className="text-paper/35 font-body text-sm leading-relaxed pt-1">
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
        <div className="mt-16 pt-6 border-t border-paper/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-body text-paper/30 text-xs">
            © 2025 Somaz Studio. Todos los derechos reservados.
          </p>
          <p className="font-body text-paper/18 text-[0.65rem] italic">
            Sitio diseñado y desarrollado por Somaz Studio. El uso no autorizado del contenido está prohibido.
          </p>
        </div>
      </div>
    </footer>
  );
}
