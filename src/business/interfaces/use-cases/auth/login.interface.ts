import { UserInfo } from '@/business/dtos/user/info';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAccessToken: Date;
  expiresRefreshToken: Date;
  shouldUpdatePassword?: boolean;
};

export interface ILogin {
  execute(user: UserInfo): Promise<LoginResponse>;
}
