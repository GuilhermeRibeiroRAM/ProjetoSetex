import { TOKENS } from '@/business/di/tokens';
import { IDeleteRepository } from '@/business/interfaces/repository/base/delete.interface';
import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

export class DeleteRepository implements IDeleteRepository {
  constructor(
    private readonly table: Table & { id: AnyPgColumn },
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<boolean> {
    const response = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id));

    return !!response.rowCount;
  }
}
