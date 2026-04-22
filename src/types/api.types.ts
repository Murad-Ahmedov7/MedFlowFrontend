export interface BaseResponse {
  isSuccess: boolean;
  errors: string[] | null;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  totalCount: number;
}

export interface ApiError {
  code: number;
  message: string;
}

export type ErrorResponse = ApiError[]; //niye type? react native proj-a bax

//buradki errorlari gelecekde islet.