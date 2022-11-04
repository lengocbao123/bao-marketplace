import { ENDPOINT_GET_COLLECTIONS_RANKING, ENDPOINT_GET_POPULAR_COLLECTIONS } from 'lib/constants/endpoint';
import { fetcher } from 'lib/utils/request';
import { CollectionsResponse } from 'types';

export const getPopularCollections = () => {
  return fetcher<CollectionsResponse>(ENDPOINT_GET_POPULAR_COLLECTIONS).then((data) => {
    return data;
  });
};

export const getCollectionsRanking = (timeRange: string) => {
  return fetcher<CollectionsResponse>(`${ENDPOINT_GET_COLLECTIONS_RANKING}-${timeRange}`).then((data) => {
    return data;
  });
};
