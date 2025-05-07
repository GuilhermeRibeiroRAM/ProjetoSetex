export interface IDeleteUserRepository {
  execute(id: string): Promise<boolean>;
}
