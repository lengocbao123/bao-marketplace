import { CardCollection } from 'components/molecules';
import { List } from 'components/organisms/list';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';
import { CollectionData, PaginationData } from 'types/data';

export interface CollectionsListProps extends HTMLAttributes<HTMLDivElement> {
  collections: CollectionData[];
  meta?: PaginationData;
  links?: any;
}

export const CollectionsList: FC<CollectionsListProps> = ({ collections, meta, className }) => {
  return (
    <List
      hasData={collections.length > 0}
      totalItems={meta.total_items}
      totalPages={meta.total_pages}
      page={meta.current_page}
      className={className}
    >
      {collections?.map((collection) => (
        <CardCollection
          key={collection.id}
          link={{ href: `/collections/${collection.id}/${convertToSlug(collection.name)}` }}
          title={collection.name}
          countOwners={10000}
          countItems={collection.total_nft}
          logoImage={collection.logo_image}
          featuredImage={collection.banner_image}
        />
      ))}
    </List>
  );
};
