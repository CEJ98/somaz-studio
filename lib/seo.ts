const BASE = 'https://somazstudio.com'

export const metadataBase = new URL(BASE)

export function buildAlternates(path: string, locale: 'en' | 'es' = 'en') {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      en: `${BASE}/en${path}`,
      es: `${BASE}/es${path}`,
      'x-default': `${BASE}/en${path}`,
    },
  }
}
