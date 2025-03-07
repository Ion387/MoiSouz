export interface INewDocument {
  documentDate?: string;
  documentNumber?: string;
  data: {
    person: string;
    place: string;
    article: string;
  }[];
}
