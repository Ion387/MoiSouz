import { type ITradeUnion } from './TradeUnion';
import { type IProfile } from './Profile';

export interface IDoc {
  tradeunion: ITradeUnion;
  user: IProfile;
  status: string;
  title: string;
  files: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
  documentDate: string;
  documentType: string;
  documentNumber: string;
  folder: string;
  id?: number;
  file: string;
  step: string;
  guid: string;
  data: {
    employerName: string;
    employerTitle: string;
    isActive: boolean;
    inviteDate: string;
    percents: number;
    position: string;
  };
}

export interface INewDoc {
  tradeunion?: ITradeUnion;
  user?: IProfile;
  status: string;
  title: string;
  files: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
  documentDate: string;
  documentType: string;
  documentNumber: string;
  folder: string;
  id?: number;
  file: string;
  step: string;
  guid?: string;
  data: {
    address: string;
    questions?: {
      speaker: string;
      question: string;
      document?: string;
    }[];
  };
}
