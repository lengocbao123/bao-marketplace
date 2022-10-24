import { FC, HTMLAttributes } from 'react';
import { List } from '../list';
import { CardCollection } from '../../molecules';
export interface CollectionsListProps extends HTMLAttributes<HTMLDivElement> {
  collections: any[];
  meta?: any;
  links?: any;
}

export const CollectionsList: FC<CollectionsListProps> = ({ collections, meta, className }) => {
  return (
    <List
      hasData={true}
      totalItems={meta.totalItems}
      totalPages={meta.totalPages}
      page={meta.page}
      className={className}
    >
      {collections.map((collection) => (
        <CardCollection
          key={collection.id}
          link={{ as: '/collections/async-music-auctions-' + collection.id, href: '/collections/[slug]' }}
          title={collection.name}
          countOwners={10000}
          countItems={24000}
          logoImage={collection.logoImage}
        />
      ))}
    </List>
  );
};
