import clsx from 'clsx';
import { FC } from 'react';
import { InputLabel } from '../../atoms';
import { BinanceIcon, EthereumIcon, PolygonIcon } from '../../icons/blockchain';
import { CheckboxFilter, RangeFilter } from '../../molecules';

export interface CollectionsFiltersProps {
  collections: any[];
  filter: any;
  onChange: (key: string, value: any) => void;
  className?: string;
}
export const CollectionsFilters: FC<CollectionsFiltersProps> = ({ className = '', filter, onChange }) => {
  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
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
    </div>
  );
};
