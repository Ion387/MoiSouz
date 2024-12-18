export interface IFormProfile {
  user: {
    fname: string;
    lname: string;
    mname?: string;
    bdate: Date;
    gender: string;
    education: string;
    avatar: any;
  };
  profession: string[];
  position: string[];
  address: {
    index: string;
    region: string;
    municipal: string;
    locality: string;
    street: string;
    house: string;
    flat?: string;
  };
  phone: string;
  phoneExtra?: string;
  child?: {
    name: string;
    gender: string;
    bdate: Date;
  }[];
  hobbies: string[];
  approval: boolean;
}
