"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToContent = () => {
    const next = document.getElementById("manifesto");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=90"
        alt="Arquitectura Somaz Studio"
        fill
        className="object-cover object-center"
        priority
        quality={90}
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      {/* Noise texture overlay — very subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-5xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label text-gold mb-6"
          >
            Estudio de Arquitectura — Ciudad de México
          </motion.p>

          {/* Hero headline — imponente */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="font-heading text-white font-light leading-[0.88]"
            style={{ fontSize: "clamp(3.8rem, 10vw, 9.5rem)" }}
          >
            Arquitectura
            <br />
            <em className="not-italic text-gold-light">que Transforma</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="font-body text-white/65 text-base md:text-lg max-w-md leading-relaxed mt-8 mb-10"
          >
            Diseñamos espacios que inspiran, perduran y transforman
            la manera en que vivimos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/work"
              className="btn-primary bg-white text-ink border-white hover:bg-transparent hover:text-white"
            >
              Ver Proyectos
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="btn-outline border-white/50 text-white hover:bg-white hover:text-ink"
            >
              Nuestro Estudio
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          onClick={scrollToContent}
          aria-label="Scroll hacia abajo"
          className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
        >
          <span className="section-label text-[0.6rem] tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>

        {/* Project counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="absolute bottom-8 left-6 md:left-12 hidden md:block"
        >
          <p className="section-label text-white/25 text-[0.58rem] mb-1">
            Proyectos Completados
          </p>
          <p className="font-heading text-white/60 text-4xl font-light">+120</p>
        </motion.div>
      </div>
    </section>
  );
}
