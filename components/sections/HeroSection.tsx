"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    const next = document.getElementById("manifesto");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=90"
        alt="Arquitectura Somaz Studio"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label text-gold mb-6"
          >
            Estudio de Arquitectura — Ciudad de México
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="font-heading text-white text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] font-light mb-8"
          >
            Arquitectura
            <br />
            <em className="font-light not-italic text-gold-light">que Transforma</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-body text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-10"
          >
            Diseñamos espacios que inspiran, perduran y transforman
            la manera en que vivimos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/proyectos" className="btn-primary bg-white text-ink border-white hover:bg-transparent hover:text-white">
              Ver Proyectos
              <ArrowRight size={16} />
            </Link>
            <Link href="/nosotros" className="btn-outline border-white/50 text-white hover:bg-white hover:text-ink">
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
          className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
        >
          <span className="section-label text-[0.6rem]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
          <p className="section-label text-white/30 text-[0.6rem] mb-1">Proyectos Completados</p>
          <p className="font-heading text-white/70 text-4xl font-light">+120</p>
        </motion.div>
      </div>
    </section>
  );
}
