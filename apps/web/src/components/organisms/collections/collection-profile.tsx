import clsx from 'clsx';
import Image from 'next/future/image';
import React, { FC, HTMLAttributes } from 'react';
import { getAvatarLetter } from '../../../lib/utils/string';
import { TextTruncate } from '../../molecules';
import { CollectionInfo } from './collection-info';
import { CollectionSocials } from './collection-socials';

export interface CollectionProfileProps extends HTMLAttributes<HTMLDivElement> {
  collection: any;
}

export const CollectionProfile: FC<CollectionProfileProps> = ({ className, collection }) => {
  return (
    <div className={clsx(className)}>
      {collection.bannerImage ? (
        <Image
          src={collection.bannerImage}
          width={1440}
          height={280}
          alt={collection.name}
          className={'bg-neutral-10 aspect-[1440/280] w-full object-cover object-center'}
        />
      ) : (
        <div className={'bg-neutral-10 aspect-[1440/280] w-full object-cover object-center'} />
      )}

      <div className="container flex flex-wrap sm:flex-nowrap">
        <div className="relative flex grow">
          <div className="lg:gap-5">
            <div className="relative -top-12 -mb-12 flex flex-none items-end justify-between lg:-top-20 lg:-mb-20">
              {collection.logoImage ? (
                <Image
                  src={collection.logoImage}
                  width={164}
                  height={164}
                  alt={collection.name}
                  className={
                    'border-3 bg-neutral-10 aspect-square w-[100px] rounded-full border-white object-cover object-center lg:w-[164px]'
                  }
                />
              ) : (
                <div
                  className={
                    'border-3 bg-neutral-10 aspect-square w-[100px] rounded-full border-white object-cover object-center lg:w-[164px]'
                  }
                />
              )}
              <CollectionSocials className="block h-fit sm:hidden" />
            </div>
            {/* Profile image with name */}

            <div className="mt-4 lg:mt-5 lg:w-full">
              <h1 className={'mb-4 text-2xl font-bold lg:text-3xl'}>{collection.name}</h1>

              <div className="mb-4 flex gap-2">
                <span className="text-sm text-neutral-50">Creator:</span>
                {collection.owner && collection.owner.avatarUrl ? (
                  <Image
                    className="border-neutral-10 aspect-square w-16 rounded-full border object-cover object-center"
                    width={24}
                    height={24}
                    src={collection.owner.avatarUrl}
                    alt={collection.name}
                  />
                ) : (
                  <span className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs uppercase">
                    {getAvatarLetter(collection.owner.email)}
                  </span>
                )}
                <p className="text-neutral text-sm font-medium">
                  {collection.owner.username || collection.owner.email}
                </p>
              </div>

              {collection.description && (
                <TextTruncate className={'mt-3 text-sm text-neutral-50'} text={collection.description} />
              )}
            </div>
            {/* Title with description */}
          </div>
        </div>
        <div className="w-screen sm:w-[282px] sm:flex-none">
          <CollectionSocials className="hidden sm:block" />
          <CollectionInfo />
        </div>
      </div>
    </div>
  );
};
