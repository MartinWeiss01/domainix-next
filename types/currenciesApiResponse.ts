export interface ICurrenciesResponse {
  success: boolean;
  currency: Currency[];
}

export interface Currency {
  name: string;
  value: number;
  date: Date;
}