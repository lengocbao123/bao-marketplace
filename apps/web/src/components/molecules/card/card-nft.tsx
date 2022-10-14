import clsx from 'clsx';
import Image from 'next/future/image';
import Link, { LinkProps } from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { formatCurrency } from '../../../lib/utils/number';
import { getUsernameFromEmail } from '../../../lib/utils/string';
import { Avatar } from '../../atoms';

export interface CardNftProps extends HTMLAttributes<HTMLDivElement> {
  link: LinkProps;
  image?: string | null;
  title: string;
  subtitle: string;
  price: number;
  user: any;
}

export const CardNft: FC<CardNftProps> = ({ className, user, link, image, title, subtitle, price, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <div
        className={
          'border-neutral-10 hover:shadow-box-hover flex-column flex-row gap-x-2 gap-y-3 rounded-xl border p-3'
        }
      >
        <Link className="relative flex" {...link}>
          {image ? (
            <Image
              alt={title}
              width={242}
              height={205}
              src={image}
              className={
                'border-neutral-10/50 bg-neutral-10 aspect-[242/205] w-full rounded-xl border object-cover object-center'
              }
            />
          ) : (
            <div
              className={
                'bg-neutral-10 aspect-square w-20 rounded-xl object-cover object-center sm:aspect-[242/205] sm:w-full'
              }
            />
          )}
        </Link>

        <div className="flex-grow">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-secondary mt-0.5 text-xs font-medium">{subtitle}</p>
          </div>

          <Link className={'mt-1 block'} {...link}>
            <h3 className="text-neutral line-clamp-1 font-bold">{title}</h3>
          </Link>

          <div className="border-neutral-10 mt-2 flex min-h-[40px] items-center justify-between border-t pt-3 sm:mt-3">
            <div className="text-left">
              <p className="hidden pb-[6px] text-xs text-neutral-50 sm:block">Price</p>
              <p className="to-secondary bg-gradient-to-r from-[#DA22FF] bg-clip-text text-base font-bold text-transparent">
                {formatCurrency(price)}
              </p>
            </div>
            <div className="text-left">
              <p className="hidden pb-[6px] text-xs text-neutral-50 sm:block">Creator</p>
              <Avatar
                name={user.username ?? getUsernameFromEmail(user.email)}
                size="sm"
                className={'text-sm font-medium'}
                src={user.avatarUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
