import { TOKENS } from '@/business/di/tokens';
import { users } from '@/database/drizzle/schema';
import { IUpdateRepository } from '@/business/interfaces/repository/base/update.interface';
import { IUpdateUserRepository } from '@/business/interfaces/repository/user/update.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';

export class UpdateUserRepository implements IUpdateUserRepository {
  private updateUserRepository: IUpdateRepository<Partial<IUser>>;
  constructor(
    @Inject(TOKENS.UpdateRepository)
    private factoryUpdateRepository: (
      table: Table,
    ) => IUpdateRepository<Partial<IUser>>,
  ) {
    this.updateUserRepository = this.factoryUpdateRepository(users);
  }

  async execute(id: string, data: Partial<IUser>): Promise<boolean> {
    const result = await this.updateUserRepository.db
      .update(users)
      .set(data)
      .where(eq(users.id, id));
    return !!result.rowCount;
  }
}