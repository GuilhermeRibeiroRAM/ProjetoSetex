import { UserInfo } from '@/business/dtos/user/info';

export type Credentials = {
  email: string;
  password: string;
};

export interface IVerifyUser {
  execute(credentials: Credentials): Promise<UserInfo>;
}
