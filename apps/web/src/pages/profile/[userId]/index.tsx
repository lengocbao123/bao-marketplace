import { useRouter } from 'next/router';
import { Layout } from '../../../components/layouts';
import { ExploreSection } from '../../../components/molecules';
import { CollectionsFilters, CollectionsList, ProfileInventory } from '../../../components/organisms';
import { NftsFilters, NftsList } from '../../../components/organisms/nfts';
import { useFilter } from '../../../hooks/use-filters';
import { COLLECTIONS, NFTS } from '../../../lib/dummy';
import { NextPageWithLayout } from '../../_app';
const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };
const Home: NextPageWithLayout = () => {
  const { filter, onFiltersChange } = useFilter(DEFAULT_FILTERS);

  const router = useRouter();
  const tabs = [
    {
      id: 'on-sale-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'On Sale (1k)',
      value: 'on-sale'
    },
    {
      id: 'created-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Created (112)',
      value: 'created'
    },
    {
      id: 'Owned-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Owned (342)',
      value: 'Owned'
    },
    {
      id: 'collections-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Collections (10)',
      value: 'collections'
    }
  ];
  const isCollectionsView = router.query['tab'] && router.query['tab'] === 'collections';
  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <ProfileInventory
        banner=""
        avatar={'https://ik.imagekit.io/gsozk5bngn/product/image-3_suhW2eBcF.jpg'}
        name={'Shushio'}
        bio={
          'I really like this one. I was playing around with some Illustrator tutorials when I decided I wanted to make a pixel styled wallpaper. It started with the idea if having well known pixel game characters and the text I <3 Pixel'
        }
        joined={'July 2022'}
        address={'0xbf....0cee'}
        socialLinks={[
          { link: '/', type: 'twitter' },
          { link: '/', type: 'discord' },
          { link: '/', type: 'website' }
        ]}
      />
      <div className="container">
        <ExploreSection
          filtersComponent={
            !isCollectionsView ? (
              <NftsFilters className="px-5" collections={COLLECTIONS} filter={filter} onChange={onFiltersChange} />
            ) : (
              <CollectionsFilters className="px-5" filter={filter} onChange={onFiltersChange} />
            )
          }
          tabs={tabs}
          filter={filter}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
        >
          {!isCollectionsView ? (
            <NftsList
              nfts={NFTS}
              meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
            />
          ) : (
            <CollectionsList
              collections={COLLECTIONS}
              meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
            />
          )}
        </ExploreSection>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
