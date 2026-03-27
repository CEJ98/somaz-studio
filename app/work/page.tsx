import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos | Somaz Studio",
  description:
    "Explora el portafolio completo de Somaz Studio: arquitectura residencial, comercial, cultural y urbana en México.",
  openGraph: {
    title: "Proyectos | Somaz Studio",
    description: "Portafolio completo de proyectos de arquitectura.",
    url: "https://somazstudio.com/work",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-4">Portafolio</p>
            <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-light text-ink">
              Proyectos
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-xl">
            <p className="font-body text-muted text-base md:text-lg leading-relaxed">
              Más de 120 proyectos construidos en México y Latinoamérica. Cada
              obra, una historia de colaboración, rigor y pasión.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="h-[1px] bg-border" />

      {/* Projects Grid — masonry with alternating sizes */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">
            {projects.map((project, i) => {
              // Masonry sizing: 0→full(8cols), 1→wide(7), 2→narrow(5), 3→narrow(5), 4→wide(7), 5→full(8)
              const colSpan =
                i === 0 ? "lg:col-span-8" :
                i === 1 ? "lg:col-span-7" :
                i === 2 ? "lg:col-span-5" :
                i === 3 ? "lg:col-span-5" :
                i === 4 ? "lg:col-span-7" :
                           "lg:col-span-8";

              const aspect =
                i === 0 ? "aspect-[16/9]" :
                i === 1 ? "aspect-[4/3]" :
                i === 2 ? "aspect-[3/4]" :
                i === 3 ? "aspect-[4/5]" :
                i === 4 ? "aspect-[16/10]" :
                           "aspect-[16/8]";

              return (
                <FadeIn
                  key={project.slug}
                  delay={i * 0.07}
                  className={`md:col-span-1 ${colSpan}`}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block relative overflow-hidden bg-cream"
                  >
                    <div className={`relative overflow-hidden ${aspect}`}>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                      />
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500" />

                      {/* Year badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-ink/80 backdrop-blur-sm">
                        <span className="section-label text-paper text-[0.6rem]">{project.year}</span>
                      </div>

                      {/* Arrow button */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight size={18} className="text-ink" />
                      </div>

                      {/* Hover info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out-expo">
                        <p className="font-body text-white/80 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="section-label text-gold text-[0.6rem] mb-2">
                            {project.category} — {project.location}
                          </p>
                          <h2 className="font-heading text-2xl md:text-3xl font-light text-ink group-hover:text-gold transition-colors duration-300">
                            {project.name}
                          </h2>
                        </div>
                        <span className="font-body text-muted text-sm shrink-0 mt-1">
                          {project.area}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[0.6rem] font-body font-medium tracking-wider uppercase text-muted border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
