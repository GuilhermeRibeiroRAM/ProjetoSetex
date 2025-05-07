export interface IResetPasswordRepository {
  execute(id: string, password: string): Promise<boolean>;
}
