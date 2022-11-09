import clsx from 'clsx';
import { FC, useState } from 'react';
import { FilterType } from 'hooks/use-filters';
import { Input, InputLabel } from 'components/atoms';
import { BinanceIcon, EthereumIcon, PolygonIcon } from 'components/icons/blockchain';
import { SearchIcon } from 'components/icons/outline';
import { CheckboxFilter, RangeFilter } from 'components/molecules';
import { useDebounce } from 'usehooks-ts';

import useSWR from 'swr';

export interface NftsFiltersProps {
  filter: FilterType;
  onChange: (key: string, value: any) => void;
  className?: string;
}
export const NftsFilters: FC<NftsFiltersProps> = ({ className = '', filter, onChange }) => {
  const [collectionSearchText, setCollectionSearchText] = useState('');
  const debounceSearchText = useDebounce<string>(collectionSearchText, 1000);
  const { data: collections, error: errorCollections } = useSWR(`/collections?q=${debounceSearchText}`);

  if (errorCollections) {
    return <div>failed to load</div>;
  }

  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
      <CheckboxFilter
        name="status"
        heading="Status"
        options={[
          { label: 'Buy Now', value: 'buy-now' },
          { label: 'Live Auction', value: 'live-auction' },
        ]}
        onChange={onChange}
        values={filter.status}
      />
      <CheckboxFilter
        name="blockchain"
        heading="Blockchains"
        options={[
          {
            label: <InputLabel icon={BinanceIcon} text="Binance" />,
            value: 'binance',
            disabled: true,
          },
          {
            label: <InputLabel icon={EthereumIcon} text="Ethereum" />,
            value: 'Ethereum',
          },
          {
            label: <InputLabel icon={PolygonIcon} text="Polygon" iconOrientation="right" />,
            value: 'Polygon',
          },
        ]}
        onChange={onChange}
        values={filter.blockchain}
      />
      <RangeFilter
        className="py-5"
        heading="Price"
        defaultRange={
          filter.price
            ? {
                min: filter.price[0],
                max: filter.price[1],
              }
            : null
        }
        onApply={(formData) => onChange('price', [formData.min, formData.max])}
      />

      <CheckboxFilter
        name="collection"
        heading="Collections"
        options={
          collections
            ? collections.map((collection) => ({
                label: collection.name,
                value: collection.id,
              }))
            : []
        }
        onChange={onChange}
        loading={!collections}
        values={filter.collection}
        action={
          <Input
            className="w-full"
            placeholder="Search by collections"
            onChange={(event) => {
              setCollectionSearchText(event.target.value);
            }}
            trailingVisual={SearchIcon}
          />
        }
      />
    </div>
  );
};
