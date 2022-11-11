import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { CollectionData } from 'types/data';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const collectionQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : '24_hours',
  }).toString();

  if (!query.filter || !query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${collectionQueryString}`,
        permanent: false,
      },
    };
  }
  const [collections, periods] = await Promise.all([
    fetchApi(`/collections?${collectionQueryString}`),
    fetchApi('/periods'),
  ]);

  return {
    props: {
      collectionQueryString,
      fallback: {
        [`/collections?${collectionQueryString}`]: collections,
        '/periods': periods,
      },
    },
  };
}

const ExploreCollectionPage: NextPageWithLayout = ({
  collectionQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: periods, error: errorPeriods } = useSWR(`/periods`);
  const { data: collections, error: errorCollections } = useSWR<CollectionData[]>(
    `/collections?${collectionQueryString}`,
  );
  const router = useRouter();
  const { query } = router;

  const handlerFilterChange = async (key: string, value: any) => {
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
  };

  const resetFilter = async () => {
    const resetQuery = { page: 1, filter: query.filter };
    if (query.sort) {
      resetQuery['sort'] = query.sort;
    }
    await router.push(
      {
        pathname: router.pathname,
        query: resetQuery,
      },
      undefined,
      {
        scroll: false,
      },
    );
  };

  if (errorPeriods || errorCollections) {
    return <div>failed to load</div>;
  }
  const convertedQuery = convertQueryParamsToArray(query);

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      <ExploreSection
        filtersComponent={<CollectionsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
        filter={convertedQuery}
        tabs={periods.map((item) => ({ label: item.title, value: item.value, active: item.value === query.filter }))}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
        onChangeFilter={handlerFilterChange}
        onResetFilter={resetFilter}
      >
        <CollectionsList
          collections={collections}
          meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: query.page }}
        />
      </ExploreSection>
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
