import { TOKENS } from '@/business/di/tokens';
import { TokenPayload } from '@/business/dtos/common/token-payload';
import { IRefreshToken } from '@/business/interfaces/use-cases/auth/refresh-token.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    @Inject(TOKENS.RefreshTokenService)
    private readonly refreshTokenService: IRefreshToken,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh,
      ]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    return this.refreshTokenService.execute(
      request.cookies?.Refresh,
      payload.userId,
    );
  }
}
