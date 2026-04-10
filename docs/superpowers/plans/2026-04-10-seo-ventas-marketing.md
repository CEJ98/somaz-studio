# Somaz Studio — SEO, Ventas y Marketing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir todos los bugs técnicos existentes y maximizar SEO, conversión y marketing del sitio somazstudio.com.

**Architecture:** Next.js 15 App Router con next-intl i18n (en/es). Server Components para metadata y JSON-LD. Client Components solo donde hay interactividad. Datos estáticos en `/data/`. Deploy en Vercel.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, next-intl v4, Supabase, Resend, Upstash Redis, Vercel Analytics + Speed Insights, GA4, Meta Pixel.

---

## Bugs identificados

| # | Archivo | Problema |
|---|---------|----------|
| 1 | `package.json` | `"next": "^16.2.2"` — Next.js 16 no existe; debería ser `^15.2.2`. Ídem `eslint-config-next`. |
| 2 | `components/HomePageClient.tsx` L22-41 | JSON-LD `LocalBusiness` duplicado e incompleto (le falta rating, phone, geo). El completo ya está en `app/[locale]/page.tsx`. |
| 3 | `app/[locale]/about/page.tsx` L39-43 | `BreadcrumbList` usa URLs sin locale (`/about` en lugar de `/${locale}/about`). |
| 4 | `app/[locale]/blog/[slug]/page.tsx` L69 | `BlogPosting.author` es `Organization` — debe ser `Person` (Sofía Mazzucco) para E-E-A-T. |
| 5 | `app/sitemap.ts` L20-30 | Rutas estáticas usan `new Date()` como `lastModified` — causa re-crawling innecesario en cada build. |

## Mejoras SEO

| # | Archivo | Mejora |
|---|---------|--------|
| 6 | `app/[locale]/about/page.tsx` | Agregar `Person` schema para Sofía Mazzucco (E-E-A-T crítico para servicios de alto valor). |
| 7 | `app/sitemap.ts` | Blog con `changeFrequency: 'monthly'` (no `'yearly'`). Fechas de última modificación reales. |
| 8 | `app/[locale]/page.tsx` | Ampliar keywords con long-tail Miami + Latin America. |

## Mejoras Performance

| # | Archivo | Mejora |
|---|---------|--------|
| 9 | `next.config.mjs` | Agregar cache headers para `/media/` y `/blog/` (actualmente solo `/projects/` y `/logos/` tienen cache). |
| 10 | `next.config.mjs` | Agregar `experimental.optimizePackageImports: ['framer-motion']` para reducir bundle size. |

## Mejoras Conversión/Marketing

| # | Archivo | Mejora |
|---|---------|--------|
| 11 | `components/ContactForm.tsx` | Agregar honeypot field anti-spam. |
| 12 | `components/ThankYouContent.tsx` | Agregar sección "Qué esperar" con timeline de 3 pasos post-envío. |

---

## Task 1: Corregir versión de Next.js en package.json

**Files:**
- Modify: `package.json`

**Contexto:** `package.json` declara `"next": "^16.2.2"` y `"eslint-config-next": "^16.2.2"`. Next.js 16 no existe públicamente. npm resolverá esto al latest disponible, pero la declaración es incorrecta y puede causar confusión o errores en pipelines de CI estrictos.

- [ ] **Step 1: Corregir versiones**

En `package.json`, cambiar:
```json
"dependencies": {
  "next": "^15.2.2",
```
```json
"devDependencies": {
  "eslint-config-next": "^15.2.2",
```

- [ ] **Step 2: Verificar que el build sigue funcionando**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio
npm run build 2>&1 | tail -20
```
Expected: BUILD sin errores. Si falla por incompatibilidad de versión real, restaurar la versión anterior y documentar.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "fix: corregir versión de next en package.json (^16 → ^15)"
```

---

## Task 2: Eliminar JSON-LD duplicado de HomePageClient

**Files:**
- Modify: `components/HomePageClient.tsx`

**Contexto:** `HomePageClient.tsx` líneas 22-41 contiene un JSON-LD `LocalBusiness` simplificado (sin rating, sin teléfono, sin geo). El JSON-LD completo y correcto ya existe en `app/[locale]/page.tsx` (Server Component). Tener dos scripts `ld+json` con el mismo tipo en la misma página confunde a Google. El del client component es redundante e inferior.

- [ ] **Step 1: Eliminar el bloque JSON-LD del client component**

En `components/HomePageClient.tsx`, eliminar las líneas 22-41 completas:

```tsx
// ELIMINAR todo este bloque (líneas 22-41):
// Static JSON-LD — no user input, safe for dangerouslySetInnerHTML
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Somaz Studio',
  ...
})
```

También eliminar el script que lo renderiza dentro del return (buscar `dangerouslySetInnerHTML={{ __html: jsonLd }}`):
```tsx
// ELIMINAR estas líneas del return:
{/* JSON-LD structured data — static object, no user input */}
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: jsonLd }}
/>
```

- [ ] **Step 2: Verificar que no hay errores TypeScript**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio
npx tsc --noEmit 2>&1 | head -30
```
Expected: Sin errores relacionados a `jsonLd` en `HomePageClient.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/HomePageClient.tsx
git commit -m "fix: eliminar JSON-LD LocalBusiness duplicado de HomePageClient (ya existe en page.tsx)"
```

---

## Task 3: Corregir URLs del BreadcrumbList en About page

**Files:**
- Modify: `app/[locale]/about/page.tsx`

**Contexto:** El `BreadcrumbList` en about/page.tsx tiene URLs sin locale (`https://somazstudio.com/about`). Pero el sitio siempre sirve contenido bajo `/en/` o `/es/`. Google verá una URL de breadcrumb que redirige (o da 404), lo que penaliza la señal del structured data.

- [ ] **Step 1: Hacer la función async para acceder al locale**

Reemplazar la firma de `AboutPage`:

```tsx
// ANTES:
export default function AboutPage() {
  const jsonLd = JSON.stringify([

// DESPUÉS:
export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const jsonLd = JSON.stringify([
```

- [ ] **Step 2: Corregir URLs del BreadcrumbList**

```tsx
// ANTES:
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://somazstudio.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://somazstudio.com/about' },
  ],
},

// DESPUÉS:
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `https://somazstudio.com/${locale}` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `https://somazstudio.com/${locale}/about` },
  ],
},
```

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "about"
```
Expected: Sin errores en `about/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/about/page.tsx"
git commit -m "fix: corregir URLs de BreadcrumbList en about page (agregar locale)"
```

---

## Task 4: Corregir BlogPosting author — Person en lugar de Organization

**Files:**
- Modify: `app/[locale]/blog/[slug]/page.tsx`

**Contexto:** Google evalúa E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) para content sites. Un `BlogPosting` firmado por una `Person` con nombre real y URL de perfil recibe mejor señal que uno firmado por una `Organization`. Sofía Mazzucco es la autora real de todos los posts.

- [ ] **Step 1: Reemplazar el author en el JSON-LD del BlogPosting**

En `app/[locale]/blog/[slug]/page.tsx`, en el objeto `BlogPosting`:

```tsx
// ANTES (línea ~69):
author: { '@type': 'Organization', name: 'Somaz Studio', url: 'https://somazstudio.com' },

// DESPUÉS:
author: {
  '@type': 'Person',
  name: 'Sofía Mazzucco',
  url: 'https://somazstudio.com/en/about',
  jobTitle: 'Architect & Interior Designer',
  worksFor: { '@type': 'Organization', name: 'Somaz Studio', url: 'https://somazstudio.com' },
},
```

- [ ] **Step 2: Verificar que el JSON es válido con TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "blog"
```
Expected: Sin errores.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/blog/[slug]/page.tsx"
git commit -m "fix: BlogPosting author como Person (Sofía Mazzucco) para E-E-A-T"
```

---

## Task 5: Corregir lastModified y changeFrequency en sitemap

**Files:**
- Modify: `app/sitemap.ts`

**Contexto:** Las rutas estáticas usan `new Date()` como `lastModified`, lo que significa que en cada build reportan una fecha diferente y Googlebot re-crawlea todo innecesariamente. Los posts de blog tienen `changeFrequency: 'yearly'` cuando el contenido se actualiza mensualmente.

- [ ] **Step 1: Reemplazar sitemap.ts completo**

```tsx
import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { posts } from '@/data/posts'
import { locales } from '@/i18n/config'

// Fecha de última modificación real del sitio
const SITE_LAST_UPDATED = new Date('2025-04-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://somazstudio.com'

  const staticPaths = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1, lastMod: SITE_LAST_UPDATED },
    { path: '/work', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: SITE_LAST_UPDATED },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: SITE_LAST_UPDATED },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.7, lastMod: new Date('2024-06-01') },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8, lastMod: new Date('2024-06-01') },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: new Date('2024-01-01') },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: new Date('2024-01-01') },
    { path: '/blog', changeFrequency: 'monthly' as const, priority: 0.7, lastMod: SITE_LAST_UPDATED },
  ]

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority, lastMod }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: lastMod,
      changeFrequency,
      priority,
    }))
  )

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/work/${p.slug}`,
      lastModified: new Date(p.year, 0, 1),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  )

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((p) => ({
      url: `${base}/${locale}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "sitemap"
```
Expected: Sin errores.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "fix: sitemap con fechas reales y changeFrequency correctas para blog"
```

---

## Task 6: Agregar Person schema para Sofía Mazzucco en About page

**Files:**
- Modify: `app/[locale]/about/page.tsx`

**Contexto:** Google E-E-A-T requiere que el contenido demuestre experiencia real de personas reales. Un `Person` schema con nombre, título profesional, foto, redes sociales y lugar de trabajo es crítico para servicios de alto valor como diseño de interiores. Esto mejora el ranking para keywords de autoridad ("best interior designer Miami", etc.)

- [ ] **Step 1: Agregar Person schema al array de JSON-LD**

En `app/[locale]/about/page.tsx`, dentro del `JSON.stringify([...])`, agregar como tercer elemento:

```tsx
{
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sofía Mazzucco',
  jobTitle: 'Architect & Interior Designer',
  description: 'Argentine architect and interior designer based in Miami, FL. Founder of Somaz Studio. Specializing in 3D visualization, interior design, and spatial conceptualization with projects across the US and Latin America.',
  url: `https://somazstudio.com/${locale}/about`,
  image: 'https://somazstudio.com/about/sofia-mazzucco.jpg',
  email: 'hola@somazstudio.com',
  telephone: '+17865377682',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Architecture School',
  },
  sameAs: [
    'https://instagram.com/somazstudio',
    'https://linkedin.com/company/somazstudio',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Somaz Studio',
    url: 'https://somazstudio.com',
  },
  foundingDate: '2022',
},
```

**Nota:** Si no existe la imagen `/about/sofia-mazzucco.jpg`, usar la OG image del about: `/about/og.jpg` o cualquier imagen real de Sofía disponible en `/public/`. Verificar qué imagen existe con `ls /Users/jorgecostilla/Documents/SomazStudio/public/about/`.

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "about"
```

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/about/page.tsx"
git commit -m "feat: agregar Person schema para Sofía Mazzucco (E-E-A-T SEO)"
```

---

## Task 7: Cache headers para assets de media y blog en next.config.mjs

**Files:**
- Modify: `next.config.mjs`

**Contexto:** Actualmente solo `/projects/` y `/logos/` tienen cache headers. Las imágenes de blog (`/blog/`) y los media del hero (`/media/`) — incluyendo videos — no tienen cache agresivo. Esto aumenta TTFB en revisitas y penaliza Core Web Vitals (LCP especialmente).

- [ ] **Step 1: Agregar los dos bloques de cache faltantes en next.config.mjs**

En `next.config.mjs`, dentro del array que retorna `headers()`, agregar después del bloque de `/logos/`:

```js
{
  source: '/media/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
  ],
},
{
  source: '/blog/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
  ],
},
{
  source: '/about/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
  ],
},
{
  source: '/services/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
  ],
},
```

**Explicación:** `/media/` y `/about/` y `/services/` son assets estáticos que no cambian → `immutable`. `/blog/` son imágenes de posts que podrían actualizarse → `stale-while-revalidate` (30 días de cache, revalidar en background).

- [ ] **Step 2: Verificar que el build no falla**

```bash
npm run build 2>&1 | grep -E "error|Error|warn" | head -20
```
Expected: Sin errores nuevos.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "perf: agregar cache headers para /media/, /blog/, /about/, /services/"
```

---

## Task 8: Optimizar bundle de Framer Motion

**Files:**
- Modify: `next.config.mjs`

**Contexto:** Framer Motion es la librería más pesada del proyecto. `optimizePackageImports` permite al bundler de Next.js hacer tree-shaking más agresivo, reduciendo el JS bundle del client.

- [ ] **Step 1: Agregar optimizePackageImports en next.config.mjs**

En `next.config.mjs`, dentro del objeto `nextConfig`, agregar antes del `images`:

```js
experimental: {
  optimizePackageImports: ['framer-motion'],
},
```

El `nextConfig` completo queda así:
```js
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // ... el resto igual
  },
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | grep -E "Route|chunk|error" | head -30
```
Expected: Build exitoso. Los chunks de JS deberían ser iguales o menores.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "perf: optimizePackageImports para framer-motion"
```

---

## Task 9: Honeypot anti-spam en ContactForm

**Files:**
- Modify: `components/ContactForm.tsx`
- Modify: `app/api/contact/route.ts`

**Contexto:** El formulario de contacto no tiene protección básica contra bots más allá del rate limiting de Upstash. Un honeypot es un campo invisible para humanos pero visible para bots — si viene relleno, es spam con 99% de certeza.

- [ ] **Step 1: Agregar campo honeypot en ContactForm.tsx**

En `components/ContactForm.tsx`, dentro del `<form>`, agregar el campo honeypot **como primer hijo** (antes de los otros campos, para que sea difícil de ignorar por bots):

```tsx
{/* Honeypot anti-spam: invisible para humanos, atractivo para bots */}
<div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, tabIndex: -1 }}>
  <input
    type="text"
    name="website"
    autoComplete="off"
    tabIndex={-1}
    aria-label="Do not fill this field"
  />
</div>
```

- [ ] **Step 2: Verificar el honeypot en el API route**

Leer `app/api/contact/route.ts` para ver cómo procesa el payload:

```bash
cat "app/api/contact/route.ts"
```

En el handler del API, agregar la verificación del honeypot al inicio, antes de cualquier procesamiento:

```ts
// Al inicio del handler, después de parsear el body:
if (body.website) {
  // Campo honeypot relleno — es un bot
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
```

**Nota:** Responder 200 (no 400) para no dar pistas al bot sobre la detección.

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "contact"
```

- [ ] **Step 4: Commit**

```bash
git add components/ContactForm.tsx "app/api/contact/route.ts"
git commit -m "feat: agregar honeypot anti-spam en formulario de contacto"
```

---

## Task 10: Mejorar ThankYouContent con timeline de next steps

**Files:**
- Modify: `components/ThankYouContent.tsx`
- Modify: `messages/en.json` (claves de traducción)
- Modify: `messages/es.json` (claves de traducción)

**Contexto:** La página de gracias actual es minimal. Es una oportunidad de oro para: (1) reducir ansiedad post-envío con un timeline claro, (2) hacer cross-sell mostrando el portfolio, (3) mantener al lead caliente con WhatsApp. Actualmente ya tiene botones de Work y WhatsApp pero le falta el timeline de "qué pasa ahora".

- [ ] **Step 1: Agregar claves de traducción en messages/en.json**

Buscar la sección `"thankyou"` en `messages/en.json` y agregar las claves de next steps:

```json
"thankyou": {
  "step1Title": "Within 24h",
  "step1Desc": "Sofía reviews your brief and prepares questions.",
  "step2Title": "Discovery call",
  "step2Desc": "We schedule a 30-min call to align on vision and scope.",
  "step3Title": "Proposal",
  "step3Desc": "You receive a detailed quote within 48h of the call.",
  "stepsHeading": "What happens next"
}
```

- [ ] **Step 2: Agregar claves en messages/es.json**

```json
"thankyou": {
  "step1Title": "En menos de 24h",
  "step1Desc": "Sofía revisa tu brief y prepara preguntas.",
  "step2Title": "Llamada de discovery",
  "step2Desc": "Agendamos una llamada de 30 min para alinear visión y alcance.",
  "step3Title": "Propuesta",
  "step3Desc": "Recibirás un presupuesto detallado dentro de las 48h de la llamada.",
  "stepsHeading": "Qué pasa ahora"
}
```

- [ ] **Step 3: Agregar sección de next steps en ThankYouContent.tsx**

En `ThankYouContent.tsx`, después del `<motion.div>` con los botones (al final del contenido), agregar:

```tsx
<motion.div
  className="mt-16 max-w-lg mx-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.8, ease }}
>
  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-8 text-center">
    {t('stepsHeading')}
  </p>
  <div className="space-y-0">
    {([
      { key: '1', titleKey: 'step1Title', descKey: 'step1Desc' },
      { key: '2', titleKey: 'step2Title', descKey: 'step2Desc' },
      { key: '3', titleKey: 'step3Title', descKey: 'step3Desc' },
    ] as const).map(({ key, titleKey, descKey }, i) => (
      <div key={key} className="flex gap-6 py-5 border-b border-border/20 text-left">
        <span className="font-serif font-light text-accent/30 text-3xl leading-none w-8 shrink-0 select-none">
          0{key}
        </span>
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
            {t(titleKey)}
          </p>
          <p className="font-sans font-light text-foreground/45 text-sm leading-relaxed">
            {t(descKey)}
          </p>
        </div>
      </div>
    ))}
  </div>
</motion.div>
```

**Nota:** Las claves `titleKey` y `descKey` son de tipo string literal, TypeScript necesita que las claves existan en el namespace `thankyou`. Si hay error de tipo, declarar las claves en el tipo del namespace.

- [ ] **Step 4: Verificar TypeScript y build**

```bash
npx tsc --noEmit 2>&1 | grep "ThankYou\|thankyou"
```
Expected: Sin errores.

- [ ] **Step 5: Commit**

```bash
git add components/ThankYouContent.tsx messages/en.json messages/es.json
git commit -m "feat: agregar timeline next-steps en thank-you page para lead nurturing"
```

---

## Verificación Final

- [ ] **Build completo sin errores**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio
npm run build 2>&1 | tail -30
```
Expected: `✓ Compiled successfully` o similar. Sin errores de TypeScript ni de Next.js.

- [ ] **TypeScript completo**

```bash
npx tsc --noEmit
```
Expected: Sin output (0 errores).

- [ ] **Lint**

```bash
npm run lint 2>&1 | grep -v "^$" | head -20
```
Expected: Sin errores (warnings OK).

- [ ] **Validar JSON-LD con Rich Results Test**

Después de deploy en Vercel, probar en:
- `https://search.google.com/test/rich-results?url=https://somazstudio.com/en`
- `https://search.google.com/test/rich-results?url=https://somazstudio.com/en/blog/why-light-is-the-first-material`
- `https://search.google.com/test/rich-results?url=https://somazstudio.com/en/services`

Expected: JSON-LD válidos sin errores. El `LocalBusiness` de home debe mostrar rating y reviews. El `BlogPosting` debe mostrar autor como Person.

- [ ] **Validar sitemap**

```bash
curl https://somazstudio.com/sitemap.xml | head -50
```
Expected: XML válido con `lastmod` con fechas fijas (no la fecha actual de build).

---

## Resumen de impacto esperado

| Área | Cambio | Impacto estimado |
|------|--------|-----------------|
| SEO técnico | JSON-LD sin duplicados | Mejor parsing por Googlebot |
| SEO E-E-A-T | Person schema + BlogPosting author | Mejor autoridad para keywords de diseño |
| SEO crawl | Sitemap con fechas reales | Reducción de crawl budget desperdiciado |
| Performance | Cache headers para /media/ | Mejora LCP en revisitas |
| Performance | optimizePackageImports | Reducción bundle JS ~10-20% |
| Conversión | Honeypot anti-spam | Reducción leads falsos |
| Conversión | ThankYouContent mejorado | Reducción ansiedad post-envío, más WhatsApp contacts |
| Bugs | package.json versión correcta | Eliminar confusión en CI/CD |
