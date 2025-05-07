import { TOKENS } from '@/business/di/tokens';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import { IGetAllMachineRepository } from '@/business/interfaces/repository/machine/get-all.interface';
import { IMachine } from '@/business/model/machine.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetAllMachineRepository implements IGetAllMachineRepository {
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(): Promise<IMachine[]> {
    const records = await this.db.select().from(schema.machines);

    return records.map((item) => ({
      ...item,
      status: item.status as MachineStatusEnum,
    }));
  }
}
