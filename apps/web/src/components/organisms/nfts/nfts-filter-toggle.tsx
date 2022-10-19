import clsx from 'clsx';
import { FC, HtmlHTMLAttributes } from 'react';
import { Button } from '../../atoms';
import { ArrowLeftIcon, FilterIcon } from '../../icons/outline';

export interface NftsFilterToggleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  numOfFilters: number;
  isDisplayingFilter?: boolean;
  onToggle: () => void;
}
const NftsFilterToggle: FC<NftsFilterToggleProps> = ({ numOfFilters, isDisplayingFilter, onToggle }) => {
  return (
    <div className="relative w-fit">
      <Button
        variant="tertiary"
        label="Filter"
        icon={isDisplayingFilter ? ArrowLeftIcon : FilterIcon}
        onClick={onToggle}
      />
      <div className="bg-primary text-neutral absolute -top-2 -right-2 h-6 w-6 rounded-full text-center">
        {numOfFilters}
      </div>
    </div>
  );
};

export default NftsFilterToggle;
