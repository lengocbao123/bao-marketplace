import { Layout } from 'components/layouts';
import { Error, ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { CollectionsResponse } from 'types/data';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { PERIODS } from 'lib/dummy';
import { isSuccess } from 'lib/utils/response';
import { NextSeo } from 'next-seo';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const collectionQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
  }).toString();

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

const ExploreCollectionPage: NextPageWithLayout = ({
  collectionQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: collections, error: errorCollections } = useSWR<CollectionsResponse>(
    `/collection/exchange/list?${collectionQueryString}`,
  );
  const router = useRouter();
  const { query } = router;

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
    <Fragment>
      <NextSeo title={'Discover NFTS'} />
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      {errorCollections || !isSuccess(collections.message) ? (
        <Error className={'py-10'} />
      ) : (
        <ExploreSection
          name={'collections'}
          filtersComponent={<CollectionsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
          filter={convertedQuery}
          tabs={PERIODS.map((item) => ({
            label: item.title,
            value: item.value,
            active: (item.value === 'all_time' && !query.period) || item.value === query.period,
          }))}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
          bodyClassName="container"
          onChangeFilter={handlerFilterChange}
          onResetFilter={resetFilter}
        >
          <CollectionsList collections={collections.data.list} meta={collections.data.meta} />
        </ExploreSection>
      )}
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
