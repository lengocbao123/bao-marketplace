import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export interface TableDataRowEmptyProps extends HTMLAttributes<HTMLTableRowElement> {
  colSpan?: number;
  message?: string;
}

export const TableDataRowEmpty: FC<TableDataRowEmptyProps> = ({ className, colSpan, message = 'No data', ...rest }) => {
  return (
    <tr className={clsx(className)} {...rest}>
      <td colSpan={colSpan} className="py-44 px-3 text-center">
        {message}
      </td>
    </tr>
  );
};
