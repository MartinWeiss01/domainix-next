'use client'

import { FormState } from "@/types/estimation"
import { useState } from "react"

interface FormProps {
  availableTLDs: string[]
  findAction: (formData: FormState) => void
  processing: boolean
}

const INITIAL_FORM_STATE: FormState = {
  tld: '',
  domain: '',
  years: 1
}

const Form = ({ availableTLDs, findAction, processing }: FormProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)

  return (
    <div className="flex flex-col p-6 space-y-3 bg-gray-50 rounded-lg">
      <h2 className="font-bold text-2xl">Search</h2>

      <div className="flex flex-col space-y-1">

        <label htmlFor="domain" className="xs:block text-sm font-medium leading-6 text-gray-900 hidden">
          Domain Name
        </label>
        <div className="flex flex-col xs:flex-row w-full space-y-2 xs:space-y-0">
          <label htmlFor="domain" className="block text-sm font-medium leading-6 text-gray-900 xs:hidden">
            Domain Name
          </label>
          <input name="domain" id="domain" className="border border-gray-100 xs:border-0 px-3 py-4 text-sm md:font-semibold bg-white text-gray-900 outline-0 w-full rounded xs:rounded-none xs:rounded-l" value={formData.domain} onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))} type="text" placeholder="absolutelyuniquedomain" />

          <label htmlFor="tld" className="block text-sm font-medium leading-6 text-gray-900 xs:hidden">
            TLD
          </label>
          <input name="tld" id="tld" className="border border-gray-100 xs:border-0 px-3 py-4 text-sm md:font-semibold bg-gray-100 text-black outline-0 w-full xs:w-[164px] rounded xs:rounded-none xs:rounded-r" value={formData.tld} onChange={(e) => setFormData(prev => ({ ...prev, tld: e.target.value }))} list="available-tlds" id="tld" name="tld" placeholder=".com" />
          <datalist id="available-tlds">
            {availableTLDs.map(el => (
              <option value={el} key={el} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <h2 className="block text-sm font-medium leading-6 text-gray-900">Years</h2>

        <div className="flex items-center space-x-3 w-full">
          <input className="w-full accent-primary-600" type="range" min="1" max="10" value={formData.years} onChange={(e) => setFormData(prev => ({ ...prev, years: parseInt(e.target.value) }))} />
          <div className="border flex items-center p-1 w-9 h-9 justify-center font-semibold uppercase text-sm">
            {formData.years}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-full sm:w-auto py-3 px-5 bg-gray-900 hover:bg-black transition-colors text-white text-sm font-semibold rounded" onClick={() => findAction(formData)} disabled={processing}>
          {
            processing ? 'Processing...' : 'Find Registrars'
          }
        </button>
      </div>
    </div>
  )
}

export default Form