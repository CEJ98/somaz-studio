#!/usr/bin/env node
/**
 * Migrates framer-motion `motion` component to `m` for LazyMotion compatibility.
 */
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

const files = await glob('**/*.{tsx,ts}', {
  cwd: '/Users/jorgecostilla/Documents/SomazStudio',
  ignore: ['node_modules/**', '.next/**', 'scripts/**'],
  absolute: true,
})

let changed = 0
for (const file of files) {
  let src = readFileSync(file, 'utf-8')
  const original = src

  if (!src.includes("from 'framer-motion'")) continue
  // Skip if it doesn't actually use `motion` as a component/function
  if (!src.includes('motion.') && !/<motion[.\s]/.test(src) && !/\bmotion\b/.test(src)) continue

  // 1. Replace JSX: <motion.X → <m.X and </motion.X → </m.X
  src = src.replace(/<motion\./g, '<m.')
  src = src.replace(/<\/motion\./g, '</m.')

  // 2. Replace in imports — only the standalone word `motion` (not useReducedMotion etc.)
  // Pattern: `{ motion,` or `, motion,` or `, motion }` or `{ motion }` in framer-motion imports
  src = src.replace(
    /(from 'framer-motion'.*$)/gm,
    (line) => line // don't touch the "from" line itself
  )
  src = src.replace(
    /^(import \{[^}]*)\bmotion\b([^}]*\} from 'framer-motion')/gm,
    (match, before, after) => `${before}m${after}`
  )

  // 3. Replace motion() function calls (creating custom components)
  src = src.replace(/(?<!\w)motion\((?!\s*{)/g, 'm(')

  if (src !== original) {
    writeFileSync(file, src, 'utf-8')
    const relPath = file.replace('/Users/jorgecostilla/Documents/SomazStudio/', '')
    console.log('✓', relPath)
    changed++
  }
}
console.log(`\nDone — ${changed} files updated`)
