import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items?: any;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ title = '', items }) => {
  return (
    <div className={'divide-y'}>
      <div className={'p-3 font-medium'}>{title}</div>
      <div className={'divide-y p-3'}>
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </div>
    </div>
  );
};

export interface SearchItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item?: any;
}

export const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  return (
    <Link href={'/'} className={'flex items-start gap-3 py-3'}>
      <Image
        src={
          'https://cdn.pikasso.xyz/1abeefb0-b024-4c5e-9f5f-ba0640134cd7/QmR39QoX8cHhbmocFQJDfZ1Ab4bYSbivx6TGTwk68Pim9M'
        }
        className={'bg-neutral-10 inline-block aspect-square rounded-md object-cover object-center'}
        width={60}
        height={60}
        alt={''}
      />
      <div className={'truncate'}>
        <div>JustToonIt</div>
        <small>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </small>
      </div>
    </Link>
  );
};
