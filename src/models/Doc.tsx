import { type ITradeUnion } from './TradeUnion';
import { type IProfile } from './Profile';

export interface IDoc {
  tradeunion: ITradeUnion;
  user: IProfile;
  status: string;
  title: string;
  documentDate: string;
  documentType: string;
  documentNumber: string;
  id?: number;
  file: string;
  step: string;
  guid: string;
  data: {
    isActive: boolean;
    inviteDate: string;
    percents: number;
    position: string;
  };
}
