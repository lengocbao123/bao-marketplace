import { FC, ReactNode, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

export interface DropdownMenuProps {
  button?: ReactNode;
  items?: ReactNode[];
  activeItemClassName?: string; // Active dropdown item's className
  inactiveItems?: number[]; // Array of items base on item's index do not have hover effect. Eg: [0,1]
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ button, items, activeItemClassName = '', inactiveItems }) => {
  return (
    <Menu>
      <Menu.Button as="div" className={'relative inline-block text-left'}>
        {button}
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
        <Menu.Items className="absolute mt-2 w-56 origin-top-right rounded-xl bg-white p-2 shadow-lg">
          {items.map((item, index) => (
            <Menu.Item key={`dropdown-menu-item-${index}`}>
              {({ active }) => {
                return (
                  <div
                    className={clsx(
                      'rounded-lg px-2 py-3',
                      active && !inactiveItems.includes(index) ? activeItemClassName : '',
                    )}
                  >
                    {item}
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
