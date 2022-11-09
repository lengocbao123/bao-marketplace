import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, useState } from 'react';
import { Button } from 'components/atoms';
import { ChevronDownIcon } from 'components/icons/outline';

export type SelectOption = {
  value: any;
  label: string;
};

export interface DropdownSelectProps {
  options: SelectOption[];
  activeIndex?: number;
  onChange?: (option: SelectOption) => void;
}

export const DropdownSelect: FC<DropdownSelectProps> = ({ options, onChange, activeIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex || 0);

  const handleClick = (option: SelectOption, index: number) => {
    if (onChange) {
      onChange(option);
    }
    setSelectedIndex(index);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <Button
          label={options.length > 0 ? options[selectedIndex].label : 'Select option'}
          variant="tertiary"
          icon={ChevronDownIcon}
          iconOrientation="right"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-56 space-y-2 rounded-xl bg-white p-2 shadow-lg">
          {options.map((option, index) => (
            <Menu.Item key={`dropdown-menu-item-${index}`}>
              {({ active }) => {
                return (
                  <div
                    className={clsx(' cursor-pointer rounded-lg px-2 py-3', {
                      'bg-neutral-10': active || index === selectedIndex,
                    })}
                    onClick={() => handleClick(option, index)}
                  >
                    {option.label}
                  </div>
                );
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
