import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { TOKENS } from '@/business/di/tokens';
import { IVerifyUser } from '@/business/interfaces/use-cases/auth/verify-user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TOKENS.VerifyUserService)
    private readonly verifyUserService: IVerifyUser,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return this.verifyUserService.execute({ email, password });
  }
}
