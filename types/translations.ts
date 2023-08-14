export interface ITranslations {
  registrars: ITranslationsRegistrars;
  estimation: ITranslationsEstimation;
  navbar: ITranslationsNavbar;
  footer: ITranslationsFooter;
}

export interface ITranslationsEstimation {
  form: ITranslationsForm;
  table: ITranslationsTable;
  cart: ITranslationsCart;
}

export interface ITranslationsCart {
  title: string;
  priceTotal: string;
  currencyCZK: string;
  currencyUSD: string;
  currencyEUR: string;
  emptyTitle: string;
  emptyDescription: string;
  item: ITranslationsItem;
  [key: string]: any;
}

export interface ITranslationsItem {
  pluralOne: string;
  pluralFew: string;
  pluralOther: string;
  [key: string]: string;
}

export interface ITranslationsForm {
  title: string;
  domain: ITranslationsDomain;
  tld: ITranslationsDomain;
  years: string;
  button: string;
  processing: string;
}

export interface ITranslationsDomain {
  label: string;
  placeholder: string;
}

export interface ITranslationsTable {
  colRegistrar: string;
  colDomain: string;
  colRegPrice: string;
  colRenPrice: string;
  colTotalPrice: string;
  colAddToCart: string;
  currencyCZK: string;
  currencyUSD: string;
  currencyEUR: string;
  priceDuration: string;
  paginationNext: string;
  paginationPrevious: string;
  [key: string]: string;
}

export interface ITranslationsFooter {
  madeWithLove: string;
}

export interface ITranslationsNavbar {
  language: string;
  vatInclude: string;
  vatValue: string;
  menuOpen: string;
  settigs: string;
  links: ITranslationsLinks;
}

export interface ITranslationsLinks {
  home: string;
  registrars: string;
  [key: string]: string;
}

export interface ITranslationsRegistrars {
  list: ITranslationsList;
  details: ITranslationsDetails;
}

export interface ITranslationsDetails {
  card: ITranslationsCard;
  detail: ITranslationsDetail;
}

export interface ITranslationsCard {
  title: string;
  web: string;
  tldCount: string;
  lastUpdate: string;
}

export interface ITranslationsDetail {
  title: string;
  colTld: string;
  colRegPrice: string;
  colRenPrice: string;
  currencyCZK: string;
  currencyUSD: string;
  currencyEUR: string;
  priceDuration: string;
  [key: string]: string;
}

export interface ITranslationsList {
  title: string;
}
