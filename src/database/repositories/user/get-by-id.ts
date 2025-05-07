import { TOKENS } from '@/business/di/tokens';
import { users } from '@/database/drizzle/schema';
import { IGetByIdRepository } from '@/business/interfaces/repository/base/get-by-id.interface';
import { IGetUserByIdRepository } from '@/business/interfaces/repository/user/get-by-id.interface';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { IUser } from '@/business/model/user.interface';

export class GetUserByIdRepository implements IGetUserByIdRepository {
  private getByIdRepository: IGetByIdRepository<IUser>;
  constructor(
    @Inject(TOKENS.GetByIdRepository)
    private factoryGetByIdRepository: (
      table: Table,
    ) => IGetByIdRepository<IUser>,
  ) {
    this.getByIdRepository = this.factoryGetByIdRepository(users);
  }

  async execute(id: string): Promise<IUser | null> {
    const user = await this.getByIdRepository.execute(id);

    return user;
  }
}
