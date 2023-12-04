import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { copyToClipboard } from 'lib/utils/navigator';
import { getShortAddress } from 'lib/utils/string';
import { TextTruncate } from 'components/atoms';
import { DiscordIcon, TwitterIcon } from 'components/icons/brand';
import { CopyIcon, GlobeIcon } from 'components/icons/outline';
import { DUMMY_USER_BIO } from 'lib/constants';

export type SocialLink = 'twitter' | 'discord' | 'website';

export interface SocialLinkProps {
  link: string;
  type: SocialLink;
}

const socialLinkIconClasses = 'text-xl text-neutral-70';

const SocialLinkIcons: Record<SocialLink, ReactNode> = {
  twitter: <TwitterIcon className={socialLinkIconClasses} />,
  discord: <DiscordIcon className={socialLinkIconClasses} />,
  website: <GlobeIcon className={socialLinkIconClasses} />,
};

export interface ProfileInventoryProps extends HTMLAttributes<HTMLDivElement> {
  banner: string;
  avatar: string;
  name: string;
  bio?: string;
  joined?: string;
  address?: string;
  socialLinks?: SocialLinkProps[];
}

export const ProfileInventory: FC<ProfileInventoryProps> = (props) => {
  const { banner, avatar, name, joined, address, socialLinks, className, ...profileProps } = props;
  const handleCopyAddressToClipboard = (address: string) => {
    copyToClipboard(
      address,
      () => {
        toast.success('Copied to clipboard');
      },
      () => {
        toast.error('Something went wrong!');
      },
    );
  };

  return (
    <div className={clsx(className)} {...profileProps}>
      {banner ? (
        <Image
          src={banner}
          width={1440}
          height={280}
          alt={name}
          className={'bg-neutral-10 aspect-[1440/280] h-[280px] w-full object-cover object-top'}
        />
      ) : (
        <div className={'bg-neutral-10 aspect-[1440/280] w-full object-cover object-center'} />
      )}
      <div className={'container relative flex flex-col md:flex-row md:justify-between md:gap-6'}>
        <div className={'md:flex-1'}>
          <div className="relative -top-12 -mb-12 flex flex-none items-end justify-between lg:-top-20 lg:-mb-20">
            {avatar ? (
              <Image
                src={avatar}
                width={164}
                height={164}
                alt={name}
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
          </div>
          <div className={clsx('md:mt-7.5 mt-5 text-3xl font-bold')}>{name}</div>
          <TextTruncate text={DUMMY_USER_BIO} className={'mt-3 text-sm text-neutral-50'} />
        </div>
        <div
          className={
            'border-neutral-10 md:mt-7.5 mt-25 flex h-fit w-full flex-col gap-4 rounded-xl border p-4 md:w-[17.5rem]'
          }
        >
          <div className={'flex justify-between'}>
            <div className={'text-sm text-neutral-50'}>Joined</div>
            {joined && <div className={'text-neutral text-sm font-medium'}>{joined}</div>}
          </div>
          <hr className={'border-neutral-10'} />
          <div className={'flex justify-between'}>
            <div className={'text-sm text-neutral-50'}>Address</div>
            <div className={'text-neutral flex gap-2 text-sm font-medium'}>
              {address ? getShortAddress(address) : '-'}
              <CopyIcon className={'cursor-pointer text-xl'} onClick={() => handleCopyAddressToClipboard(address)} />
            </div>
          </div>
          {socialLinks && (
            <div className={'flex justify-between'}>
              <div className={'text-sm text-neutral-50'}>Link</div>
              <div className={'flex gap-5'}>
                {socialLinks.map((socialLink) => (
                  <Link href={socialLink.link} key={socialLink.type}>
                    {SocialLinkIcons[socialLink.type]}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
