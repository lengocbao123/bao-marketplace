import { useRouter } from 'next/router';
import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList, ProfileInventory } from 'components/organisms';
import { NextPageWithLayout } from 'pages/_app';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import useSWR from 'swr';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { USER_INVENTORY_TABS } from 'lib/constants';
import { NftsFilters, NftsList } from 'components/organisms/nfts';

export async function getServerSideProps({ query, resolvedUrl }) {
  const queryParams = {};
  Object.keys(query).forEach((key) => {
    if (key !== 'userId') {
      queryParams[key] = query[key];
    }
  });
  const queryString = new URLSearchParams({
    ...queryParams,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'on-sale',
  }).toString();

  if (!query.filter || !query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${queryString}`,
        permanent: false,
      },
    };
  }
  const [nfts, collections] = await Promise.all([
    fetcher(`/nfts?user.id=${query.userId}&${queryString}`),
    fetcher(`/collections?${queryString}`),
  ]);

  return {
    props: {
      queryString,
      fallback: {
        [`/nfts?user.id=${query.userId}&${queryString}`]: nfts,
        [`/collections?${queryString}`]: collections,
      },
    },
  };
}

const UserCollectionsPage: NextPageWithLayout = ({
  queryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;
  const { data: collections, error: errorCollections } = useSWR(`/collections?${queryString}`);
  const { data: nfts, error: errorNfts } = useSWR(`/nfts?user.id=${query.userId}&${queryString}`);

  const handlerFilterChange = (key: string, value: any) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, [key]: value },
    });
  };

  const resetFilter = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1, filter: query.filter },
    });
  };

  if (errorCollections || errorNfts) {
    return <div>failed to load</div>;
  }
  const convertedQuery = convertQueryParamsToArray(query);
  const filterComponent =
    query.filter === 'collections' ? (
      <CollectionsFilters filter={convertedQuery} onChange={handlerFilterChange} />
    ) : (
      <NftsFilters filter={convertedQuery} onChange={handlerFilterChange} />
    );
  const listComponent =
    query.filter === 'collections' ? (
      <CollectionsList
        collections={collections}
        meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: query.page }}
      />
    ) : (
      <NftsList
        nfts={nfts}
        meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 3, currentPage: query.page }}
      />
    );

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
          filtersComponent={filterComponent}
          filter={convertedQuery}
          tabs={USER_INVENTORY_TABS.map((tab) => ({
            ...tab,
            active: tab.value === query.filter,
          }))}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
          bodyClassName="container"
          onChangeFilter={handlerFilterChange}
          onResetFilter={resetFilter}
        >
          {listComponent}
        </ExploreSection>
      </div>
    </div>
  );
};

UserCollectionsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserCollectionsPage;
