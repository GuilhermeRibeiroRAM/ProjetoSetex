import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';
import { IGetSensorStatusByMachineIdRepository } from '@/business/interfaces/repository/sensor-status/get-by-machine-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetSensorStatusByMachineIdRepository
  implements IGetSensorStatusByMachineIdRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<ISensorStatus>> {
    const limit = options.pageSize;
    const offset = (options.currentPage - 1) * options.pageSize;

    const records = await this.db
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
      .limit(limit)
      .offset(offset);

    if (!records || records.length < 1)
      return { result: [], totalCount: 0, totalPages: 0 };

    const totalRecords = await this.db.$count(
      schema.sensorStatus,
      eq(schema.sensorStatus.machineId, machineId),
    );
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      result: records.map((item) => ({
        ...item,
        status: item.status as SensorStatusEnum,
      })),
      totalCount: records.length,
      totalPages,
    };
  }
}
