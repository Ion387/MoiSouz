export interface INewProtocol {
  step: string;
  documentDate?: string;
  documentNumber?: string;
  documentType?: string;
  documentTime?: string;
  place: string;
  agenda: string;
  members: string[];
  membersAttending: string[];
  data: {
    file?: unknown;
    documentType?: string;
    documentNumber?: string;
    person: string;
    article: string;
    decision: string;
    for: number;
    against: number;
    abstained: number;
  }[];
}
