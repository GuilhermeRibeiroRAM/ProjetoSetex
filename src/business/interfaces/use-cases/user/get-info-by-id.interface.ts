import { UserInfo } from '@/business/dtos/user/info';

export interface IGetUserInfoById {
  execute(id: string): Promise<UserInfo>;
}
