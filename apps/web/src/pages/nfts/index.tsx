import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton, TabData } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useNftsFilter } from 'hooks/use-nfts-filter';
import { useCategories, useNfts } from 'hooks/services';
import { getCollections, getNfts, getCategories } from 'services';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const nftsQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
  }).toString();
  const [categories, nfts, collections] = await Promise.all([
    getCategories(session),
    getNfts(session, nftsQueryString),
    getCollections(session, ''),
  ]);

  if (!query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${nftsQueryString}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      nftsQueryString,
      fallback: {
        '/category/list': categories,
        [`/nft/exchange/list?${nftsQueryString}`]: nfts,
        '/collection/exchange/list?q=': collections,
      },
    },
  };
}

const ExplorePage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { categories, error: errorCategories } = useCategories();
  const { nfts, loading, error } = useNfts(nftsQueryString);
  const { query, convertedQuery, handleChange, resetFilter } = useNftsFilter(router.query);

  if (errorCategories || error) {
    return <Error />;
  }

  const categoryTabs: TabData[] = [
    {
      id: 'all',
      name: 'All',
      code: 'all',
    },
    ...categories,
  ].map((item) => ({
    label: item.name,
    value: item.id,
    active: (item.code === 'all' && !query.category) || item.id === query.category,
  }));

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
        name={'nfts'}
        filtersComponent={<NftsFilters filter={convertedQuery} onChange={handleChange} />}
        tabs={categoryTabs}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
        filter={convertedQuery}
        onChangeFilter={handleChange}
        onResetFilter={resetFilter}
      >
        {!loading ? <NftsList nfts={nfts.list} meta={nfts.meta} /> : <ListNftsSkeleton number={10} />}
      </ExploreSection>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
