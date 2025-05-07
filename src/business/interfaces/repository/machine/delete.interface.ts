export interface IDeleteMachineRepository {
  execute(id: string): Promise<boolean>;
}
