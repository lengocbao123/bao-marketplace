import { CardCollection } from 'components/molecules';
import { List } from 'components/organisms/list';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';

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
      {collections?.map((collection) => (
        <CardCollection
          key={collection.id}
          link={{ href: `/collections/${collection.id}/${convertToSlug(collection.name)}` }}
          title={collection.name}
          countOwners={10000}
          countItems={24000}
          logoImage={collection.logoImage}
        />
      ))}
    </List>
  );
};
