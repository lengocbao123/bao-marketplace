import { CategoriesResponse } from 'types/data';
import { fetcher } from 'lib/utils/fetcher';

export const getCategories = (session) => {
  return fetcher(session)<CategoriesResponse>('/category/list');
};
