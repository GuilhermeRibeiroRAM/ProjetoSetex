import { TOKENS } from '@/business/di/tokens';
import { CreateRepository } from '@/database/repositories/base/create';
import { DeleteRepository } from '@/database/repositories/base/delete';
import { GetByIdRepository } from '@/database/repositories/base/get-by-id';
import { GetPagedRepository } from '@/database/repositories/base/get-paged';
import { UpdateRepository } from '@/database/repositories/base/update';
import { Provider } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

export const baseProviders: Provider[] = [
  {
    inject: [TOKENS.DrizzleAsyncProvider],
    provide: TOKENS.CreateRepository,
    useFactory: (db: NodePgDatabase) => {
      return (table: Table) => new CreateRepository(table, db);
    },
  },
  {
    inject: [TOKENS.DrizzleAsyncProvider],
    provide: TOKENS.UpdateRepository,
    useFactory: (db: NodePgDatabase) => {
      return (table: Table & { id: AnyPgColumn }) =>
        new UpdateRepository(table, db);
    },
  },
  {
    inject: [TOKENS.DrizzleAsyncProvider],
    provide: TOKENS.GetByIdRepository,
    useFactory: (db: NodePgDatabase) => {
      return (table: Table & { id: AnyPgColumn }) =>
        new GetByIdRepository(table, db);
    },
  },
  {
    inject: [TOKENS.DrizzleAsyncProvider],
    provide: TOKENS.GetPagedRepository,
    useFactory: (db: NodePgDatabase) => {
      return (table: Table) => new GetPagedRepository(table, db);
    },
  },
  {
    inject: [TOKENS.DrizzleAsyncProvider],
    provide: TOKENS.DeleteRepository,
    useFactory: (db: NodePgDatabase) => {
      return (table: Table & { id: AnyPgColumn }) =>
        new DeleteRepository(table, db);
    },
  },
];
