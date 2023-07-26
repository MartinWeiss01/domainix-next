import { create } from "zustand"

interface IVAT {
  includeVAT: boolean
  vat: number
  setVAT: (vat: number) => void
  setIncludeVAT: (includeVAT: boolean) => void
}

const DEFAULT_VAT_VALUE = 21
const DEFAULT_INCLUDE_VAT = true

export const useVAT = create<IVAT>(set => ({
  vat: DEFAULT_VAT_VALUE,
  includeVAT: DEFAULT_INCLUDE_VAT,
  setVAT: (vat: number) => set(state => {
    if (vat < 0 || vat > 100) return state
    else {
      return {
        vat,
        includeVAT: vat !== 0
      }
    }
  }),
  setIncludeVAT: (includeVAT: boolean) => set(state => {
    if (includeVAT && state.vat === 0) {
      return {
        vat: DEFAULT_VAT_VALUE,
        includeVAT
      }
    } else return { includeVAT }
  })
}))