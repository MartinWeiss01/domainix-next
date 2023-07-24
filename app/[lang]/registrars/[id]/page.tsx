import 'server-only'
import RegistrarDetail from '@/components/Registrars/Detail'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'
import { redirect } from 'next/navigation'
import TwoColumnLayout from '@/components/Layout/TwoColumn'
import RegistrarCard from '@/components/Registrars/Card'
import { Locale } from '@/i18n-config'
import { getTranslations } from '@/get-translations'
import { ITranslationsDetails } from '@/types/translations'

const DetailPageSync = ({ translations, registrarId }: { translations: ITranslationsDetails, registrarId: string }) => {
  const domainixData = use(getDomainixData())
  const registrar = domainixData.registrars.find(registrar => registrar.slug === registrarId)

  if (registrar !== undefined) {
    const data = domainixData.data.find(data => data.rid === registrar.id)

    if (data !== undefined) {
      return (
        <TwoColumnLayout
          leftColumn={<RegistrarCard registrar={registrar} updateDate={data.date} totalTLD={data.domains.length} translations={translations.card} />}
          rightColumn={<RegistrarDetail data={data} translations={translations.detail} />}
        />
      )
    } else {
      redirect('/registrars')
    }
  } else {
    redirect('/')
  }
}

export default async function DetailPage({ params }: { params: { id: string, lang: Locale } }) {
  const translations = await getTranslations(params.lang)
  return <DetailPageSync translations={translations.registrars.details} registrarId={params.id} />
}