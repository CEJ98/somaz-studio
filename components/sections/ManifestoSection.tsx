import FadeIn from "@/components/FadeIn";

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-24 md:py-36 px-6 md:px-12 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left label */}
          <div className="md:col-span-3">
            <FadeIn direction="left">
              <p className="section-label text-muted">Nuestra Filosofía</p>
              <div className="w-8 h-[1px] bg-gold mt-4" />
            </FadeIn>
          </div>

          {/* Right content */}
          <div className="md:col-span-9">
            <FadeIn delay={0.15}>
              <blockquote className="font-heading text-[clamp(2rem,4.5vw,4rem)] leading-[1.1] text-ink font-light">
                "No diseñamos edificios.
                <br />
                <em className="text-gold">Diseñamos experiencias</em> que moldean
                <br />
                la vida de las personas."
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-10 font-body text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                Desde 2009, Somaz Studio ha construido su reputación sobre un
                principio simple: cada espacio tiene el poder de transformar. No
                nos conformamos con satisfacer un programa; aspiramos a crear
                arquitectura que emocionalmente trascienda la función.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
