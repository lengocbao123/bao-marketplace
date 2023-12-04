import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { Avatar } from 'components/atoms';
import { Collection, Nft, User } from '@prisma/client';

export interface ProductInfoProps extends HTMLAttributes<HTMLDivElement> {
  nft: Nft & { collection: Collection; user: User };
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
          name={nft.user?.username || nft.user?.email || 'Unknown'}
          src={nft.user?.avatarUrl}
          className='flex items-center text-sm sm:flex [&_[data-component="label"]]:mr-2'
        />
      </div>

      <p className={'mt-3 text-sm text-neutral-50'}>{nft.description}</p>
    </div>
  );
};
