import { TOKENS } from '@/business/di/tokens';
import CreateUser from '@/use-cases/user/create';
import DeleteUser from '@/use-cases/user/delete';
import GetUserByEmail from '@/use-cases/user/get-by-email';
import GetUserById from '@/use-cases/user/get-by-id';

import GetUserInfoById from '@/use-cases/user/get-info-by-id';
import GetPagedUser from '@/use-cases/user/get-paged';
import GetShouldUpdatePassword from '@/use-cases/user/get-should-update-password';
import ResetPassword from '@/use-cases/user/reset-password';
import UpdateUser from '@/use-cases/user/update';
import UpdatePassword from '@/use-cases/user/update-password';

import { Provider } from '@nestjs/common';

export const userProviders: Provider[] = [
  {
    provide: TOKENS.DeleteUserService,
    useClass: DeleteUser,
  },
  {
    provide: TOKENS.GetUserByIdService,
    useClass: GetUserById,
  },
  {
    provide: TOKENS.GetUserInfoByIdService,
    useClass: GetUserInfoById,
  },
  {
    provide: TOKENS.GetUserByEmailService,
    useClass: GetUserByEmail,
  },
  {
    provide: TOKENS.GetUserPagedService,
    useClass: GetPagedUser,
  },
  {
    provide: TOKENS.CreateUserService,
    useClass: CreateUser,
  },
  {
    provide: TOKENS.UpdateUserService,
    useClass: UpdateUser,
  },
  {
    provide: TOKENS.ResetPasswordService,
    useClass: ResetPassword,
  },
  {
    provide: TOKENS.UpdatePasswordService,
    useClass: UpdatePassword,
  },
  {
    provide: TOKENS.GetShouldUpdatePasswordService,
    useClass: GetShouldUpdatePassword,
  },
];
