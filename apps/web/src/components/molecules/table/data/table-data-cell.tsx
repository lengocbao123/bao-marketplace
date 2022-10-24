import clsx from 'clsx';
import { FC, TdHTMLAttributes } from 'react';

export type TableDataCellProps = TdHTMLAttributes<HTMLTableDataCellElement>;

export const TableDataCell: FC<TableDataCellProps> = ({ className, children, ...rest }) => {
  return (
    <td className={clsx('py-4 px-3', className)} {...rest}>
      {children}
    </td>
  );
};
