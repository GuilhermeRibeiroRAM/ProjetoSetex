export interface IDeleteSensorStatusRepository {
  execute(id: string): Promise<boolean>;
}
