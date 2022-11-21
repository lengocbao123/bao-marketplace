import { UserData } from './user';

export interface OrderData {
  id?: string;
  owner?: string;
  nft_id?: string;
  prices?: PriceData[];
  created_at?: string;
  owner_info?: UserData;
  payment_id?: string;
  updated_at?: string;
  price_id_in_payment?: string;
}

export interface PriceData {
  id?: string;
  type?: string;
  price?: number;
  status?: string;
  currency?: string;
  order_id?: string;
  created_at?: string;
  updated_at?: string;
  campaign_or_exchange?: string;
}
