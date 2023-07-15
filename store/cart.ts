import { CartData } from "@/types/cart";
import { create } from "zustand";

interface ICart {
  domains: CartData[]
  addDomain: (domain: CartData) => void
  removeDomain: (domain: CartData) => void
}

export const useCart = create<ICart>(set => ({
  domains: [],
  addDomain: (domain: CartData) => {
    set(state => {
      if (!state.domains.some(d =>
        d.rid === domain.rid &&
        d.domain === domain.domain &&
        d.selectedDomain === domain.selectedDomain)
      ) {
        return {
          domains: [...state.domains, domain]
        }
      }
      else {
        return {
          domains: state.domains
        }
      }
    })
  },
  removeDomain: (domain: CartData) => {
    set(state => ({
      domains: state.domains.filter(d =>
        d.rid !== domain.rid &&
        d.domain !== domain.domain &&
        d.selectedDomain !== domain.selectedDomain
      )
    }))
  }
}))