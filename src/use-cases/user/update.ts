import { TOKENS } from '@/business/di/tokens';
import { AppException } from '@/business/exceptions/app-exception';
import { IUpdateUserRepository } from '@/business/interfaces/repository/user/update.interface';
import { IGetUserByEmail } from '@/business/interfaces/use-cases/user/get-by-email.interface';
import { IUpdateUser } from '@/business/interfaces/use-cases/user/update.interface';
import { IUser } from '@/business/model/user.interface';
import { userSchema } from '@/business/zod/user/user-validations';
import { HttpStatus, Inject } from '@nestjs/common';

export default class UpdateUser implements IUpdateUser {
  constructor(
    @Inject(TOKENS.UpdateUserRepository)
    private readonly updateUserRepository: IUpdateUserRepository,
    @Inject(TOKENS.GetUserByEmailService)
    private readonly getUserByEmail: IGetUserByEmail,
  ) {}
  async execute(id: string, data: Partial<IUser>): Promise<boolean> {
    const validatedSchema = userSchema.safeParse(data);
    if (!validatedSchema.success) {
      throw new AppException(
        [{ key: 'general.validation.invalidRequestBody' }],
        HttpStatus.BAD_REQUEST,
      );
    }
    const emailAreadyInUse = await this.getUserByEmail.execute(data.email);

    if (emailAreadyInUse && emailAreadyInUse.id != id) {
      throw new AppException(
        [{ key: 'general.validations.emailAlreadyInUse' }],
        HttpStatus.BAD_REQUEST,
      );
    }
    const response = await this.updateUserRepository.execute(id, data);
    return response;
  }
}
