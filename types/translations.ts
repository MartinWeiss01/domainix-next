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
  emptyTitle: string;
  emptyDescription: string;
  item: ITranslationsItem;
}

export interface ITranslationsItem {
  currencyCZK: string;
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
  priceDuration: string;
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
  priceDuration: string;
}

export interface ITranslationsList {
  title: string;
}
