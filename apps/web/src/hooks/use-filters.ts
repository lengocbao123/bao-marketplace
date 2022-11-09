import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
export type FilterType = {
  [key: string]: any;
};

export const useFilter = (defaultFilter) => {
  console.log({ defaultFilter });
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [numberOfFilters, setNumberOfFilters] = useState<number>(0);
  const router = useRouter();

  const onFiltersChange = (property: string, value: any) => {
    const newFilter = { ...filter, [property]: value };
    router.push({
      pathname: router.pathname,
      query: queryString.stringify(newFilter, { arrayFormat: 'bracket' }),
    });
    setFilter(newFilter);
  };

  useEffect(() => {
    const count = 0;
    // if (filter.status) {
    //   count = count + filter.status.length;
    // }
    // if (filter.blockchain) {
    //   count = count + filter.blockchain.length;
    // }
    // if (filter.price) {
    //   count = count + 1;
    // }
    // if (filter.collection) {
    //   count = count + filter.collection.length;
    // }

    setNumberOfFilters(count);
  }, [filter]);

  const resetFilter = () => {
    const newFilter = { page: 1, category: filter.category };
    if (filter.sort) {
      newFilter['sort'] = filter.sort;
    }
    router.push({
      pathname: router.pathname,
      query: queryString.stringify(newFilter, { arrayFormat: 'bracket' }),
    });
    setFilter(newFilter);
  };

  return { filter, numberOfFilters, onFiltersChange, resetFilter, setFilter };
};
