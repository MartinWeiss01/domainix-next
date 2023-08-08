import 'server-only'
import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Layout/Footer'
import { Locale } from '@/i18n-config'
import { getTranslations } from '@/get-translations'
import { getCurrenciesData } from '@/libs/dataFetch'
import { use } from 'react'
import { DEFAULT_CURRENCIES_AVAILABLE } from '@/store/currency'
import { ITranslations } from '@/types/translations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Domainix',
  description: 'S Domainixem snadno zjistíte, kde můžete Vámi požadovanou doménu provozovat s co nejnižšími náklady. Ušetřte čas i peníze při hledání registrátora domén.',
}

const LayoutSync = ({
  children,
  params,
  translations
}: {
  children: React.ReactNode,
  params: { lang: Locale },
  translations: ITranslations
}) => {
  const currencyData = use(getCurrenciesData())
  const currencies = currencyData.success ? currencyData.currency : DEFAULT_CURRENCIES_AVAILABLE

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Navbar
          translations={translations.navbar}
          locale={params.lang}
          cartTranslations={translations.estimation.cart}
          availableCurrencies={currencies}
        />
        {children}
        <Footer translations={translations.footer} />
      </body>
    </html>
  )
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const translations = await getTranslations(params.lang)
  return <LayoutSync params={params} translations={translations}>{children}</LayoutSync>
}
