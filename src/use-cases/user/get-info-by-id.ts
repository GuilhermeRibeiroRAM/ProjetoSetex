import { TOKENS } from '@/business/di/tokens';
import { UserInfo } from '@/business/dtos/user/info';
import { IGetUserInfoByIdRepository } from '@/business/interfaces/repository/user/get-info-by-id.interface';
import { IGetUserInfoById } from '@/business/interfaces/use-cases/user/get-info-by-id.interface';
import { Inject } from '@nestjs/common';

export default class GetUserInfoById implements IGetUserInfoById {
  constructor(
    @Inject(TOKENS.GetUserInfoByIdRepository)
    private readonly getUserInfoByIdRepository: IGetUserInfoByIdRepository,
  ) {}
  async execute(id: string): Promise<UserInfo> {
    const response = await this.getUserInfoByIdRepository.execute(id);
    return response;
  }
}
