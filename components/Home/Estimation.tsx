'use client'
import Form from '@/components/Home/Form'
import Table from './Table'
import { APIResponse } from '@/types/apiResponse'
import { useCallback, useState } from 'react'
import { EstimationData, FormState } from '@/types/estimation'
import { findTLDRegistrars } from '@/libs/utilities'
import { flushSync } from 'react-dom'
import Cart from './Cart'

interface EstimationProps {
  data: APIResponse
  availableTLDs: string[]
}

const Estimation = ({ data, availableTLDs }: EstimationProps) => {
  const [processing, setProcessing] = useState(false)
  const [estimationData, setEstimationData] = useState<EstimationData[]>([])
  const [domainName, setDomainName] = useState('')
  const [years, setYears] = useState(1)

  const handleFormSubmit = useCallback((formData: FormState) => {
    flushSync(() => {
      // Prevent batching
      setProcessing(() => true)
    })
    const tldRegistrars = findTLDRegistrars(data, formData.tld)
    setEstimationData(() => tldRegistrars)
    setDomainName(() => formData.domain)
    setYears(() => formData.years)
    setProcessing(() => false)
  }, [data.data])

  return (
    <div className="bg-green-400">
      <h2>Estimation Component</h2>
      <Form availableTLDs={availableTLDs} findAction={handleFormSubmit} processing={processing} />
                  <Table estimationData={estimationData} processing={processing} years={years} domainName={domainName} />
      </div>
  )
}

export default Estimation