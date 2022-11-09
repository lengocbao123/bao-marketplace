import {
  TableData,
  TableDataBody,
  TableDataCell,
  TableDataHeader,
  TableDataHeaderCell,
  TableDataRow,
  TableDataRowEmpty,
} from 'components/molecules';
import clsx from 'clsx';
import { format } from 'date-fns';
import { FC, HTMLAttributes } from 'react';
import { formatCurrency } from 'lib/utils/number';
import { Avatar } from 'components/atoms';
import { TableSection } from 'components/molecules';

export interface ProductSaleHistoryProps extends HTMLAttributes<HTMLDivElement> {
  sales: any[];
}

export const ProductSaleHistory: FC<ProductSaleHistoryProps> = ({ sales = [], className }) => {
  const isEmpty = sales.length === 0;

  return (
    <TableSection title={'Sale History'} className={clsx(className)}>
      <TableData>
        <TableDataHeader>
          <TableDataHeaderCell>Event</TableDataHeaderCell>
          <TableDataHeaderCell>Price</TableDataHeaderCell>
          <TableDataHeaderCell>From</TableDataHeaderCell>
          <TableDataHeaderCell>To</TableDataHeaderCell>
          <TableDataHeaderCell>Time</TableDataHeaderCell>
        </TableDataHeader>

        <TableDataBody>
          {!isEmpty ? (
            sales.map((sale) => (
              <TableDataRow key={sale.id}>
                <TableDataCell className="capitalize">{sale.type}</TableDataCell>
                <TableDataCell>{formatCurrency(sale.price)}</TableDataCell>
                <TableDataCell>
                  <Avatar name={sale.owner.email} />
                </TableDataCell>
                <TableDataCell>N/A</TableDataCell>
                <TableDataCell>{format(new Date(sale.createdAt), 'MM/dd/yyyy')}</TableDataCell>
              </TableDataRow>
            ))
          ) : (
            <TableDataRowEmpty colSpan={5} message={'No sale history'} />
          )}
        </TableDataBody>
      </TableData>
    </TableSection>
  );
};
