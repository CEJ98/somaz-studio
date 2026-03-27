import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Somaz Studio",
  description:
    "Contáctanos para hablar sobre tu proyecto. Somaz Studio, Ciudad de México.",
  openGraph: {
    title: "Contacto | Somaz Studio",
    description: "Iniciá una conversación sobre tu próximo proyecto.",
    url: "https://somazstudio.com/contact",
    type: "website",
  },
};

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hola@somazstudio.mx",
    href: "mailto:hola@somazstudio.mx",
  },
  {
    icon: <Phone size={18} />,
    label: "Teléfono",
    value: "+52 55 1234 5678",
    href: "tel:+525512345678",
  },
  {
    icon: <MapPin size={18} />,
    label: "Dirección",
    value: "Av. Presidente Masaryk 111, Polanco, CDMX",
    href: null,
  },
  {
    icon: <Clock size={18} />,
    label: "Horario",
    value: "Lun – Vie: 9:00 – 18:00",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-12 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label text-muted mb-4">Escríbenos</p>
            <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-light text-ink">
              Contacto
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16 px-6 md:px-12 pb-28 bg-paper">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
            {/* Left: info */}
            <div className="md:col-span-4">
              <FadeIn>
                <p className="font-heading text-[clamp(1.5rem,2.5vw,2.5rem)] text-ink font-light leading-[1.2] mb-10">
                  Cada gran proyecto comienza con
                  <em className="text-gold"> una conversación.</em>
                </p>
              </FadeIn>

              <div className="space-y-7">
                {contactInfo.map((item, i) => (
                  <FadeIn key={item.label} delay={i * 0.08}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 text-gold mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="section-label text-muted mb-1">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-body text-ink hover:text-gold transition-colors duration-200 text-base"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-body text-ink text-base">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right: form — full width on mobile */}
            <div className="md:col-span-8">
              <FadeIn delay={0.1}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
