export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  errors: string[] | null;
}

export interface ApiError {
  code: number;
  message: string;
}

export type ErrorResponse = ApiError[]; //niye type? react native proj-a bax

//buradki errorlari gelecekde islet.