import 'server-only'
import { getDomainixData } from "@/libs/dataFetch"
import { use } from "react"
import Estimation from '@/components/Home/Estimation'
import { getUniqueTLDList } from '@/libs/utilities'
import { getTranslations } from '@/get-translations'
import { Locale } from '@/i18n-config'
import { ITranslationsEstimation } from '@/types/translations'

const EstimationSync = ({ translations }: { translations: ITranslationsEstimation }) => {
  const domainixData = use(getDomainixData())
  const uniqueTLDS = getUniqueTLDList(domainixData.data)
  return <Estimation data={domainixData} availableTLDs={uniqueTLDS} translations={translations} />
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const translations = await getTranslations(params.lang)
  return <EstimationSync translations={translations.estimation} />
}

