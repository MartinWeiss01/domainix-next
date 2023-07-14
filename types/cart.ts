import { EstimationData } from "./estimation"

export interface CartData extends EstimationData {
  selectedDomain: string
  years: number
}