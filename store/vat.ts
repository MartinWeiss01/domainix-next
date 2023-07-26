import { create } from "zustand"

interface IVAT {
  includeVAT: boolean
  vat: number
  setVAT: (vat: number) => void
  setIncludeVAT: (includeVAT: boolean) => void
}

export const useVAT = create<IVAT>(set => ({
  vat: 21,
  includeVAT: true,
  setVAT: (vat: number) => set({ vat }),
  setIncludeVAT: (includeVAT: boolean) => set({ includeVAT })
}))