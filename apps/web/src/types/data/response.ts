export interface BaseResponse {
  status: boolean;
  statusCode: number;
  message: string;
}

export interface PaginationData {
  current_page: number;
  item_count: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
}

export interface BaseListResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    list: T[];
    meta: PaginationData;
  };
}
