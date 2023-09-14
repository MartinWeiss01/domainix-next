"use client"
import { ITokenResponse } from "@/types/api/tokenEndpoint"
import { useEffect } from "react"
import useSWR from "swr"
import Cookies from "js-cookie"

const COOKIE_DAYS_EXPIRATION: number = 7
const fetcher = (url: string): Promise<ITokenResponse> => fetch(url, { method: 'POST' }).then(res => res.json())

export const useRefreshToken = (): { response: ITokenResponse | undefined; error: any; isLoading: boolean } => {
  //Wait for window to be available (Client side only)
  if (typeof window !== 'undefined') {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME)

    if (token === undefined) {
      // If token is not available, fetch it
      const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_APPLICATION_URL + '/api/auth/createToken',
        fetcher
      )

      // Wait for isLoading to be changed, then set the token in cookie in case of success fetch 
      useEffect(() => {
        if (data?.success) {
          Cookies.set(process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME, data.token, { expires: COOKIE_DAYS_EXPIRATION })
        }
      }, [isLoading])

      return {
        response: data,
        error,
        isLoading
      }
    } else {
      // If token is available, return it
      return { response: { success: true, token }, error: undefined, isLoading: false }
    }
  }

  // If window is not available, return undefined values (since Next runs it on server-side first time)
  return {
    response: undefined,
    error: undefined,
    isLoading: true
  }
}