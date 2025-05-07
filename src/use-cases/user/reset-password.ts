import { TOKENS } from '@/business/di/tokens';

import { IResetPassword } from '@/business/interfaces/use-cases/user/reset-password.interface';

import { Inject } from '@nestjs/common';

import { hash } from 'bcryptjs';
import { IUpdateUserRepository } from '@/business/interfaces/repository/user/update.interface';

export default class ResetPassword implements IResetPassword {
  constructor(
    @Inject(TOKENS.UpdateUserRepository)
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const DEFAULT_PASSWORD = await hash('teste123', 10);

    const response = await this.updateUserRepository.execute(id, {
      password: DEFAULT_PASSWORD,
    });
    return response;
  }
}
