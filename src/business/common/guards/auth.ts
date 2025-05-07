import { IS_PUBLIC_KEY } from '@/business/common/decorators/public';
import { TOKENS } from '@/business/di/tokens';
import { IVerifyUser } from '@/business/interfaces/use-cases/auth/verify-user.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentConfigService } from '@/business/config/environment/environment-config.service';
import { AppException } from '@/business/exceptions/app-exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    @Inject(TOKENS.EnvironmentConfigService)
    private readonly enviromentConfigService: EnvironmentConfigService,
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const tokenCookie = this.extractTokenFromCookie(request);

    if (!tokenCookie) {
      throw new AppException(
        [{ key: 'general.errors.notauthorized' }],
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verify(tokenCookie, {
        secret: this.enviromentConfigService.getJWTAccessTokenSecret(),
      });

      request['user'] = payload;
    } catch {
      throw new AppException(
        [{ key: 'general.errors.notauthorized' }],
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.Authentication;
  }
}
