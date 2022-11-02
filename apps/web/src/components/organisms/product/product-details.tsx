import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { getShortAddress } from 'lib/utils/string';
import { AccordionSection, TableInfoRow } from 'components/molecules';

export type ProductDetailsProps = HTMLAttributes<HTMLDivElement>;

export const ProductDetails: FC<ProductDetailsProps> = ({ className, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <AccordionSection
        heading="Details"
        className="overflow-hidden rounded-xl border"
        headingClassName="bg-neutral-10 text-neutral font-bold text-md"
      >
        <table className={'w-full text-sm'}>
          <tbody>
            <TableInfoRow
              label={'Contract Address'}
              value={getShortAddress('0x1234567890123456789012345678901234567890')}
            />
            <TableInfoRow label={'Token ID'} value={'9012345678901234567890'} />
            <TableInfoRow label={'Token Standard'} value={'ERC-1155'} />
            <TableInfoRow label={'Blockchain'} value={'Polygon'} />
            <TableInfoRow label={'Metadata'} value={'Centralized'} />
            <TableInfoRow label={'Creator Fees'} value={'0%'} />
          </tbody>
        </table>
      </AccordionSection>
    </div>
  );
};
