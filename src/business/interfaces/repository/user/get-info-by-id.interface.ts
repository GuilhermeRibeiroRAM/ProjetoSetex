import { UserInfo } from '@/business/dtos/user/info';

export interface IGetUserInfoByIdRepository {
  execute(id: string): Promise<UserInfo>;
}
