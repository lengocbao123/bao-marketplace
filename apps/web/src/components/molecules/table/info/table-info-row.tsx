import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export interface TableRowInfoProps extends HTMLAttributes<HTMLTableRowElement> {
  label: string;
  value: string;
}

export const TableInfoRow: FC<TableRowInfoProps> = ({ className, label, value, ...rest }) => {
  return (
    <tr className={clsx(className)} {...rest}>
      <th className={'py-1 text-left font-normal text-neutral-50'}>{label}</th>
      <td className={'text-neutral py-1 text-right font-medium'}>{value}</td>
    </tr>
  );
};
