import 'server-only'
import RegistrarDetail from '@/components/Registrars/Detail'
import { getDomainixData } from '@/libs/dataFetch'
import { use } from 'react'
import { redirect } from 'next/navigation'
import TwoColumnLayout from '@/components/Layout/TwoColumn'
import RegistrarCard from '@/components/Registrars/Card'

export default function DetailPage({ params }: { params: { id: string } }) {
  const domainixData = use(getDomainixData())
  const registrar = domainixData.registrars.find(registrar => registrar.slug === params.id)

  if (registrar !== undefined) {
    const data = domainixData.data.find(data => data.rid === registrar.id)

    if (data !== undefined) {
      return (
        <TwoColumnLayout
          leftColumn={<RegistrarCard registrar={registrar} updateDate={data.date} />}
          rightColumn={<RegistrarDetail data={data} />}
        />
      )
    } else {
      redirect('/registrars')
    }
  } else {
    redirect('/')
  }
}