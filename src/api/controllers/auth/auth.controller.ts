import { CredentialsDataModel } from '@/api/data-models/auth/credentials.dm';
import { customResponse } from '@/api/utils/custom-response';
import { LoginResponseViewModel } from '@/api/view-models/auth/login-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { CurrentUser } from '@/business/common/decorators/current-user.decorator';
import { Public } from '@/business/common/decorators/public';
import { JwtRefreshAuthGuard } from '@/business/common/guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '@/business/common/guards/local-auth.guard';
import { TOKENS } from '@/business/di/tokens';
import { UserInfo } from '@/business/dtos/user/info';
import { ILogin } from '@/business/interfaces/use-cases/auth/login.interface';
import { I18nTranslations } from '@/i18n/generated';
import { Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nService } from 'nestjs-i18n';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    @Inject(TOKENS.LoginService) private readonly loginService: ILogin,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login/')
  @ApiBody({
    type: CredentialsDataModel,
  })
  async login(
    @CurrentUser() user: UserInfo,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CustomResponseViewModel<LoginResponseViewModel>> {
    const {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
      shouldUpdatePassword,
    } = await this.loginService.execute(user);

    this.setCookie(
      response,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    );
    const res = customResponse<LoginResponseViewModel>({
      expiresAccessToken,
      user,
      shouldUpdatePassword,
    });

    return res;
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh-token/')
  async refresh(
    @CurrentUser() user: UserInfo,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CustomResponseViewModel<LoginResponseViewModel>> {
    const {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.loginService.execute(user);

    this.setCookie(
      response,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    );

    return customResponse<LoginResponseViewModel>({
      expiresAccessToken,
      user,
    });
  }

  private setCookie(
    response: Response,
    accessToken: string,
    refreshToken: string,
    expiresAccessToken: Date,
    expiresRefreshToken: Date,
  ): void {
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });
  }
}
