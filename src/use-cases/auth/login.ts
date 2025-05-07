import { EnvironmentConfigService } from '@/business/config/environment/environment-config.service';
import { TOKENS } from '@/business/di/tokens';
import { TokenPayload } from '@/business/dtos/common/token-payload';
import { UserInfo } from '@/business/dtos/user/info';
import {
  ILogin,
  LoginResponse,
} from '@/business/interfaces/use-cases/auth/login.interface';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import GetShouldUpdatePassword from '../user/get-should-update-password';

export default class Login implements ILogin {
  constructor(
    @Inject(TOKENS.EnvironmentConfigService)
    private readonly enviromentConfigService: EnvironmentConfigService,
    private readonly jwtService: JwtService,
    @Inject(TOKENS.GetShouldUpdatePasswordService)
    private readonly getShouldUpdatePasswordService: GetShouldUpdatePassword,
  ) {}
  async execute(user: UserInfo): Promise<LoginResponse> {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      this.enviromentConfigService.getJWTAccessTokenExpiration(),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      this.enviromentConfigService.getJWTRefreshTokenExpiration(),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.enviromentConfigService.getJWTAccessTokenSecret(),
      expiresIn: `${this.enviromentConfigService.getJWTAccessTokenExpiration()}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.enviromentConfigService.getJWTRefreshTokenSecret(),
      expiresIn: `${this.enviromentConfigService.getJWTRefreshTokenExpiration()}ms`,
    });
    const shouldUpdatePassword =
      await this.getShouldUpdatePasswordService.execute(user.email);

    return {
      accessToken,
      refreshToken,
      expiresAccessToken: expiresAccessToken,
      expiresRefreshToken: expiresRefreshToken,
      shouldUpdatePassword,
    };
  }
}
