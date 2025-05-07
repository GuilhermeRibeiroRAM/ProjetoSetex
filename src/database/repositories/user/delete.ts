import { TOKENS } from '@/business/di/tokens';
import { users } from '@/database/drizzle/schema';
import { IDeleteRepository } from '@/business/interfaces/repository/base/delete.interface';
import { IDeleteUserRepository } from '@/business/interfaces/repository/user/delete.interface';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class DeleteUserRepository implements IDeleteUserRepository {
  private deleteRepository: IDeleteRepository;
  constructor(
    @Inject(TOKENS.DeleteRepository)
    private factoryDeleteRepository: (table: Table) => IDeleteRepository,
  ) {
    this.deleteRepository = this.factoryDeleteRepository(users);
  }

  async execute(id: string): Promise<boolean> {
    const response = await this.deleteRepository.execute(id);

    return response;
  }
}
