export interface ICreate<T> {
  execute(data: T): Promise<string>;
}
