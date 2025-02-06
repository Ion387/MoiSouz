export interface ITradeUnion {
  title: string;
  creationDate: string;
  ogrn: string;
  inn: string;
  kpp: string;
  id?: number;
  address?: {
    postcode: string;
    region: string;
    area?: string | null;
    city: string;
    street: string;
    house: string;
    flat?: string | null;
  };
  registrationDate: string;
  okato: string;
  oktmo: string;
  chairman?: {
    lastName: string;
    firstName: string;
    middleName?: string | null;
    inn: string;
  };
  chairmanEmail: string;
  chairmanPhone: string;
  bank: {
    bank: string;
    rs: string;
    bik: string;
    ks: string;
  };
  email: string;
  phone: string;
  isActive: boolean;
  logo?: object | null | string;
  percents?: number;
  tradeunionOwner?: { guid: string };
  scan: object | null | string;
  parent?: {
    inn?: string;
    title?: string;
  } | null;
}
