import { IUser } from '@/business/model/user.interface';

export interface IGetUserByIdRepository {
  execute(id: string): Promise<IUser | null>;
}
