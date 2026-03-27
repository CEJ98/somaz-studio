"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-paper/95 backdrop-blur-sm border-b border-border";

  const textColor = isHome && !scrolled ? "text-white" : "text-ink";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-heading font-semibold text-2xl tracking-[0.15em] uppercase transition-colors duration-300 ${textColor}`}
          >
            Somaz
            <span
              className={`ml-1 font-light ${
                isHome && !scrolled ? "text-gold-light" : "text-gold"
              }`}
            >
              Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`section-label transition-colors duration-300 hover:text-gold ${
                  pathname === link.href ? "text-gold" : textColor
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className={`section-label px-5 py-2.5 border transition-all duration-300 ${
                isHome && !scrolled
                  ? "border-white/60 text-white hover:bg-white hover:text-ink"
                  : "border-ink text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${textColor}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col pt-20 px-8 pb-12"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {[...navLinks, { href: "/contacto", label: "Contacto" }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="font-heading text-5xl text-paper hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <div className="mt-auto">
              <p className="section-label text-paper/40 mb-3">Contacto</p>
              <a
                href="mailto:hola@somazstudio.mx"
                className="text-paper/70 font-body text-sm hover:text-gold transition-colors"
              >
                hola@somazstudio.mx
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
