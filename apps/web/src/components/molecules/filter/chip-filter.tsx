import { FC, useMemo } from 'react';
import { useElementSize } from 'usehooks-ts';

import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/outline';
type ChipOption = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
};
export interface ChipFilterProps {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
}

export const ChipFilter: FC<ChipFilterProps> = ({ options = [], value, onChange }) => {
  const [chipsRef, chipsSize] = useElementSize();
  const chipGap = 12; // Space between chips: gap-3
  const listOptions = options.map((option) => (
    <div
      key={option.id}
      className={clsx(
        'chip bg-neutral-0 border-neutral-10 hover:border-primary-30 py-1.25 px-7.75 hover:bg-primary-5 flex min-w-fit cursor-pointer items-center justify-center rounded-full border text-center text-sm font-semibold sm:text-base',
        { 'border-primary-50 bg-primary-20': value === option.value },
        {
          'border-neutral-30 text-neutral-30 pointer-events-none': option.disabled === true
        }
      )}
      onClick={() => onChange(option.value)}
    >
      {option.label}
    </div>
  ));

  const isOverflow = useMemo(() => {
    const chips = document.getElementsByClassName('chip');
    if (chips.length > 0) {
      let chipsWidth = (options.length - 1) * chipGap;
      Array.from(chips).forEach((item) => {
        chipsWidth += item.clientWidth;
      });
      return chipsWidth > chipsSize.width;
    }
    return false;
  }, [chipsSize, options]);

  const handleNavigation = (direction: 'right' | 'left') => {
    const chips = document.getElementsByClassName('chip');
    const scrollWidth = chips[0].clientWidth + chipGap;
    if (direction === 'left') {
      document.getElementById('chips-filter-container').scrollLeft += -scrollWidth;
    } else {
      document.getElementById('chips-filter-container').scrollLeft += scrollWidth;
    }
  };

  return (
    <div className="flex items-center">
      {isOverflow && (
        <button className="h-6 w-6" onClick={() => handleNavigation('left')}>
          <ChevronLeftIcon />
        </button>
      )}
      <div
        ref={chipsRef}
        id="chips-filter-container"
        className={clsx('scrollbar-hide flex w-full flex-nowrap gap-3 overflow-x-scroll scroll-smooth', {
          'justify-center': !isOverflow
        })}
      >
        {listOptions}
      </div>
      {isOverflow && (
        <button className="h-6 w-6" onClick={() => handleNavigation('right')}>
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
};
