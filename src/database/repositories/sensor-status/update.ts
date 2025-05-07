import { TOKENS } from '@/business/di/tokens';
import { ISensorStatusRepository } from '@/business/interfaces/repository/sensor-status/update.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class UpdateSensorStatusRepository implements ISensorStatusRepository {
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(id: number, data: Partial<ISensorStatus>): Promise<boolean> {
    const result = await this.db
      .update(schema.sensorStatus)
      .set(data)
      .where(eq(schema.sensorStatus.id, id));

    return !!result.rowCount;
  }
}
