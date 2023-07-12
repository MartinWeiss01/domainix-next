export interface APIResponse {
  success: boolean;
  registrars: Registrar[];
  data: ObjectStructure[];
}

export interface ObjectStructure {
  rid: number;
  date: number;
  domains: TLD[];
  name?: string;
  slug?: string;
  updated?: string;
}

export interface TLD {
  domain: string;
  priceReg: number;
  priceRen: number;
  priceTransfer?: number;
  minimumPeriodReg?: number;
  minimumPeriodRenewal?: number;
  minimumPeriod?: number;
}

export interface Registrar {
  id: number;
  name: string;
  slug: string;
  url: string;
  img: string;
}
