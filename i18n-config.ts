export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'cs'],
  navbar: [
    {
      id: 'en',
      name: 'English',
      img: 'https://flagcdn.com/gb.svg',
    },
    {
      id: 'cs',
      name: 'čeština',
      img: 'https://flagcdn.com/cz.svg',
    },
  ]
} as const

export type Locale = (typeof i18n)['locales'][number]