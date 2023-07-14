'use client'
import Form from '@/components/Home/Form'
import Table from './Table'
import { APIResponse } from '@/types/apiResponse'
import { useCallback, useState } from 'react'
import { EstimationData } from '@/types/estimation'
import { findTLDRegistrars } from '@/libs/utilities'
import { flushSync } from 'react-dom'

interface EstimationProps {
  data: APIResponse
  availableTLDs: string[]
}

const Estimation = ({ data, availableTLDs }: EstimationProps) => {
  const [processing, setProcessing] = useState(false)
  const [estimationData, setEstimationData] = useState<EstimationData[]>([])

  const handleFormSubmit = useCallback((selectedTLD: string) => {
    flushSync(() => {
      // Prevent batching
      setProcessing(() => true)
    })
    const tldRegistrars = findTLDRegistrars(data.data, selectedTLD)
    setEstimationData(() => tldRegistrars)
    setProcessing(() => false)
  }, [data.data])

  return (
    <div className="bg-green-400">
      <h2>Estimation Component</h2>
      <Form availableTLDs={availableTLDs} findAction={handleFormSubmit} processing={processing} />
      <Table estimationData={estimationData} processing={processing} />
    </div>
  )
}

export default Estimation