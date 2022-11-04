import { fetcher } from 'lib/utils/fetcher';
import queryString from 'query-string';
import { NftsResponse } from 'types';

export const getNfts = (params?: { [key: string]: any }) => {
  const query = queryString.stringify(params);

  return fetcher<NftsResponse>(`/nfts?${query}`).then((data) => {
    return data;
  });
};
