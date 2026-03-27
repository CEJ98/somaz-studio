import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { services } from "@/lib/data";

function slugify(str: string) {
  return str.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[áàä]/g, "a").replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i").replace(/[óòö]/g, "o")
    .replace(/[úùü]/g, "u").replace(/[ñ]/g, "n");
}

export default function ServicesOverviewSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <FadeIn className="md:col-span-6">
            <p className="section-label text-muted mb-3">Lo que hacemos</p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-light text-ink">
              Nuestros Servicios
            </h2>
          </FadeIn>
          <FadeIn className="md:col-span-6 md:pt-2" delay={0.2}>
            <p className="font-body text-muted text-base md:text-lg leading-relaxed max-w-xl">
              Acompañamos a nuestros clientes desde la idea inicial hasta la
              entrega final. Cada servicio está diseñado para garantizar
              resultados excepcionales en tiempo y forma.
            </p>
          </FadeIn>
        </div>

        {/* Services list with ghost-number hover effect */}
        <div className="border-t border-border">
          {services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.08}>
              <Link
                href={`/services#${slugify(service.title)}`}
                className="group relative flex items-center justify-between py-7 md:py-8 border-b border-border hover:pl-4 transition-all duration-500 overflow-hidden"
              >
                {/* Ghost number background */}
                <span
                  aria-hidden="true"
                  className="absolute right-16 top-1/2 -translate-y-1/2 font-heading font-light text-ink leading-none select-none pointer-events-none opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
                  style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
                >
                  {service.number}
                </span>

                <div className="flex items-baseline gap-6 md:gap-10 relative z-10">
                  <span className="section-label text-gold text-[0.65rem] mt-1 shrink-0">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-light text-ink group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-muted text-sm mt-1 max-w-lg hidden md:block">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 group-hover:border-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 relative z-10">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
