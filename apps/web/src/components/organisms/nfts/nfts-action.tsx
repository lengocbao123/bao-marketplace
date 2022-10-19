import clsx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import { Button, ButtonText } from '../../atoms';
import { ArrowLeftIcon, FilterIcon } from '../../icons/outline';
import { DropdownSelect } from '../../molecules';

export interface NftsActionProps extends HTMLAttributes<HTMLDivElement> {
  isDisplayingFilter: boolean;
  numOfFilters: number;
  onClearFilter?: () => void;
  toggleFilter?: () => void;
  onSelectSort?: (sort: any) => void;
}

export const NftsAction: FC<NftsActionProps> = ({
  numOfFilters,
  className,
  isDisplayingFilter,
  toggleFilter,
  onClearFilter,
  onSelectSort
}) => {
  return (
    <div className={clsx('flex w-full justify-between', className)}>
      <div className="flex gap-5">
        <div className="relative w-fit">
          <Button
            variant="tertiary"
            label="Filter"
            icon={isDisplayingFilter ? ArrowLeftIcon : FilterIcon}
            onClick={toggleFilter}
          />
          <div className="bg-primary text-neutral absolute -top-2 -right-2 h-6 w-6 rounded-full text-center">
            {numOfFilters}
          </div>
        </div>
        {numOfFilters > 0 && <ButtonText label="Clear all" variant="secondary" className='hidden md:block' onClick={onClearFilter} />}
      </div>
      <div className="flex items-center gap-3">
        <span className='hidden sm:block'>Sort by</span>
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
