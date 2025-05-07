import { TOKENS } from '@/business/di/tokens';
import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';
import { IGetLastSensorStatusByMachineIdRepository } from '@/business/interfaces/repository/sensor-status/get-last-by-machine-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetLastSensorStatusByMachineIdRepository
  implements IGetLastSensorStatusByMachineIdRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(machineId: string): Promise<ISensorStatus | null> {
    const response = await this.db
      .select({
        id: schema.sensorStatus.id,
        machineId: schema.sensorStatus.machineId,
        sensorIdentifier: schema.sensorStatus.sensorIdentifier,
        status: schema.sensorStatus.status,
        lastSensorCheck: schema.sensorStatus.lastSensorCheck,
        createdAt: schema.sensorStatus.createdAt,
        updatedAt: schema.sensorStatus.updatedAt,
      })
      .from(schema.sensorStatus)
      .where(eq(schema.sensorStatus.machineId, machineId))
      .orderBy(desc(schema.sensorStatus.lastSensorCheck))
      .limit(1);

    if (!response || response.length < 1) return null;

    return {
      ...response[0],
      status: response[0].status as SensorStatusEnum,
    };
  }
}
