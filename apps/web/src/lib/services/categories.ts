import { fetcher } from 'lib/utils/fetcher';
import { CategoriesResponse } from 'types/data/categories';

export const getCategories = () => {
  return fetcher<CategoriesResponse>('/categories').then((data) => {
    return data;
  });
};
