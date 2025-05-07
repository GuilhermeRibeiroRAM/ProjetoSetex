export interface IDelete {
  execute(id: string): Promise<boolean>;
}
