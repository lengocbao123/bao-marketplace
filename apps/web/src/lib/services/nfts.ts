import { fetcher } from 'lib/utils/request';
import { NftsResponse } from 'types';
import queryString from 'query-string';

export const getNfts = (params?: { [key: string]: any }) => {
  const query = queryString.stringify(params);

  return fetcher<NftsResponse>(`/nfts?${query}`).then((data) => {
    return data;
  });
};
