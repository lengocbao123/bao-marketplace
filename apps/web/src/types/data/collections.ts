import { BaseResponse } from './response';
import { UserData } from './user';

export interface CollectionData {
  id: string;
  name: string;
  owner: string;
  logoImage: string;
  featuredImage: string;
  bannerImage: string;
  url: string;
  category: string;
  chain: string;
  totalNfts: number;
  status: string;
  projectId: string;
  nftType: string;
  nftContractAddress: string;
  masterAccount: any;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  project: any;
  user: UserData;
}
export interface CollectionsResponse extends BaseResponse {
  data: CollectionData[];
}
