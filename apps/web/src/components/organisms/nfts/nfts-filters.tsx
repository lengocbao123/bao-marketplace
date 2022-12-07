import clsx from 'clsx';
import { FC, useState } from 'react';
import { Button, Input, InputLabel } from 'components/atoms';
import { SearchIcon } from 'components/icons/outline';
import { CheckboxFilter, RangeFilter } from 'components/molecules';
import { useDebounce } from 'usehooks-ts';
import useSWR from 'swr';
import { BaseListResponse, CollectionData, CollectionsResponse } from 'types/data';
import { PIKASSO_CHAINS, STATUS } from 'lib/constants';
import { NftsFilter } from 'types/data';
import { useSession } from 'next-auth/react';
import { useSwrInfiniteCustom } from '../../../lib/hooks/use-swr-infinite-custom';

export interface NftsFiltersProps {
  filter: NftsFilter;
  onChange: (key: string, value: any) => void;
  className?: string;
}

export const NftsFilters: FC<NftsFiltersProps> = ({ className = '', filter, onChange }) => {
  const { data: session } = useSession();
  const [collectionSearchText, setCollectionSearchText] = useState('');
  const debounceSearchText = useDebounce<string>(collectionSearchText, 500);
  const { data: collections, error: errorCollections } = useSWR<CollectionsResponse>(
    `/collection/exchange/list?q=${debounceSearchText}`,
  );
  const { data, error, isLoadingMore, size, setSize, isReachingEnd } = useSwrInfiniteCustom<CollectionsResponse>(
    (index) => `/collection/exchange/list?page=${index + 1}`,
  );

  if (errorCollections) {
    return <div>failed to load</div>;
  }
  const flatResponseData = (responseData: CollectionsResponse[]) => {
    let collectionsData = [];
    if (responseData) {
      responseData.forEach((item) => {
        collectionsData = [...collectionsData, ...item.data.list];
      });
    }

    return collectionsData;
  };

  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
      <CheckboxFilter name="status" heading="Status" options={STATUS} onChange={onChange} values={filter.status} />
      <CheckboxFilter
        name="chain"
        heading="Chain"
        options={PIKASSO_CHAINS.map((chain) => {
          return {
            label: <InputLabel icon={chain.Icon} text={chain.label} />,
            value: chain.value,
          };
        })}
        onChange={onChange}
        values={filter.chain}
      />
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
      {!error && (
        <div className={'max-h-80 w-full overflow-y-auto scroll-auto'}>
          <CheckboxFilter
            name="collection"
            heading="Collections"
            options={flatResponseData(data).map((collection) => ({
              label: collection.name,
              value: collection.id,
            }))}
            onChange={onChange}
            loading={!collections}
            values={filter.collection}
            action={
              <Input
                placeholder="Search by collections"
                onChange={(event) => {
                  setCollectionSearchText(event.target.value);
                }}
                trailingVisual={SearchIcon}
              />
            }
          />
          <Button
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
            label={'Load more'}
            className={'w-full'}
            variant={'primary'}
            disabled={data && data[size - 1] && isReachingEnd(data[size - 1].data.meta)}
          />
        </div>
      )}
    </div>
  );
};
