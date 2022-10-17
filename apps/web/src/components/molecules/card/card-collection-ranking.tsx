import clsx from 'clsx';
import Image from 'next/future/image';
import Link, { LinkProps } from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { formatAbbreviationNumber } from '../../../lib/utils/number';
import { getAvatarLetter } from '../../../lib/utils/string';

export interface CardCollectionRankingProps extends HTMLAttributes<HTMLDivElement> {
  order: number;
  link: LinkProps;
  logoImage?: string | null;
  title: string;
  floor: number;
  total: number;
  profit?: number;
}

export const CardCollectionRanking: FC<CardCollectionRankingProps> = ({
  order,
  title,
  logoImage,
  link,
  floor,
  total,
  profit,
  ...rest
}) => {
  return (
    <div className={clsx('border-neutral-10 flex w-full items-center px-4')} {...rest}>
      <span className="pr-4 font-bold">{order}</span>
      <Link {...link}>
        {logoImage ? (
          <Image
            className="aspect-square w-12 rounded-full border object-cover object-center"
            width={48}
            height={48}
            src={logoImage}
            alt={title}
          />
        ) : (
          <span className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-xs uppercase">
            {getAvatarLetter(title)}
          </span>
        )}
      </Link>
      <div className="flex-1 px-3">
        <Link {...link} className="font-bold">
          {title}
        </Link>
        <p className="text-sm font-medium text-neutral-50">Floor: ${formatAbbreviationNumber(floor)}</p>
      </div>
      <div>
        <p className={clsx('text-sm font-medium', profit > 0 ? 'text-accent-success' : 'text-accent-error')}>
          {profit}%
        </p>
        <p className="text-sm font-medium text-neutral-50">${formatAbbreviationNumber(total)}</p>
      </div>
    </div>
  );
};
