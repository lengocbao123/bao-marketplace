import { fetcher } from 'lib/utils/request';
import useSWR from 'swr';
import { CategoriesResponse } from 'types';
export const useGetCategories = () => {
  const { data, error } = useSWR<CategoriesResponse, any>('/categories', fetcher);

  return { data, error };
};
