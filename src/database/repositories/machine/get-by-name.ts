import { TOKENS } from '@/business/di/tokens';
import { IGetByIdRepository } from '@/business/interfaces/repository/base/get-by-id.interface';
import { IGetMachineByNameRepository } from '@/business/interfaces/repository/machine/get-by-name.interface';
import { IGetMachineByIdRepository } from '@/business/interfaces/repository/machine/get-by-id.interface';

import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgColumn } from 'drizzle-orm/pg-core';
import * as schema from '@/database/drizzle/schema';
import { IMachine } from '@/business/model/machine.interface';
export class GetMachineByNameRepository implements IGetMachineByNameRepository {
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(name: string): Promise<IMachine | null> {
    const records = await this.db
      .select()
      .from(schema.machines)
      .where(eq(schema.machines.name, name));
    return records[0] as IMachine;
  }
}
