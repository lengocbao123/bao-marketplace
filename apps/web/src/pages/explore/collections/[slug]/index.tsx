import { Layout } from '../../../../components/layouts';
import { ExploreSection } from '../../../../components/molecules';
import { CollectionProfile } from '../../../../components/organisms';
import { NftsFilters, NftsList } from '../../../../components/organisms/nfts';
import { useFilter } from '../../../../hooks/use-filters';
import { COLLECTIONS, NFTS } from '../../../../lib/dummy';
import { NextPageWithLayout } from '../../../_app';
const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };
const Home: NextPageWithLayout = () => {
  const { filter, onFiltersChange } = useFilter(DEFAULT_FILTERS);

  const tabs = [
    {
      id: 'on-sale-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'On Sale (1k)',
      value: 'on-sale'
    },
    {
      id: 'live-auction-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Live Auction (978)',
      value: 'live-auction'
    },
    {
      id: 'unlisted-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Unlisted (100)',
      value: 'unlisted'
    }
  ];

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <CollectionProfile collection={COLLECTIONS[0]} />
      <div className="container">
        <ExploreSection
          filtersComponent={
            <NftsFilters className="px-5" collections={COLLECTIONS} filter={filter} onChange={onFiltersChange} />
          }
          tabs={tabs}
          filter={filter}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
        >
          <NftsList
            nfts={NFTS}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
          />
        </ExploreSection>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
