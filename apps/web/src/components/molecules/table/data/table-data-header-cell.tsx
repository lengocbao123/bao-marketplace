import clsx from 'clsx';
import { FC, ThHTMLAttributes } from 'react';

export type TableDataHeaderCellProps = ThHTMLAttributes<HTMLTableHeaderCellElement>;

export const TableDataHeaderCell: FC<TableDataHeaderCellProps> = ({ className, children, ...rest }) => {
  return (
    <th className={clsx('p-3 text-left', className)} {...rest}>
      {children}
    </th>
  );
};
