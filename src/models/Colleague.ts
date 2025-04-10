export interface IFormColleagueProfile {
  id?: number;
  guid?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: string;
  gender: string;
  education: string;
  avatar?: object | string | null;
  profession?: string[];
  position: string[];
  name?: string;
  address: {
    postcode?: string | null;
    region?: string | null;
    municipal?: string | null;
    locality?: string | null;
    street?: string | null;
    house?: string | null;
    flat?: string | null;
  };
  phone: string;
  phoneDop?: string | null;
  children?: {
    name: string;
    gender: string;
    birthdate: string;
  }[];
  hobbies?: number[];
  email: string;
  role: string;
  reason?: string | null;
  reasonFile?: string | null;
  history?: {
    name: string;
    startDate: string;
    finishDate: string;
  }[];
  isActive?: boolean;
}
