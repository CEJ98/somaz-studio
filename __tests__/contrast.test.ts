import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const COMPONENTS_DIR = join(process.cwd(), 'components')
const FORBIDDEN = /text-foreground\/(10|15|20|25|30|35|40|45)\b/g

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) out.push(...walk(p))
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(p)
  }
  return out
}

describe('text contrast — WCAG AA', () => {
  it('no component uses text-foreground opacity below 50', () => {
    const offenders: string[] = []
    for (const file of walk(COMPONENTS_DIR)) {
      const content = readFileSync(file, 'utf8')
      const matches = content.match(FORBIDDEN)
      if (matches) {
        offenders.push(`${file}: ${[...new Set(matches)].join(', ')}`)
      }
    }
    expect(offenders, `Low-contrast classes found:\n${offenders.join('\n')}`).toEqual([])
  })
})
