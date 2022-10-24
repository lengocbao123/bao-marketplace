import clsx from 'clsx';
import { FC, TableHTMLAttributes } from 'react';

export type TableDataProps = TableHTMLAttributes<HTMLTableElement>;

export const TableData: FC<TableDataProps> = ({ className, children, ...rest }) => {
  return (
    //TODO: remove overflow-hidden to display dropdown combobox on per row'}
    //<table className={clsx('w-full min-w-max table-auto overflow-hidden', className)} {...rest}>
    <table className={clsx('w-full min-w-max table-auto', className)} {...rest}>
      {children}
    </table>
  );
};
