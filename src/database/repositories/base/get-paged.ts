import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetPagedRepository } from '@/business/interfaces/repository/base/get-paged.interface';
import { Inject } from '@nestjs/common';
import { asc, desc, ilike, or, sql, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetPagedRepository<T> implements IGetPagedRepository<T> {
  constructor(
    private readonly table: Table,
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<T>> {
    let limit = options.pageSize;
    if (typeof limit === 'string') limit = parseInt(limit);

    const offset = (options.currentPage - 1) * options.pageSize;
    const whereCondition =
      options.search &&
      options.columnsComparison &&
      options.columnsComparison.length > 0
        ? or(
            ...options.columnsComparison?.map((col) => {
              return ilike(this.table[col], `%${options.search}%`);
            }),
          )
        : undefined;

    const sort = options.order
      ? options.order === 'desc'
        ? desc(sql`LOWER(CAST(${sql.identifier(options.sort)} AS text))`)
        : asc(sql`LOWER(CAST(${sql.identifier(options.sort)} AS text))`)
      : undefined;

    const records = (await this.db
      .select()
      .from(this.table)
      .where(whereCondition)
      .limit(limit)
      .orderBy(sort)
      .offset(offset)) as T[];

    if (!records || records.length < 1)
      return { result: [], totalCount: 0, totalPages: 0 };
    const totalRecords = await this.db.$count(this.table);
    const totalPages = Math.ceil(totalRecords / limit);

    return { result: records, totalCount: totalRecords, totalPages };
  }
}
