import { TOKENS } from '@/business/di/tokens';
import Login from '@/use-cases/auth/login';
import RefreshToken from '@/use-cases/auth/refresh-token';
import VerifyToken from '@/use-cases/auth/verify-user';
import { Provider } from '@nestjs/common';

export const authProviders: Provider[] = [
  {
    provide: TOKENS.LoginService,
    useClass: Login,
  },
  {
    provide: TOKENS.VerifyUserService,
    useClass: VerifyToken,
  },
  {
    provide: TOKENS.RefreshTokenService,
    useClass: RefreshToken,
  },
];
