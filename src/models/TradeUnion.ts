export interface ITradeUnion {
  title: string;
  creationDate: string;
  ogrn: string;
  inn: string;
  kpp: string;
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
  avatar?: object | null;
}
