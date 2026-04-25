# Somaz Studio

Sitio web y portfolio de [Somaz Studio](https://somazstudio.com) — estudio de visualización 3D, diseño de interiores y diseño conceptual con base en Miami, FL.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 3.4
- **Animaciones**: Framer Motion
- **i18n**: next-intl (inglés / español)
- **Base de datos**: Supabase (PostgreSQL)
- **Email**: Resend
- **Rate limiting**: Upstash Redis
- **Deploy**: Vercel

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Crear `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Tests

```bash
pnpm test          # Ejecutar una vez
pnpm test:watch    # Watch mode
```

## Estructura

```
app/
  [locale]/        # Rutas con i18n (en/es)
    about/
    blog/[slug]/
    contact/
    privacy/
    services/
    terms/
    work/[slug]/
  api/
    contact/       # POST — formulario de contacto
    newsletter/    # POST — suscripción a newsletter
components/        # Componentes React
data/              # Datos estáticos (proyectos, posts, servicios, equipo)
i18n/              # Configuración de internacionalización
lib/               # Utilidades (supabase, resend, rate-limit, locale)
messages/          # Traducciones en.json / es.json
public/            # Assets estáticos (imágenes de proyectos, logos)
```

## Scripts

| Comando | Descripción |
|---------|------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | ESLint |
| `pnpm test` | Tests con Vitest |
| `pnpm test:ci` | Lint + tests unitarios (pipeline rápido) |
| `pnpm test:e2e` | E2E con Playwright |
| `pnpm test:e2e:ci` | Instala Chromium + corre E2E (para CI) |

## CI

Se agregó workflow en `.github/workflows/ci.yml` con dos jobs:

1. `lint-and-unit` → instala dependencias, corre `pnpm lint` y `pnpm test`.
2. `e2e` → instala Playwright Chromium (`pnpm exec playwright install --with-deps chromium`) y corre `pnpm test:e2e`.

Además, se agregó `.github/workflows/lighthouse.yml` para correr Lighthouse CI en PRs usando `.lighthouserc.json` sobre rutas clave:

- `/en`
- `/en/services`
- `/en/contact`
