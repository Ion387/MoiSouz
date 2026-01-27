import { IQuestion } from './Protocol';
import { type ITradeUnion } from './TradeUnion';

export interface IEPDoc {
  documentDate: string;
  documentType?: string;
  documentNumber: string;
  guid?: string;
  step: string;
  tradeunion: ITradeUnion;
  data: {
    parent?: string | null;
    question: string;
    resolution: string;
  };
  id?: number;
  file: null;
  files?: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
}

export interface IRuDoc {
  documentDate: string;
  documentType?: string;
  documentNumber: string;
  guid?: string;
  step: string;
  tradeunion: ITradeUnion;
  data: {
    parentGuid: string;
    questions: IQuestion[];
  };
  id?: number;
  file: null;
  files?: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
}
