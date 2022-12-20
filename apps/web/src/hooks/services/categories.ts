import useSWR from 'swr';
import { CategoriesResponse } from 'types/data';
import { isSuccess } from 'lib/utils/response';

export const useCategories = () => {
  const { data, error } = useSWR<CategoriesResponse>('/category/list');

  return {
    categories: data && isSuccess(data.message) ? data.data : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};
