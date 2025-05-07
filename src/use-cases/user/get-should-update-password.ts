import { TOKENS } from '@/business/di/tokens';
import { IGetUserByEmail } from '@/business/interfaces/use-cases/user/get-by-email.interface';

import { IGetShouldUpdatePassword } from '@/business/interfaces/use-cases/user/get-should-reset-password.interface';

import { Inject } from '@nestjs/common';
import { compare } from 'bcryptjs';

export default class GetShouldUpdatePassword
  implements IGetShouldUpdatePassword
{
  constructor(
    @Inject(TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmail,
  ) {}
  async execute(email: string): Promise<boolean> {
    const DEFAULT_PASSWORD = 'teste123';

    const user = await this.getUserByEmailService.execute(email);
    const response = await compare(DEFAULT_PASSWORD, user.password);

    return response;
  }
}
