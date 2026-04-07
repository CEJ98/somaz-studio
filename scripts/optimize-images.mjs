#!/usr/bin/env node
/**
 * One-shot: Converts all JPG/PNG images in public/ to AVIF and WebP.
 * Run once: node scripts/optimize-images.mjs
 * Keeps originals as fallback. next/image already serves AVIF via next.config.mjs.
 *
 * NOTE: Videos are NOT compressed by this script. For video compression use ffmpeg manually.
 * Videos that may need compression (run ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4):
 *   - public/media/work-cta.mp4
 */
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname
const FORMATS = ['avif', 'webp']
const INPUT_EXTS = ['.jpg', '.jpeg', '.png']

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walkDir(full)
    } else if (INPUT_EXTS.includes(extname(entry.name).toLowerCase())) {
      yield full
    }
  }
}

let converted = 0
let skipped = 0

for await (const filePath of walkDir(PUBLIC_DIR)) {
  const base = filePath.replace(extname(filePath), '')
  for (const fmt of FORMATS) {
    const outPath = `${base}.${fmt}`
    try {
      const [inStat, outStat] = await Promise.allSettled([stat(filePath), stat(outPath)])
      if (outStat.status === 'fulfilled' && inStat.status === 'fulfilled') {
        if (outStat.value.mtimeMs >= inStat.value.mtimeMs) {
          skipped++
          continue
        }
      }
      const instance = sharp(filePath)
      if (fmt === 'avif') {
        await instance.avif({ quality: 72, effort: 6 }).toFile(outPath)
      } else {
        await instance.webp({ quality: 82 }).toFile(outPath)
      }
      const [inSize, outSize] = await Promise.all([
        stat(filePath).then(s => s.size),
        stat(outPath).then(s => s.size),
      ])
      const savings = Math.round((1 - outSize / inSize) * 100)
      const rel = filePath.replace(PUBLIC_DIR, '')
      console.log(`✓ ${rel} → .${fmt} (${savings}% smaller)`)
      converted++
    } catch (err) {
      console.error(`✗ ${filePath}: ${err.message}`)
    }
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped.`)
