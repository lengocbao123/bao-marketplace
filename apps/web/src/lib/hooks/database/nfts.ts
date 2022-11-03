import { fetcher } from 'lib/utils/request';
import useSWR from 'swr';
import { NftsResponse } from 'types';
import queryString from 'query-string';

export const useGetNfts = (params) => {
  const query = queryString.stringify(params);
  const { data, error } = useSWR<NftsResponse, any>(`/nfts?${query}`, fetcher);

  return { data, error };
};
