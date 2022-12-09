import clsx from 'clsx';
import { FC } from 'react';
import { Avatar } from 'components/atoms';
import { CheckboxFilter } from 'components/molecules';
import { PIKASSO_CHAINS } from 'lib/constants';
import { BaseFilter } from 'types/data';
import * as React from 'react';

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
            label: <Avatar name={chain.label} src={chain.Icon} size={'sm'} />,
            value: chain.value,
          };
        })}
        onChange={onChange}
        values={filter.chain}
      />
    </div>
  );
};
