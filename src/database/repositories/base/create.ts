import { TOKENS } from '@/business/di/tokens';
import { ICreateRepository } from '@/business/interfaces/repository/base/create.interface';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class CreateRepository<T> implements ICreateRepository<T> {
  constructor(
    private readonly table: Table,
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase,
  ) {}

  async execute(data: T): Promise<string> {
    const recordsAdded = await this.db
      .insert(this.table)
      .values({ ...data })
      .returning();
    if (recordsAdded.length < 1) return '';

    const { id } = recordsAdded[0];
    return id;
  }
}
