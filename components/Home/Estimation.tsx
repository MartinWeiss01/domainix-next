'use client'
import Form from '@/components/Home/Form'
import Table from './Table'
import { APIResponse } from '@/types/apiResponse'
import { useCallback, useState } from 'react'
import { EstimationData, FormState } from '@/types/estimation'
import { findTLDRegistrars } from '@/libs/utilities'
import { flushSync } from 'react-dom'
import Cart from './Cart'
import { ITranslationsEstimation } from '@/types/translations'

interface EstimationProps {
  data: APIResponse
  availableTLDs: string[]
  translations: ITranslationsEstimation
}

const Estimation = ({ data, availableTLDs, translations }: EstimationProps) => {
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
    <div className="relative flex flex-col">
      <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
        {/* Main Area */}
        <div className="flex-1 min-w-0 bg-white xl:flex">
          <div className="lg:min-w-0 lg:flex-1">
            <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
              <div className="relative h-full space-y-6" style={{ minHeight: "36rem" }}>
                <Form availableTLDs={availableTLDs} findAction={handleFormSubmit} processing={processing} translations={translations.form} />
                <Table estimationData={estimationData} processing={processing} years={years} domainName={domainName} translations={translations.table} />
              </div>
            </div>
          </div>
        </div>
        {/* Main Area */}

        <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
          <div className="h-full lg:w-80">
            {/* Right Column */}
            <div className="h-full relative" style={{ minHeight: "16rem" }}>
              <Cart translations={translations.cart} />
            </div>
            {/* Right Column */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estimation
