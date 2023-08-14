import { Currency } from "@/types/currenciesApiResponse";
import { create } from "zustand";

interface ICurrency {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  setCurrencies: (currencies: Currency[]) => void;
  setSelectedCurrency: (currency: Currency) => void;
  getDefaultCurrency: () => Currency;
  getSelectedCurrency: () => Currency;
}

export const DEFAULT_CURRENCIES_AVAILABLE: Currency[] = [
  { "name": "CZK", "value": 24.26, "date": new Date("2023-08-04") },
  { "name": "USD", "value": 1.0946, "date": new Date("2023-08-04") },
  { "name": "EUR", "value": 1, "date": new Date("2023-08-04") }
]

export const useCurrency = create<ICurrency>((set, get) => ({
  currencies: DEFAULT_CURRENCIES_AVAILABLE,
  selectedCurrency: null,
  setCurrencies: (currencies) => set({ currencies }),
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
  getDefaultCurrency: () => get().currencies[0],
  getSelectedCurrency: () => get().selectedCurrency || get().getDefaultCurrency()
}))