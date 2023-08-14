'use client'

import { classNames } from "@/libs/utilities"
import { FormState } from "@/types/estimation"
import { ITranslationsForm } from "@/types/translations"
import { useEffect, useRef, useState } from "react"

interface FormProps {
  availableTLDs: string[]
  findAction: (formData: FormState) => void
  processing: boolean
  translations: ITranslationsForm
}

const INITIAL_FORM_STATE: FormState = {
  tld: '',
  domain: '',
  years: 1,
  enabled: false,
}

const Form = ({ availableTLDs, findAction, processing, translations }: FormProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const tldInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const domain = formData.domain.replace(/\s/g, '')
    const tld = formData.tld.replace(/\s/g, '')

    setFormData(prev => ({
      ...prev,
      enabled: (domain.length > 0 && tld.length > 1)
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!formData.enabled) return
        findAction(formData)
      }}
      className="flex flex-col p-6 space-y-6 bg-gradient-to-tl from-gray-900 to-gray-950 rounded-lg"
    >
      <h2 className="font-bold text-2xl text-white">{translations.title}</h2>

      <fieldset className="flex flex-col space-y-3">
        {/* Desktop Label Only */}
        <label htmlFor="domain" className="xs:block text-sm font-medium leading-6 text-gray-200 hidden">{translations.domain.label}</label>

        <div className="flex flex-col xs:flex-row w-full space-y-2 xs:space-y-0 shadow-xl">
          {/* Domain name */}
          <label htmlFor="domain" className="block text-sm font-medium leading-6 text-gray-200 xs:hidden">{translations.domain.label}</label>
          <input
            name="domain"
            id="domain"
            value={formData.domain}
            onChange={(e) => handleDomainChange(e)}
            type="text"
            placeholder={translations.domain.placeholder}
            className="px-5 py-4 text-sm md:font-semibold bg-white/10 text-white outline-0 w-full rounded xs:rounded-l-lg xs:rounded-r-none"
          />

          {/* TLD */}
          <label htmlFor="tld" className="block text-sm font-medium leading-6 text-gray-200 xs:hidden">{translations.tld.label}</label>
          <input
            name="tld"
            id="tld"
            ref={tldInputRef}
            value={formData.tld}
            onChange={(e) => setFormData(prev => ({ ...prev, tld: e.target.value }))}
            list="available-tlds"
            placeholder={translations.tld.placeholder}
            className="px-3 py-4 text-sm md:font-semibold bg-white/5 text-white outline-0 w-full xs:w-[164px] rounded xs:rounded-r-lg xs:rounded-l-none"
          />
          <datalist id="available-tlds">
            {availableTLDs.map(el => (
              <option value={el} key={el} />
            ))}
          </datalist>
        </div>
      </fieldset>

      <fieldset className="flex items-center space-x-3 w-full">
        <div className="flex flex-col space-y-3 w-full">
          {/* Years */}
          <label htmlFor="years" className="block text-sm font-medium leading-6 text-gray-200">{translations.years}</label>

          <div className="w-full flex flex-col">
            <input
              value={formData.years}
              name="years"
              id="years"
              type="range"
              min="1"
              max="10"
              onChange={(e) => setFormData(prev => ({ ...prev, years: parseInt(e.target.value) }))}
              className="w-full range-slider"
            />

            {/* Years Labels */}
            <p className="flex justify-between text-xs mt-3 text-gray-200">
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
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-gray-950 flex items-center p-1 w-9 h-9 justify-center font-semibold uppercase text-sm text-white">
          {formData.years}
        </span>
      </fieldset>

      <fieldset className="flex justify-end pt-6">
        <input
          value={processing ? translations.processing : translations.button}
          type="submit"
          disabled={!formData.enabled}
          className={
            classNames(
              "w-full sm:w-auto py-3 px-5 transition-colors text-white text-sm font-semibold rounded",
              !formData.enabled ? 'bg-gray-900 hover:bg-black opacity-25 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 cursor-pointer'
            )
          }
        />
      </fieldset>
    </form>
  )
}

export default Form