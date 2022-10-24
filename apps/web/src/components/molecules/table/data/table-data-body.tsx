import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type TableBodyDataProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableDataBody: FC<TableBodyDataProps> = ({ className, children, ...rest }) => {
  return (
    <tbody
      className={clsx(
        'border-neutral-10/80 divide-neutral-10 divide-y border-b text-sm font-medium md:text-base',
        className
      )}
      {...rest}
    >
      {children}
    </tbody>
  );
};
