import 'server-only'
import RegistrarsList from '@/components/Registrars/List'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'

export default function RegistrarsPage() {
  const domainixData = use(getDomainixData())

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4 py-8 sm:px-0">
        <RegistrarsList registrars={domainixData.registrars} />
      </div>
    </div>
  )
}