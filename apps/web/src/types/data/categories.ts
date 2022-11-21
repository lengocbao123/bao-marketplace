import { BaseResponse } from './response';

export interface CategoryData {
  id: string;
  name: string;
  code: string;
  logoImage?: string;
  featured_image?: string;
  banner_image?: string;
  status?: string;
  mapper: {
    [key: string]: string;
  };
  created_at?: string;
  updated_at?: string;
}
export interface CategoriesResponse extends BaseResponse {
  data: CategoryData[];
}
