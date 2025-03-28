import { type ITradeUnion } from './TradeUnion';
import { type IProfile } from './Profile';

export interface IDoc {
  tradeunion: ITradeUnion;
  user: IProfile;
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
  status: 'VIEWED' | 'NEW';
  guid: string;
  data: {
    isActive: boolean;
    inviteDate: string;
    percents: number;
    position: string;
  };
}

export interface INewDoc {
  tradeunion?: ITradeUnion;
  user?: IProfile;
  status: 'VIEWED' | 'NEW';
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
