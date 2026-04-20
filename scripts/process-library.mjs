#!/usr/bin/env node
/**
 * Process the new visual library:
 * - Read from ~/Downloads/Somaz-Imagenes/
 * - Categorize, rename to semantic slugs
 * - Output 1280w + 1920w in .webp + .avif (originals kept as .jpg fallback)
 * - Generate data/imageLibrary.ts registry
 *
 * Run: node scripts/process-library.mjs
 */
import sharp from 'sharp'
import { mkdir, readdir, copyFile, writeFile, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { homedir } from 'os'

const SRC = join(homedir(), 'Downloads', 'Somaz-Imagenes')
const OUT_BASE = new URL('../public/library', import.meta.url).pathname
const REGISTRY = new URL('../data/imageLibrary.ts', import.meta.url).pathname

// Category map — assigns each source filename to a category + semantic slug.
// Categories: interiors, materials, exteriors, lifestyle, process, backgrounds
const MAP = {
  // Interiors — warm residential
  'kam-idris-U39FPHKfDu0-unsplash.jpg':                 ['interiors',   'interior-living-warm-01',     'Warm living room with natural light'],
  'jason-briscoe-AQl-J19ocWE-unsplash.jpg':             ['interiors',   'interior-living-warm-02',     'Modern living space with sculptural lighting'],
  'jason-wang-5MG8cQbw-T8-unsplash.jpg':                ['interiors',   'interior-living-warm-03',     'Cozy interior with layered textiles'],
  'joseph-prospere-zZvb3U7V-CA-unsplash.jpg':           ['interiors',   'interior-living-luxury-01',   'Luxury interior with custom millwork'],
  'pexels-clubhouseconvos-13620065.jpg':                ['interiors',   'interior-bedroom-warm-01',    'Bedroom with warm timber finishes'],
  'pexels-clubhouseconvos-13620067.jpg':                ['interiors',   'interior-bedroom-warm-02',    'Bedroom with sculpted headboard'],
  'pexels-rdne-7491155.jpg':                            ['interiors',   'interior-kitchen-modern-01',  'Modern kitchen with stone island'],
  'pexels-perqued-13041122.jpg':                        ['interiors',   'interior-kitchen-modern-02',  'Kitchen with hand-finished cabinetry'],
  'pexels-j-d-books-554377679-33528703.jpg':            ['interiors',   'interior-dining-warm-01',     'Dining room with sculptural pendant'],
  'pexels-pixabay-327482.jpg':                          ['interiors',   'interior-bath-stone-01',      'Stone bathroom with natural light'],
  'don-kaveen-NFbwes_e-jI-unsplash.jpg':                ['interiors',   'interior-detail-warm-01',     'Interior detail with warm wood'],
  'jimmy-chang-ACt8ycSzpdE-unsplash.jpg':               ['interiors',   'interior-detail-warm-02',     'Architectural interior corner'],
  'roberto-nickson-tleCJiDOri0-unsplash.jpg':           ['interiors',   'interior-detail-warm-03',     'Interior with curated objects'],
  'darren-ahmed-arceo-Te24lXdBhxc-unsplash.jpg':        ['interiors',   'interior-luxury-01',          'Luxury residential interior'],
  'darren-ahmed-arceo-nThbkeax_0o-unsplash.jpg':        ['interiors',   'interior-luxury-02',          'High-end residential space'],
  'maarten-deckers-T5nXYXCf50I-unsplash.jpg':           ['interiors',   'interior-luxury-03',          'Refined contemporary interior'],
  'lance-anderson-QdAAasrZhdk-unsplash.jpg':            ['interiors',   'interior-luxury-04',          'Designer interior composition'],
  'salman-saqib-z6UAWpQAhXs-unsplash.jpg':              ['interiors',   'interior-luxury-05',          'Premium residential detail'],
  'lumbardh-plluzhina-7NvBEeHDY7M-unsplash.jpg':        ['interiors',   'interior-luxury-06',          'Editorial interior shot'],
  'pexels-pavel-danilyuk-7937319.jpg':                  ['interiors',   'interior-modern-01',          'Modern interior with curated decor'],
  'pexels-ivan-s-4458205.jpg':                          ['interiors',   'interior-modern-02',          'Contemporary residential interior'],
  'pexels-ivan-s-4458210.jpg':                          ['interiors',   'interior-modern-03',          'Modern home interior view'],
  'pexels-lucky-3592812-5374862.jpg':                   ['interiors',   'interior-modern-04',          'Open-plan modern interior'],

  // Exteriors — architecture
  'joel-filipe-RFDP7_80v5A-unsplash.jpg':               ['exteriors',   'exterior-modern-01',          'Contemporary architecture facade'],
  'sean-pollock-PhYq704ffdA-unsplash.jpg':              ['exteriors',   'exterior-modern-02',          'Modern building exterior'],
  'tim-stief-dH6IjhWHNQQ-unsplash.jpg':                 ['exteriors',   'exterior-modern-night-01',    'Architecture at twilight'],
  'modunite-ltd-PQ-lbdb8vKQ-unsplash.jpg':              ['exteriors',   'exterior-modular-01',         'Modular architecture exterior'],
  'modunite-ltd-k1QJxfjsZew-unsplash.jpg':              ['exteriors',   'exterior-modular-02',         'Prefab architectural form'],
  'd5-render-80dI7S2Kodo-unsplash.jpg':                 ['exteriors',   'exterior-render-01',          'Architectural visualization'],
  'sherzod-gulomov-P0q_HK_-GGM-unsplash.jpg':           ['exteriors',   'exterior-modern-03',          'Sculptural building exterior'],
  'joakim-nadell-K67sBVqLLuw-unsplash.jpg':             ['exteriors',   'exterior-modern-04',          'Geometric architectural form'],
  'willian-reis-KisfVhD9dkY-unsplash.jpg':              ['exteriors',   'exterior-modern-05',          'Contemporary architectural detail'],
  'prydumano-design-VZ2z8ozzy10-unsplash.jpg':          ['exteriors',   'exterior-detail-01',          'Architectural facade detail'],
  'prydumano-design-vIbxvHj9m9g-unsplash.jpg':          ['exteriors',   'exterior-detail-02',          'Architectural composition'],
  'pexels-ranamatloob567-26886881.jpg':                 ['exteriors',   'exterior-modern-06',          'Modern building study'],
  'pexels-ranamatloob567-27923189.jpg':                 ['exteriors',   'exterior-modern-07',          'Architectural form study'],
  'pexels-ranamatloob567-35058547.jpg':                 ['exteriors',   'exterior-modern-08',          'Building geometry study'],
  'pexels-reyd-valencia-2159301653-36739000.jpg':       ['exteriors',   'exterior-modern-09',          'Contemporary residential exterior'],
  'pexels-ahmed-khaled-930559652-20035983.jpg':         ['exteriors',   'exterior-modern-10',          'Architectural composition'],
  'pexels-hiba-q-omar-106562569-14613821.jpg':          ['exteriors',   'exterior-detail-03',          'Architectural surface detail'],

  // Materials — textures, surfaces
  'aaron-huber-G7sE2S4Lab4-unsplash.jpg':               ['materials',   'material-texture-01',         'Material texture study'],
  'anders-jilden-Sc5RKXLBjGg-unsplash.jpg':             ['materials',   'material-texture-02',         'Surface composition'],
  'bilal-mansuri-pes0_kuwsOU-unsplash.jpg':             ['materials',   'material-texture-03',         'Material study'],

  // Lifestyle — workspaces, people, studio
  'billy-jo-catbagan-KHoNHf54e-0-unsplash.jpg':         ['lifestyle',   'lifestyle-studio-01',         'Design studio workspace'],
  'billy-jo-catbagan-PbS9rXhsYIU-unsplash.jpg':         ['lifestyle',   'lifestyle-studio-02',         'Workspace details'],
  'billy-jo-catbagan-SU4rZo7STQA-unsplash.jpg':         ['lifestyle',   'lifestyle-studio-03',         'Studio environment'],
  'christian-ventura-Ad1B36KFhv0-unsplash.jpg':         ['lifestyle',   'lifestyle-studio-04',         'Creative workspace'],
  'murat-demircan-8mRwPLqUE6w-unsplash.jpg':            ['lifestyle',   'lifestyle-desk-01',           'Designer desk with samples'],
}

const SIZES = [
  { w: 1920, suffix: '' },
  { w: 1280, suffix: '-1280' },
]

async function ensureDir(p) {
  await mkdir(p, { recursive: true })
}

async function processOne(srcFile, category, slug, alt) {
  const inputPath = join(SRC, srcFile)
  const outDir = join(OUT_BASE, category)
  await ensureDir(outDir)

  const meta = await sharp(inputPath).metadata()
  const aspectRatio = meta.width / meta.height

  // Save base .jpg fallback at 1920w
  const jpgPath = join(outDir, `${slug}.jpg`)
  await sharp(inputPath).resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(jpgPath)

  // Generate webp + avif at each size
  for (const { w, suffix } of SIZES) {
    const base = join(outDir, `${slug}${suffix}`)
    await sharp(inputPath).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${base}.webp`)
    await sharp(inputPath).resize({ width: w, withoutEnlargement: true }).avif({ quality: 65, effort: 6 }).toFile(`${base}.avif`)
  }

  // Generate tiny blur placeholder
  const blurBuf = await sharp(inputPath).resize({ width: 16 }).webp({ quality: 30 }).toBuffer()
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString('base64')}`

  const finalMeta = await sharp(jpgPath).metadata()
  return {
    slug,
    category,
    src: `/library/${category}/${slug}.jpg`,
    w: finalMeta.width,
    h: finalMeta.height,
    aspectRatio: Number(aspectRatio.toFixed(3)),
    blurDataURL,
    alt,
  }
}

async function main() {
  await ensureDir(OUT_BASE)
  const entries = Object.entries(MAP)
  console.log(`Processing ${entries.length} images...`)

  const registry = []
  let i = 0
  for (const [src, [category, slug, alt]] of entries) {
    i++
    try {
      const item = await processOne(src, category, slug, alt)
      registry.push(item)
      console.log(`✓ [${i}/${entries.length}] ${category}/${slug} (${item.w}x${item.h})`)
    } catch (err) {
      console.error(`✗ ${src}: ${err.message}`)
    }
  }

  // Group by category for the registry
  const byCategory = {}
  for (const item of registry) {
    if (!byCategory[item.category]) byCategory[item.category] = []
    byCategory[item.category].push(item)
  }

  const ts = `// AUTO-GENERATED by scripts/process-library.mjs — do not edit by hand.
export type LibraryCategory = 'interiors' | 'materials' | 'exteriors' | 'lifestyle' | 'process' | 'backgrounds'

export interface LibraryImage {
  slug: string
  category: LibraryCategory
  src: string
  w: number
  h: number
  aspectRatio: number
  blurDataURL: string
  alt: string
}

export const imageLibrary: LibraryImage[] = ${JSON.stringify(registry, null, 2)}

export const byCategory: Record<LibraryCategory, LibraryImage[]> = {
  interiors:   imageLibrary.filter(i => i.category === 'interiors'),
  materials:   imageLibrary.filter(i => i.category === 'materials'),
  exteriors:   imageLibrary.filter(i => i.category === 'exteriors'),
  lifestyle:   imageLibrary.filter(i => i.category === 'lifestyle'),
  process:     imageLibrary.filter(i => i.category === 'process'),
  backgrounds: imageLibrary.filter(i => i.category === 'backgrounds'),
}

export function pickBySlug(slug: string): LibraryImage | undefined {
  return imageLibrary.find(i => i.slug === slug)
}
`
  await writeFile(REGISTRY, ts, 'utf8')
  console.log(`\n✓ Wrote registry: ${REGISTRY}`)
  console.log(`Categories:`, Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, v.length])))
}

main().catch(err => { console.error(err); process.exit(1) })
