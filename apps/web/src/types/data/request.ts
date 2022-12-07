export interface BaseFilter {
  chain?: string[];
  priceMax?: number;
  priceMin?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface NftsFilter extends BaseFilter {
  status?: string[];
  collection?: string[];
  category?: string;
}
