import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Somaz Studio ofrece servicios integrales de arquitectura: residencial, comercial, cultural y urbanismo en México y Latinoamérica.",
};

const processSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Escuchamos tu visión, analizamos el lugar y definimos los objetivos del proyecto con toda claridad.",
  },
  {
    step: "02",
    title: "Concepto",
    description:
      "Desarrollamos la idea generadora del proyecto, explorando múltiples posibilidades antes de decidir la dirección.",
  },
  {
    step: "03",
    title: "Diseño",
    description:
      "Refinamos el concepto en un proyecto ejecutivo completo: planos, especificaciones y presupuesto detallado.",
  },
  {
    step: "04",
    title: "Construcción",
    description:
      "Supervisamos cada etapa del proceso constructivo para garantizar que la obra refleje fielmente el diseño.",
  },
  {
    step: "05",
    title: "Entrega",
    description:
      "Acompañamos la entrega del proyecto y el inicio de vida del espacio, asegurándonos de que todo funcione a la perfección.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-4">Lo que hacemos</p>
            <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-light text-ink">
              Servicios
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-xl">
            <p className="font-body text-muted text-base md:text-lg leading-relaxed">
              Acompañamos cada proyecto desde la primera idea hasta su
              culminación. Nuestro enfoque integral garantiza coherencia,
              calidad y excelencia en cada etapa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-8 md:py-12 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          {services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.05}>
              <div
                id={service.title.toLowerCase().replace(/\s+/g, "-").replace(/[áàä]/g, "a").replace(/[éèë]/g, "e").replace(/[íìï]/g, "i").replace(/[óòö]/g, "o").replace(/[úùü]/g, "u").replace(/[ñ]/g, "n")}
                className={`py-16 md:py-20 border-b border-border ${
                  i % 2 === 1 ? "bg-cream -mx-6 md:-mx-12 px-6 md:px-12" : ""
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                  {/* Number + title */}
                  <div className="md:col-span-4">
                    <span className="section-label text-gold text-lg mb-4 block">
                      {service.number}
                    </span>
                    <h2 className="font-heading text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] font-light text-ink">
                      {service.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-5">
                    <p className="font-body text-muted text-base md:text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3">
                          <CheckCircle size={15} className="text-gold shrink-0" />
                          <span className="font-body text-ink text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-3 flex items-start md:justify-end">
                    <Link
                      href="/contacto"
                      className="btn-ghost group"
                    >
                      Solicitar info
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-ink">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-paper/30 mb-3">Cómo Trabajamos</p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] text-paper font-light mb-16">
              Nuestro Proceso
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4">
            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="py-8 md:py-0 border-b md:border-b-0 md:border-r border-paper/10 last:border-0 md:pr-6">
                  <p className="section-label text-gold mb-4">{step.step}</p>
                  <h3 className="font-heading text-xl text-paper font-light mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-paper/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Studio image */}
      <section className="relative aspect-[21/8] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85"
          alt="Somaz Studio — Proyecto"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] font-light text-ink mb-8">
              ¿Listo para empezar?
            </h2>
            <p className="font-body text-muted text-base md:text-lg max-w-md mx-auto mb-10">
              Cuéntanos sobre tu proyecto y te contactaremos para agendar una
              primera reunión sin costo.
            </p>
            <Link href="/contacto" className="btn-primary">
              Iniciar conversación
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
