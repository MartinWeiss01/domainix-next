import { APIResponse, ObjectStructure } from "@/types/apiResponse";
import { EstimationData } from "@/types/estimation";

export const getUniqueTLDList = (data: ObjectStructure[]): string[] => {
  const tldList = data.flatMap(el => el.domains).map(el => el.domain)
  return Array.from(new Set(tldList))
}

export const findTLDRegistrars = (data: APIResponse, selectedTLD: string, years: number): EstimationData[] => {
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
    const priceA = a.detail.priceReg + (years - 1) * a.detail.priceRen
    const priceB = b.detail.priceReg + (years - 1) * b.detail.priceRen
    return priceA - priceB
  })
}

export function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const calculatePrice = (price: number, includeVAT: boolean, vat: number): string => {
  return includeVAT ? (price * (1 + vat / 100)).toFixed(2) : price.toFixed(2)
}