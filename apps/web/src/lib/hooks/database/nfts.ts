import { fetcher } from 'lib/utils/fetcher';
import queryString from 'query-string';
import useSWR from 'swr';
import { NftsResponse } from 'types';

export const useGetNfts = (params) => {
  const query = queryString.stringify(params);

  const { data, error, mutate } = useSWR<NftsResponse, any>(`/nfts?${query}`, fetcher);

  return { data, error, mutate };
};
