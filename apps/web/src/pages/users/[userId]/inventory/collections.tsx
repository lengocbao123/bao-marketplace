import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ContainerInventory } from 'components/organisms';
import { getCollectionsByUserId } from 'lib/services';
import { useCollectionsByUserId } from 'lib/services/hooks';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const collectionsQuery = {
    ...query,
    page: query.page ? query.page : 1,
  };
  delete collectionsQuery.userId;

  const session = await unstable_getServerSession(req, res, authOptions);
  const collectionQueryString = new URLSearchParams(collectionsQuery).toString();

  if (!query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${collectionQueryString}`,
        permanent: false,
      },
    };
  }
  const collections = await getCollectionsByUserId(session, query.userId as string, collectionQueryString);

  return {
    props: {
      collectionQueryString,
      fallback: {
        [`/collection/exchange/list?createdBy=${query.userId}&${collectionQueryString}`]: collections,
      },
    },
  };
}

const InventoryCollectionPage: NextPageWithLayout = ({
  collectionQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;

  const { collections, error: errorCollections } = useCollectionsByUserId(
    query.userId as string,
    collectionQueryString,
  );

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

  if (errorCollections) {
    return <Error />;
  }
  const convertedQuery = convertQueryParamsToArray(query);

  return (
    <ContainerInventory>
      {errorCollections ? (
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
            <CollectionsList collections={collections.list} meta={collections.meta} />
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
