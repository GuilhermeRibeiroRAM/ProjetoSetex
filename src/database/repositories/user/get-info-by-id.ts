import { TOKENS } from '@/business/di/tokens';
import { UserInfo } from '@/business/dtos/user/info';
import { IGetUserInfoByIdRepository } from '@/business/interfaces/repository/user/get-info-by-id.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetUserInfoByIdRepository implements IGetUserInfoByIdRepository {
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(userId: string): Promise<UserInfo> {
    const user = await this.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(eq(schema.users.id, userId));

    return user[0];
  }
}
