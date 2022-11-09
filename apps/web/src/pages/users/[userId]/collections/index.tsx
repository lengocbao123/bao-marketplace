import { useRouter } from 'next/router';
import { Layout } from 'components/layouts';
import { ExploreSection, generateTabLinkData } from 'components/molecules';
import { CollectionsFilters, CollectionsList, ProfileInventory } from 'components/organisms';
import { useFilter } from 'hooks/use-filters';
import { USER_INVENTORY_TABS } from 'lib/constants';
import { COLLECTIONS } from 'lib/dummy';
import { NextPageWithLayout } from 'pages/_app';

const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };
const Home: NextPageWithLayout = () => {
  const { filter, onFiltersChange } = useFilter(DEFAULT_FILTERS);
  const router = useRouter();
  const { query } = router;

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <ProfileInventory
        banner="https://ik.imagekit.io/gsozk5bngn/Rectangle_287_DpMLXUW9H.png"
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
          { link: '/', type: 'website' },
        ]}
      />
      <div className="container">
        <ExploreSection
          filtersComponent={<CollectionsFilters filter={filter} onChange={onFiltersChange} />}
          tabs={generateTabLinkData(USER_INVENTORY_TABS, `/users/${query.userId}`)}
          filter={filter}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
        >
          <CollectionsList
            collections={COLLECTIONS}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
          />
        </ExploreSection>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
