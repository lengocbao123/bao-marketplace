import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { CollectionData } from 'types/data';
import { getShortAddress } from 'lib/utils/string';

export interface CollectionInfoProps extends HTMLAttributes<HTMLDivElement> {
  collection: CollectionData;
}

export const CollectionInfo: FC<CollectionInfoProps> = ({ className, collection }) => {
  return (
    <div className={clsx(className)}>
      <div className="border-neutral-10 h-fit divide-y rounded-xl border p-4">
        <div className="flex flex-col gap-4 pb-2">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{collection.total_nft || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span>Owners</span>
            <span>-</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex justify-between">
            <span>Blockchain</span>
            <span className={'capitalize'}>{collection.chain}</span>
          </div>
          <div className="flex justify-between">
            <span>Address</span>
            <span>{getShortAddress(collection.nft_contract_address)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
