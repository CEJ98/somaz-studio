import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { team, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nosotros | Somaz Studio",
  description:
    "Conoce la historia, filosofía y el equipo detrás de Somaz Studio, estudio de arquitectura fundado en 2009 en Ciudad de México.",
  openGraph: {
    title: "Nosotros | Somaz Studio",
    description: "Historia, filosofía y equipo de Somaz Studio.",
    url: "https://somazstudio.com/about",
    type: "website",
  },
};

const timeline = [
  { year: "2009", event: "Fundación del estudio en la Colonia Roma, CDMX." },
  { year: "2012", event: "Primer proyecto internacional: Residencia Lago en Bogotá, Colombia." },
  { year: "2015", event: "Premio Nacional de Arquitectura por el Pabellón Tlatelolco." },
  { year: "2018", event: "Apertura de oficina en Guadalajara y expansión del equipo a 20 personas." },
  { year: "2021", event: "Reconocimiento en el World Architecture Festival, Ámsterdam." },
  { year: "2024", event: "15 años transformando el paisaje arquitectónico latinoamericano." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-36 md:pt-44 pb-0 overflow-hidden">
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-4">Nuestro Estudio</p>
            <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-light text-ink">
              Nosotros
            </h1>
          </FadeIn>
        </div>

        <div className="mt-16 relative aspect-[21/9] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a2c80?w=1920&q=85"
            alt="Somaz Studio — Equipo"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/30 to-transparent" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <FadeIn className="md:col-span-3">
              <p className="section-label text-muted">Quiénes Somos</p>
              <div className="w-8 h-[1px] bg-gold mt-4" />
            </FadeIn>
            <div className="md:col-span-9">
              <FadeIn delay={0.1}>
                <p className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.15] font-light text-ink mb-10">
                  Somaz Studio es un estudio de arquitectura de Ciudad de México
                  que diseña espacios con alma. Fundado por Carlos Somaz en
                  2009, el estudio ha crecido hasta convertirse en uno de los
                  referentes del diseño contemporáneo en Latinoamérica.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-body text-muted text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
                  Nuestro trabajo abarca arquitectura residencial, comercial,
                  cultural y urbana. En todos los casos, partimos del mismo
                  punto: entender profundamente el lugar, el programa y las
                  personas que habitarán el espacio.
                </p>
                <p className="font-body text-muted text-base md:text-lg leading-relaxed max-w-3xl">
                  Creemos en la arquitectura como acto de responsabilidad:
                  responsabilidad con el cliente, con el contexto urbano y con
                  el planeta. La sustentabilidad no es una opción; es un punto
                  de partida indispensable.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="font-heading text-[clamp(2.5rem,5vw,5rem)] leading-none font-light text-ink">
                  {stat.value}
                </p>
                <p className="section-label text-muted mt-3">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-3">Historia</p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-light text-ink mb-16">
              15 años construyendo
            </h2>
          </FadeIn>

          <div className="border-t border-border">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="grid grid-cols-12 gap-6 py-7 border-b border-border items-baseline">
                  <div className="col-span-3 md:col-span-2">
                    <span className="font-heading text-gold text-2xl md:text-3xl font-light">
                      {item.year}
                    </span>
                  </div>
                  <div className="col-span-9 md:col-span-10">
                    <p className="font-body text-ink text-base md:text-lg">
                      {item.event}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-3">El Equipo</p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-light text-ink mb-16">
              Las personas detrás
              <br />
              de cada proyecto
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-border mb-5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-heading text-2xl font-light text-ink">
                    {member.name}
                  </h3>
                  <p className="section-label text-gold mt-1 mb-3">{member.role}</p>
                  <p className="font-body text-muted text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-ink">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeIn>
            <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] text-paper font-light leading-tight">
              ¿Quieres trabajar
              <br />
              con nosotros?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact" className="btn-outline border-paper/50 text-paper hover:bg-paper hover:text-ink">
              Contáctanos
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
