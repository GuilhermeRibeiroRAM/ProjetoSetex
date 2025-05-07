import { IUser } from '@/business/model/user.interface';

export interface IUpdateUser {
  execute(id: string, data: Partial<IUser>): Promise<boolean>;
}
