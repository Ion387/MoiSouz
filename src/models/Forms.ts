export interface IFormProfile {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate: string;
  gender: string;
  education: string;
  avatar: object;
  profession: string[];
  position: string[];
  employerTitle: string;
  employerName: string;
  address: {
    postcode: string;
    region: string;
    municipal: string;
    locality: string;
    street: string;
    house: string;
    flat?: string;
  };
  phone: string;
  phoneDop?: string | null;
  children?: {
    name: string;
    gender: string;
    birthdate: string;
  }[];
  hobbies: number[];
  isActive: boolean;
}

export interface IFeedbackForm {
  question: string;
  description?: string;
}
