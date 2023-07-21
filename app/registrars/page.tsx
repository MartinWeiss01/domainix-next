import 'server-only'
import RegistrarsList from '@/components/Registrars/List'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'

export default function RegistrarsPage() {
  const domainixData = use(getDomainixData())

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4 py-8 sm:px-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Available Registrars</h2>
        <RegistrarsList registrars={domainixData.registrars} />
      </div>
    </div>
  )
}