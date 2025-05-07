import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetPagedRepository } from '@/business/interfaces/repository/base/get-paged.interface';
import { IGetMachinePagedRepository } from '@/business/interfaces/repository/machine/get-paged.interface';
import { IMachine } from '@/business/model/machine.interface';

import { Inject } from '@nestjs/common';
import { and, eq, ilike, or, desc, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/drizzle/schema';
export class GetMachinePagedRepository implements IGetMachinePagedRepository {
  private getPagedRepository: IGetPagedRepository<IMachine>;

  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<IMachine>> {
    const limit = options.pageSize;
    const offset = (options.currentPage - 1) * options.pageSize;

    const hasSearchFilters =
      options.search &&
      options.columnsComparison &&
      options.columnsComparison.length > 0;
    const statusFilter = options.status;
    const whereCondition =
      hasSearchFilters && statusFilter
        ? and(
            or(
              ...options.columnsComparison.map((col) => {
                return ilike(schema.machines[col], `%${options.search}%`);
              }),
            ),
            eq(schema.machines['status'], options.status),
          )
        : hasSearchFilters
          ? or(
              ...options.columnsComparison.map((col) => {
                return ilike(schema.machines[col], `%${options.search}%`);
              }),
            )
          : statusFilter
            ? eq(schema.machines['status'], options.status)
            : undefined;

    const records = (await this.db
      .select({
        id: schema.machines.id,
        name: schema.machines.name,
        sensorIdentifier: schema.machines.sensorIdentifier,
        sensorIdentifier2: schema.machines.sensorIdentifier2,
        status: schema.machines.status,
        createdAt: schema.machines.createdAt,
        updatedAt: schema.machines.updatedAt,
        lastVelocity: schema.machineVelocity.velocity,
        productionOrder: schema.productionOrder.name,
      })
      .from(schema.machines)
      .leftJoin(
        schema.machineVelocity,
        and(
          eq(schema.machines.id, schema.machineVelocity.machineId),
          eq(
            schema.machineVelocity.createdAt,
            this.db
              .select({ maxCreatedAt: desc(schema.machineVelocity.createdAt) })
              .from(schema.machineVelocity)
              .where(eq(schema.machineVelocity.machineId, schema.machines.id))
              .limit(1),
          ),
        ),
      )
      .leftJoin(
        schema.productionOrder,
        and(eq(schema.machines.id, schema.productionOrder.machineId)),
      )
      .where(whereCondition)
      .orderBy(
        sql`regexp_replace(${schema.machines.name}, '[^A-Za-z]', '', 'g')`,
        sql`CAST(NULLIF(regexp_replace(${schema.machines.name}, '\\D', '', 'g'), '') AS INTEGER)`,
      )
      .limit(limit)
      .offset(offset)) as IMachine[];

    if (!records || records.length < 1)
      return { result: [], totalCount: 0, totalPages: 0 };

    let totalRecords;
    if (options.status || options.search) {
      totalRecords = records.length;
    } else totalRecords = await this.db.$count(schema.machines);

    const totalPages = Math.ceil(totalRecords / limit);

    return { result: records, totalCount: records.length, totalPages };
  }
}
