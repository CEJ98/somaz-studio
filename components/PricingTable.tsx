import type { ServicePackage } from '@/data/services'
import { t as tl } from '@/lib/locale'
import Link from 'next/link'

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
            className={`flex flex-col p-7 relative group transition-all duration-300 ${
              featured
                ? 'bg-surface border border-accent/30'
                : 'bg-background border border-border/20 hover:border-accent/30'
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
              className="font-serif font-light text-accent mb-1"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
            >
              {tl(pkg.price, locale)}
            </p>

            {pkg.description && (
              <p className="font-sans font-light text-foreground/65 text-sm leading-relaxed mb-5">
                {tl(pkg.description, locale)}
              </p>
            )}

            <div className="border-t border-border/30 mb-5" />

            {pkg.features && pkg.features.length > 0 && (
              <ul className="space-y-2 mb-7 flex-1">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 font-sans text-sm text-foreground/70">
                    <span className="text-accent mt-0.5 text-xs">✦</span>
                    {tl(f, locale)}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/contact"
              className={
                featured
                  ? 'bg-accent text-background font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-3 text-center hover:bg-accent/90 transition-all duration-300'
                  : 'border border-foreground/30 text-foreground/65 font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-3 text-center hover:border-accent hover:text-accent transition-all duration-300'
              }
            >
              {locale === 'es' ? 'Comenzar' : 'Get Started'}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
