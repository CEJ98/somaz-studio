import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function ContactCTASection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center">
        <FadeIn>
          <p className="section-label text-muted mb-6">¿Tienes un proyecto en mente?</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.95] font-light text-ink mb-10">
            Hablemos.
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="font-body text-muted text-base md:text-xl max-w-lg mx-auto leading-relaxed mb-12">
            Cada gran obra empieza con una conversación. Cuéntanos tu visión y
            la convertimos en realidad.
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary">
              Iniciar un proyecto
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:hola@somazstudio.mx"
              className="btn-outline"
            >
              hola@somazstudio.mx
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
