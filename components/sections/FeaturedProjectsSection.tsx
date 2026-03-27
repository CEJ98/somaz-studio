import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { featuredProjects } from "@/lib/data";

export default function FeaturedProjectsSection() {
  const [main, ...rest] = featuredProjects;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="section-label text-muted mb-3">Proyectos Destacados</p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] text-ink font-light">
              Nuestro Trabajo
            </h2>
          </FadeIn>
          <FadeIn direction="right" className="hidden md:block">
            <Link href="/work" className="btn-ghost group">
              Ver todos
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Main large project */}
          {main && (
            <FadeIn className="md:col-span-7" delay={0.1}>
              <Link href={`/work/${main.slug}`} className="group block relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[560px]">
                <Image
                  src={main.image}
                  alt={main.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />

                <div className="absolute top-5 right-5 w-10 h-10 bg-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={18} className="text-ink" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="section-label text-gold mb-2">{main.category} — {main.location}</p>
                  <h3 className="font-heading text-white text-3xl md:text-4xl font-light">
                    {main.name}
                  </h3>
                  <p className="text-white/60 font-body text-sm mt-2 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {main.description}
                  </p>
                </div>
              </Link>
            </FadeIn>
          )}

          {/* Secondary projects */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            {rest.map((project, i) => (
              <FadeIn key={project.slug} delay={0.15 + i * 0.1}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block relative overflow-hidden aspect-video md:flex-1"
                  style={{ height: "calc((560px - 24px) / 2)" }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />

                  <div className="absolute top-4 right-4 w-9 h-9 bg-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-ink" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <p className="section-label text-gold mb-1 text-[0.65rem]">
                      {project.category} — {project.location}
                    </p>
                    <h3 className="font-heading text-white text-xl md:text-2xl font-light">
                      {project.name}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <Link href="/work" className="btn-ghost">
            Ver todos los proyectos
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
