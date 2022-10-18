import { FC } from 'react';
import { Button, ButtonIcon } from '../../atoms';
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
  return (
    <div className="flex items-center gap-3">
      <ButtonIcon icon={ChevronLeftIcon} variant={'tertiary'} size={'sm'} className={'flex-none'} />

      <div className={'scrollbar-hide grow overflow-y-hidden overflow-x-scroll text-center'}>
        <div className="inline-flex">
          <div className="flex items-center justify-center gap-3">
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => onChange(option.value)}
                label={option.label}
                variant={value === option.value ? 'primary' : 'tertiary'}
                disabled={option.disabled}
                size={'sm'}
              />
            ))}
          </div>
        </div>
      </div>

      <ButtonIcon icon={ChevronRightIcon} variant={'tertiary'} size={'sm'} className={'flex-none'} />
    </div>
  );
};
