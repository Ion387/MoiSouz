import { ISignin } from './Signin';

export interface IReg extends ISignin {
  passwordRepeat: string;
  name: string;
  surname: string;
  patronymic?: string | null;
}
