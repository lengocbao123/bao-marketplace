import clsx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import {  ButtonText } from '../../atoms';
import { DropdownSelect } from '../../molecules';
import { ExploreFilterToggle } from './explore-filter-toggle';

export interface ExploreActionsProps extends HTMLAttributes<HTMLDivElement> {
  isDisplayingFilter: boolean;
  numOfFilters: number;
  onClearFilter?: () => void;
  toggleFilter?: () => void;
  onSelectSort?: (sort: any) => void;
}

export const ExploreActions: FC<ExploreActionsProps> = ({
  numOfFilters,
  className,
  isDisplayingFilter,
  toggleFilter,
  onClearFilter,
  onSelectSort
}) => {
  return (
    <div className={clsx('flex w-fit sm:w-full sm:justify-between', className)}>
      <div className="hidden gap-5 sm:flex">
        <ExploreFilterToggle
          isDisplayingFilter={isDisplayingFilter}
          numOfFilters={numOfFilters}
          onToggle={toggleFilter}
        />
        {numOfFilters > 0 && (
          <ButtonText label="Clear all" variant="secondary" className="hidden sm:block" onClick={onClearFilter} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:block">Sort by</span>
        <DropdownSelect
          options={[
            {
              value: 'listedAt:desc',
              label: 'Recently Listed'
            },
            {
              value: 'price:asc',
              label: 'Price: Low to High'
            },
            {
              value: 'price:desc',
              label: 'Price: High to Low'
            },
            {
              value: 'sale:desc',
              label: 'Highest Last Sale'
            }
          ]}
          onChange={onSelectSort}
        />
      </div>
    </div>
  );
};
