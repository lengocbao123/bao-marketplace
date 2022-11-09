import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type TabData = {
  value: string;
  label: string;
  active?: boolean;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  data: any[];
  onChange: (value: any) => void;
}

export const Tabs: FC<TabsProps> = ({ className, data, onChange }) => {
  return (
    <ul className={clsx('scrollbar-hide gap-5 overflow-x-auto', className)}>
      {data.map(({ value, label, active }) => (
        <li
          key={value}
          className={clsx(
            'flex items-center border-b py-4',
            active
              ? 'text-secondary border-secondary font-bold'
              : 'hover:text-secondary/80 focus:text-secondary/80 border-transparent font-medium text-neutral-50',
          )}
        >
          <button type={'button'} onClick={() => onChange(value)}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};
