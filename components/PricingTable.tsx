import type { ServicePackage } from '@/data/services'
import { t as tl } from '@/lib/locale'

export default function PricingTable({
  packages,
  locale,
}: {
  packages: ServicePackage[]
  locale: string
}) {
  const midIdx = Math.floor(packages.length / 2)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/20 mt-2">
      {packages.map((pkg, i) => {
        const featured = packages.length >= 3 && i === midIdx
        return (
          <div
            key={i}
            className={`flex flex-col p-6 relative ${
              featured
                ? 'bg-surface border border-accent/30'
                : 'bg-background border border-border/20'
            }`}
          >
            {featured && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-sans text-[9px] tracking-[0.3em] uppercase px-3 py-1">
                Most Popular
              </span>
            )}

            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-3">
              {tl(pkg.name, locale)}
            </p>

            <p
              className="font-serif font-light text-accent mb-4"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
            >
              {tl(pkg.price, locale)}
            </p>

            {pkg.description && (
              <p className="font-sans font-light text-foreground/65 text-sm leading-relaxed">
                {tl(pkg.description, locale)}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
