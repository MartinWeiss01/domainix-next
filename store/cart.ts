import { CartData } from "@/types/cart";
import { create } from "zustand";

interface ICart {
  domains: CartData[]
  addDomain: (domain: CartData) => void
  removeDomain: (domain: CartData) => void
  increaseYear: (domain: CartData, year: number) => void
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
        !(
          d.rid === domain.rid &&
          d.domain === domain.domain &&
          d.selectedDomain === domain.selectedDomain
        )
      )
    }))
  },
  increaseYear: (domain: CartData, year: number) => {
    set(state => ({
      domains: state.domains.map(d => {
        if (
          d.registrar.id === domain.registrar.id &&
          d.detail.domain === domain.detail.domain &&
          d.selectedDomain === domain.selectedDomain
        ) {
          if (d.years + year > 10) {
            return d
          } else if (d.years + year < 1) {
            return d
          } else return {
            ...d,
            years: year + d.years
          }
        }
        else {
          return d
        }
      })
    }))
  }
}))