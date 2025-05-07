import { TOKENS } from '@/business/di/tokens';
import { UserInfo } from '@/business/dtos/user/info';
import { AppException } from '@/business/exceptions/app-exception';
import {
  Credentials,
  IVerifyUser,
} from '@/business/interfaces/use-cases/auth/verify-user.interface';
import { IGetUserByEmail } from '@/business/interfaces/use-cases/user/get-by-email.interface';
import { I18nTranslations } from '@/i18n/generated';

import { HttpStatus, Inject } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';

export default class VerifyUser implements IVerifyUser {
  constructor(
    @Inject(TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmail,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  async execute(credentials: Credentials): Promise<UserInfo> {
    try {
      const user = await this.getUserByEmailService.execute(credentials.email);
      const authenticated = await compare(credentials.password, user.password);
      if (!authenticated) {
        throw new AppException(
          [{ key: 'general.errors.notauthorized' }],
          HttpStatus.UNAUTHORIZED,
        );
      }
      delete user.password;
      return user;
    } catch (error) {
      throw new AppException(
        [
          {
            key: 'general.errors.notauthorized',
            value: this.i18n.t('responses.invalidCredentials'),
          },
        ],
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
