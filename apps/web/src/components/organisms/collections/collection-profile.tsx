import clsx from 'clsx';
import Image from 'next/image';
import React, { FC, HTMLAttributes } from 'react';
import { TextTruncate } from 'components/molecules';
import { CollectionInfo } from './collection-info';
import { CollectionSocials } from './collection-socials';
import { Avatar } from 'components/atoms';

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
                {collection.user && collection.user.avatarUrl && (
                  <Avatar
                    label={'Creator'}
                    name={collection.user.username || collection.user.email || 'Unknown'}
                    src={collection.user.avatarUrl}
                    className='flex items-center text-sm [&_[data-component="label"]]:mr-2'
                  />
                )}
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
