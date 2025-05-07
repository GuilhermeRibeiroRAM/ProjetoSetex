import { TOKENS } from '@/business/di/tokens';
import { IGetUserByEmailRepository } from '@/business/interfaces/repository/user/get-by-email.interface';
import { IGetUserByEmail } from '@/business/interfaces/use-cases/user/get-by-email.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';

export default class GetUserByEmail implements IGetUserByEmail {
  constructor(
    @Inject(TOKENS.GetUserByEmailRepository)
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}
  async execute(email: string): Promise<IUser | undefined> {
    const response = await this.getUserByEmailRepository.execute(email);

    return response;
  }
}
