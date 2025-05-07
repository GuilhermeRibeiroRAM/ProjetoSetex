import { IUser } from '@/business/model/user.interface';

export interface IResetPassword {
  execute(id: string, data?: Partial<IUser>): Promise<boolean>;
}
