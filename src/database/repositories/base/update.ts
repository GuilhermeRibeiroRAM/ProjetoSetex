import { TOKENS } from '@/business/di/tokens';
import { IUpdateRepository } from '@/business/interfaces/repository/base/update.interface';
import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

export class UpdateRepository<T> implements IUpdateRepository<T> {
  constructor(
    private readonly table: Table & { id: AnyPgColumn },
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase,
  ) {}

  async execute(id: string, data: Partial<T>): Promise<boolean> {
    const result = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id));

    return !!result.rowCount;
  }
}
