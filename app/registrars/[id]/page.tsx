import 'server-only'
import RegistrarDetail from '@/components/Registrars/Detail'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'
import { redirect } from 'next/navigation'

export default function DetailPage({ params }: { params: { id: string } }) {
  const domainixData = use(getDomainixData())
  const registrar = domainixData.registrars.find(registrar => registrar.slug === params.id)

  if (registrar !== undefined) {
    return (
      <div>
        <h1>Registrar Detail page</h1>
        <p>{params.id}</p>
        <RegistrarDetail registar={registrar} />
      </div>
    )
  } else {
    redirect('/')
  }
}