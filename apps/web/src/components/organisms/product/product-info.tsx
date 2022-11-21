import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { Avatar } from 'components/atoms';
import { NftData } from '../../../types/data';

export interface ProductInfoProps extends HTMLAttributes<HTMLDivElement> {
  nft: NftData;
}

export const ProductInfo: FC<ProductInfoProps> = ({ className, nft, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <div className="flex items-baseline justify-between">
        <Link
          href="/projects/my-projects/collections/[collectionId]"
          as={`/projects/my-projects/collections/${nft.collection_info?.id}`}
          className={'text-secondary text-sm font-medium'}
        >
          {nft.collection_info?.name}
        </Link>
      </div>

      <h1 className={'line-clamp-1 mt-1 text-2xl font-bold'}>{nft.name}</h1>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
        <Avatar
          label={'Creator'}
          name={nft.created_by_info?.username || nft.created_by_info?.email || 'Unknown'}
          src={nft.created_by_info?.avatarUrl}
          className='flex hidden items-center text-sm sm:flex [&_[data-component="label"]]:mr-2'
        />

        <Avatar
          label={'Owner'}
          name={nft.owner_info?.username || nft.owner_info?.email || 'Unknown'}
          src={nft.owner_info?.avatarUrl}
          className='flex items-center text-sm [&_[data-component="label"]]:mr-2'
        />
      </div>

      <p className={'mt-3 text-sm text-neutral-50'}>{nft.description}</p>
    </div>
  );
};
