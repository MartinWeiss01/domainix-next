"use client"
import { ITokenResponse } from "@/types/api/tokenEndpoint"
import { useEffect } from "react"
import useSWR from "swr"
import Cookies from "js-cookie"
import { globalFetcher } from "@/libs/globalSWRFetcher"

const COOKIE_DAYS_EXPIRATION: number = 7

export const useRefreshToken = (): { response: ITokenResponse | undefined; error: any; isLoading: boolean } => {
  const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME)

  // If token is not available, fetch it
  const { data, error, isLoading } = useSWR<ITokenResponse>(
    typeof window !== 'undefined' && token === undefined ?
      [`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/auth/createToken`, { method: 'POST' }] : null,
    ([url, args]) => globalFetcher(url, args),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  // Wait for isLoading to be changed, then set the token in cookie in case of success fetch 
  useEffect(() => {
    if (data?.success) {
      Cookies.set(process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME, data.token, { expires: COOKIE_DAYS_EXPIRATION })
    }
  }, [isLoading])

  return {
    response: data ? data : (token ? { success: true, token } : undefined),
    error,
    isLoading
  }
}