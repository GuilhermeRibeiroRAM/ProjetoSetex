import { IEnvironmentConfig } from '@/business/interfaces/environment-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getDBHost(): string {
    return this.configService.get('DATABASE_HOST');
  }

  getDBPort(): string {
    return this.configService.get('DATABASE_PORT');
  }

  getDBUserName(): string {
    return this.configService.get('DATABASE_USERNAME');
  }

  getDBPassword(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }

  getDBName(): string {
    return this.configService.get('DATABASE_NAME');
  }

  getJWTAccessTokenSecret(): string {
    return this.configService.get('JWT_ACCESS_TOKEN_SECRET');
  }

  getJWTAccessTokenExpiration(): number {
    return this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_MS');
  }

  getJWTRefreshTokenSecret(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_SECRET');
  }

  getJWTRefreshTokenExpiration(): number {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_MS');
  }
}
