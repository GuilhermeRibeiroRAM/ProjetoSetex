import { IUser } from '@/business/model/user.interface';

export interface ICreateUser {
  execute(data: IUser): Promise<IUser | null>;
}
