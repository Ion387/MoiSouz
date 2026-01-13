export interface ITradeUnion {
  discountUsers?: number | null;
  numberOfUsers?: number;
  countOfUsers?: number;
  title: string;
  titleForDocs: string;
  creationDate?: string | null;
  ogrn: string;
  inn?: string;
  kpp?: string;
  id?: number;
  guid?: string;
  address?: {
    postcode?: string | null;
    region?: string | null;
    area?: string | null;
    city?: string | null;
    street?: string | null;
    house?: string | null;
    flat?: string | null;
  };
  registrationDate?: string;
  okato?: string;
  oktmo?: string;
  chairman?: {
    lastName?: string | null;
    firstName?: string | null;
    middleName?: string | null;
  };
  employer?: {
    lastName?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    inn?: string | null;
    title?: string | null;
  };
  chairmanEmail?: string | null;
  chairmanPhone?: string | null;
  bank: {
    bank: string;
    rs: string;
    bik: string;
    ks: string;
  };
  email: string;
  phone: string;
  isActive?: boolean | null;
  logo?: object | null | string;
  percents?: number;
  tradeunionOwner?: { guid: string };
  scan?: object | null | string;
  participants?: object | null | string;
  children?: {
    guid: string;
    inn: string;
    title: string;
  }[];
  tuType?: TtyTypes;
  type: number;
}

export interface ITradeUnionUploadUsersForm {
  tradeunion: number;
}

export type TtyTypes =
  | 'Первичная профсоюзная организация'
  | 'Первичная профсоюзная организация без ИНН'
  | 'Территориальная профсоюзная организация'
  | 'Региональная профсоюзная организация'
  | 'Федерация профсоюзов';
