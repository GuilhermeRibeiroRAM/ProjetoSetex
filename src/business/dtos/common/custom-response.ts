export interface ICustomError {
  key: string;
  value?: string;
  params?: Map<string, string>;
}

export interface IErrorResponse {
  success: boolean;
  errors: ICustomError[];
  code: number;
}
