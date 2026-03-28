"use client";

import { useState } from "react";
import { Plus, Minus, CheckCircle } from "lucide-react";
import { Service } from "@/lib/data";

interface Props {
  services: Service[];
}

export default function ServicesAccordion({ services }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-border">
      {services.map((service) => {
        const isOpen = open === service.number;
        return (
          <div key={service.number} className="border-b border-border">
            <button
              onClick={() => setOpen(isOpen ? null : service.number)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <div className="flex items-baseline gap-4">
                <span className="section-label text-gold text-[0.65rem]">{service.number}</span>
                <span className="font-heading text-2xl font-light text-ink">{service.title}</span>
              </div>
              <span className="text-gold ml-4 shrink-0">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            {isOpen && (
              <div className="pb-6">
                <p className="font-body text-muted text-base leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-gold shrink-0" />
                      <span className="font-body text-ink text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
