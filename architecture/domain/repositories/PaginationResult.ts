export interface PaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
