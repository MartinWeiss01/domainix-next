import { ObjectStructure } from "@/types/apiResponse";
import { EstimationData } from "@/types/estimation";

export const getUniqueTLDList = (data: ObjectStructure[]): string[] => {
  const tldList = data.flatMap(el => el.domains).map(el => el.domain)
  return Array.from(new Set(tldList))
}

export const findTLDRegistrars = (data: ObjectStructure[], selectedTLD: string): EstimationData[] => {
  return data.reduce((registrars: EstimationData[], registrar: ObjectStructure) => {
    let match = registrar.domains.filter(el => el.domain === selectedTLD);
    if (match.length === 0) return registrars

    registrars.push({
      rid: registrar.rid,
      date: registrar.date,
      domain: match[0].domain,
      priceReg: match[0].priceReg,
      priceRen: match[0].priceRen
    });

    return registrars
  }, [])
}