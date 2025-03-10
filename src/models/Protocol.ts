export interface INewProtocol {
  documentDate?: string;
  documentNumber?: string;
  documentTime?: string;
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
