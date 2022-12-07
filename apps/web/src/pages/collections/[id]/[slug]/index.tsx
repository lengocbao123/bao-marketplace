import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { CollectionProfile } from 'components/organisms';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { NextPageWithLayout } from 'pages/_app';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { CollectionData, CollectionResponse, NftsResponse } from 'types';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { isSuccess } from 'lib/utils/response';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const { id, page } = query;
  const queryParams = {};
  Object.keys(query).forEach((key) => {
    if (key !== 'slug' && key !== 'id') {
      queryParams[key] = query[key];
    }
  });

  const nftsQueryString = new URLSearchParams({
    ...queryParams,
    page: page ? page : 1,
  }).toString();

  const [collection, nftsByCollection] = await Promise.all([
    fetchApi<CollectionData>(`/collection/${id}`),
    fetchApi<NftsResponse>(`/nft/exchange/list?${nftsQueryString}&collection=${id}`),
  ]);
  if (!page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${nftsQueryString}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
      nftsQueryString,
      fallback: {
        [`/collection/${id}`]: collection,
        [`/nft/exchange/list?${nftsQueryString}&collection=${id}`]: nftsByCollection,
      },
    },
  };
}

const Home: NextPageWithLayout = ({ id, nftsQueryString }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: collectionResponse, error: errorCollection } = useSWR<CollectionResponse>(`/collection/${id}`);
  const { data: nftsByCollectionResponse, error: errorNftsByCollection } = useSWR<NftsResponse>(
    `/nft/exchange/list?${nftsQueryString}&collection=${id}`,
  );

  const router = useRouter();
  const { query } = router;
  const tabs = [
    {
      value: 'on-sale',
      label: 'On Sale',
      active: query.filter === 'on-sale',
    },
    {
      value: 'live-auction',
      label: 'Live Auction',
      active: query.filter === 'live-auction',
    },
    {
      value: 'unlisted',
      label: 'Unlisted',
      active: query.filter === 'unlisted',
    },
  ];

  if (
    errorCollection ||
    errorNftsByCollection ||
    !isSuccess(nftsByCollectionResponse.message) ||
    !isSuccess(collectionResponse.message)
  ) {
    return <Error />;
  }

  if (!collectionResponse || !nftsByCollectionResponse) {
    return <div>loading...</div>;
  }

  const resetFilter = () => {
    const newQuery = { page: 1, filter: query.filter };
    if (query.sort) {
      newQuery['sort'] = query.sort;
    }
    router.push(
      {
        ...router,
        query: { id: query.id, slug: query.slug, ...newQuery },
      },
      undefined,
      {
        scroll: false,
      },
    );
  };

  const handlerFilterChange = (key: string, value: any) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, [key]: value },
    });
  };

  const convertedQuery = convertQueryParamsToArray(query);
  const { data: collection } = collectionResponse;

  return (
    <Fragment>
      <NextSeo title={collection.name} />
      <Breadcrumb
        className="bg-neutral-10 mb-0 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          { label: collection.name, href: '/', as: '/' },
        ]}
      />
      <CollectionProfile className="m-0" collection={collection} />
      <div className="container">
        <ExploreSection
          name={'nfts'}
          filtersComponent={
            <NftsFilters fields={['status', 'chain', 'price']} filter={convertedQuery} onChange={handlerFilterChange} />
          }
          tabs={tabs}
          filter={convertedQuery}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
          onResetFilter={resetFilter}
          onChangeFilter={handlerFilterChange}
        >
          {nftsByCollectionResponse ? (
            <NftsList nfts={nftsByCollectionResponse.data.list} meta={nftsByCollectionResponse.data.meta} />
          ) : (
            <ListNftsSkeleton number={10} />
          )}
        </ExploreSection>
      </div>
    </Fragment>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
