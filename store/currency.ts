import { Currency } from "@/types/currenciesApiResponse";
import { create } from "zustand";

interface ICurrency {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  setCurrencies: (currencies: Currency[]) => void;
  setSelectedCurrency: (currency: Currency) => void;
  getDefaultCurrency: () => Currency;
  getExchangeRate: (fromCurrency: string, toCurrency: string) => number;
  convertPrice: (price: number, fromCurrency: string, toCurrency?: string) => number;
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
  getExchangeRate: (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return 1
    const baseCurrency: string | undefined = get().currencies.find(currency => currency.value === 1)?.name;
    if (!baseCurrency) return 1

    const toRate: number = get().currencies.find(currency => currency.name === toCurrency)?.value || 1
    if (fromCurrency === baseCurrency) return toRate

    const fromRate: number = get().currencies.find(currency => currency.name === fromCurrency)?.value || 1
    if (toCurrency === baseCurrency) return 1 / fromRate

    return toRate * (1 / fromRate)
  },
  convertPrice: (price, fromCurrency, toCurrency) => {
    const selectedCurrency = toCurrency || get().selectedCurrency?.name || get().getDefaultCurrency().name;
    return price * get().getExchangeRate(fromCurrency, selectedCurrency);
  },
}))