import clsx from 'clsx';
import Image from 'next/future/image';
import { Fragment, useState } from 'react';
import { Layout } from '../../components/layouts';
import { Tabs } from '../../components/molecules';
import { NftsFilters, NftsList, NftsAction } from '../../components/organisms/nfts';
import { NFTS, COLLECTIONS, CATEGORIES } from '../../lib/dummy';
import { NextPageWithLayout } from '../_app';

const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };
const ExplorePage: NextPageWithLayout = () => {
  const [isDisplayingFilter, setIsDisplayingFilter] = useState(true);
  const [filter, setFilter] = useState(DEFAULT_FILTERS);
  const [numOfFilters, setNumOfFilters] = useState(0);
  const [category, setCategory] = useState('all');

  const handleChangeFilter = (key: string, value: any) => {
    const newFilter = { ...filter, [key]: value };
    let num = 0;
    Object.values(newFilter).forEach((filterValue) => {
      num += filterValue.length;
    });
    setFilter(newFilter);
    setNumOfFilters(num);
  };

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt={'collection.name'}
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
        <NftsAction
          isDisplayingFilter={isDisplayingFilter}
          numOfFilters={numOfFilters}
          className="mb-5"
          toggleFilter={() => setIsDisplayingFilter(!isDisplayingFilter)}
          onClearFilter={() => {
            setFilter(DEFAULT_FILTERS);
            setNumOfFilters(0);
          }}
        />
        <div className="flex flex-row gap-6">
          {isDisplayingFilter && (
            <NftsFilters
              collections={COLLECTIONS}
              className="hidden basis-1/4 md:block"
              filter={filter}
              onChange={handleChangeFilter}
            />
          )}
          <NftsList
            className={clsx('w-full', isDisplayingFilter ? 'md:basis-3/4' : '')}
            nfts={NFTS}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
          />
        </div>
      </div>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
