import clsx from 'clsx';
import { FC } from 'react';
import { FilterType } from '../../../hooks/use-filters';
import { Input, InputLabel } from '../../atoms';
import { BinanceIcon, EthereumIcon, PolygonIcon } from '../../icons/blockchain';
import { SearchIcon } from '../../icons/outline';
import { CheckboxFilter, RangeFilter } from '../../molecules';

export interface NftsFiltersProps {
  collections: any[];
  filter: FilterType;
  onChange: (key: string, value: any) => void;
  className?: string;
}
export const NftsFilters: FC<NftsFiltersProps> = ({ collections, className = '', filter, onChange }) => {
  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
      <CheckboxFilter
        name="status"
        heading="Status"
        options={[
          { label: 'Buy Now', value: 'buy-now' },
          { label: 'Live Auction', value: 'live-auction' }
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
            disabled: true
          },
          {
            label: <InputLabel icon={EthereumIcon} text="Ethereum" />,
            value: 'Ethereum'
          },
          {
            label: <InputLabel icon={PolygonIcon} text="Polygon" iconOrientation="right" />,
            value: 'Polygon'
          }
        ]}
        onChange={onChange}
        values={filter.blockchain}
      />
      <RangeFilter
        className="py-5"
        heading="Price"
        onApply={(formData) => onChange('price', Object.values(formData))}
      />
      <CheckboxFilter
        name="collection"
        heading="Collections"
        options={collections.map((collection) => ({
          label: collection.name,
          value: collection.id
        }))}
        onChange={onChange}
        values={filter.collection}
        action={<Input className="w-full" placeholder="Search by collections" trailingVisual={SearchIcon} />}
      />
    </div>
  );
};
