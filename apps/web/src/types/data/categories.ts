import { BaseResponse } from './response';

export interface CategoryData {
  id: string;
  name: string;
  code: string;
  logoImage?: string;
  featuredImage?: string;
  bannerImage?: string;
  status?: string;
  mapper: {
    [key: string]: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface CategoriesResponse extends BaseResponse {
  data: CategoryData[];
}
