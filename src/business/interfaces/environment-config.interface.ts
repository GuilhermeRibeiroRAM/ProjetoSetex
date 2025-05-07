export interface IEnvironmentConfig {
  getDBHost(): string;
  getDBPort(): string;
  getDBUserName(): string;
  getDBPassword(): string;
  getDBName(): string;
}
