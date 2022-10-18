import clsx from 'clsx';
import { useState } from 'react';
import { Layout } from '../../components/layouts';
import { NftsFilters, NftsList, NftsAction } from '../../components/organisms/nfts';
import { NFTS, COLLECTIONS } from '../../lib/dummy';
import { NextPageWithLayout } from '../_app';
const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };
const ExplorePage: NextPageWithLayout = () => {
  const [isDisplayingFilter, setIsDisplayingFilter] = useState(true);
  const [filter, setFilter] = useState(DEFAULT_FILTERS);
  const [numOfFilters, setNumOfFilters] = useState(0);

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
          <NftsFilters collections={COLLECTIONS} className="basis-1/4" filter={filter} onChange={handleChangeFilter} />
        )}
        <NftsList
          className={clsx(isDisplayingFilter ? 'basis-3/4' : '')}
          nfts={NFTS}
          meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
        />
      </div>
    </div>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
