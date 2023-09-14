export type ITokenResponse = {
  success: false
} | {
  success: true; token: string
}