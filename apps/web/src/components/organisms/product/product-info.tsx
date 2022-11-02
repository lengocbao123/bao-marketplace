import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { Avatar } from 'components/atoms';

export interface ProductInfoProps extends HTMLAttributes<HTMLDivElement> {
  nft: any;
}

export const ProductInfo: FC<ProductInfoProps> = ({ className, nft, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <div className="flex items-baseline justify-between">
        <Link
          href="/projects/my-projects/collections/[collectionId]"
          as={`/projects/my-projects/collections/${nft.collection?.id}`}
          className={'text-secondary text-sm font-medium'}
        >
          {nft.collection?.name}
        </Link>
      </div>

      <h1 className={'line-clamp-1 mt-1 text-2xl font-bold'}>{nft.name}</h1>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
        <Avatar
          label={'Creator'}
          name={nft.createdBy?.username || nft.createdBy?.email || 'Unknown'}
          src={nft.createdBy?.avatarUrl}
          className='hidden text-sm sm:block [&_[data-component="label"]]:mr-2'
        />

        <Avatar
          label={'Owner'}
          name={nft.owner?.username || nft.owner?.email || 'Unknown'}
          src={nft.owner?.avatarUrl}
          className='text-sm [&_[data-component="label"]]:mr-2'
        />
      </div>

      <p className={'mt-3 text-sm text-neutral-50'}>{nft.description}</p>
    </div>
  );
};
