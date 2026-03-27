"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

// ─── To connect Formspree: ──────────────────────────────────────────────────
// 1. Create a form at https://formspree.io
// 2. Replace the value below with your endpoint
// 3. Uncomment the fetch call in handleSubmit
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
// ────────────────────────────────────────────────────────────────────────────

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

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // ── Uncomment when Formspree endpoint is configured ──
      // const res = await fetch(FORMSPREE_ENDPOINT, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Accept: "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error(`Error ${res.status}`);

      // Simulated success for now (remove when Formspree is live)
      await new Promise((r) => setTimeout(r, 1200));

      setStatus("success");
    } catch (err) {
      setErrorMsg(
        "Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbenos directamente a hola@somazstudio.mx"
      );
      setStatus("error");
    }
  };

  if (status === "success") {
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
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="section-label text-muted block mb-2">
            Nombre completo *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border/80 focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="section-label text-muted block mb-2">
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
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border/80 focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
      </div>

      {/* Phone + Project type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="section-label text-muted block mb-2">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+52 55 1234 5678"
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border/80 focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="section-label text-muted block mb-2">
            Tipo de proyecto
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="w-full border-b border-border bg-transparent py-3 font-body text-ink focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer appearance-none"
          >
            <option value="" disabled>Selecciona una opción</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="section-label text-muted block mb-2">
          Presupuesto aproximado
        </label>
        <select
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full border-b border-border bg-transparent py-3 font-body text-ink focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer appearance-none"
        >
          <option value="" disabled>Rango de inversión</option>
          <option value="menor-1m">Menor a $1,000,000 MXN</option>
          <option value="1m-5m">$1,000,000 – $5,000,000 MXN</option>
          <option value="5m-20m">$5,000,000 – $20,000,000 MXN</option>
          <option value="mayor-20m">Mayor a $20,000,000 MXN</option>
          <option value="nd">Prefiero no especificar</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="section-label text-muted block mb-2">
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe brevemente tu idea, el terreno o espacio disponible, el programa que necesitas y cualquier referencia que tengas..."
          className="w-full border-b border-border bg-transparent py-3 font-body text-ink placeholder:text-border/80 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200">
          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="font-body text-red-700 text-sm leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
              Enviando...
            </span>
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
