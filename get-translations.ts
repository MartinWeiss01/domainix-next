import 'server-only'
import type { Locale } from './i18n-config'

const translations = {
  en: () => import('./translations/en.json').then((module) => module.default),
  cs: () => import('./translations/cs.json').then((module) => module.default),
}

export const getTranslations = async (locale: Locale) => translations[locale]()