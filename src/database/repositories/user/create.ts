import { TOKENS } from '@/business/di/tokens';
import { users } from '@/database/drizzle/schema';
import { ICreateRepository } from '@/business/interfaces/repository/base/create.interface';
import { ICreateUserRepository } from '@/business/interfaces/repository/user/create.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { hash } from 'bcryptjs';

export class CreateUserRepository implements ICreateUserRepository {
  private createRepository: ICreateRepository<IUser>;
  constructor(
    @Inject(TOKENS.CreateRepository)
    private factoryCreateRepository: (table: Table) => ICreateRepository<IUser>,
  ) {
    this.createRepository = this.factoryCreateRepository(users);
  }

  async execute(data: IUser): Promise<IUser | null> {
    const newUsers = await this.createRepository.db
      .insert(users)
      .values({ ...data, password: await hash(data.password, 10) })
      .returning();
    if (newUsers.length < 1) return null;

    return newUsers[0];
  }
}
