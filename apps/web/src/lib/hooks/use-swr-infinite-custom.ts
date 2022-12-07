import { SWRInfiniteKeyLoader } from 'swr/infinite/dist/infinite/types';
import { useSession } from 'next-auth/react';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from 'lib/utils/fetcher';
import { PaginationData } from 'types/data';

export const useSwrInfiniteCustom = <T>(key: SWRInfiniteKeyLoader) => {
  const { data: session } = useSession();
  const { data, error, mutate, size, setSize } = useSWRInfinite<T>(key, fetcher(session));
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = (lastMeta: PaginationData) => {
    return lastMeta.current_page === lastMeta.total_pages;
  };

  return {
    data,
    mutate,
    error,
    size,
    setSize,
    isLoadingMore,
    isLoadingInitialData,
    isReachingEnd,
  };
};
