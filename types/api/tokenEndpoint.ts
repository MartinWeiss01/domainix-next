export type ITokenResponse = {
  success: false
} | {
  success: true; token: string
}

export type TWhoisStatusOptions = 'unknown' | 'reserved' | 'registered' | 'available'
export type TWhoisAPIResponse = { status: TWhoisStatusOptions; score: number }