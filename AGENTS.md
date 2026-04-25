# Somaz Studio

> Cliente de **Flowmatic** (monorepo operativo en `~/Documents/FlowMatic`). Este proyecto vive en producción — no mover de path.

## Identidad del cliente

- **Nombre**: Somaz Studio
- **Slug**: somaz-studio
- **Industria**: arquitectura
- **Ubicación**: Miami, US
- **Sitio**: somazstudio.com
- **Relación**: primer cliente Flowmatic

## Stack

- Next.js 16 App Router + TypeScript
- Vercel (deploy) + Supabase (DB/auth)
- Tailwind CSS + shadcn/ui
- i18n multi-idioma

## Comandos clave

- Dev: `npm run dev`
- Build: `npm run build`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`

## Convenciones

- Componentes en `components/`, páginas en `app/`.
- Variables de entorno en `.env.local` (nunca commitear).
- Imágenes optimizadas con `next/image`.
- Dominio: somazstudio.com (DNS en Hostinger → Vercel).
- Commits en español, modo imperativo.

## Reglas Flowmatic aplicadas

1. No referenciar código ni datos de otros clientes Flowmatic.
2. Deploy a prod solo a pedido — preview branches OK.
3. Nunca exponer secretos en outputs ni commits.
4. Reportes semanales en `docs/reports/` (cuando corresponda).

## Links

- Monorepo Flowmatic: `~/Documents/FlowMatic`
- Symlink en Flowmatic: `clients/somaz-studio/`
- Airtable Flowmatic Ops: tabla `Clientes` → fila `Somaz Studio`
