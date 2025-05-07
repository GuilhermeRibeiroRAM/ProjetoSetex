export interface IUpdatePasswordRepository {
  execute(id: string, password: string): Promise<boolean>;
}
