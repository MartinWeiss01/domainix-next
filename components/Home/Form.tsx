'use client'

import { classNames } from "@/libs/utilities"
import { FormState } from "@/types/estimation"
import { useEffect, useRef, useState } from "react"

interface FormProps {
  availableTLDs: string[]
  findAction: (formData: FormState) => void
  processing: boolean
}

const INITIAL_FORM_STATE: FormState = {
  tld: '',
  domain: '',
  years: 1,
  enabled: false,
}

const Form = ({ availableTLDs, findAction, processing }: FormProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const tldInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const domain = formData.domain.replace(/\s/g, '')
    const tld = formData.tld.replace(/\s/g, '')

    setFormData(prev => ({
      ...prev,
      enabled: (domain.length > 0 && tld.length > 0)
    }))
  }, [formData.domain, formData.tld])


  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.endsWith('.')) {
      setFormData(prev => ({
        ...prev,
        tld: '.'
      }))
      tldInputRef.current?.focus()
    } else {
      setFormData(prev => ({
        ...prev,
        domain: value,
      }))
    }
  }

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gray-50 rounded-lg">
      <h2 className="font-bold text-2xl">Search</h2>

      <div className="flex flex-col space-y-1">

        <label htmlFor="domain" className="xs:block text-sm font-medium leading-6 text-gray-900 hidden">
          Domain Name
        </label>
        <div className="flex flex-col xs:flex-row w-full space-y-2 xs:space-y-0">
          <label htmlFor="domain" className="block text-sm font-medium leading-6 text-gray-900 xs:hidden">
            Domain Name
          </label>
          <input
            name="domain"
            id="domain"
            value={formData.domain}
            onChange={(e) => handleDomainChange(e)}
            type="text"
            placeholder="absolutelyuniquedomain"
            className="border border-gray-100 xs:border-0 px-3 py-4 text-sm md:font-semibold bg-white text-gray-900 outline-0 w-full rounded xs:rounded-none xs:rounded-l"
          />

          <label htmlFor="tld" className="block text-sm font-medium leading-6 text-gray-900 xs:hidden">
            TLD
          </label>
          <input
            name="tld"
            id="tld"
            ref={tldInputRef}
            value={formData.tld}
            onChange={(e) => setFormData(prev => ({ ...prev, tld: e.target.value }))}
            list="available-tlds"
            placeholder=".com"
            className="border border-gray-100 xs:border-0 px-3 py-4 text-sm md:font-semibold bg-gray-100 text-black outline-0 w-full xs:w-[164px] rounded xs:rounded-none xs:rounded-r"
          />
          <datalist id="available-tlds">
            {availableTLDs.map(el => (
              <option value={el} key={el} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full">
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="years" className="block text-sm font-medium leading-6 text-gray-900">
            Years
          </label>

          <div className="w-full flex flex-col">
            <input
              name="years"
              id="years"
              className="w-full range-slider"
              type="range" min="1" max="10" value={formData.years} onChange={(e) => setFormData(prev => ({ ...prev, years: parseInt(e.target.value) }))} />
            <div className="flex justify-between text-xs mt-3 text-gray-400">
              <span className="w-4 h-4 flex items-center justify-center">1</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">2</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">3</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">4</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">5</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">6</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">7</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">8</span>
              <span className="hidden w-4 h-4 xs:flex items-center justify-center">9</span>
              <span className="w-4 h-4 flex items-center justify-center">10</span>
            </div>
          </div>
        </div>
        <div className="border flex items-center p-1 w-9 h-9 justify-center font-semibold uppercase text-sm">
          {formData.years}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => findAction(formData)} disabled={!formData.enabled}
          className={
            classNames(
              "w-full sm:w-auto py-3 px-5 bg-gray-900 hover:bg-black transition-colors text-white text-sm font-semibold rounded",
              !formData.enabled && 'opacity-25 cursor-not-allowed'
            )
          }
        >
          {
            processing ? 'Processing...' : 'Find Registrars'
          }
        </button>
      </div>
    </div>
  )
}

export default Form