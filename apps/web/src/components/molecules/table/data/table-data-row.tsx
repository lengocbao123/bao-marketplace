import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type TableDataRowProps = HTMLAttributes<HTMLTableRowElement>;

export const TableDataRow: FC<TableDataRowProps> = ({ className, children, ...rest }) => {
  return (
    <tr className={clsx(className)} {...rest}>
      {children}
    </tr>
  );
};
