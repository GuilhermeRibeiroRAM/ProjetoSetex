import { TOKENS } from '@/business/di/tokens';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import { IGetMachineBySensorIdentifierRepository } from '@/business/interfaces/repository/machine/get-by-sensor.interface';
import { IMachine } from '@/business/model/machine.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetMachineBySensorCodeRepository
  implements IGetMachineBySensorIdentifierRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(sensor: string): Promise<IMachine | null> {
    const records = await this.db
      .select()
      .from(schema.machines)
      .limit(1)
      .where(
        or(
          eq(schema.machines.sensorIdentifier, sensor),
          eq(schema.machines.sensorIdentifier2, sensor),
        ),
      );

    if (!records || records.length < 1) return null;

    return { ...records[0], status: records[0].status as MachineStatusEnum };
  }
}
