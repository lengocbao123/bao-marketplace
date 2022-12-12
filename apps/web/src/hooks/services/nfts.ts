import useSWR from 'swr';
import { NftResponse, NftsResponse } from 'types/data';
import { isSuccess } from 'lib/utils/response';

export const useNfts = (query: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?${query}`);

  return {
    nfts: data ? data.data : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useFeatureNfts = (query: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?limit=8&${query}`);

  return {
    nfts: data ? data.data : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useNftsByCollectionId = (collectionId: string, query: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?collection=${collectionId}&${query}`);

  return {
    nfts: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useNftById = (id: string) => {
  const { data, error } = useSWR<NftResponse>(`/nft/${id}`);

  return {
    nft: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
export const useRelativeNfts = () => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?limit=4`);

  return {
    nfts: data.data.list,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
export const useNftsByCreatedUserId = (userId: string, query: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?createdBy=${userId}&${query}`);

  return {
    nfts: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
export const useNftsByOwnerUserId = (userId: string, query: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?owner=${userId}&${query}`);

  return {
    nfts: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
