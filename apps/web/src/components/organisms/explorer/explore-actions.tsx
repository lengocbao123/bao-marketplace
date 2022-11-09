import clsx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import { ButtonText } from 'components/atoms';
import { DropdownSelect } from 'components/molecules';
import { ExploreFilterToggle } from './explore-filter-toggle';
const SORT_OPTIONS = [
  {
    value: { sortBy: 'listedAt', sortAscending: false },
    label: 'Recently Listed',
  },
  {
    value: { sortBy: 'price', sortAscending: true },
    label: 'Price: Low to High',
  },
  {
    value: { sortBy: 'price', sortAscending: false },
    label: 'Price: High to Low',
  },
  {
    value: { sortBy: 'lastSaleDate', sortAscending: false },
    label: 'Highest Last Sale',
  },
];
export interface ExploreActionsProps extends HTMLAttributes<HTMLDivElement> {
  isDisplayingFilter: boolean;
  numOfFilters: number;
  selectedSortOption?: any;
  onClearFilter?: () => void;
  toggleFilter?: () => void;
  onSelectSort?: (sort: any) => void;
}

export const ExploreActions: FC<ExploreActionsProps> = ({
  numOfFilters,
  className,
  isDisplayingFilter,
  selectedSortOption,
  toggleFilter,
  onClearFilter,
  onSelectSort,
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
          options={SORT_OPTIONS}
          onChange={onSelectSort}
          activeIndex={
            selectedSortOption
              ? SORT_OPTIONS.findIndex(
                  (option) =>
                    option.value.sortAscending === selectedSortOption.sortAscending &&
                    option.value.sortBy === selectedSortOption.sortBy,
                )
              : null
          }
        />
      </div>
    </div>
  );
};
