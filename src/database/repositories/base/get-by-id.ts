import { TOKENS } from '@/business/di/tokens';
import { IGetByIdRepository } from '@/business/interfaces/repository/base/get-by-id.interface';
import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

export class GetByIdRepository<T> implements IGetByIdRepository<T> {
  constructor(
    private readonly table: Table & { id: AnyPgColumn },
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<T | null> {
    const records = (await this.db
      .select()
      .from(this.table)
      .limit(1)
      .where(eq(this.table.id, id))) as T[];

    if (!records || records.length < 1) return null;

    return records[0];
  }
}
