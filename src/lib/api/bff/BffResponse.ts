/**
 * BFF response contracts.
 *
 * These shared interfaces standardize success and error payloads returned by
 * the mock API handlers and consumed by feature services.
 */
export interface ApiError {
  code?: string;
  message: string;
  details?: unknown;
}

export interface BffResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export type PaginatedListDto<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};
