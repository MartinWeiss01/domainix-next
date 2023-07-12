import { APIResponse } from "@/types/apiResponse"

export async function getDomainixData() {
  const res = await fetch(process.env.NEXT_PUBLIC_DOMAINIX_API_URL, { next: { revalidate: 21600 } })
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data: APIResponse = await res.json()
  return data
}