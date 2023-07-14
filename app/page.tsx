import 'server-only'
import { getDomainixData } from "@/libs/dataFetch"
import { use } from "react"
import Estimation from '@/components/Home/Estimation'
import { getUniqueTLDList } from '@/libs/utilities'

export default function Home() {
  const domainixData = use(getDomainixData())
  const uniqueTLDS = getUniqueTLDList(domainixData.data)

  return (
    <div>
      <h1>Home page</h1>
      <Estimation data={domainixData} availableTLDs={uniqueTLDS} />
    </div>
  )
}
