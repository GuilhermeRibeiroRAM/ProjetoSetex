export interface CustomErrorViewModel {
  generic?: {
    [key: string]: string[];
  };
  fields?: {
    [key: string]: string[] | string;
  };
}

export interface CustomResponseViewModel<T> {
  status: number;
  data?: T | null;
  error: CustomErrorViewModel;
}
