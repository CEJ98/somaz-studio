interface Props {
  locale: string
}

export default function ServicesComparison({ locale }: Props) {
  const isEs = locale === 'es'

  const headings = {
    title: isEs ? 'Comparativa de servicios' : 'Service comparison',
    service: isEs ? 'Servicio' : 'Service',
    includes: isEs ? 'Incluye' : 'Includes',
    turnaround: isEs ? 'Entrega' : 'Turnaround',
  }

  const rows = [
    {
      name: '3D Visualization',
      includes: isEs
        ? 'Renders fotorrealistas, 1–5 vistas, 1 ronda de revisiones'
        : 'Photorealistic renders, 1–5 views, 1 revision round',
      turnaround: isEs ? '48–72h (Essential) · 5–7 días (Standard)' : '48–72h (Essential) · 5–7 days (Standard)',
    },
    {
      name: 'Interior Design',
      includes: isEs
        ? 'Plan espacial, materiales, mobiliario, mood boards'
        : 'Space plan, materials, furniture, mood boards',
      turnaround: isEs ? '3–5 semanas' : '3–5 weeks',
    },
    {
      name: 'Conceptual Design',
      includes: isEs
        ? 'Concepto espacial, dirección de diseño, esquemas'
        : 'Spatial concept, design direction, schematics',
      turnaround: isEs ? '2–3 semanas' : '2–3 weeks',
    },
    {
      name: 'Design Consulting',
      includes: isEs
        ? 'Sesión 1:1, decisiones, materiales, dirección'
        : '1:1 session, decisions, materials, direction',
      turnaround: isEs ? 'Inmediato' : 'Immediate',
    },
  ]

  return (
    <div className="mt-20 pt-16 border-t border-border/40">
      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-10 text-center">
        {headings.title}
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden border border-border/40">
        <table className="w-full font-sans text-sm">
          <thead className="bg-surface/50 border-b border-border/40">
            <tr>
              <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-foreground/55 font-normal">{headings.service}</th>
              <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-foreground/55 font-normal">{headings.includes}</th>
              <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-foreground/55 font-normal">{headings.turnaround}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-border/30 last:border-0 hover:bg-surface/20 transition-colors">
                <td className="px-6 py-5 font-serif italic text-foreground">{row.name}</td>
                <td className="px-6 py-5 font-light text-foreground/65">{row.includes}</td>
                <td className="px-6 py-5 font-light text-foreground/65">{row.turnaround}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.name} className="border border-border/40 p-5">
            <p className="font-serif italic text-foreground text-lg mb-3">{row.name}</p>
            <div className="space-y-2 font-sans text-xs">
              <div>
                <span className="text-foreground/45 uppercase tracking-[0.2em] text-[9px] mr-2">{headings.includes}:</span>
                <span className="text-foreground/70">{row.includes}</span>
              </div>
              <div>
                <span className="text-foreground/45 uppercase tracking-[0.2em] text-[9px] mr-2">{headings.turnaround}:</span>
                <span className="text-foreground/70">{row.turnaround}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
