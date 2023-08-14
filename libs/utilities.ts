import { APIResponse, ObjectStructure } from "@/types/apiResponse";
import { Currency } from "@/types/currenciesApiResponse";
import { EstimationData } from "@/types/estimation";

export const convertPriceCurrency = (price: number, fromCurrency: string, toCurrency: string, currencies: Currency[]): number => {
  if (fromCurrency === toCurrency) return price
  const baseCurrency: string | undefined = currencies.find(currency => currency.value === 1)?.name;
  if (!baseCurrency) return price

  const toRate: number = currencies.find(currency => currency.name === toCurrency)?.value || 1
  if (fromCurrency === baseCurrency) return price * toRate

  const fromRate: number = currencies.find(currency => currency.name === fromCurrency)?.value || 1
  if (toCurrency === baseCurrency) return price / fromRate

  return price * toRate * (1 / fromRate)
}


export const getUniqueTLDList = (data: ObjectStructure[]): string[] => {
  const tldList = data.flatMap(el => el.domains).map(el => el.domain)
  return Array.from(new Set(tldList))
}

export const findTLDRegistrars = (data: APIResponse, selectedTLD: string, years: number, currencies: Currency[], targetCurrency: string): EstimationData[] => {
  const list = data?.data?.reduce((registrars: EstimationData[], registrar: ObjectStructure) => {
    let match = registrar.domains.filter(el => el.domain === selectedTLD);
    if (match.length === 0) return registrars

    const registrarDetail = data.registrars.find(el => el.id === registrar.rid)
    if (!registrarDetail) return registrars

    registrars.push({
      registrar: registrarDetail,
      detail: match[0],
      date: registrar.date
    });

    return registrars
  }, [])

  return list.sort((a, b) => {
    const priceA = convertPriceCurrency(a.detail.priceReg + (years - 1) * a.detail.priceRen, a.registrar.currency, targetCurrency, currencies)
    const priceB = convertPriceCurrency(b.detail.priceReg + (years - 1) * b.detail.priceRen, b.registrar.currency, targetCurrency, currencies)
    return priceA - priceB
  })
}

export function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const calculatePrice = (price: number, includeVAT: boolean, vat: number): string => {
  return includeVAT ? (price * (1 + vat / 100)).toFixed(2) : price.toFixed(2)
}