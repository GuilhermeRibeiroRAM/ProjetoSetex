import { TOKENS } from '@/business/di/tokens';
import { users } from '@/database/drizzle/schema';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetPagedRepository } from '@/business/interfaces/repository/base/get-paged.interface';
import { IGetUserPagedRepository } from '@/business/interfaces/repository/user/get-paged.interface';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { IUser } from '@/business/model/user.interface';

export class GetUserPagedRepository implements IGetUserPagedRepository {
  private getPagedRepository: IGetPagedRepository<IUser>;
  constructor(
    @Inject(TOKENS.GetPagedRepository)
    private factoryGetPagedRepository: (
      table: Table,
    ) => IGetPagedRepository<IUser>,
  ) {
    this.getPagedRepository = this.factoryGetPagedRepository(users);
  }

  async execute(options: IQueryOptions): Promise<IPagedResult<IUser>> {
    const users = await this.getPagedRepository.execute(options);

    return users;
  }
}
