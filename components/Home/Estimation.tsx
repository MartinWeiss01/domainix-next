'use client'
import Form from '@/components/Home/Form'
import Table from './Table'
import { APIResponse } from '@/types/apiResponse'
import { Suspense, useCallback, useState, useTransition } from 'react'
import { EstimationData, FormState } from '@/types/estimation'
import { findTLDRegistrars } from '@/libs/utilities'
import { flushSync } from 'react-dom'
import Cart from './Cart'
import { ITranslationsEstimation } from '@/types/translations'
import { useCurrency } from '@/store/currency'

interface EstimationProps {
  data: APIResponse
  availableTLDs: string[]
  translations: ITranslationsEstimation
}

const Estimation = ({ data, availableTLDs, translations }: EstimationProps) => {
  const [isPending, startTransition] = useTransition()

  const [estimationData, setEstimationData] = useState<EstimationData[]>([])
  const [domainName, setDomainName] = useState('')
  const [years, setYears] = useState(1)
  const { currencies, getSelectedCurrency } = useCurrency()

  const handleFormSubmit = useCallback((formData: FormState) => {
    startTransition(() => {
      const tldRegistrars = findTLDRegistrars(data, formData.tld, formData.years, currencies, getSelectedCurrency().name)
      setEstimationData(() => tldRegistrars)
      setDomainName(() => formData.domain)
      setYears(() => formData.years)
    })
  }, [data.data])

  return (
    <div className="relative flex flex-grow w-full max-w-7xl mx-auto xl:px-8">
      {/* Main Area */}
      <main className="flex-1 min-w-0 bg-white xl:flex">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex-1 h-full py-6 px-4 sm:px-6 lg:px-8 relative space-y-6">
            <Form availableTLDs={availableTLDs} findAction={handleFormSubmit} processing={isPending} translations={translations.form} />
            {estimationData.length > 0 &&
              <Table estimationData={estimationData} processing={isPending} years={years} domainName={domainName} translations={translations.table} />
            }
          </div>
        </Suspense>
      </main>

      {/* Right Column */}
      <aside className="hidden lg:block pr-8 xl:pr-0 flex-shrink-0 bg-gray-50 border-l border-gray-200">
        <Cart translations={translations.cart} classNames='h-full relative w-80' />
      </aside>
    </div>
  )
}

export default Estimation
