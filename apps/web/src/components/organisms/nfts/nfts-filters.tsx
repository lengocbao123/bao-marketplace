import clsx from 'clsx';
import { FC, useState } from 'react';
import { Avatar } from 'components/atoms';
import { CheckboxFilter, RangeFilter } from 'components/molecules';
import { PIKASSO_CHAINS, STATUS } from 'lib/constants';
import { CollectionsResponse, NftsFilter } from 'types/data';
import { CollectionsCheckbox } from './collections-checkbox';
import { useDebounce } from 'usehooks-ts';
import { useSwrInfiniteCustom } from 'lib/hooks/use-swr-infinite-custom';
import * as React from 'react';

export interface NftsFiltersProps {
  fields?: string[];
  filter: NftsFilter;
  onChange: (key: string, value: any) => void;
  className?: string;
  collectionsQuery?: string;
}

export const NftsFilters: FC<NftsFiltersProps> = ({
  fields = ['status', 'chain', 'price', 'collection'],
  className = '',
  filter,
  onChange,
  collectionsQuery = '',
}) => {
  const [collectionSearchText, setCollectionSearchText] = useState('');
  const debounceSearchText = useDebounce<string>(collectionSearchText, 500);
  const { data, error, isLoadingMore, size, setSize, isReachingEnd } = useSwrInfiniteCustom<CollectionsResponse>(
    (index) => `/collection/exchange/list?page=${index + 1}&search=${debounceSearchText}&${collectionsQuery}`,
  );
  const flatResponseData = (responseData: CollectionsResponse[]) => {
    let collectionsData = [];
    if (responseData) {
      responseData.forEach((item) => {
        collectionsData = [...collectionsData, ...item.data.list];
      });
    }

    return collectionsData;
  };
  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
      {fields.includes('status') && (
        <CheckboxFilter name="status" heading="Status" options={STATUS} onChange={onChange} values={filter.status} />
      )}
      {fields.includes('chain') && (
        <CheckboxFilter
          name="chain"
          heading="Chain"
          options={PIKASSO_CHAINS.map((chain) => {
            return {
              label: <Avatar name={chain.label} src={chain.Icon} size={'sm'} />,
              value: chain.value,
            };
          })}
          onChange={onChange}
          values={filter.chain}
        />
      )}
      {fields.includes('price') && (
        <RangeFilter
          className="py-5"
          heading="Price"
          defaultRange={
            filter.priceMin && filter.priceMax
              ? {
                  min: filter.priceMin,
                  max: filter.priceMax,
                }
              : null
          }
          onApply={(formData) => {
            onChange('price', [formData.min, formData.max]);
          }}
        />
      )}
      {fields.includes('collection') && (
        <CollectionsCheckbox
          loading={!data}
          size={size}
          collections={flatResponseData(data)}
          values={filter.collection}
          loadMore={setSize}
          isLoadingMore={isLoadingMore}
          disabledLoadMore={data && data[size - 1] && isReachingEnd(data[size - 1].data.meta)}
          onChange={onChange}
          searchCollections={(key) => {
            setCollectionSearchText(key);
          }}
        />
      )}
    </div>
  );
};
