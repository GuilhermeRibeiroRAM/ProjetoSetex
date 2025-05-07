import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetUserPagedRepository } from '@/business/interfaces/repository/user/get-paged.interface';
import { IGetPaged } from '@/business/interfaces/use-cases/base/get-paged.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';

export default class GetPagedUser implements IGetPaged<IUser> {
  constructor(
    @Inject(TOKENS.GetUserPagedRepository)
    private readonly getUserPagedRepository: IGetUserPagedRepository,
  ) {}
  async execute(options: IQueryOptions): Promise<IPagedResult<IUser>> {
    const response = await this.getUserPagedRepository.execute({
      ...options,
      columnsComparison: ['name', 'email'],
    });
    return response;
  }
}
