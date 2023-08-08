'use client'

import { useVAT } from "@/store/vat"

const VATValue = () => {
  const { vat, setVAT } = useVAT()

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={vat}
        onChange={e => setVAT(Number(e.target.value))}
        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
      />
      <span>
        %
      </span>
    </div>
  )
}

export default VATValue