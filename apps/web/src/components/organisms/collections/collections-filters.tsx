import clsx from 'clsx';
import { FC } from 'react';
import { InputLabel } from 'components/atoms';
import { CheckboxFilter, RangeFilter } from 'components/molecules';
import { PIKASSO_CHAINS } from 'lib/constants';
import { BaseFilter } from 'types/data';

export interface CollectionsFiltersProps {
  filter: BaseFilter;
  onChange: (key: string, value: any) => void;
  className?: string;
}

export const CollectionsFilters: FC<CollectionsFiltersProps> = ({ className = '', filter, onChange }) => {
  return (
    <div className={clsx('flex min-h-screen flex-col items-start justify-start divide-y', className)}>
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
        onApply={(formData) => onChange('price', [formData.min, formData.max])}
      />
    </div>
  );
};
