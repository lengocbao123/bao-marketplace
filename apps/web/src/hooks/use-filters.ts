import { useState } from 'react';
export type FilterType = {
  [key: string]: string[];
};
export const useFilter = (defaultFilter) => {
  const [filter, setFilter] = useState<FilterType>(defaultFilter);

  const onFiltersChange = (property: string, value: any) => {
    const newFilter = { ...filter, [property]: value };
    setFilter(newFilter);
  };

  return { filter, onFiltersChange };
};
