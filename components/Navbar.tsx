"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Proyectos" },
  { href: "/about", label: "Nosotros" },
  { href: "/services", label: "Servicios" },
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-paper/95 backdrop-blur-sm border-b border-border";

  const textColor = isHome && !scrolled ? "text-white" : "text-ink";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-heading font-semibold text-2xl tracking-[0.3em] uppercase transition-colors duration-300 ${textColor}`}
          >
            SOMAZ
            <span
              className={`ml-2 font-light tracking-[0.15em] ${
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
                className={`section-label transition-colors duration-300 hover:text-gold relative ${
                  isActive(link.href)
                    ? "text-gold"
                    : textColor
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
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
            className={`md:hidden p-2 transition-colors duration-300 z-[60] relative ${
              menuOpen ? "text-paper" : textColor
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col pt-24 px-8 pb-12"
          >
            <nav className="flex flex-col gap-2 mt-4">
              {[...navLinks, { href: "/contact", label: "Contacto" }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-heading text-[clamp(2.5rem,10vw,4.5rem)] leading-tight transition-colors duration-200 py-2 ${
                        isActive(link.href)
                          ? "text-gold"
                          : "text-paper hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-auto border-t border-paper/10 pt-8"
            >
              <p className="section-label text-paper/30 mb-3">Contacto directo</p>
              <a
                href="mailto:hola@somazstudio.mx"
                className="text-paper/60 font-body text-sm hover:text-gold transition-colors"
              >
                hola@somazstudio.mx
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
