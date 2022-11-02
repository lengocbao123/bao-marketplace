import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { formatAbbreviationNumber } from 'lib/utils/number';
import { pluralize } from 'lib/utils/plural-count';
import { getAvatarLetter } from 'lib/utils/string';

export interface CardCollectionProps extends HTMLAttributes<HTMLDivElement> {
  link: LinkProps;
  featuredImage?: string | null;
  logoImage?: string | null;
  title: string;
  countOwners: number;
  countItems: number;
}

export const CardCollection: FC<CardCollectionProps> = ({
  featuredImage,
  title,
  countOwners,
  countItems,
  logoImage,
  link,
  ...rest
}) => {
  return (
    <div
      className="bg-primary-10 border-neutral-10 hover:shadow-box-hover relative w-full overflow-hidden rounded-xl border transition"
      {...rest}
    >
      <div className="">
        <Link {...link}>
          {featuredImage ? (
            <Image
              className="aspect-[282/144] w-full object-cover object-center"
              width={282}
              height={144}
              src={featuredImage}
              alt={title}
            />
          ) : (
            <span className="bg-neutral-30 flex aspect-[266/144] w-full items-center justify-center text-5xl font-medium uppercase">
              {getAvatarLetter(title)}
            </span>
          )}
        </Link>
      </div>

      <div className="border-neutral-10 flex flex-col items-center border-t bg-white p-4 text-center">
        <div className="flex justify-center">
          <Link className="bg-neutral-0 p-0.75 -mt-12 rounded-full" {...link}>
            {logoImage ? (
              <Image
                className="border-neutral-10 aspect-square w-16 rounded-full border object-cover object-center"
                width={64}
                height={64}
                src={logoImage}
                alt={title}
              />
            ) : (
              <span className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-xs uppercase">
                {getAvatarLetter(title)}
              </span>
            )}
          </Link>
        </div>

        <Link className="hover:text-secondary text-neutral line-clamp-2 mt-3 font-bold leading-tight" {...link}>
          {title}
        </Link>

        <div className="mt-0.5 text-sm font-normal lowercase text-neutral-50">
          {pluralize(countOwners, 'owner').replace(countOwners.toString(), formatAbbreviationNumber(countOwners))} |{' '}
          {pluralize(countItems, 'item').replace(countItems.toString(), formatAbbreviationNumber(countItems))}
        </div>
      </div>
    </div>
  );
};
