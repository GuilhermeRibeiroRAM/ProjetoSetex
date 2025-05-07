export interface IGetShouldUpdatePassword {
  execute(email: string): Promise<boolean>;
}
