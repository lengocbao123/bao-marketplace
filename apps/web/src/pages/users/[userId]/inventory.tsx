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
import { CollectionData, NftData } from 'types/data';
import { format } from 'date-fns';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const nftsQueryParams = {};
  const collectionsQueryParams = {};
  Object.keys(query).forEach((key) => {
    if (key !== 'userId') {
      nftsQueryParams[key] = query[key];
    }
    if (key !== 'userId' && key !== 'filter' && key !== 'collection') {
      collectionsQueryParams[key] = query[key];
    }
  });

  const nftsQueryString = new URLSearchParams({
    ...nftsQueryParams,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'on-sale',
  }).toString();

  const collectionsQueryString = new URLSearchParams({
    ...nftsQueryParams,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'on-sale',
  }).toString();

  if (!query.filter || !query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${nftsQueryString}`,
        permanent: false,
      },
    };
  }
  const [nfts, collections, user] = await Promise.all([
    fetchApi<NftData[]>(`/nfts?user.id=${query.userId}&${nftsQueryString}`),
    fetchApi<CollectionData[]>(`/collections?user.id=${query.userId}&${collectionsQueryString}`),
    fetchApi(`/users/${query.userId}`),
  ]);

  return {
    props: {
      nftsQueryString,
      collectionsQueryString,
      fallback: {
        [`/nfts?user.id=${query.userId}&${nftsQueryString}`]: nfts,
        [`/collections?user.id=${query.userId}&${collectionsQueryString}`]: collections,
        [`/users/${query.userId}`]: user,
      },
    },
  };
}

const UserInventoryPage: NextPageWithLayout = ({
  nftsQueryString,
  collectionsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;
  const { data: collections, error: errorCollections } = useSWR<CollectionData[]>(
    `/collections?user.id=${query.userId}&${collectionsQueryString}`,
  );
  const { data: nfts, error: errorNfts } = useSWR<NftData[]>(`/nfts?user.id=${query.userId}&${nftsQueryString}`);
  const { data: user, error: errorUser } = useSWR(`/users/${query.userId}`);

  const handlerFilterChange = async (key: string, value: any) => {
    if (key === 'filter') {
      await router.push(
        {
          pathname: router.pathname,
          query: { userId: query.userId, page: 1, [key]: value },
        },
        undefined,
        {
          scroll: false,
        },
      );
    } else {
      await router.push(
        {
          pathname: router.pathname,
          query: { ...query, [key]: value },
        },
        undefined,
        {
          scroll: false,
        },
      );
    }
  };

  const resetFilter = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { userId: query.userId, page: 1, filter: query.filter },
      },
      undefined,
      {
        scroll: false,
      },
    );
  };

  if (errorCollections || errorNfts || errorUser) {
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
      <NftsList nfts={nfts} meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 3, currentPage: 1 }} />
    );

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <ProfileInventory
        banner={user.banner}
        avatar={user.avatarUrl}
        name={user.name}
        bio={user.bio}
        joined={format(new Date(user.createdAt), 'MM/dd/yyyy')}
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

UserInventoryPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserInventoryPage;
