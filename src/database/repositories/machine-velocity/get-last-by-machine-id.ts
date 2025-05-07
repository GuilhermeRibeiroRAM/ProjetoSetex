import { TOKENS } from '@/business/di/tokens';
import { IGetLastMachineVelocityByMachineIdRepository } from '@/business/interfaces/repository/machine-velocity/get-last-by-machine-id.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetLastMachineVelocityByMachineIdRepository
  implements IGetLastMachineVelocityByMachineIdRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(machineId: string): Promise<IMachineVelocity | null> {
    const response = await this.db
      .select({
        id: schema.machineVelocity.id,
        machineId: schema.machineVelocity.machineId,
        sensorCode: schema.machineVelocity.sensorCode,
        velocity: schema.machineVelocity.velocity,
        createdAt: schema.machineVelocity.createdAt,
        updatedAt: schema.machineVelocity.updatedAt,
      })
      .from(schema.machineVelocity)
      .where(eq(schema.machineVelocity.machineId, machineId))
      .orderBy(desc(schema.machineVelocity.createdAt))
      .limit(1);

    if (!response || response.length < 1) return null;

    return response[0];
  }
}
