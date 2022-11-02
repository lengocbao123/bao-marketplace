import clsx from 'clsx';
import { Avatar } from 'components/atoms';
import { formatCurrency } from 'lib/utils/number';
import { getUsernameFromEmail } from 'lib/utils/string';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import React, { FC, HTMLAttributes } from 'react';

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
      <div className={'border-neutral-10 hover:shadow-box-hover space-y-2 rounded-xl border p-2 sm:p-4'}>
        <Link className="flex" {...link}>
          {image ? (
            <Image
              alt={title}
              width={242}
              height={205}
              src={image}
              className={
                'border-neutral-10/50 bg-neutral-10 aspect-[148/128] w-full rounded-xl border object-cover object-center'
              }
            />
          ) : (
            <div
              className={
                'bg-neutral-10 aspect-square w-20 rounded-xl object-cover object-center sm:aspect-[148/128] sm:w-full'
              }
            />
          )}
        </Link>

        <div className="">
          <div className="space-y-1">
            <p className="text-secondary text-xs font-medium">{subtitle}</p>

            <Link className={'flex'} {...link}>
              <h3 className="text-neutral hover:text-secondary line-clamp-1 text-sm font-bold sm:text-base">{title}</h3>
            </Link>
          </div>

          <div className="border-neutral-10 mt-2 border-t pt-2 sm:mt-3 sm:pt-3">
            <div className="grid grid-cols-2">
              <div className="space-y-1.5">
                <div className="hidden text-xs text-neutral-50 sm:block">Price</div>
                <div className="bg-gradient-2 bg-clip-text text-base font-bold text-transparent">
                  {formatCurrency(price)}
                </div>
              </div>

              <div className={'justify-self-end sm:justify-self-start'}>
                <Link href={`/users/${user.id}/nfts?filter=on-sale`}>
                  <Avatar
                    name={user.username ?? getUsernameFromEmail(user.email)}
                    size="sm"
                    src={user.avatarUrl}
                    onlyAvatar
                    className={'sm:hidden'}
                  />
                </Link>
                <Link href={`/users/${user.id}/nfts?filter=on-sale`}>
                  <Avatar
                    name={user.username ?? getUsernameFromEmail(user.email)}
                    size="sm"
                    src={user.avatarUrl}
                    className={
                      'hidden flex-col gap-1.5 text-sm sm:flex [&_[data-component="label"]]:text-xs [&_[data-component="label"]]:text-neutral-50'
                    }
                    label={'Creator'}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
