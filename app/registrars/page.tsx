import 'server-only'
import RegistrarsList from '@/components/Registrars/List'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'

export default function RegistrarsPage() {
  const domainixData = use(getDomainixData())

  return (
    <div>
      <h1>Registrars page</h1>
      <RegistrarsList registrars={domainixData.registrars} />
    </div>
  )
}