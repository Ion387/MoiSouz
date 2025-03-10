export interface INewDocument {
  documentDate?: string;
  documentNumber?: string;
  place: string;
  data: {
    person: string;
    article: string;
  }[];
}
