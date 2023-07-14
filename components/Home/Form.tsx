'use client'

import { useState } from "react"

interface FormProps {
  availableTLDs: string[]
  findAction: (selectedTLD: string) => void
  processing: boolean
}

const Form = ({ availableTLDs, findAction, processing }: FormProps) => {
  const [tld, setTld] = useState('')

  return (
    <div className="bg-red-400">
      <h2>Form Component</h2>
      <label htmlFor="tld">Choose a TLD:</label>
      <input value={tld} onChange={(e) => setTld(e.target.value)} list="available-tlds" id="tld" name="tld" />

      <datalist id="available-tlds">
        {availableTLDs.map(el => (
          <option value={el} key={el} />
        ))}
      </datalist>

      {processing && <p>Processing...</p>}
      <button onClick={() => findAction(tld)} disabled={processing}>
        {
          processing ? 'Processing...' : 'Find'
        }
      </button>
    </div>
  )
}

export default Form