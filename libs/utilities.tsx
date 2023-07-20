import { APIResponse, ObjectStructure } from "@/types/apiResponse";
import { EstimationData } from "@/types/estimation";

export const getUniqueTLDList = (data: ObjectStructure[]): string[] => {
  const tldList = data.flatMap(el => el.domains).map(el => el.domain)
  return Array.from(new Set(tldList))
}

export const findTLDRegistrars = (data: APIResponse, selectedTLD: string): EstimationData[] => {
  return data?.data?.reduce((registrars: EstimationData[], registrar: ObjectStructure) => {
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
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}