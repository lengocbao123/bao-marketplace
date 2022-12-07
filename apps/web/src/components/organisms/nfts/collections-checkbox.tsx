import * as React from 'react';
import { CheckboxFilter } from 'components/molecules';
import { Button, Input } from 'components/atoms';
import { SearchIcon } from 'components/icons/outline';
import { CollectionData } from 'types/data';
import { useEffect, useState } from 'react';

export interface CollectionsCheckboxProps {
  values?: string[];
  collections: CollectionData[];
  loading?: boolean;
  isLoadingMore?: boolean;
  disabledLoadMore?: boolean;
  size: number;
  searchCollections?: (key: string) => void;
  loadMore?: (size: number) => void;
  onChange: (key: string, value: any) => void;
}

export const CollectionsCheckbox: React.FC<CollectionsCheckboxProps> = ({
  values,
  collections,
  disabledLoadMore = false,
  isLoadingMore = false,
  size = 0,
  loadMore,
  searchCollections,
  onChange,
}) => {
  const [collectionsData, setCollectionsData] = useState<CollectionData[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (collections) {
      setCollectionsData(collections);
    } else {
      setCollectionsData([]);
    }
  }, [collections]);

  return (
    <div className={'max-h-80 w-full overflow-y-auto scroll-auto'}>
      <CheckboxFilter
        name="collection"
        heading="Collections"
        options={collectionsData.map((collection) => ({
          label: collection.name,
          value: collection.id,
        }))}
        onChange={onChange}
        loading={!collections}
        values={values}
        action={
          <Input
            placeholder="Search by collections"
            onChange={(event) => {
              const value = event.target.value;
              searchCollections(value);
              setSearchText(value);
            }}
            value={searchText}
            trailingVisual={SearchIcon}
          />
        }
      />
      <Button
        loading={isLoadingMore}
        onClick={() => loadMore(size + 1)}
        label={'Load more'}
        className={'w-full'}
        variant={'primary'}
        disabled={disabledLoadMore}
      />
    </div>
  );
};
