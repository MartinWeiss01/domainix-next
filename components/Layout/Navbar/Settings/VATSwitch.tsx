'use client'

import { useVAT } from "@/store/vat"
import { Switch } from "@headlessui/react"

const VATSwitch = () => {
  const { includeVAT, setIncludeVAT } = useVAT()

  return (
    <Switch
      checked={includeVAT}
      onChange={() => setIncludeVAT(!includeVAT)}
      className={`${includeVAT ? 'bg-primary-700' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span aria-hidden="true" className={`${includeVAT ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-3 w-3 rounded-full bg-white transform ring-0 transition ease-in-out duration-200`} />
    </Switch>
  )
}

export default VATSwitch