import {
  TableData,
  TableDataBody,
  TableDataCell,
  TableDataHeader,
  TableDataHeaderCell,
  TableDataRow
} from '../../molecules';
import clsx from 'clsx';
import { format } from 'date-fns';
import { FC, HTMLAttributes } from 'react';
import { formatCurrency } from '../../../lib/utils/number';
import { Avatar, Button } from '../../atoms';
import { TableSection } from '../../molecules/section';

export type ProductOfferHistoryProps = HTMLAttributes<HTMLDivElement>;

export const ProductOfferHistory: FC<ProductOfferHistoryProps> = ({ className }) => {
  const isEmpty = true;

  return (
    <TableSection title={'Offer'} className={clsx(className)}>
      <TableData>
        <TableDataHeader>
          <TableDataHeaderCell>From</TableDataHeaderCell>
          <TableDataHeaderCell>Price</TableDataHeaderCell>
          <TableDataHeaderCell>USD Price</TableDataHeaderCell>
          <TableDataHeaderCell>Expiration</TableDataHeaderCell>
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
            </TableDataRow>
          ) : (
            <tr>
              <td colSpan={4} className="py-44 px-3 text-center">
                No offers yet
                <Button className="m-auto mt-2" variant="tertiary" label="Make offer" disabled />
              </td>
            </tr>
          )}
        </TableDataBody>
      </TableData>
    </TableSection>
  );
};
