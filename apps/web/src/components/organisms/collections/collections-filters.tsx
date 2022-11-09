import clsx from 'clsx';
import { FC } from 'react';
import { FilterType } from 'hooks/use-filters';
import { InputLabel } from 'components/atoms';
import { BinanceIcon, EthereumIcon, PolygonIcon } from 'components/icons/blockchain';
import { CheckboxFilter, RangeFilter } from 'components/molecules';

export interface CollectionsFiltersProps {
  filter: FilterType;
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
    </div>
  );
};
