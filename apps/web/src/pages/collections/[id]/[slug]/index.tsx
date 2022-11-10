import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, ExploreSection } from 'components/molecules';
import { CollectionProfile } from 'components/organisms';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { NextPageWithLayout } from 'pages/_app';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { CollectionData, NftData } from 'types';
import { convertQueryParamsToArray } from 'lib/utils/query';

export async function getServerSideProps({ query, resolvedUrl }) {
  const { filter, id, page } = query;
  const queryParams = {};
  Object.keys(query).forEach((key) => {
    if (key !== 'slug' && key !== 'id') {
      queryParams[key] = query[key];
    }
  });

  const nftsQueryString = new URLSearchParams({
    ...queryParams,
    page: page ? page : 1,
    filter: filter ? filter : 'on-sale',
  }).toString();

  const [collection, nftsByCollection] = await Promise.all([
    fetcher<CollectionData>(`/collections/${id}`),
    fetcher<NftData[]>(`/nfts?collection.id=${id}&${nftsQueryString}`),
  ]);
  if (!filter || !page) {
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
        [`/collections/${id}`]: collection,
        [`/nfts?collection.id=${id}`]: nftsByCollection,
      },
    },
  };
}

const Home: NextPageWithLayout = ({ id, nftsQueryString }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: collection, error: errorCollection } = useSWR<CollectionData>(`/collections/${id}`);
  const { data: nftsByCollection, error: errorNftsByCollection } = useSWR<NftData[]>(
    `/nfts?collection.id=${id}&${nftsQueryString}`,
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

  if (errorCollection || errorNftsByCollection) {
    return <div>failed to load</div>;
  }

  if (!collection || !nftsByCollection) {
    return <div>loading...</div>;
  }

  const resetFilter = () => {
    const newQuery = { page: 1, filter: query.filter };
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
    router.push(
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

  const convertedQuery = convertQueryParamsToArray(query);

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
          filtersComponent={<NftsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
          tabs={tabs}
          filter={convertedQuery}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
          onResetFilter={resetFilter}
          onChangeFilter={handlerFilterChange}
        >
          <NftsList
            nfts={nftsByCollection}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: query.page }}
          />
        </ExploreSection>
      </div>
    </Fragment>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
