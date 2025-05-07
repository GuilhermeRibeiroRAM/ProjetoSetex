import { TOKENS } from '@/business/di/tokens';
import { CreateUserRepository } from '@/database/repositories/user/create';
import { DeleteUserRepository } from '@/database/repositories/user/delete';
import { GetUserByEmailRepository } from '@/database/repositories/user/get-by-email';
import { GetUserByIdRepository } from '@/database/repositories/user/get-by-id';

import { GetUserInfoByIdRepository } from '@/database/repositories/user/get-info-by-id';
import { GetUserPagedRepository } from '@/database/repositories/user/get-paged';
import { UpdateUserRepository } from '@/database/repositories/user/update';
import { Provider } from '@nestjs/common';

export const userProviders: Provider[] = [
  {
    provide: TOKENS.CreateUserRepository,
    useClass: CreateUserRepository,
  },
  {
    provide: TOKENS.UpdateUserRepository,
    useClass: UpdateUserRepository,
  },
  {
    provide: TOKENS.GetUserByEmailRepository,
    useClass: GetUserByEmailRepository,
  },
  {
    provide: TOKENS.GetUserByIdRepository,
    useClass: GetUserByIdRepository,
  },
  {
    provide: TOKENS.GetUserInfoByIdRepository,
    useClass: GetUserInfoByIdRepository,
  },
  {
    provide: TOKENS.GetUserPagedRepository,
    useClass: GetUserPagedRepository,
  },
  {
    provide: TOKENS.DeleteUserRepository,
    useClass: DeleteUserRepository,
  },
];
