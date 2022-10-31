import clsx from 'clsx';
import Image from 'next/image';
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
    <div className={clsx('border-neutral-10 flex w-full items-center gap-5 py-2')} {...rest}>
      <div className="text-sm font-bold">{order}</div>
      <div className="flex grow justify-between">
        <div className="flex gap-3">
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
          <div className="">
            <Link {...link} className="font-bold">
              {title}
            </Link>
            <p className="text-sm font-medium text-neutral-50">Floor: ${formatAbbreviationNumber(floor)}</p>
          </div>
        </div>
        <div>
          <p className={clsx('text-sm font-medium', profit > 0 ? 'text-accent-success' : 'text-accent-error')}>
            {profit}%
          </p>
          <p className="text-sm font-medium text-neutral-50">${formatAbbreviationNumber(total)}</p>
        </div>
      </div>
    </div>
  );
};
