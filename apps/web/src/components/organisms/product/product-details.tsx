import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { getShortAddress } from 'lib/utils/string';
import { AccordionSection, TableInfoRow } from 'components/molecules';
import { Collection, Nft, User } from '@prisma/client';

export interface ProductDetailsProps extends HTMLAttributes<HTMLDivElement> {
  nft: Nft & { collection: Collection; user: User };
}

export const ProductDetails: FC<ProductDetailsProps> = ({ nft, className, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <AccordionSection
        heading="Details"
        className="overflow-hidden rounded-xl border"
        headingClassName="bg-neutral-10 text-neutral font-bold text-md"
      >
        <table className={'w-full text-sm'}>
          <tbody>
            <TableInfoRow label={'Contract Address'} value={getShortAddress(nft.collection.nft_contract_address)} />
            <TableInfoRow label={'Token ID'} value={nft.id} />
            <TableInfoRow className={'uppercase'} label={'Token Standard'} value={nft.nft_type} />
            <TableInfoRow className={'capitalize'} label={'Blockchain'} value={nft.collection.chain} />
          </tbody>
        </table>
      </AccordionSection>
    </div>
  );
};
