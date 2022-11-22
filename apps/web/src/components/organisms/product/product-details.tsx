import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { getShortAddress } from 'lib/utils/string';
import { AccordionSection, TableInfoRow } from 'components/molecules';
import { NftData } from '../../../types/data';

export interface ProductDetailsProps extends HTMLAttributes<HTMLDivElement> {
  nft: NftData;
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
            <TableInfoRow
              label={'Contract Address'}
              value={getShortAddress(nft.collection_info.nft_contract_address)}
            />
            <TableInfoRow label={'Token ID'} value={nft.nft_id.toString()} />
            <TableInfoRow className={'uppercase'} label={'Token Standard'} value={nft.nft_type} />
            <TableInfoRow className={'capitalize'} label={'Blockchain'} value={nft.collection_info.chain} />
            {/*<TableInfoRow label={'Metadata'} value={'Centralized'} />*/}
            {/*<TableInfoRow label={'Creator Fees'} value={'0%'} />*/}
          </tbody>
        </table>
      </AccordionSection>
    </div>
  );
};
