import clsx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import { ButtonText } from 'components/atoms';
import { DropdownSelect, SelectOption } from 'components/molecules';
import { ExploreFilterToggle } from './explore-filter-toggle';

const SORT_OPTIONS: SelectOption[] = [
  {
    value: 'recently_listed',
    label: 'Recently Listed',
  },
  // {
  //   value: 'price_low_to_high',
  //   label: 'Price: Low to High',
  // },
  // {
  //   value: 'price_high_to_low',
  //   label: 'Price: High to Low',
  // },
];

export interface ExploreActionsProps extends HTMLAttributes<HTMLDivElement> {
  isDisplayingFilter: boolean;
  numOfFilters: number;
  selectedSortOption?: SelectOption;
  onClearFilter?: () => void;
  toggleFilter?: () => void;
  onSelectSort?: (sort: SelectOption) => void;
}

export const ExploreActions: FC<ExploreActionsProps> = ({
  numOfFilters,
  className,
  isDisplayingFilter,
  selectedSortOption = SORT_OPTIONS[0],
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
            selectedSortOption ? SORT_OPTIONS.findIndex((option) => option.value === selectedSortOption.value) : null
          }
        />
      </div>
    </div>
  );
};
