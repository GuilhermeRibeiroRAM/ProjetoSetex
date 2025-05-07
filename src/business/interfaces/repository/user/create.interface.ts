import { IUser } from '@/business/model/user.interface';

export interface ICreateUserRepository {
  execute(data: IUser): Promise<IUser | null>;
}
