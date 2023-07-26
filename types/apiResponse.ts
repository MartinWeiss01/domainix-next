export interface APIResponse {
  success: boolean;
  registrars: Registrar[];
  data: ObjectStructure[];
}

export interface ObjectStructure {
  rid: number;
  date: number;
  vat: boolean | string;
  domains: TLD[];
}

export interface TLD {
  domain: string;
  priceReg: number;
  priceRen: number;
  priceTransfer?: number | null;
  minimumPeriod?: number;
  minimumPeriodRenewal?: number;
  maxPeriod?: number;
}

export interface Registrar {
  id: number;
  name: string;
  slug: string;
  url: string;
  img: string;
}
