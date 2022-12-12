import useSWR from 'swr';
import { NftsResponse } from '../../types/data';
import { isSuccess } from '../../lib/utils/response';

export const useSearch = (startSearching: boolean, searchText: string) => {
  const { data, error } = useSWR<NftsResponse>(`/nft/exchange/list?q=${searchText}`);

  return {
    data: data ? data.data : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
