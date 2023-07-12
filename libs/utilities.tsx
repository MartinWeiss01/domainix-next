import { ObjectStructure } from "@/types/apiResponse";

export const getUniqueTLDList = (data: ObjectStructure[]): string[] => {
  const tldList = data.flatMap(el => el.domains).map(el => el.domain)
  return Array.from(new Set(tldList))
}