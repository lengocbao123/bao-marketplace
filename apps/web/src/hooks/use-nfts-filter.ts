import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { convertQueryParamsToArray } from 'lib/utils/query';

interface QueryFilter {
  userId?: string;
  page?: number;
  priceMin?: number | string;
  priceMax?: number | string;
  createdBy?: string;
  collection?: string;
  owner?: string;
  sortBy?: string;
  chain?: string;
  category?: string;
  filter?: string;
}

export const useNftsFilter = (initQuery: ParsedUrlQuery) => {
  const [query, setQuery] = useState<QueryFilter>({
    page: 1,
    ...initQuery,
  });
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...query },
    });
  }, [query]);
  const handleChange = (key: string, value: string | string[] | number[]) => {
    let newQuery = query;
    if (key === 'price' && Array.isArray(value)) {
      newQuery = { ...newQuery, priceMin: value[0], priceMax: value[1] };
    } else {
      newQuery = { ...query, [key]: value };
    }
    if (key === 'category' && value === 'all' && 'category' in newQuery) {
      delete newQuery.category;
    }
    setQuery(newQuery);
  };

  const resetFilter = async () => {
    const resetQuery = { page: 1 };
    if (query.sortBy) {
      resetQuery['sortBy'] = query.sortBy;
    }
    setQuery(resetQuery);
  };

  return { query, handleChange, resetFilter, convertedQuery: convertQueryParamsToArray(query as ParsedUrlQuery) };
};
