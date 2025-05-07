import { TOKENS } from '@/business/di/tokens';
import { IUpdatePassword } from '@/business/interfaces/use-cases/user/update-password.interface';
import { HttpStatus, Inject } from '@nestjs/common';

import { hash } from 'bcryptjs';
import { AppException } from '@/business/exceptions/app-exception';
import { updatePasswordSchema } from '@/business/zod/user/update-password';
import { IUpdateUserRepository } from '@/business/interfaces/repository/user/update.interface';

export default class UpdatePassword implements IUpdatePassword {
  constructor(
    @Inject(TOKENS.UpdateUserRepository)
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}
  async execute(id: string, password: string): Promise<boolean> {
    const validatedSchema = updatePasswordSchema.safeParse({ password });
    if (!validatedSchema.success) {
      throw new AppException(
        [{ key: 'general.validation.invalidPassword' }],
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(password, 10);

    const response = await this.updateUserRepository.execute(id, {
      password: passwordHash,
    });
    return response;
  }
}
