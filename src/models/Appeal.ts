export interface IAppeal {
  documentDate?: string;
  documentNumber?: string;
  data: {
    text: string;
    type: string;
    isActive: boolean;
    answer?: string;
  };
  tradeunion: number;
  id?: number | null;
}
