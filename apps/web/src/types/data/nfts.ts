import { BaseResponse } from './response';
import { UserData } from './user';

export interface NftData {
  attributes?: any;
  id: string;
  name: string;
  amount?: number;
  user?: UserData;
  owner?: UserData;
  project?: any;
  nftId?: string;
  transactionId?: string;
  collection?: any;
  category?: string[];
  metadataCID?: string;
  mintTxHash?: string;
  exchangeId?: string;
  description?: string;
  image?: string;
  status?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NftsResponse extends BaseResponse {
  data: NftData[];
}
