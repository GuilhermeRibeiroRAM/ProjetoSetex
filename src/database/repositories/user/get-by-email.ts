import { TOKENS } from '@/business/di/tokens';
import * as schema from '@/database/drizzle/schema';
import { IGetUserByEmailRepository } from '@/business/interfaces/repository/user/get-by-email.interface';
import { IUser } from '@/business/model/user.interface';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(email: string): Promise<IUser> {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    return user;
  }
}
