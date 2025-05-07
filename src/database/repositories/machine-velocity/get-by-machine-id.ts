import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetMachineVelocityByMachineIdRepository } from '@/business/interfaces/repository/machine-velocity/get-by-machine-id.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetMachineVelocityByMachineIdRepository
  implements IGetMachineVelocityByMachineIdRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<IMachineVelocity>> {
    const limit = options.pageSize;
    const offset = (options.currentPage - 1) * options.pageSize;

    const records = await this.db
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
      .limit(limit)
      .offset(offset);

    if (!records || records.length < 1)
      return { result: [], totalCount: 0, totalPages: 0 };

    const totalRecords = await this.db.$count(
      schema.machineVelocity,
      eq(schema.machineVelocity.machineId, machineId),
    );
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      result: records,
      totalCount: records.length,
      totalPages,
    };
  }
}
