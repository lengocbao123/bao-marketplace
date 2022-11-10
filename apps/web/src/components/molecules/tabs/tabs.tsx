import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type TabData = {
  value: string;
  label: string;
  active?: boolean;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  data: TabData[];
  onChangeTab: (value: string) => void;
}

export const Tabs: FC<TabsProps> = ({ className, data, onChangeTab }) => {
  return (
    <ul className={clsx('scrollbar-hide gap-5 overflow-x-auto', className)}>
      {data.map((item) => (
        <li
          key={`tab-${item.value}`}
          className={clsx(
            'flex items-center border-b py-4',
            item.active
              ? 'text-secondary border-secondary font-bold'
              : 'hover:text-secondary/80 focus:text-secondary/80 border-transparent font-medium text-neutral-50',
          )}
        >
          <button type={'button'} onClick={() => onChangeTab(item.value)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
