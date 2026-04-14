# Somaz Studio — Mejora Completa de la Web

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aumentar conversión de visitantes a clientes — eliminar precios, potenciar renders, mejorar jerarquía de CTAs, y optimizar todos los assets.

**Architecture:** Cambios focalizados en componentes existentes — sin nuevas rutas ni reestructuración de carpetas. La mayoría de cambios son en `components/` y `data/`. Los assets nuevos se procesan con `npm run optimize-images` antes de moverlos a `public/`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Framer Motion, next-intl, sharp (optimización de imágenes)

---

## Mapa de archivos

| Archivo | Tipo de cambio |
|---|---|
| `data/services.ts` | Eliminar campos `packages` del tipo `Service` |
| `components/PricingTable.tsx` | **Eliminar** |
| `components/ServiceItem.tsx` | Quitar `PricingTable`, quitar label "packages", agregar CTA "Hablemos de tu proyecto" |
| `components/HomePageClient.tsx` | Quitar `BeforeAfterSlider`, mejorar jerarquía CTAs, ampliar grilla de proyectos |
| `components/WorkClient.tsx` | Layout editorial alternado, mejorar hover states |
| `components/ProjectPageClient.tsx` | Hero full-screen, galería limpia, CTA al final |
| `components/ContactForm.tsx` | Eliminar campos `phone`, `sqft`, `budget`; hacer `message` opcional |
| `app/[locale]/contact/page.tsx` | Hero copy más deseable, agregar bloque WhatsApp inline |
| `components/ThankYouContent.tsx` | Clarificar "Te contactamos en menos de 24h" |
| `components/AboutClient.tsx` | Reordenar secciones: diferenciador → stats → equipo → historia; CTA al final |
| `app/[locale]/blog/[slug]/page.tsx` | El CTA ya existe — mejorar copy para hacerlo más contextual |
| `components/BeforeAfterSlider.tsx` | Optimizar imágenes con `next/image quality={75}` (queda para uso futuro) |
| `scripts/optimize-images.mjs` | Usar para procesar assets de `/Downloads/somaz-imagenes/` |

---

## Task 1: Preparar y optimizar assets nuevos

**Files:**
- Read: `scripts/optimize-images.mjs`
- Move processed files to: `public/media/`, `public/blog/`, `public/services/`

- [ ] **Step 1: Leer el script de optimización para entender cómo usarlo**

```bash
cat scripts/optimize-images.mjs
```

- [ ] **Step 2: Crear carpeta temporal de trabajo**

```bash
mkdir -p /tmp/somaz-assets-input
```

- [ ] **Step 3: Copiar los 3 videos a public/media y verificar tamaños**

```bash
ls -lh /Users/jorgecostilla/Downloads/somaz-imagenes/*.mp4
```

Elegir el video más apropiado como hero (preferir el de 10MB o 15MB sobre el de 31MB para performance). Copiar el elegido:

```bash
cp /Users/jorgecostilla/Downloads/somaz-imagenes/6615051-uhd_3840_2160_25fps.mp4 /Users/jorgecostilla/Documents/SomazStudio/public/media/hero-home-new.mp4
```

- [ ] **Step 4: Seleccionar y copiar imágenes clave para blog y servicios**

Copiar al menos 6 imágenes de interiores de alta calidad a una carpeta temporal:

```bash
cp /Users/jorgecostilla/Downloads/somaz-imagenes/d5-render-80dI7S2Kodo-unsplash.jpg /tmp/somaz-assets-input/
cp /Users/jorgecostilla/Downloads/somaz-imagenes/roberto-nickson-tleCJiDOri0-unsplash.jpg /tmp/somaz-assets-input/
cp /Users/jorgecostilla/Downloads/somaz-imagenes/lance-anderson-QdAAasrZhdk-unsplash.jpg /tmp/somaz-assets-input/
cp /Users/jorgecostilla/Downloads/somaz-imagenes/jason-briscoe-AQl-J19ocWE-unsplash.jpg /tmp/somaz-assets-input/
cp /Users/jorgecostilla/Downloads/somaz-imagenes/aaron-huber-G7sE2S4Lab4-unsplash.jpg /tmp/somaz-assets-input/
cp /Users/jorgecostilla/Downloads/somaz-imagenes/joakim-nadell-K67sBVqLLuw-unsplash.jpg /tmp/somaz-assets-input/
```

- [ ] **Step 5: Optimizar imágenes de los sliders (ya en public/)**

Los sliders actuales son JPGs pesados. Reemplazarlos con versiones optimizadas. Editar temporalmente `scripts/optimize-images.mjs` para incluir los sliders como input y generar AVIF/WebP en `public/`. Luego ejecutar:

```bash
cd /Users/jorgecostilla/Documents/SomazStudio && npm run optimize-images
```

- [ ] **Step 6: Commit de assets**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio
git add public/media/ public/blog/ public/services/
git commit -m "assets: add optimized images and new hero video candidates"
```

---

## Task 2: Eliminar precios de servicios

**Files:**
- Modify: `data/services.ts`
- Modify: `components/ServiceItem.tsx`
- Delete: `components/PricingTable.tsx`

- [ ] **Step 1: Eliminar el tipo `ServicePackage` y el campo `packages` de `data/services.ts`**

En `data/services.ts`, cambiar la interfaz `Service`:

```typescript
// ANTES
export interface ServicePackage {
  name: LocaleString
  price: LocaleString
  description?: LocaleString
  features?: LocaleString[]
}

export interface Service {
  number: string
  title: LocaleString
  slug: string
  tagline: LocaleString
  description: LocaleString
  packages: ServicePackage[]
}

// DESPUÉS — eliminar ServicePackage completamente y packages de Service
export interface Service {
  number: string
  title: LocaleString
  slug: string
  tagline: LocaleString
  description: LocaleString
}
```

- [ ] **Step 2: Eliminar el array `packages` de cada servicio en `data/services.ts`**

Buscar todos los bloques `packages: [...]` en el archivo y eliminarlos. Son 4 servicios (3d-visualization, interior-design, conceptual-design, design-consulting).

- [ ] **Step 3: Actualizar `components/ServiceItem.tsx` — eliminar PricingTable y el label "packages"**

Reemplazar el bloque derecho del grid en `ServiceItem` (líneas 115-136) — eliminar el import de `PricingTable`, el label `{ts('packages')}`, el componente `<PricingTable />`, y el link a `freeConsult`. Reemplazar con un CTA más directo:

```tsx
{/* Right — image + CTA */}
<div className="md:col-span-6 md:col-start-7 relative z-10">
  {serviceImages[service.slug] && (
    <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden">
      <Image
        src={serviceImages[service.slug]}
        alt={tl(service.title, locale)}
        fill
        className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  )}
  <p className="font-sans font-light text-foreground/60 leading-relaxed mb-8">
    {tl(service.description, locale)}
  </p>
  <Link
    href={`/contact?type=${slugToProjectType[service.slug] ?? 'other'}`}
    className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
  >
    {ts('startProject')}
    <Icon name="north_east" size={14} />
  </Link>
</div>
```

También eliminar el import de `PricingTable` al inicio del archivo:
```tsx
// Eliminar esta línea:
import PricingTable from '@/components/PricingTable'
```

- [ ] **Step 4: Eliminar `components/PricingTable.tsx`**

```bash
rm /Users/jorgecostilla/Documents/SomazStudio/components/PricingTable.tsx
```

- [ ] **Step 5: Verificar build**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio && npx tsc --noEmit
```

Debe pasar sin errores de tipo relacionados a `ServicePackage` o `PricingTable`.

- [ ] **Step 6: Commit**

```bash
git add data/services.ts components/ServiceItem.tsx components/PricingTable.tsx
git commit -m "feat: remove pricing from services page"
```

---

## Task 3: Homepage — jerarquía CTAs y grilla de proyectos

**Files:**
- Modify: `components/HomePageClient.tsx`

- [ ] **Step 1: Quitar `BeforeAfterSlider` del homepage**

En `HomePageClient.tsx`, eliminar la sección `{/* BEFORE / AFTER */}` completa (el componente `<BeforeAfterSlider ... />`). También eliminar el import al inicio:

```tsx
// Eliminar:
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
```

- [ ] **Step 2: Invertir la jerarquía de los CTAs del hero**

Actualmente el primer botón ("Ver nuestro trabajo") es el primario con `bg-accent`, y el segundo ("Iniciar proyecto") es el borde. Invertir:

```tsx
{/* Primario → Iniciar Proyecto */}
<MagneticButton>
  <Link
    href="/contact"
    className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
  >
    {t('startProject')}
    <Icon name="north_east" size={16} />
  </Link>
</MagneticButton>
{/* Secundario → Ver nuestro trabajo */}
<Link
  href="/work"
  className="inline-flex items-center gap-2 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-6 py-3 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
>
  {t('viewOurWork')}
  <Icon name="north_east" size={14} />
</Link>
```

- [ ] **Step 3: Ampliar el primer proyecto en la grilla de Selected Work**

El proyecto 01 ocupa `md:col-span-7`. Cambiarlo a `md:col-span-8` para que el render sea más dominante. El bloque derecho pasa de `md:col-span-5` a `md:col-span-4`. Buscar en la grilla de proyectos:

```tsx
// ANTES
<motion.div className="md:col-span-7" ...>
// DESPUÉS
<motion.div className="md:col-span-8" ...>
```

Y la columna derecha:
```tsx
// ANTES
<div className="md:col-span-5 flex flex-col gap-12">
// DESPUÉS
<div className="md:col-span-4 flex flex-col gap-12">
```

- [ ] **Step 4: Verificar en dev server**

```bash
npm run dev
```

Abrir `http://localhost:3000/en` y verificar que:
- El Before/After ya no aparece
- El CTA primario es "Start Project" (fondo acento)
- La grilla de proyectos muestra el render 01 más grande

- [ ] **Step 5: Commit**

```bash
git add components/HomePageClient.tsx
git commit -m "feat: homepage CTA hierarchy, larger project grid, remove before/after"
```

---

## Task 4: Work — layout editorial y mejoras de hover

**Files:**
- Modify: `components/WorkClient.tsx`

- [ ] **Step 1: Leer el WorkClient completo para entender el layout actual**

Leer `components/WorkClient.tsx` desde la línea 80 en adelante para ver cómo renderiza los proyectos en la grilla actual.

- [ ] **Step 2: Mejorar el layout de grilla con alternancia editorial**

En la sección donde se renderizan los proyectos filtrados, la grilla usa `sizeToSpan` para determinar spans. Mejorar para que el primer proyecto de cada grupo sea full-width (12 cols) y los siguientes en pares de 6:

```tsx
// Reemplazar el render de la grilla de proyectos por:
<div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-16 mt-8">
  {filtered.map((project, i) => {
    // Patrón editorial: 0=full, 1=left(7), 2=right(5), 3=full, etc.
    const pattern = i % 3
    const colSpan =
      pattern === 0 ? 'md:col-span-12' :
      pattern === 1 ? 'md:col-span-7' :
      'md:col-span-5'
    const aspectRatio =
      pattern === 0 ? 'aspect-[21/9]' :
      pattern === 1 ? 'aspect-[4/3]' :
      'aspect-[4/5]'

    return (
      <motion.div
        key={project.slug}
        className={colSpan}
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease }}
        onMouseEnter={() => setHoveredSlug(project.slug)}
        onMouseLeave={() => setHoveredSlug(null)}
      >
        <Link href={`/work/${project.slug}`} className="group block">
          <div className={`relative overflow-hidden ${aspectRatio} mb-5`}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
              sizes={pattern === 0 ? '100vw' : pattern === 1 ? '58vw' : '42vw'}
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
            {/* Overlay con categoría al hacer hover */}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-500" />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{project.category}</p>
              <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{project.title}</h3>
              <p className="font-sans text-[11px] text-foreground/55 mt-1">{project.location} — {project.year}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  })}
</div>
```

Asegurarse de que `ProjectCard` y `ProjectModal` se eliminan si ya no se usan, o mantenerlos si aún se necesitan.

- [ ] **Step 3: Verificar en dev**

```bash
npm run dev
```

Abrir `http://localhost:3000/en/work`. Verificar alternancia full-width / dos columnas. Verificar filtros funcionan.

- [ ] **Step 4: Commit**

```bash
git add components/WorkClient.tsx
git commit -m "feat: work page editorial layout with alternating grid"
```

---

## Task 5: Formulario de contacto simplificado + WhatsApp inline

**Files:**
- Modify: `components/ContactForm.tsx`
- Modify: `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Simplificar `ContactForm.tsx` — eliminar campos phone, sqft y budget**

En `ContactForm.tsx`, eliminar el Row 2 completo (phone + sqft) y el select de budget del Row 3. El formulario queda con: nombre, email, tipo de proyecto (dropdown), y mensaje (pasar a opcional — quitar `required`).

```tsx
{/* NUEVO formulario simplificado */}
<form onSubmit={handleSubmit} className="space-y-10">
  {/* Honeypot — mantener igual */}
  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }}>
    <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-label="Do not fill this field" />
  </div>
  
  {/* Row 1: Name + Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <FloatingInput id="name" name="name" label={tf('name')} required />
    <div>
      <FloatingInput id="email" name="email" label={tf('email')} type="email" required />
      <div aria-live="polite">
        {emailError && <p className="font-sans text-[10px] text-red-400 mt-1">{emailError}</p>}
      </div>
    </div>
  </div>

  {/* Row 2: Project Type */}
  <FloatingSelect id="project_type" name="project_type" label={tf('projectType')} required defaultValue={preselectedType}>
    <option value="3d-visualization">{tf('opt3dViz')}</option>
    <option value="interior-design">{tf('optInterior')}</option>
    <option value="conceptual-design">{tf('optConceptual')}</option>
    <option value="consulting">{tf('optConsulting')}</option>
    <option value="full-studio-partnership">{tf('optPartnership')}</option>
    <option value="other">{tf('optOther')}</option>
  </FloatingSelect>

  {/* Row 3: Message (opcional) */}
  <div>
    <label htmlFor="message" className={labelClass}>{tf('message')}</label>
    <textarea
      id="message"
      name="message"
      rows={4}
      maxLength={2000}
      placeholder={tf('messagePlaceholder')}
      className={`${inputClass} resize-none`}
      onChange={(e) => setMsgLen(e.target.value.length)}
    />
    {msgLen > 0 && (
      <p className="text-right font-sans text-[10px] text-foreground/50 mt-1">{msgLen} {tf('chars')}</p>
    )}
  </div>

  <div className="flex flex-col gap-3">
    <button
      type="submit"
      disabled={status === 'loading'}
      className="self-start inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 group"
    >
      {status === 'loading' ? (
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            reduced ? (
              <span key={i} className="w-1 h-1 rounded-full bg-background inline-block opacity-60" />
            ) : (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-background inline-block"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            )
          ))}
        </span>
      ) : (
        <>
          {tf('send')}
          <Icon name="north_east" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </>
      )}
    </button>
    <p className="font-sans text-[10px] text-foreground/55 tracking-wide">{tf('trustCopy')}</p>
  </div>
</form>
```

También eliminar el import de `useEffect` si ya no se usa (revisar si queda algún `useEffect` en el componente). Eliminar `msgLen` del `handleSubmit` — el payload ya no incluye budget ni phone.

- [ ] **Step 2: Agregar bloque WhatsApp inline en `app/[locale]/contact/page.tsx`**

Después del `<ContactForm />`, agregar un divisor y bloque de WhatsApp:

```tsx
{/* O contactanos por WhatsApp */}
<div className="mt-16 pt-12 border-t border-border/30 text-center">
  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">
    {t('orViaWhatsApp')}
  </p>
  <a
    href="https://wa.me/17865377682"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
  >
    {t('writeOnWhatsApp')}
    <Icon name="chat" size={14} />
  </a>
</div>
```

Agregar las claves faltantes al archivo de traducciones `messages/en.json` y `messages/es.json`:
- `contact.orViaWhatsApp`: `"Or reach us on WhatsApp"` / `"O escribinos por WhatsApp"`
- `contact.writeOnWhatsApp`: `"Write on WhatsApp"` / `"Escribir por WhatsApp"`

- [ ] **Step 3: Verificar formulario en dev**

```bash
npm run dev
```

Abrir `http://localhost:3000/en/contact`. Verificar que el formulario tiene 3 campos (nombre, email, tipo de proyecto) + mensaje opcional. Verificar que el botón de WhatsApp aparece debajo.

- [ ] **Step 4: Commit**

```bash
git add components/ContactForm.tsx app/[locale]/contact/page.tsx
git commit -m "feat: simplify contact form, add whatsapp inline option"
```

---

## Task 6: About — reordenar y agregar CTA

**Files:**
- Modify: `components/AboutClient.tsx`

- [ ] **Step 1: Leer el resto de `AboutClient.tsx`** (desde línea 50 en adelante)

```bash
# Leer con Read tool desde línea 50
```

- [ ] **Step 2: Reordenar las secciones del About**

El orden actual probablemente es: historia → equipo → diferenciadores → stats. El nuevo orden debe ser:

1. **Diferenciadores** ("Estudio global con base en Miami") — primero, genera impacto inmediato
2. **Stats animadas** (proyectos, países, años) — prueba social visual
3. **Equipo** (data/team.ts) — humaniza el estudio
4. **Historia/filosofía** — contexto para quienes quieren saber más
5. **CTA** — "¿Querés trabajar con nosotros?" → `/contact`

Reorganizar el JSX del componente en ese orden. El CTA al final:

```tsx
{/* CTA final */}
<section className="border-t border-border/50 px-6 md:px-10 py-20 text-center">
  <div className="max-w-2xl mx-auto">
    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
      {t('ctaLabel')}
    </p>
    <h2 className="font-serif font-light text-foreground mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
      {t('ctaHeading')}
    </h2>
    <Link
      href="/contact"
      className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
    >
      {t('ctaButton')}
      <Icon name="north_east" size={16} />
    </Link>
  </div>
</section>
```

Agregar las claves al archivo de traducciones:
- `about.ctaLabel`: `"Work with us"` / `"Trabajá con nosotros"`
- `about.ctaHeading`: `"Ready to bring your vision to life?"` / `"¿Listo para dar vida a tu proyecto?"`
- `about.ctaButton`: `"Start a project"` / `"Iniciar un proyecto"`

- [ ] **Step 3: Verificar en dev**

```bash
npm run dev
```

Abrir `http://localhost:3000/en/about`. Verificar el nuevo orden y que el CTA aparece al final.

- [ ] **Step 4: Commit**

```bash
git add components/AboutClient.tsx
git commit -m "feat: about page reorder sections, add CTA"
```

---

## Task 7: Blog — CTA contextual mejorado

**Files:**
- Modify: `app/[locale]/blog/[slug]/page.tsx`

El CTA ya existe en la página del blog. El problema es que es genérico. Mejorarlo para que sea más específico y urgente.

- [ ] **Step 1: Actualizar el CTA existente en `app/[locale]/blog/[slug]/page.tsx`**

El bloque CTA actual (líneas ~155-172) muestra `{tb('ctaHeading')}` y `{tb('ctaHighlight')}`. Actualizar las claves de traducción en `messages/en.json` y `messages/es.json`:

```json
// messages/en.json — en el namespace "blog":
"ctaLabel": "Turn your vision into reality",
"ctaHeading": "Ready to see your project",
"ctaHighlight": "before it's built?",
"ctaButton": "Let's talk about your project"
```

```json
// messages/es.json — en el namespace "blog":
"ctaLabel": "Convertí tu visión en realidad",
"ctaHeading": "¿Listo para ver tu proyecto",
"ctaHighlight": "antes de que exista?",
"ctaButton": "Hablemos de tu proyecto"
```

- [ ] **Step 2: Mejorar el estilo visual del CTA — hacerlo más prominente**

Cambiar el borde sutil actual a un CTA con fondo tenue y botón acento:

```tsx
{/* CTA */}
<div className="mt-20 mb-16 py-16 px-8 bg-surface/30 border-l-2 border-accent text-center">
  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{tb('ctaLabel')}</p>
  <h3
    className="font-serif font-light text-foreground leading-tight mb-8"
    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
  >
    {tb('ctaHeading')}<br />
    <span className="italic text-foreground/60">{tb('ctaHighlight')}</span>
  </h3>
  <Link
    href="/contact"
    className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
  >
    {tb('ctaButton')}
    <Icon name="north_east" size={14} />
  </Link>
</div>
```

- [ ] **Step 3: Verificar en dev**

```bash
npm run dev
```

Abrir cualquier post del blog, ej: `http://localhost:3000/en/blog/[slug]`. Verificar que el CTA se ve prominente al final del artículo.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/blog/ messages/
git commit -m "feat: improve blog post CTA copy and visual weight"
```

---

## Task 8: Optimizar imágenes del BeforeAfterSlider

**Files:**
- Modify: `components/BeforeAfterSlider.tsx`

Los sliders tienen JPGs de ~500KB. Usar `next/image` con `quality={75}` ya reduce el peso en runtime. Pero también agregar las variantes AVIF si se generaron en el Task 1.

- [ ] **Step 1: Leer `components/BeforeAfterSlider.tsx`**

Verificar si usa `<img>` o `<Image>` de next/image.

- [ ] **Step 2: Si usa `<img>` nativo, reemplazar con `next/image`**

```tsx
import Image from 'next/image'

// En los lugares donde renderiza beforeSrc y afterSrc:
<Image
  src={beforeSrc}
  alt="Blueprint"
  fill
  className="object-cover"
  quality={75}
  sizes="100vw"
/>
<Image
  src={afterSrc}
  alt="Photorealistic render"
  fill
  className="object-cover"
  quality={75}
  sizes="100vw"
/>
```

- [ ] **Step 3: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/BeforeAfterSlider.tsx
git commit -m "perf: use next/image in BeforeAfterSlider with quality optimization"
```

---

## Task 9: Build final y verificación

- [ ] **Step 1: Build completo**

```bash
cd /Users/jorgecostilla/Documents/SomazStudio && npm run build
```

Esperado: sin errores. Verificar que no hay referencias a `PricingTable` ni a `ServicePackage`.

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Esperado: 0 errores.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Esperado: 0 errores.

- [ ] **Step 4: Revisión visual en mobile (375px)**

Con el dev server corriendo, revisar en DevTools con viewport de 375px:
- Homepage: hero video, CTAs, grilla de proyectos
- Services: sin precios, CTAs visibles
- Work: layout editorial correcto
- Contact: formulario simplificado, botón WhatsApp visible

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: final build verification — somaz web improvement complete"
```

---

## Notas de implementación

- **Traducciones:** Cada vez que se agreguen claves nuevas, agregarlas a ambos archivos: `messages/en.json` y `messages/es.json`.
- **`budget` en el API:** El campo `budget` se eliminó del formulario pero el handler en `app/api/contact/route.ts` puede seguir recibiéndolo opcionalmente — no hay que modificar el API handler.
- **`trackLead`:** En `ContactForm.tsx`, el call a `trackLead` usa `payload.budget` que ya no existirá — pasar `undefined` está bien, pero verificar que no rompe tipos.
- **Video hero:** Si el nuevo video (`hero-home-new.mp4`) se decide usar, actualizar las rutas en `HomePageClient.tsx` correspondientes.
