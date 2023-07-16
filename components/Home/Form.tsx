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
    <div className="bg-red-400 flex flex-col max-w-[400px] p-3 space-y-2">
      <h2>Search</h2>

      <div className="flex flex-col bg-red-500">
        <h2>Domain Name</h2>

        <div className="flex w-full">
          <input className="px-2 py-4 text-sm md:p-4 md:font-semibold bg-white text-gray-900 outline-0 w-full" value={formData.domain} onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))} type="text" placeholder="absolutelyuniquedomain" />
          <input className="px-2 py-4 text-sm md:p-4 md:font-semibold bg-black text-white outline-0 w-full" value={formData.tld} onChange={(e) => setFormData(prev => ({ ...prev, tld: e.target.value }))} list="available-tlds" id="tld" name="tld" placeholder=".com" />
          <datalist id="available-tlds">
            {availableTLDs.map(el => (
              <option value={el} key={el} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex flex-col bg-red-600">
        <h2>Years</h2>

        <div className="flex items-center space-x-3 w-full">
          <input className="w-full" type="range" min="1" max="10" value={formData.years} onChange={(e) => setFormData(prev => ({ ...prev, years: parseInt(e.target.value) }))} />
          <div className="bg-blue-200 w-9 h-9 flex items-center justify-center">
            {formData.years}
          </div>
        </div>
      </div>

      {processing && <p>Processing...</p>}
      <button className="p-4 bg-black text-white" onClick={() => findAction(formData)} disabled={processing}>
        {
          processing ? 'Processing...' : 'Find Registrars'
        }
      </button>
    </div>
  )
}

export default Form