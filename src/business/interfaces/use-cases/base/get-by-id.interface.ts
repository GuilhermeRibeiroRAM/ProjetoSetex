export interface IGetById<T> {
  execute(id: string): Promise<T>;
}
