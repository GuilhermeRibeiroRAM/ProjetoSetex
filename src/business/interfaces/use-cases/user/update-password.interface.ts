export interface IUpdatePassword {
  execute(id: string, password: string): Promise<boolean>;
}
