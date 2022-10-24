import { TableDataRow } from './table-data-row';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type TableDataHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableDataHeader: FC<TableDataHeaderProps> = ({ className, children, ...rest }) => {
  return (
    <thead className={clsx('bg-neutral-10 text-sm text-neutral-50', className)} {...rest}>
      <TableDataRow>{children}</TableDataRow>
    </thead>
  );
};
