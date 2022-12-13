import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ResultData } from 'hooks/services/search';
import { convertToSlug } from 'lib/utils/string';

export interface SearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items?: ResultData[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ title = '', items }) => {
  return (
    <div className={'divide-y'}>
      <div className={'p-3 font-medium capitalize'}>{title}</div>
      <div className={'divide-y p-3'}>
        {items.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export interface SearchItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item?: ResultData;
}

export const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const getHighlight = (highlight) => {
    return Object.values(highlight).join(';');
  };

  const getLink = () => {
    if (item.type === 'nfts') {
      return `/nfts/${item.id}/${convertToSlug(item.data.name)}`;
    }
    if (item.type === 'collections') {
      return `/collections/${item.id}/${convertToSlug(item.data.name)}`;
    }

    return '/';
  };

  return (
    <Link href={getLink()} className={'flex items-start gap-3 py-3'}>
      {item.data.image && (
        <Image
          src={item.data.image}
          className={'bg-neutral-10 inline-block aspect-square rounded-md object-cover object-center'}
          width={60}
          height={60}
          alt={item.data.name}
        />
      )}
      <div className={'truncate'}>
        <div>{item.data.name}</div>
        <small dangerouslySetInnerHTML={{ __html: getHighlight(item.highlight) }}></small>
      </div>
    </Link>
  );
};
