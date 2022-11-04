import { ENDPOINT_GET_COLLECTIONS_RANKING, ENDPOINT_GET_POPULAR_COLLECTIONS } from 'lib/constants/endpoint';
import { fetcher } from 'lib/utils/request';
import useSWR from 'swr';
import { CollectionsResponse } from 'types';
export const useGetPopularCollections = () => {
  const { data, error, mutate } = useSWR<CollectionsResponse, any>(ENDPOINT_GET_POPULAR_COLLECTIONS, fetcher);

  return { data, error, mutate };
};
export const useGetCollectionsRanking = (timeRange: string) => {
  const { data, error, mutate } = useSWR<CollectionsResponse, any>(
    `${ENDPOINT_GET_COLLECTIONS_RANKING}-${timeRange}`,
    fetcher
  );

  return { data, error, mutate };
};
