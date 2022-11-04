import { Button, ButtonIcon } from 'components/atoms';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/icons/outline';
import { FC, useState } from 'react';

export type ChipOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface ChipFilterProps {
  options: ChipOption[];
  value?: string;
  onChange: (value: string) => void;
}

export const ChipFilter: FC<ChipFilterProps> = ({ options = [], value, onChange }) => {
  const [selected, setSelected] = useState(value);

  return (
    <div className="flex items-center gap-3">
      <ButtonIcon icon={ChevronLeftIcon} variant={'tertiary'} size={'sm'} className={'flex-none'} />

      <div className={'scrollbar-hide grow overflow-y-hidden overflow-x-scroll text-center'}>
        <div className="inline-flex">
          <div className="flex items-center justify-center gap-3">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  setSelected(option.value);
                  onChange(option.value);
                }}
                label={option.label}
                variant={selected === option.value ? 'primary' : 'tertiary'}
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
