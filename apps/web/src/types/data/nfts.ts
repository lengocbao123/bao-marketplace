import { BaseResponse, PaginationData } from './response';
import { UserData } from './user';
import { CollectionData } from './collections';
import { ProjectData } from './projects';
import { OrderData } from './orders';

export interface NftData {
  id?: string;
  name?: string;
  image?: string;
  owner?: string;
  nft_id?: number;
  orders?: OrderData[];
  status?: string;
  project?: string;
  nft_type?: string;
  attributes?: string;
  collection?: string;
  created_at?: string;
  created_by?: string;
  owner_info?: UserData;
  updated_at?: string;
  description?: string;
  metadata_cid?: string;
  mint_tx_hash?: string;
  project_info?: ProjectData;
  transaction_id?: string;
  collection_info?: CollectionData;
  created_by_info?: UserData;
  is_put_on_market?: boolean;
}

export interface NftsResponse extends BaseResponse {
  data?: { list: NftData[]; meta: PaginationData };
}

export interface NftResponse extends BaseResponse {
  data?: NftData;
}
