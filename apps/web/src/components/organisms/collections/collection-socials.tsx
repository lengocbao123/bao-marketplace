import { DiscordIcon, TwitterIcon } from 'components/icons/brand';
import Link from 'next/link';
import { GlobeIcon } from 'components/icons/outline';
import { HTMLAttributes, FC } from 'react';
import clsx from 'clsx';

export type CollectionSocialsProps = HTMLAttributes<HTMLDivElement>;
export const CollectionSocials: FC<CollectionSocialsProps> = ({ className }) => {
  return (
    <nav className={clsx(className)}>
      <ul className={'flex justify-end gap-3 py-5'}>
        <li>
          <Link
            href={'https://medium.com/@Pikasso.nft'}
            className="hover:text-secondary"
            target={'_blank'}
            rel={'nofollow'}
          >
            <GlobeIcon className={'text-2xl'} />
          </Link>
        </li>
        <li>
          <Link
            href={'https://discord.gg/E83XENYZrg'}
            className="hover:text-secondary"
            target={'_blank'}
            rel={'nofollow'}
          >
            <DiscordIcon className={'text-2xl'} />
          </Link>
        </li>
        <li>
          <Link
            href={'https://twitter.com/pikassonft'}
            className="hover:text-secondary"
            target={'_blank'}
            rel={'nofollow'}
          >
            <TwitterIcon className={'text-2xl'} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
