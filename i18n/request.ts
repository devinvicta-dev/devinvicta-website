import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

export const LOCALES = ['en', 'pt'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

function resolveLocale(value: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(value ?? '') ? (value as Locale) : DEFAULT_LOCALE
}

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = resolveLocale(store.get(LOCALE_COOKIE)?.value)

  // One JSON file per domain/feature; the file name maps to a top-level key.
  const [nav, footer, home, about, services, contact, projects] = await Promise.all([
    import(`@/locales/${locale}/nav.json`).then((m) => m.default),
    import(`@/locales/${locale}/footer.json`).then((m) => m.default),
    import(`@/locales/${locale}/home.json`).then((m) => m.default),
    import(`@/locales/${locale}/about.json`).then((m) => m.default),
    import(`@/locales/${locale}/services.json`).then((m) => m.default),
    import(`@/locales/${locale}/contact.json`).then((m) => m.default),
    import(`@/locales/${locale}/projects.json`).then((m) => m.default),
  ])

  return { locale, messages: { nav, footer, home, about, services, contact, projects } }
})
