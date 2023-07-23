import { Registrar, TLD } from "./apiResponse"

export interface EstimationData {
  registrar: Registrar
  detail: TLD
  date: number
}

export interface FormState {
  tld: string
  domain: string
  years: number
  enabled: boolean
}