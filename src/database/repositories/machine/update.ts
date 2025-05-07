import { TOKENS } from '@/business/di/tokens';
import { IUpdateRepository } from '@/business/interfaces/repository/base/update.interface';
import { IUpdateMachineRepository } from '@/business/interfaces/repository/machine/update.interface';
import { IMachine } from '@/business/model/machine.interface';
import { machines } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/drizzle/schema';
import { eq } from 'drizzle-orm';
export class UpdateMachineRepository implements IUpdateMachineRepository {
  private updateRepository: IUpdateRepository<Partial<IMachine>>;
  constructor(
    @Inject(TOKENS.UpdateRepository)
    private factoryUpdateRepository: (
      table: Table,
    ) => IUpdateRepository<Partial<IMachine>>,
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {
    this.updateRepository = this.factoryUpdateRepository(machines);
  }

  async execute(id: string, data: Partial<IMachine>): Promise<boolean> {
    const records = await this.db
      .select()
      .from(schema.machines)
      .where(eq(schema.machines.name, data.name));

    if (records.length >= 1 && records[0].id != id) return false;
    const response = await this.updateRepository.execute(id, data);

    return response;
  }
}
