import { UserInfo } from '@/business/dtos/user/info';

export interface IRefreshToken {
  execute(refreshToken: string, userId: string): Promise<UserInfo>;
}
