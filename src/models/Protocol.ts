export interface INewProtocol {
  step: string;
  documentDate?: string;
  documentNumber?: string;
  documentType?: string;
  documentTime?: string;
  guid: string;
  files: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
  file: string;
  place: string;
  agenda: string;
  members: string[];
  membersAttending: string[];
  data: {
    person: string;
    article: string;
    decision: string;
    for: number;
    against: number;
    abstained: number;
  }[];
}
