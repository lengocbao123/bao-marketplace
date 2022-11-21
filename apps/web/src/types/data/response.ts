export interface BaseResponse {
  status: boolean;
  statusCode: number;
  message: string;
}

export interface PaginationData {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
