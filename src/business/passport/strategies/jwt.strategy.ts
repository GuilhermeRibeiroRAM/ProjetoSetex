import { TOKENS } from '@/business/di/tokens';
import { TokenPayload } from '@/business/dtos/common/token-payload';
import { IGetUserInfoById } from '@/business/interfaces/use-cases/user/get-info-by-id.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(TOKENS.GetUserInfoByIdService)
    private readonly getUserInfoByIdService: IGetUserInfoById,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.getUserInfoByIdService.execute(payload.userId);
  }
}
