import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { convertPeriod } from 'lib/utils/time';

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
  createdAtMin?: number;
  createdAtMax?: number;
  period?: string;
}

export const useFilter = (initQuery: ParsedUrlQuery) => {
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
    const newQuery = { ...query, [key]: value };

    if (key === 'price' && Array.isArray(value)) {
      newQuery.priceMin = value[0];
      newQuery.priceMax = value[1];
    }

    if (key === 'category' && value === 'all' && 'category' in newQuery) {
      delete newQuery.category;
    }

    if (key === 'period') {
      const period = convertPeriod(value as string);
      newQuery.createdAtMax = period.endTime;
      newQuery.createdAtMin = period.startTime;
    }

    if (key === 'period' && value === 'all_time' && 'period' in newQuery) {
      delete newQuery.period;
      delete newQuery.createdAtMax;
      delete newQuery.createdAtMin;
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

  return {
    query,
    handleChange,
    resetFilter,
    convertedQuery: convertQueryParamsToArray(query as ParsedUrlQuery),
  };
};
