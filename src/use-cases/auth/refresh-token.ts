import { TOKENS } from '@/business/di/tokens';
import { UserInfo } from '@/business/dtos/user/info';
import { AppException } from '@/business/exceptions/app-exception';
import { IRefreshToken } from '@/business/interfaces/use-cases/auth/refresh-token.interface';
import { IGetUserInfoById } from '@/business/interfaces/use-cases/user/get-info-by-id.interface';
import { HttpStatus, Inject } from '@nestjs/common';

export default class RefreshToken implements IRefreshToken {
  constructor(
    @Inject(TOKENS.GetUserInfoByIdService)
    private readonly getUserInfoByIdService: IGetUserInfoById,
  ) {}
  async execute(refreshToken: string, userId: string): Promise<UserInfo> {
    try {
      const user = await this.getUserInfoByIdService.execute(userId);
      //compare with stored refresh token
      if (!user) {
        throw new AppException(
          [{ key: 'general.errors.notauthorized' }],
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (error) {
      throw new AppException(
        [
          {
            key: 'general.errors.notauthorized',
            value: 'Refresh token is not valid.',
          },
        ],
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
