import clsx from 'clsx';
import Image from 'next/future/image';
import { Fragment, useState } from 'react';
import { Button } from '../../../components/atoms';
import { FilterIcon } from '../../../components/icons/outline';
import { Layout } from '../../../components/layouts';
import { HamburgerSection, Tabs } from '../../../components/molecules';
import { CollectionsList, ExploreActions, ExploreFilterToggle } from '../../../components/organisms';
import { COLLECTIONS, CATEGORIES } from '../../../lib/dummy';
import { NextPageWithLayout } from '../../_app';
import { CollectionsFilters } from '../../../components/organisms';

const DEFAULT_FILTERS = { blockchain: [], price: [] };
const ExploreCollectionPage: NextPageWithLayout = () => {
  const [isDisplayingFilter, setIsDisplayingFilter] = useState(true);
  const [filter, setFilter] = useState(DEFAULT_FILTERS);
  const [numOfFilters, setNumOfFilters] = useState(0);
  const [category, setCategory] = useState('all');

  const handleChangeFilter = (key: string, value: any) => {
    const newFilter = { ...filter, [key]: value };
    let count = 0;
    Object.values(newFilter).forEach((filterValue) => {
      count += filterValue.length;
    });
    setFilter(newFilter);
    setNumOfFilters(count);
  };

  const collectionsFilterComponent = (
    <CollectionsFilters className="px-5" collections={COLLECTIONS} filter={filter} onChange={handleChangeFilter} />
  );

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      <Tabs
        data={CATEGORIES.nfts.map((item) => ({
          ...item,
          active: item.value === category
        }))}
        onChange={(value) => {
          setCategory(value);
        }}
        className="border-neutral-10 mb-7.5 bottom-1 border"
      />
      <div className="container">
        <div className="flex justify-between">
          <HamburgerSection
            className="block sm:hidden"
            openButton={
              <ExploreFilterToggle
                numOfFilters={numOfFilters}
                onToggle={() => setIsDisplayingFilter(!isDisplayingFilter)}
              />
            }
            heading="Filters"
            openButtonIcon={FilterIcon}
          >
            {collectionsFilterComponent}
            <div className="border-neutral-10 bg-neutral-0 sticky bottom-0 z-10 grid grid-cols-2 gap-4 border-t p-5">
              <Button
                label="Clear all"
                variant="tertiary"
                onClick={() => {
                  setFilter(DEFAULT_FILTERS);
                  setNumOfFilters(0);
                }}
              />
              <Button label="Apply" variant="secondary" />
            </div>
          </HamburgerSection>
          <ExploreActions
            isDisplayingFilter={isDisplayingFilter}
            numOfFilters={numOfFilters}
            className="mb-5"
            toggleFilter={() => setIsDisplayingFilter(!isDisplayingFilter)}
            onClearFilter={() => {
              setFilter(DEFAULT_FILTERS);
              setNumOfFilters(0);
            }}
          />
        </div>

        <div className="flex flex-row gap-6">
          {isDisplayingFilter && <div className="hidden basis-1/4 sm:block">{collectionsFilterComponent}</div>}
          <CollectionsList
            className={clsx('w-full', isDisplayingFilter ? 'sm:basis-3/4' : '')}
            collections={COLLECTIONS}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
          />
        </div>
      </div>
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
