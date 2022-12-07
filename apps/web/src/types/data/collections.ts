import { BaseListResponse, BaseResponse } from './response';
import { UserData } from './user';

export interface CollectionData {
  id?: string;
  name?: string;
  chain?: string;
  project?: string;
  category?: [];
  created_at?: string;
  created_by?: string;
  logo_image?: string;
  owner_info?: UserData;
  updated_at?: string;
  description?: string;
  banner_image?: string;
  featured_image?: string;
  created_by_info?: UserData;
  nft_contract_address?: string;
  total_nft?:number
}

export type CollectionsResponse = BaseListResponse<CollectionData>

export interface CollectionResponse extends BaseResponse {
  data: CollectionData;
}
