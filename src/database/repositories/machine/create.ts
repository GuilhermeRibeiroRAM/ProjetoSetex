import { TOKENS } from '@/business/di/tokens';
import { ICreateRepository } from '@/business/interfaces/repository/base/create.interface';
import { ICreateMachineRepository } from '@/business/interfaces/repository/machine/create.interface';
import { IMachine } from '@/business/model/machine.interface';
import { machines, productionOrder } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/drizzle/schema';

export class CreateMachineRepository implements ICreateMachineRepository {
  private createRepository: ICreateRepository<IMachine>;

  constructor(
    @Inject(TOKENS.CreateRepository)
    private factoryCreateRepository: (
      table: Table,
    ) => ICreateRepository<IMachine>,
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {
    this.createRepository = this.factoryCreateRepository(machines);
  }

  async execute(data: IMachine): Promise<string> {
    return this.db.transaction(async (tx) => {
      const recordsAdded = await tx
        .insert(machines)
        .values(data)
        .returning({ id: machines.id });

      if (recordsAdded.length < 1) return '';

      const machineId = recordsAdded[0].id;

      await tx.insert(productionOrder).values({
        machineId,
        name: null,
      });

      return machineId;
    });
  }
}
