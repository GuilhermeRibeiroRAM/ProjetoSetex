import { IUser } from '@/business/model/user.interface';

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<IUser>;
}
