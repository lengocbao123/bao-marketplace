import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { CollectionProfile } from 'components/organisms';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { NextPageWithLayout } from 'pages/_app';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useFilter } from 'hooks/use-filter';
import { useCollectionById, useNftsByCollectionId } from 'hooks/services';
import { getCollectionById, getNftsByCollectionId } from 'services';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
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
    getCollectionById(session, id),
    getNftsByCollectionId(session, id, nftsQueryString),
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
        [`/nft/exchange/list?collection=${id}&${nftsQueryString}`]: nftsByCollection,
      },
    },
  };
}

const Home: NextPageWithLayout = ({ id, nftsQueryString }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { collection, loading: collectionLoading, error: errorCollection } = useCollectionById(id);
  const { nfts, loading: nftsLoading, error: errorNfts } = useNftsByCollectionId(id, nftsQueryString);
  const router = useRouter();
  const { query, convertedQuery, handleChange, resetFilter } = useFilter(router.query);
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

  if (errorCollection || errorNfts) {
    return <Error />;
  }

  if (collectionLoading || nftsLoading) {
    return <div>loading...</div>;
  }

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
            <NftsFilters fields={['status', 'chain', 'price']} filter={convertedQuery} onChange={handleChange} />
          }
          tabs={tabs}
          filter={convertedQuery}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
          onResetFilter={resetFilter}
          onChangeFilter={handleChange}
        >
          {!nftsLoading ? <NftsList nfts={nfts.list} meta={nfts.meta} /> : <ListNftsSkeleton number={10} />}
        </ExploreSection>
      </div>
    </Fragment>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
