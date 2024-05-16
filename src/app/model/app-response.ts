export interface AppResponse<T> {
  data: T;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface AppHttpParams {
  search: string | null;
  sort: string | null;
  page: string;
}
