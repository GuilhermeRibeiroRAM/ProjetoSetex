import { IUser } from '@/business/model/user.interface';

export interface IUpdateUserRepository {
  execute(id: string, data: Partial<IUser>): Promise<boolean>;
}
