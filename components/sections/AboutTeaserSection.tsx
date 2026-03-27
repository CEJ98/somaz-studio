import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function AboutTeaserSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <FadeIn direction="left" className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a2c80?w=900&q=85"
              alt="Equipo Somaz Studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gold accent frame */}
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-gold pointer-events-none z-10" />
          </FadeIn>

          {/* Content */}
          <div>
            <FadeIn direction="right">
              <p className="section-label text-muted mb-4">Sobre Nosotros</p>
              <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] font-light text-ink mb-8">
                Un estudio fundado
                <br />
                sobre <em className="text-gold">la pasión</em>
                <br />
                por el espacio
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <p className="font-body text-muted text-base leading-relaxed mb-6">
                Desde 2009, Somaz Studio opera desde la Ciudad de México con un
                equipo interdisciplinario de arquitectos, diseñadores e
                ingenieros que compartimos una convicción: la arquitectura es el
                arte más cotidiano del mundo.
              </p>
              <p className="font-body text-muted text-base leading-relaxed mb-10">
                Cada proyecto nace de un proceso de escucha profunda —del
                cliente, del terreno, del programa y del contexto— para generar
                respuestas genuinas y duraderas.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.25}>
              <Link href="/nosotros" className="btn-ghost group">
                Conoce al equipo
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
