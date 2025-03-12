export interface INewDocument {
  documentDate?: string;
  documentNumber?: string;
  documentType?: string;
  address: string;
  questions?: {
    speaker: string;
    question: string;
  }[];
}
