import { IUser } from '@/business/model/user.interface';

export interface IGetUserByEmail {
  execute(email: string): Promise<IUser | undefined>;
}
