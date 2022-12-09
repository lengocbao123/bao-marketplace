import useSWR from 'swr';
import { CollectionResponse, CollectionsResponse } from 'types/data';
import { isSuccess } from 'lib/utils/response';

export const useCollections = (query) => {
  const { data, error } = useSWR<CollectionsResponse>(`/collection/exchange/list?${query}`);

  return {
    collections: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
export const usePopularCollections = () => {
  const { data, error } = useSWR<CollectionsResponse>(`/collection/exchange/list`);

  return {
    collections: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useTopCollections = (query) => {
  const { data, error } = useSWR<CollectionsResponse>(`/collection/exchange/list?${query}`);

  return {
    collections: data ? data.data : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useCollectionsByUserId = (userId: string, query: string) => {
  const { data, error } = useSWR<CollectionsResponse>(`/collection/exchange/list?createdBy=${userId}&${query}`);

  return {
    collections: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export const useCollectionById = (id: string) => {
  const { data, error } = useSWR<CollectionResponse>(`/collection/${id}`);

  return {
    collection: data.data,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
