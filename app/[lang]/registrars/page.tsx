import 'server-only'
import RegistrarsList from '@/components/Registrars/List'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'
import { Locale } from '@/i18n-config'
import { getTranslations } from '@/get-translations'
import { ITranslationsList } from '@/types/translations'

const RegistrarsSync = ({ translations }: { translations: ITranslationsList }) => {
  const domainixData = use(getDomainixData())

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4 py-8 sm:px-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{translations.title}</h2>
        <RegistrarsList registrars={domainixData.registrars} />
      </div>
    </div>
  )
}

export default async function RegistrarsPage({ params }: { params: { lang: Locale } }) {
  const translations = await getTranslations(params.lang)
  return <RegistrarsSync translations={translations.registrars.list} />
}