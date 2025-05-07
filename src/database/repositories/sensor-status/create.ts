import { TOKENS } from '@/business/di/tokens';
import { ICreateSensorStatusRepository } from '@/business/interfaces/repository/sensor-status/create.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class CreateSensorStatusRepository
  implements ICreateSensorStatusRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(data: ISensorStatus): Promise<boolean> {
    const recordsAdded = await this.db
      .insert(schema.sensorStatus)
      .values({ ...data })
      .returning();
    if (recordsAdded.length < 1) return false;

    return true;
  }
}
