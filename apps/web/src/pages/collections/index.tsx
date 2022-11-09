import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import queryString from 'query-string';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export async function getServerSideProps({ query, resolvedUrl }) {
  const collectionQuery = queryString.stringify({
    ...query,
    page: query.page ? query.page : 1,
    period: query.period ? query.period : '24_hours',
  });

  if (!query.period) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${collectionQuery}`,
        permanent: false,
      },
    };
  }
  const [collections, periods] = await Promise.all([fetcher(`/collections?${collectionQuery}`), fetcher('/periods')]);

  return {
    props: {
      collectionQuery,
      fallback: {
        [`/collections?${collectionQuery}`]: collections,
        '/periods': periods,
      },
    },
  };
}

const ExploreCollectionPage: NextPageWithLayout = ({
  collectionQuery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const query = queryString.parse(collectionQuery, { arrayFormat: 'bracket', parseNumbers: true, parseBooleans: true });
  const router = useRouter();
  const { data: periods, error: errorPeriods } = useSWR(`/periods`);
  const { data: collections, error: errorCollections } = useSWR(`/collections?${collectionQuery}`);

  const handlerFilterChange = (key: string, value: any) => {
    router.push({
      pathname: router.pathname,
      query: queryString.stringify({ ...query, [key]: value }, { arrayFormat: 'bracket' }),
    });
  };

  const resetFilter = () => {
    const newQuery = { page: 1, category: query.category };
    router.push({
      pathname: router.pathname,
      query: queryString.stringify(newQuery, { arrayFormat: 'bracket' }),
    });
  };

  if (errorPeriods || errorCollections) {
    return <div>failed to load</div>;
  }

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
        filtersComponent={<CollectionsFilters filter={query} onChange={handlerFilterChange} />}
        filter={query}
        tabs={periods.map((item) => ({ label: item.title, value: item.value, active: item.value === query.period }))}
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
