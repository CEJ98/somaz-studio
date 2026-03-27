import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Layers } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          <FadeIn>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              Todos los proyectos
            </Link>
            <p className="section-label text-gold mb-3">{project.category}</p>
            <h1 className="font-heading text-[clamp(3rem,7vw,7rem)] text-white font-light leading-[0.92]">
              {project.name}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Project info bar */}
      <section className="bg-ink py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <MapPin size={14} />, label: "Ubicación", value: project.location },
              { icon: <Calendar size={14} />, label: "Año", value: project.year.toString() },
              { icon: <Layers size={14} />, label: "Superficie", value: project.area },
              { icon: null, label: "Tipología", value: project.category },
            ].map((item) => (
              <div key={item.label}>
                <p className="section-label text-paper/30 mb-2 flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </p>
                <p className="font-heading text-paper text-xl font-light">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <FadeIn className="md:col-span-4">
              <p className="section-label text-muted mb-4">Descripción del Proyecto</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[0.65rem] font-body font-medium tracking-wider uppercase text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
            <FadeIn className="md:col-span-8" delay={0.15}>
              <p className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] text-ink font-light leading-[1.2] mb-8">
                {project.description}
              </p>
              <p className="font-body text-muted text-base md:text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      {project.images.length > 1 && (
        <section className="pb-20 px-6 md:px-12 bg-paper">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.name} — imagen ${i + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next / Prev Navigation */}
      <section className="border-t border-border bg-paper">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 divide-x divide-border">
          {prev ? (
            <Link href={`/proyectos/${prev.slug}`} className="group flex items-center gap-4 p-8 md:p-12 hover:bg-cream transition-colors duration-300">
              <ArrowLeft size={20} className="text-muted group-hover:text-ink group-hover:-translate-x-1 transition-all duration-300" />
              <div>
                <p className="section-label text-muted mb-2">Anterior</p>
                <p className="font-heading text-xl md:text-2xl font-light text-ink">{prev.name}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/proyectos/${next.slug}`} className="group flex items-center justify-end gap-4 p-8 md:p-12 hover:bg-cream transition-colors duration-300 text-right">
              <div>
                <p className="section-label text-muted mb-2">Siguiente</p>
                <p className="font-heading text-xl md:text-2xl font-light text-ink">{next.name}</p>
              </div>
              <ArrowRight size={20} className="text-muted group-hover:text-ink group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}
