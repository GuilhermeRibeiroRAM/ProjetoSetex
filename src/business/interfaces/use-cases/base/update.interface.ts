export interface IUpdate<T> {
  execute(id: string, data: Partial<T>): Promise<boolean>;
}
