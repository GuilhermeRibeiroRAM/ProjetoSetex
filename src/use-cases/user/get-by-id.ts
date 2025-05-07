import { TOKENS } from '@/business/di/tokens';
import { IGetUserByIdRepository } from '@/business/interfaces/repository/user/get-by-id.interface';
import { IGetById } from '@/business/interfaces/use-cases/base/get-by-id.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';

export default class GetUserById implements IGetById<IUser> {
  constructor(
    @Inject(TOKENS.GetUserByIdRepository)
    private readonly getUserByIdRepository: IGetUserByIdRepository,
  ) {}
  async execute(id: string): Promise<IUser> {
    const response = await this.getUserByIdRepository.execute(id);
    return response;
  }
}
