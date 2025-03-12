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
    isActive: boolean;
    inviteDate: string;
    percents: number;
    position: string;
    file?: unknown;
    documentType?: string;
    documentNumber?: string;
  };
}

export interface INewDoc {
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
  guid?: string;
  data: {
    documentType?: string;
    documentNumber?: string;
    file?: unknown;
    address: string;
    questions?: {
      speaker: string;
      question: string;
    }[];
  };
}
