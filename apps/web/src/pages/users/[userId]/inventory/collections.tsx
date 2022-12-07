import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { CollectionsResponse } from 'types/data';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { isSuccess } from 'lib/utils/response';
import { ContainerInventory } from 'components/organisms';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const collectionsQuery = {
    ...query,
    page: query.page ? query.page : 1,
  };
  delete collectionsQuery.userId;
  collectionsQuery['createdBy'] = query.userId;

  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const collectionQueryString = new URLSearchParams(collectionsQuery).toString();

  if (!query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${collectionQueryString}`,
        permanent: false,
      },
    };
  }
  const collections = await fetchApi<CollectionsResponse>(`/collection/exchange/list?${collectionQueryString}`);

  return {
    props: {
      collectionQueryString,
      fallback: {
        [`/collection/exchange/list?${collectionQueryString}`]: collections,
      },
    },
  };
}

const InventoryCollectionPage: NextPageWithLayout = ({
  collectionQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;

  const { data: collections, error: errorCollections } = useSWR<CollectionsResponse>(
    `/collection/exchange/list?${collectionQueryString}`,
  );
  console.log({
    collections,
    errorCollections,
  });
  const handlerFilterChange = async (key: string, value: any) => {
    let newQuery = query;
    if (key === 'price') {
      newQuery = { ...newQuery, priceMin: value[0], priceMax: value[1] };
    } else if (key === 'period' && value === 'all' && 'period' in newQuery) {
      delete newQuery.period;
    } else {
      newQuery = { ...query, [key]: value };
    }
    await router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const resetFilter = async () => {
    const resetQuery = { page: 1, period: query.period };
    if (query.sort) {
      resetQuery['sort'] = query.sort;
    }
    await router.push({
      pathname: router.pathname,
      query: resetQuery,
    });
  };

  if (errorCollections || !isSuccess(collections.message)) {
    return <Error />;
  }
  const convertedQuery = convertQueryParamsToArray(query);

  return (
    <ContainerInventory>
      {errorCollections || !isSuccess(collections.message) ? (
        <Error className={'py-10'} />
      ) : (
        <ExploreSection
          name={'collections'}
          filtersComponent={<CollectionsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
          filter={convertedQuery}
          bodyClassName="container"
          onChangeFilter={handlerFilterChange}
          onResetFilter={resetFilter}
        >
          {collections ? (
            <CollectionsList collections={collections.data.list} meta={collections.data.meta} />
          ) : (
            <ListNftsSkeleton number={10} />
          )}
        </ExploreSection>
      )}
    </ContainerInventory>
  );
};

InventoryCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default InventoryCollectionPage;
