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

export type ProductSaleHistoryProps = HTMLAttributes<HTMLDivElement>;

export const ProductSaleHistory: FC<ProductSaleHistoryProps> = ({ className }) => {
  const isEmpty = false;

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
            <TableDataRow>
              <TableDataCell>Bought</TableDataCell>
              <TableDataCell>{formatCurrency(26.555)}</TableDataCell>
              <TableDataCell>
                <Avatar name={'Estel Gutmann'} />
              </TableDataCell>
              <TableDataCell>{format(new Date(), 'MM/dd/yyyy')}</TableDataCell>
              <TableDataCell>{format(new Date(), 'MM/dd/yyyy')}</TableDataCell>
            </TableDataRow>
          ) : (
            <TableDataRowEmpty colSpan={5} message={'No sale history'} />
          )}
        </TableDataBody>
      </TableData>
    </TableSection>
  );
};
