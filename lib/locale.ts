export type LocaleString = { en: string; es: string }

export function t(field: LocaleString, locale: string): string {
  return locale === 'es' ? field.es : field.en
}
