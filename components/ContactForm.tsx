"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const projectTypes = [
  "Residencial",
  "Comercial",
  "Cultural / Institucional",
  "Hotelero",
  "Urbanismo",
  "Otro",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-gold" />
        </div>
        <h3 className="font-heading text-3xl font-light text-ink mb-4">
          ¡Mensaje recibido!
        </h3>
        <p className="font-body text-muted text-base max-w-sm">
          Gracias por contactarnos. Te responderemos en un máximo de 24 horas
          hábiles para agendar una primera reunión.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="section-label text-muted block mb-2"
          >
            Nombre completo *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="section-label text-muted block mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
      </div>

      {/* Phone + Project type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="section-label text-muted block mb-2"
          >
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+52 55 1234 5678"
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="projectType"
            className="section-label text-muted block mb-2"
          >
            Tipo de proyecto
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer appearance-none"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label
          htmlFor="budget"
          className="section-label text-muted block mb-2"
        >
          Presupuesto aproximado
        </label>
        <select
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full border-b border-border bg-transparent py-3 font-body text-ink focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer appearance-none"
        >
          <option value="" disabled>
            Rango de inversión
          </option>
          <option value="menor-1m">Menor a $1,000,000 MXN</option>
          <option value="1m-5m">$1,000,000 – $5,000,000 MXN</option>
          <option value="5m-20m">$5,000,000 – $20,000,000 MXN</option>
          <option value="mayor-20m">Mayor a $20,000,000 MXN</option>
          <option value="nd">Prefiero no especificar</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="section-label text-muted block mb-2"
        >
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe brevemente tu idea, el terreno o espacio disponible, el programa que necesitas y cualquier referencia que tengas..."
          className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="animate-pulse">Enviando...</span>
            </>
          ) : (
            <>
              Enviar mensaje
              <Send size={15} />
            </>
          )}
        </button>
        <p className="mt-4 font-body text-muted text-xs">
          * Campos obligatorios. Respondemos en máximo 24 horas hábiles.
        </p>
      </div>
    </form>
  );
}
