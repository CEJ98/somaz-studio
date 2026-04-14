# SomazStudio

## Stack
- Next.js 15 App Router + TypeScript
- Vercel (deploy) + Supabase (DB/auth)
- Tailwind CSS + shadcn/ui

## Comandos clave
- Dev: `npm run dev`
- Build: `npm run build`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`

## Convenciones
- Componentes en `components/`, páginas en `app/`
- Variables de entorno en `.env.local` (nunca commitear)
- Imágenes optimizadas con `next/image`
- Dominio: somazstudio.com (DNS en Hostinger → Vercel)
