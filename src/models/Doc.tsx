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
}
