import { IQuestion } from './Protocol';

export interface IEP {
  documentDate?: string;
  documentNumber?: string;
  data: {
    parent?: string | null;
    question: string;
    resolution: string;
    parentGuid: string;
  };
  tradeunion: number;
  id?: number | null;
}

export interface IRu {
  documentDate?: string;
  documentNumber?: string;
  data: {
    questions: IQuestion[];
    parentGuid: string;
  };
  tradeunion: number;
  id?: number | null;
}
