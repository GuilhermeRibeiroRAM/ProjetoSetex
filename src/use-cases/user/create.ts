import { TOKENS } from '@/business/di/tokens';
import { AppException } from '@/business/exceptions/app-exception';
import { ICreateUserRepository } from '@/business/interfaces/repository/user/create.interface';
import { ICreateUser } from '@/business/interfaces/use-cases/user/create.interface';
import { IGetUserByEmail } from '@/business/interfaces/use-cases/user/get-by-email.interface';
import { IUser } from '@/business/model/user.interface';
import { userSchema } from '@/business/zod/user/user-validations';
import { HttpStatus, Inject } from '@nestjs/common';

export default class CreateUser implements ICreateUser {
  constructor(
    @Inject(TOKENS.CreateUserRepository)
    private readonly createUserRepository: ICreateUserRepository,
    @Inject(TOKENS.GetUserByEmailService)
    private readonly getUserByEmail: IGetUserByEmail,
  ) {}
  async execute(data: IUser): Promise<IUser | null> {
    const validatedSchema = userSchema.safeParse(data);
    const emailAreadyInUse = await this.getUserByEmail.execute(data.email);

    if (!validatedSchema.success || !data.password) {
      throw new AppException(
        [{ key: 'general.validation.invalidRequestBody' }],
        HttpStatus.BAD_REQUEST,
      );
    }
    if (emailAreadyInUse) {
      throw new AppException(
        [{ key: 'general.validations.emailAlreadyInUse' }],
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.createUserRepository.execute(data);

    return response;
  }
}
