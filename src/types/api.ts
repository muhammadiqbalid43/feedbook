export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  message: string;
  code: "VALIDATION_ERROR" | "NOT_FOUND" | "SERVER_ERROR";
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
