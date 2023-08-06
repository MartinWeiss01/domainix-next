import 'server-only'
import { APIResponse } from "@/types/apiResponse"
import { ICurrenciesResponse } from '@/types/currenciesApiResponse'

export async function getDomainixData() {
  const res = await fetch(process.env.NEXT_PUBLIC_DOMAINIX_API_URL, { next: { revalidate: 21600 } })
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data: APIResponse = await res.json()
  return data
}

export async function getCurrenciesData() {
  const res = await fetch(process.env.NEXT_PUBLIC_CURRENCY_API_URL, { next: { revalidate: 86400 } })
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data: ICurrenciesResponse = await res.json()
  return data
}