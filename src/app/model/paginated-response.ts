export interface AppPaginatedResponse<T>{
  data: AppPagination<T>;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface AppPagination<T> {
  results: T[];
  pagination: {
    page: number;
    total_pages: number;
    count: number;
  };
}
