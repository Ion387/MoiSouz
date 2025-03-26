export interface INewProtocol {
  step: string;
  documentDate: string;
  documentNumber: string;
  documentType?: string;
  documentTime?: string;
  address: string;
  documentAG: string;
  userList: string[];

  guid: string;
  files: {
    type: string;
    source: string;
    originalName: string;
    size: number;
  }[];
  file: string;
  questions: {
    speaker: string;
    question: string;
    decided: string;
    document: string;
    approved: number;
    declined: number;
    ignored: number;
  }[];
}

export interface INewProt {
  documentDate: string;
  documentNumber: string;
  documentType?: string;
  guid?: string;
  documentTime?: string;
  address: string;
  documentAG: string;
  userList?: (string | undefined)[];
  step: string;
  questions: {
    speaker: string;
    question: string;
    decided: string;
    document?: string;
    approved?: number;
    declined?: number;
    ignored?: number;
  }[];
  data?: { documentAG?: string; documentTime?: string };
}
